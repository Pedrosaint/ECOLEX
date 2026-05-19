/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import {
  useGetTeacherClassesQuery,
  useGetTeacherClassGroupsQuery,
  useGetTeacherCaTemplatesQuery,
  useGetActiveTermQuery,
  useSubmitCaScoresMutation,
  useGetTeacherSubjectsByGroupQuery,
} from "../../overview/hooks";

export function useCaPage() {
  const [classId, setClassIdState] = useState<number | null>(null);
  const [classGroupId, setClassGroupId] = useState<number | null>(null);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [isFiltered, setIsFiltered] = useState(false);
  // key: `${rowKey}_${colName}`, value: raw string so empty fields stay empty
  const [scores, setScores] = useState<Record<string, string>>({});

  const { data: classesData, isLoading: classesLoading } = useGetTeacherClassesQuery();
  const { data: classGroupsData, isLoading: classGroupsLoading } = useGetTeacherClassGroupsQuery();
  const { data: activeTermData } = useGetActiveTermQuery();
  const { data: subjectsData, isLoading: subjectsLoading } = useGetTeacherSubjectsByGroupQuery();

  const academicSessionId = activeTermData?.data?.activeSession?.id;

  const caArg = (() => {
    if (!isFiltered || !classId || !subjectId) return skipToken;
    const a: { classId: number; subjectId: number; classGroupId?: number } = { classId, subjectId };
    if (classGroupId) a.classGroupId = classGroupId;
    return a;
  })();
  const { data: caData, isLoading: caLoading, error: caError } = useGetTeacherCaTemplatesQuery(caArg);
  const [submitCaScores, { isLoading: isSubmitting, isSuccess, reset: resetSubmit }] =
    useSubmitCaScoresMutation();

  const classes = classesData?.data ?? [];
  const allGroups = classGroupsData?.data ?? [];
  const allSubjects = subjectsData?.subjects ?? [];
  
  const filteredGroups = classId ? allGroups.filter((g) => g.classId === classId) : [];
  const filteredSubjects = classId ? allSubjects.filter((s) => s.class.id === classId) : [];

  const responseData = caData?.data;
  const caTemplates = responseData?.cas ?? [];
  const students = responseData?.students ?? [];

  // Unique CA columns
  const caColumns = caTemplates.map((c) => ({ name: c.name, maxScore: c.maxScore }));

  // Prepare rows
  const subjectRows = students.map((s) => {
    const key = `${s.id}-0`;
    return {
      key,
      studentId: s.id,
      registrationNumber: s.registrationNumber || "-",
      studentName: `${s.surname || ""} ${s.name || ""} ${s.otherNames || ""}`.trim() || "-",
      subjectId: caTemplates[0]?.subject?.id ?? 0,
      subjectName: caTemplates[0]?.subject?.name ?? "-",
      templates: caTemplates,
    };
  });

  // Prepopulate scores when data is loaded
  useEffect(() => {
    if (students.length > 0) {
      const initialScores: Record<string, string> = {};
      students.forEach((s) => {
        const key = `${s.id}-0`;
        s.caScores?.forEach((ca) => {
          if (ca.score !== null && ca.score !== undefined) {
            // Use caId to find the exact template name used as the column key
            const template = caTemplates.find((t) => t.id === ca.caId);
            const colKey = template?.name ?? ca.caName;
            initialScores[`${key}_${colKey}`] = String(ca.score);
          }
        });
      });
      setScores(initialScores);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students]);

  // Score helpers
  const setScore = (rowKey: string, colName: string, value: string) => {
    setScores((prev) => ({ ...prev, [`${rowKey}_${colName}`]: value }));
  };

  const getScore = (rowKey: string, colName: string): string =>
    scores[`${rowKey}_${colName}`] ?? "";

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

  const handleSubmit = async () => {
    const termId = activeTermData?.data?.activeTerm?.id;
    if (!academicSessionId || !termId) return;

    // Only send entries where the teacher actually typed a score (non-empty)
    const entries = subjectRows.flatMap((row) =>
      caColumns.flatMap((col) => {
        const template = caTemplates.find((t) => t.name === col.name);
        if (!template) return [];
        const scoreStr = scores[`${row.key}_${col.name}`];
        if (!scoreStr && scoreStr !== "0") return [];
        return [{
          studentId: row.studentId,
          caId: template.id,
          score: Number(scoreStr),
        }];
      })
    );

    const result = await submitCaScores({ academicSessionId, termId, entries });
    if ("data" in result) {
      toast.success(result.data?.message || "CA scores saved successfully.");
    } else {
      const err = result.error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to submit CA scores.");
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
    caTemplates,
    caColumns,
    subjectRows,
    caLoading,
    caError,
    handleFilter,
    handleCancel,
    handleClearFilters,
    hasActiveFilters: !!(classId || classGroupId || subjectId),
    canFilter: !!(classId && subjectId),
    setScore,
    getScore,
    resetScores: () => setScores({}),
    handleSubmit,
    isSubmitting,
    isSuccess,
    resetSubmit,
  };
}
