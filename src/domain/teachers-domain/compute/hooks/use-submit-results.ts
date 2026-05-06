import { useState } from "react";
import { toast } from "sonner";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetTeacherClassesQuery,
  useGetTeacherClassGroupsQuery,
  useGetActiveTermQuery,
  useSubmitResultsMutation,
  useGetTeacherSubjectsByGroupQuery,
} from "../../overview/hooks";

export function useSubmitResults() {
  const [classId, setClassIdState] = useState<number | null>(null);
  const [classGroupId, setClassGroupIdState] = useState<number | null>(null);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<{ status: string; submittedAt: string } | null>(null);

  const { data: classesData, isLoading: classesLoading } = useGetTeacherClassesQuery();
  const { data: classGroupsData, isLoading: classGroupsLoading } = useGetTeacherClassGroupsQuery();
  const { data: activeTermData } = useGetActiveTermQuery();
  const { data: subjectsData, isLoading: subjectsLoading } = useGetTeacherSubjectsByGroupQuery(
    classId && classGroupId ? { classGroupId, classId } : skipToken
  );
  const [submitResults, { isLoading: isSubmitting, reset }] = useSubmitResultsMutation();

  const classes = classesData?.data ?? [];
  const allGroups = classGroupsData?.data ?? [];
  const filteredGroups = classId ? allGroups.filter((g) => g.classId === classId) : [];

  const subjects = subjectsData?.data?.subject ? [subjectsData.data.subject] : [];

  const setClassId = (id: number | null) => {
    setClassIdState(id);
    setClassGroupIdState(null);
    setSubjectId(null);
    setSubmitted(null);
    reset();
  };

  const setClassGroupId = (id: number | null) => {
    setClassGroupIdState(id);
    setSubjectId(null);
    setSubmitted(null);
  };

  const handleSubmit = async () => {
    const academicSessionId = activeTermData?.data?.activeSession?.id;
    const termId = activeTermData?.data?.activeTerm?.id;
    if (!classId || !subjectId || !academicSessionId || !termId) return;

    const result = await submitResults({ classId, subjectId, academicSessionId, termId });
    if ("data" in result && result.data) {
      toast.success(result.data.message || "Results submitted successfully.");
      setSubmitted({
        status: result.data.data.status,
        submittedAt: result.data.data.submittedAt,
      });
    } else {
      const err = result.error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to submit results.");
    }
  };

  const handleReset = () => {
    setClassIdState(null);
    setClassGroupIdState(null);
    setSubjectId(null);
    setSubmitted(null);
    reset();
  };

  return {
    classId,
    setClassId,
    classGroupId,
    setClassGroupId,
    subjectId,
    setSubjectId,
    classes,
    classesLoading,
    filteredGroups,
    classGroupsLoading,
    subjects,
    subjectsLoading,
    submitted,
    isSubmitting,
    handleSubmit,
    handleReset,
    canSubmit: !!(classId && classGroupId && subjectId),
  };
}
