import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import {
  useGetTeacherClassesQuery,
  useGetTeacherClassGroupsQuery,
  useGetTeacherCaTemplatesQuery,
  useGetActiveTermQuery,
  useSubmitCaScoresMutation,
} from "../../overview/hooks";

export function useCaPage() {
  const [classId, setClassIdState] = useState<number | null>(null);
  const [classGroupId, setClassGroupId] = useState<number | null>(null);
  const [isFiltered, setIsFiltered] = useState(false);
  // key: `${rowKey}_${colName}`, value: raw string so empty fields stay empty
  const [scores, setScores] = useState<Record<string, string>>({});

  const { data: classesData, isLoading: classesLoading } = useGetTeacherClassesQuery();
  const { data: classGroupsData, isLoading: classGroupsLoading } = useGetTeacherClassGroupsQuery();
  const { data: activeTermData } = useGetActiveTermQuery();
  const { data: caData, isLoading: caLoading, error: caError } = useGetTeacherCaTemplatesQuery(
    isFiltered && classId && classGroupId ? { classId, classGroupId } : skipToken
  );
  const [submitCaScores, { isLoading: isSubmitting, isSuccess, reset: resetSubmit }] =
    useSubmitCaScoresMutation();

  const classes = classesData?.data ?? [];
  const allGroups = classGroupsData?.data ?? [];
  const filteredGroups = classId ? allGroups.filter((g) => g.classId === classId) : [];
  const caTemplates = caData?.data ?? [];

  // Unique CA columns across all templates (CA1, CA2, CA3…)
  const caColumns = Array.from(
    new Map(caTemplates.map((c) => [c.name, { name: c.name, maxScore: c.maxScore }])).values()
  );

  // Group by student+subject. Once backend adds studentId each student gets their own rows.
  const rowMap = new Map<string, {
    key: string;
    studentId: number | undefined;
    registrationNumber: string;
    studentName: string;
    subjectId: number;
    subjectName: string;
    templates: typeof caTemplates;
  }>();

  caTemplates.forEach((t) => {
    const key = `${t.studentId ?? "none"}-${t.subjectId}`;
    if (!rowMap.has(key)) {
      rowMap.set(key, {
        key,
        studentId: t.studentId,
        registrationNumber: t.registrationNumber || "-",
        studentName: t.studentName || "-",
        subjectId: t.subjectId,
        subjectName: t.subject.name,
        templates: [],
      });
    }
    rowMap.get(key)!.templates.push(t);
  });

  const subjectRows = Array.from(rowMap.values());

  // Score helpers — store as string so empty fields stay empty
  const setScore = (rowKey: string, colName: string, value: string) => {
    setScores((prev) => ({ ...prev, [`${rowKey}_${colName}`]: value }));
  };

  const getScore = (rowKey: string, colName: string): string =>
    scores[`${rowKey}_${colName}`] ?? "";

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

  const handleSubmit = async () => {
    const academicSessionId = activeTermData?.data?.activeSession?.id;
    const termId = activeTermData?.data?.activeTerm?.id;
    if (!academicSessionId || !termId) return;

    // Only send entries where the teacher actually typed a score (non-empty)
    const entries = subjectRows.flatMap((row) =>
      caColumns.flatMap((col) => {
        const template = row.templates.find((t) => t.name === col.name);
        if (!template) return [];
        const scoreStr = scores[`${row.key}_${col.name}`];
        if (!scoreStr && scoreStr !== "0") return [];
        return [{
          studentId: row.studentId ?? 0,
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
    isFiltered,
    classes,
    classesLoading,
    filteredGroups,
    classGroupsLoading,
    caTemplates,
    caColumns,
    subjectRows,
    caLoading,
    caError,
    handleFilter,
    handleCancel,
    handleClearFilters,
    hasActiveFilters: !!(classId || classGroupId),
    canFilter: !!(classId && classGroupId),
    setScore,
    getScore,
    resetScores: () => setScores({}),
    handleSubmit,
    isSubmitting,
    isSuccess,
    resetSubmit,
  };
}
