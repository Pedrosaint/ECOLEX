import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetSessionsQuery } from "../../overview/hooks";
import { useGetClassesQuery } from "../../classes/hooks";
import { useGetAllStudentQuery } from "../../students/hooks";
import type { StudentSearchParams } from "../types";

interface UseSearchStudentProps {
  onSearch: (params: StudentSearchParams) => void;
  isSearching: boolean;
}

export function useSearchStudent({ onSearch, isSearching }: UseSearchStudentProps) {
  const [sessionId, setSessionId] = useState("");
  const [termId, setTermId] = useState("");
  const [classId, setClassId] = useState("");
  const [studentId, setStudentId] = useState("");

  const { data: sessionsData, isLoading: sessionsLoading } = useGetSessionsQuery();
  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data: studentsData, isLoading: studentsLoading } = useGetAllStudentQuery(
    classId ? { classId, pageSize: 200 } : skipToken
  );

  const selectedSession = (sessionsData?.data ?? []).find((s) => s.id === Number(sessionId));
  const terms = selectedSession?.terms ?? [];
  const canSearch = !!(sessionId && termId && classId && studentId);

  const handleSessionChange = (val: string) => { setSessionId(val); setTermId(""); };
  const handleClassChange = (val: string) => { setClassId(val); setStudentId(""); };

  const handleSearch = () => {
    if (!canSearch) return;
    onSearch({
      studentId: Number(studentId),
      classId: Number(classId),
      academicSessionId: Number(sessionId),
      termId: Number(termId),
    });
  };

  return {
    sessionId, termId, setTermId,
    classId, studentId, setStudentId,
    sessionsData, sessionsLoading,
    classesData, classesLoading,
    studentsData, studentsLoading,
    terms, canSearch, isSearching,
    handleSessionChange, handleClassChange, handleSearch,
  };
}
