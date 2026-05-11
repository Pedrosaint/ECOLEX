import { useState } from "react";
import { useGetSessionsQuery } from "../../overview/hooks";
import { useGetAllStudentQuery } from "../../students/hooks";
import type { StudentSearchParams } from "../types";

interface UseSearchStudentProps {
  onSearch: (params: StudentSearchParams) => void;
  isSearching: boolean;
}

export function useSearchStudent({ onSearch, isSearching }: UseSearchStudentProps) {
  const [sessionId, setSessionId] = useState("");
  const [termId, setTermId] = useState("");
  const [studentId, setStudentId] = useState("");

  const { data: sessionsData, isLoading: sessionsLoading } = useGetSessionsQuery();
  const { data: studentsData, isLoading: studentsLoading } = useGetAllStudentQuery({ pageSize: 500 });

  const selectedSession = (sessionsData?.data ?? []).find((s) => s.id === Number(sessionId));
  const terms = selectedSession?.terms ?? [];
  const canSearch = !!(sessionId && termId && studentId);

  const handleSessionChange = (val: string) => { setSessionId(val); setTermId(""); };

  const handleSearch = () => {
    if (!canSearch) return;
    onSearch({
      studentId: Number(studentId),
      academicSessionId: Number(sessionId),
      termId: Number(termId),
    });
  };

  return {
    sessionId, termId, setTermId,
    studentId, setStudentId,
    sessionsData, sessionsLoading,
    studentsData, studentsLoading,
    terms, canSearch, isSearching,
    handleSessionChange, handleSearch,
  };
}
