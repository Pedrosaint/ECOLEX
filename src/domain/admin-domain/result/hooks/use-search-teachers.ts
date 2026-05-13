import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetSessionsQuery } from "../../overview/hooks";
import { useGetAllStaffQuery, useGetStaffQuery } from "../../staff/hooks";
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
  const { data: staffData, isLoading: staffLoading } = useGetAllStaffQuery({ pageSize: 200 });
  const { data: staffDetail, isLoading: staffDetailLoading } = useGetStaffQuery(
    staffId ? { id: Number(staffId) } : skipToken
  );

  const assignments = staffDetail?.staff?.assignments ?? [];

  // Unique subjects this teacher is assigned to
  const teacherSubjects = assignments
    .map((a) => a.subject)
    .filter((s, i, arr) => arr.findIndex((x) => x.id === s.id) === i);

  // Classes for this teacher filtered by the selected subject
  const teacherClasses = subjectId
    ? assignments
        .filter((a) => a.subjectId === Number(subjectId))
        .map((a) => a.class)
        .filter((c, i, arr) => arr.findIndex((x) => x.id === c.id) === i)
    : [];

  const canSearch = !!(sessionId && staffId && subjectId && classId);

  const handleSessionChange = (val: string) => setSessionId(val);

  const handleStaffChange = (val: string) => {
    setStaffId(val);
    setSubjectId("");
    setClassId("");
  };

  const handleSubjectChange = (val: string) => {
    setSubjectId(val);
    setClassId("");
  };

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
    staffId,
    subjectId,
    classId, setClassId,
    sessionsData, sessionsLoading,
    staffData, staffLoading,
    staffDetailLoading,
    teacherSubjects,
    teacherClasses,
    canSearch, isSearching,
    handleSessionChange, handleStaffChange, handleSubjectChange, handleSearch,
  };
}
