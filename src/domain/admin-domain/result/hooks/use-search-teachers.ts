import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetSessionsQuery } from "../../overview/hooks";
import { useGetClassesQuery } from "../../classes/hooks";
import { useGetClassSubjectsQuery } from "../../manage-subject/hooks";
import { useGetAllStaffQuery } from "../../staff/hooks";
import { useGetCampusQuery } from "../../campus/hooks";
import type { TeacherSearchParams } from "../types";

interface UseSearchTeachersProps {
  onSearch: (params: TeacherSearchParams) => void;
  isSearching: boolean;
}

export function useSearchTeachers({ onSearch, isSearching }: UseSearchTeachersProps) {
  const [sessionId, setSessionId] = useState("");
  const [termId, setTermId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [campusId, setCampusId] = useState("");

  const { data: sessionsData, isLoading: sessionsLoading } = useGetSessionsQuery();
  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data: staffData, isLoading: staffLoading } = useGetAllStaffQuery({ pageSize: 200 });
  const { data: subjectsData, isLoading: subjectsLoading } = useGetClassSubjectsQuery(
    classId ? Number(classId) : skipToken
  );
  const { data: campusesData, isLoading: campusesLoading } = useGetCampusQuery();

  const selectedSession = (sessionsData?.data ?? []).find((s) => s.id === Number(sessionId));
  const terms = selectedSession?.terms ?? [];
  const subjects = subjectsData?.data?.subjects ?? [];
  const campuses = campusesData?.campuses ?? [];
  const canSearch = !!(sessionId && termId && staffId && classId && subjectId && campusId);

  const handleSessionChange = (val: string) => { setSessionId(val); setTermId(""); };
  const handleClassChange = (val: string) => { setClassId(val); setSubjectId(""); };

  const handleSearch = () => {
    if (!canSearch) return;
    onSearch({
      staffId: Number(staffId),
      classId: Number(classId),
      subjectId: Number(subjectId),
      academicSessionId: Number(sessionId),
      termId: Number(termId),
      campusId: Number(campusId),
    });
  };

  return {
    sessionId, termId, setTermId,
    staffId, setStaffId,
    classId, subjectId, setSubjectId,
    campusId, setCampusId,
    sessionsData, sessionsLoading,
    classesData, classesLoading,
    staffData, staffLoading,
    subjectsLoading, subjects,
    campusesLoading, campuses,
    terms, canSearch, isSearching,
    handleSessionChange, handleClassChange, handleSearch,
  };
}
