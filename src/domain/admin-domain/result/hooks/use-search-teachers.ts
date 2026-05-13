import { useState } from "react";
import { useGetSessionsQuery } from "../../overview/hooks";
import { useGetClassesQuery } from "../../classes/hooks";
import { useGetAllSubjectQuery } from "../../manage-subject/hooks";
import { useGetAllStaffQuery } from "../../staff/hooks";
import type { TeacherSearchParams } from "../types";

interface UseSearchTeachersProps {
  onSearch: (params: TeacherSearchParams) => void;
  isSearching: boolean;
}

export function useSearchTeachers({ onSearch, isSearching }: UseSearchTeachersProps) {
  const [sessionId, setSessionId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [classId, setClassId] = useState("");

  const { data: sessionsData, isLoading: sessionsLoading } = useGetSessionsQuery();
  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data: staffData, isLoading: staffLoading } = useGetAllStaffQuery({ pageSize: 200 });
  const { data: subjectsData, isLoading: subjectsLoading } = useGetAllSubjectQuery();

  const subjects = subjectsData?.subjects ?? [];
  const canSearch = !!(sessionId && staffId && subjectId && classId);

  const handleSessionChange = (val: string) => setSessionId(val);

  const handleSearch = () => {
    if (!canSearch) return;
    onSearch({
      staffId: Number(staffId),
      classId: Number(classId),
      subjectId: Number(subjectId),
      academicSessionId: Number(sessionId),
    });
  };

  return {
    sessionId,
    staffId, setStaffId,
    subjectId, setSubjectId,
    classId, setClassId,
    sessionsData, sessionsLoading,
    classesData, classesLoading,
    staffData, staffLoading,
    subjectsLoading, subjects,
    canSearch, isSearching,
    handleSessionChange, handleSearch,
  };
}
