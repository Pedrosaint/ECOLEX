/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import {
  useGetTeacherClassesQuery,
  useGetTeacherClassGroupsQuery,
  useGetTeacherExamTemplatesQuery,
  useGetActiveTermQuery,
  useSubmitExamScoresMutation,
  useGetTeacherSubjectsByGroupQuery,
} from "../../overview/hooks";

export function useExamPage() {
  const [classId, setClassIdState] = useState<number | null>(null);
  const [classGroupId, setClassGroupId] = useState<number | null>(null);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [isFiltered, setIsFiltered] = useState(false);
  // key: `${studentId ?? 'none'}_${examId}`, value: raw string so empty fields stay empty
  const [scores, setScores] = useState<Record<string, string>>({});

  const { data: classesData, isLoading: classesLoading } = useGetTeacherClassesQuery();
  const { data: classGroupsData, isLoading: classGroupsLoading } = useGetTeacherClassGroupsQuery();
  const { data: activeTermData } = useGetActiveTermQuery();
  const { data: subjectsData, isLoading: subjectsLoading } = useGetTeacherSubjectsByGroupQuery();

  const { data: examData, isLoading: examLoading } = useGetTeacherExamTemplatesQuery(
    isFiltered && classId && subjectId
      ? { classId, subjectId, ...(classGroupId ? { classGroupId } : {}) }
      : skipToken
  );
  const [submitExamScores, { isLoading: isSubmitting }] = useSubmitExamScoresMutation();

  const classes = classesData?.data ?? [];
  const allGroups = classGroupsData?.data ?? [];
  const allSubjects = subjectsData?.subjects ?? [];

  const filteredGroups = classId ? allGroups.filter((g) => g.classId === classId) : [];
  const filteredSubjects = classId ? allSubjects.filter((s) => s.class.id === classId) : [];

  const responseData = examData?.data;
  const exams = responseData?.exams ?? [];
  const students = responseData?.students ?? [];
  const primaryExam = exams[0];

  const examTemplates = students.flatMap((s) => {
    if (!primaryExam) return [];
    return [{
      id: primaryExam.id,
      studentId: s.id,
      registrationNumber: s.registrationNumber || "-",
      studentName: `${s.surname || ""} ${s.name || ""} ${s.otherNames || ""}`.trim() || "-",
      subject: { id: primaryExam.subject?.id ?? 0, name: primaryExam.subject?.name ?? "-" },
      maxScore: primaryExam.maxScore,
    }];
  });

  // Score key: unique per student × exam
  const scoreKey = (studentId: number | undefined, examId: number) =>
    `${studentId ?? "none"}_${examId}`;

  // Prepopulate scores
  useEffect(() => {
    if (students.length > 0 && primaryExam) {
      const initialScores: Record<string, string> = {};
      students.forEach((s) => {
        if (s.examScore && s.examScore.score !== null && s.examScore.score !== undefined) {
          initialScores[scoreKey(s.id, primaryExam.id)] = String(s.examScore.score);
        }
      });
      setScores(initialScores);
    }
  }, [students, primaryExam]);

  const setClassId = (id: number | null) => {
    setClassIdState(id);
    setClassGroupId(null);
    setSubjectId(null);
    setIsFiltered(false);
    setScores({});
  };

  const handleFilter = () => {
    if (classId && subjectId) {
      setIsFiltered(true);
      setScores({});
    }
  };

  const handleCancel = () => {
    setIsFiltered(false);
    setScores({});
  };

  const handleClearFilters = () => {
    setClassIdState(null);
    setClassGroupId(null);
    setSubjectId(null);
    setIsFiltered(false);
    setScores({});
  };

  const setScore = (studentId: number | undefined, examId: number, value: string) => {
    setScores((prev) => ({ ...prev, [scoreKey(studentId, examId)]: value }));
  };

  const getScore = (studentId: number | undefined, examId: number): string =>
    scores[scoreKey(studentId, examId)] ?? "";

  const handleSubmit = async () => {
    const academicSessionId = activeTermData?.data?.activeSession?.id;
    const termId = activeTermData?.data?.activeTerm?.id;
    if (!academicSessionId || !termId) return;

    const entries = examTemplates.flatMap((template) => {
      const scoreStr = scores[scoreKey(template.studentId, template.id)];
      if (!scoreStr && scoreStr !== "0") return [];
      return [{ studentId: template.studentId ?? 0, examId: template.id, score: Number(scoreStr) }];
    });

    const result = await submitExamScores({ academicSessionId, termId, entries });
    if ("data" in result) {
      toast.success(result.data?.message || "Exam scores saved successfully.");
      handleClearFilters();
    } else {
      const err = result.error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to submit exam scores.");
    }
  };

  return {
    classId,
    setClassId,
    classGroupId,
    setClassGroupId,
    subjectId,
    setSubjectId,
    isFiltered,
    classes,
    classesLoading,
    filteredGroups,
    classGroupsLoading,
    filteredSubjects,
    subjectsLoading,
    examTemplates,
    examLoading,
    handleFilter,
    handleCancel,
    handleClearFilters,
    hasActiveFilters: !!(classId || classGroupId || subjectId),
    canFilter: !!(classId && subjectId),
    resetScores: () => setScores({}),
    setScore,
    getScore,
    handleSubmit,
    isSubmitting,
  };
}
