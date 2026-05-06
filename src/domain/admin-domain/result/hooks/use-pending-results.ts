import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { useGetSessionsQuery } from "../../overview/hooks";
import { useGetClassesQuery } from "../../classes/hooks";
import { useGetClassSubjectsQuery } from "../../manage-subject/hooks";
import { useGetCampusQuery } from "../../campus/hooks";
import { useGetPendingSubmissionsQuery, usePublishResultsMutation, useRejectResultsMutation } from "../api/grading.api";
import type { PendingSubmission } from "../types";

export function usePendingResults() {
  const [sessionId, setSessionIdState] = useState("");
  const [campusId, setCampusId] = useState("");
  const [classId, setClassIdState] = useState("");
  const [termId, setTermId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeParams, setActiveParams] = useState({});
  const [actioningId, setActioningId] = useState<number | null>(null);

  const { data: sessionsData, isLoading: sessionsLoading } = useGetSessionsQuery();
  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data: subjectsData, isLoading: subjectsLoading } = useGetClassSubjectsQuery(
    classId ? Number(classId) : skipToken
  );
  const { data: campusesData, isLoading: campusesLoading } = useGetCampusQuery();
  const { data, isLoading, isFetching, refetch } = useGetPendingSubmissionsQuery(activeParams, {
    skip: !hasLoaded,
  });
  const [publishResults] = usePublishResultsMutation();
  const [rejectResults] = useRejectResultsMutation();

  const sessions = sessionsData?.data ?? [];
  const terms = sessions.find((s) => s.id === Number(sessionId))?.terms ?? [];
  const classes = classesData?.classes ?? [];
  const subjects = subjectsData?.data?.subjects ?? [];
  const campuses = campusesData?.campuses ?? [];

  const setSessionId = (val: string) => { setSessionIdState(val); setTermId(""); };
  const setClassId = (val: string) => { setClassIdState(val); setSubjectId(""); };

  const submissions: PendingSubmission[] = Array.isArray(data?.data) ? data.data : [];

  const canLoad = !!(campusId && sessionId && termId && classId && subjectId);

  const handleLoad = () => {
    if (!canLoad) return;
    setActiveParams({
      campusId: Number(campusId),
      classId: Number(classId),
      termId: Number(termId),
      subjectId: Number(subjectId),
    });
    setHasLoaded(true);
  };

  const handleClear = () => {
    setSessionIdState("");
    setCampusId("");
    setClassIdState("");
    setTermId("");
    setSubjectId("");
    setHasLoaded(false);
    setActiveParams({});
  };

  const handleApprove = async (sub: PendingSubmission) => {
    setActioningId(sub.id);
    try {
      await publishResults({
        classId: sub.class.id,
        subjectId: sub.subject.id,
        academicSessionId: sub.academicSession.id,
        termId: sub.term.id,
      }).unwrap();
      toast.success("Result approved and published successfully.");
      refetch();
    } catch {
      toast.error("Failed to approve result. Please try again.");
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (sub: PendingSubmission) => {
    setActioningId(sub.id);
    try {
      await rejectResults({
        classId: sub.class.id,
        subjectId: sub.subject.id,
        academicSessionId: sub.academicSession.id,
      }).unwrap();
      toast.success("Result rejected successfully.");
      refetch();
    } catch {
      toast.error("Failed to reject result. Please try again.");
    } finally {
      setActioningId(null);
    }
  };

  return {
    sessionId, setSessionId,
    termId, setTermId,
    classId, setClassId,
    subjectId, setSubjectId,
    campusId, setCampusId,
    sessions, sessionsLoading,
    terms,
    classes, classesLoading,
    subjects, subjectsLoading,
    campuses, campusesLoading,
    hasLoaded,
    submissions,
    isLoading: isLoading || isFetching,
    actioningId,
    canLoad,
    handleLoad,
    handleClear,
    handleApprove,
    handleReject,
  };
}
