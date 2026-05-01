import { useState } from "react";
import { useGetClassesQuery, useGetClassGroupsQuery } from "../../classes/hooks";
import { useGetCampusQuery } from "../../campus/hooks";
import { useGetSessionsQuery } from "../../overview/hooks";
import type { ClassSearchParams } from "../types";

interface UseSearchClassProps {
  onSearch: (params: ClassSearchParams) => void;
  isSearching: boolean;
}

export function useSearchClass({ onSearch, isSearching }: UseSearchClassProps) {
  const [campusId, setCampusId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [termId, setTermId] = useState("");
  const [classId, setClassId] = useState("");
  const [classGroupId, setClassGroupId] = useState("");

  const { data: campusData, isLoading: campusLoading } = useGetCampusQuery();
  const { data: sessionsData, isLoading: sessionsLoading } = useGetSessionsQuery();
  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data: groupsData, isLoading: groupsLoading } = useGetClassGroupsQuery({ limit: 1000 });

  const selectedSession = (sessionsData?.data ?? []).find((s) => s.id === Number(sessionId));
  const terms = selectedSession?.terms ?? [];
  const filteredGroups = (groupsData?.groups ?? []).filter((g) => g.classId === Number(classId));

  const canSearch = !!(campusId && sessionId && termId && classId && classGroupId);

  const handleSessionChange = (val: string) => { setSessionId(val); setTermId(""); };
  const handleClassChange = (val: string) => { setClassId(val); setClassGroupId(""); };

  const handleSearch = () => {
    if (!canSearch) return;
    onSearch({
      campusId: Number(campusId),
      sessionId: Number(sessionId),
      termId: Number(termId),
      classId: Number(classId),
      classGroupId: Number(classGroupId),
    });
  };

  return {
    campusId, setCampusId,
    sessionId,
    termId, setTermId,
    classId,
    classGroupId, setClassGroupId,
    campusData, campusLoading,
    sessionsData, sessionsLoading,
    classesData, classesLoading,
    groupsData, groupsLoading,
    terms, filteredGroups,
    canSearch, isSearching,
    handleSessionChange, handleClassChange, handleSearch,
  };
}
