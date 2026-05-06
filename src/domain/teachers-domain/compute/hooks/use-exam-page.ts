import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import {
  useGetTeacherClassesQuery,
  useGetTeacherClassGroupsQuery,
  useGetTeacherExamTemplatesQuery,
  useGetActiveTermQuery,
  useSubmitExamScoresMutation,
} from "../../overview/hooks";

export function useExamPage() {
  const [classId, setClassIdState] = useState<number | null>(null);
  const [classGroupId, setClassGroupId] = useState<number | null>(null);
  const [isFiltered, setIsFiltered] = useState(false);
  // key: `${studentId ?? 'none'}_${examId}`, value: raw string so empty fields stay empty
  const [scores, setScores] = useState<Record<string, string>>({});

  const { data: classesData, isLoading: classesLoading } = useGetTeacherClassesQuery();
  const { data: classGroupsData, isLoading: classGroupsLoading } = useGetTeacherClassGroupsQuery();
  const { data: activeTermData } = useGetActiveTermQuery();
  const { data: examData, isLoading: examLoading } = useGetTeacherExamTemplatesQuery(
    isFiltered && classId && classGroupId ? { classId, classGroupId } : skipToken
  );
  const [submitExamScores, { isLoading: isSubmitting }] = useSubmitExamScoresMutation();

  const classes = classesData?.data ?? [];
  const allGroups = classGroupsData?.data ?? [];
  const filteredGroups = classId ? allGroups.filter((g) => g.classId === classId) : [];
  const examTemplates = examData?.data ?? [];

  const setClassId = (id: number | null) => {
    setClassIdState(id);
    setClassGroupId(null);
    setIsFiltered(false);
    setScores({});
  };

  const handleFilter = () => {
    if (classId && classGroupId) {
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
    setIsFiltered(false);
    setScores({});
  };

  // Score key: unique per student × exam
  const scoreKey = (studentId: number | undefined, examId: number) =>
    `${studentId ?? "none"}_${examId}`;

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
    isFiltered,
    classes,
    classesLoading,
    filteredGroups,
    classGroupsLoading,
    examTemplates,
    examLoading,
    handleFilter,
    handleCancel,
    handleClearFilters,
    hasActiveFilters: !!(classId || classGroupId),
    canFilter: !!(classId && classGroupId),
    resetScores: () => setScores({}),
    setScore,
    getScore,
    handleSubmit,
    isSubmitting,
  };
}
