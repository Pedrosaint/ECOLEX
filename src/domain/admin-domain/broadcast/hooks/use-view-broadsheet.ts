import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetBroadsheetQuery } from "../api/broadsheet.api";
import { useGetSessionsQuery } from "../../overview/hooks";
import { useGetClassesQuery } from "../../classes/hooks";
import type { BroadsheetQueryParams } from "../types";

const PAGE_SIZE = 10;

export function useViewBroadsheet() {
  const [academicSessionId, setAcademicSessionId] = useState("");
  const [termId, setTermId] = useState("");
  const [classId, setClassId] = useState("");
  const [searchParams, setSearchParams] = useState<BroadsheetQueryParams | null>(null);

  const { data: sessionsData, isLoading: sessionsLoading } = useGetSessionsQuery();
  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();

  const { data, isFetching, isError } = useGetBroadsheetQuery(
    searchParams ?? skipToken
  );

  const selectedSession = (sessionsData?.data ?? []).find(
    (s) => s.id === Number(academicSessionId)
  );
  const terms = selectedSession?.terms ?? [];

  const canSearch = !!(academicSessionId && termId && classId);

  const handleSessionChange = (val: string) => {
    setAcademicSessionId(val);
    setTermId("");
  };

  const handleSearch = () => {
    if (!canSearch) return;
    setSearchParams({
      classId: Number(classId),
      academicSessionId: Number(academicSessionId),
      termId: Number(termId),
    });
  };

  const broadsheetData = data?.data?.[0] ?? null;

  return {
    academicSessionId, handleSessionChange,
    termId, setTermId,
    classId, setClassId,
    sessionsData, sessionsLoading,
    classesData, classesLoading,
    terms,
    canSearch,
    searchParams,
    broadsheetData,
    PAGE_SIZE,
    isFetching, isError,
    handleSearch,
  };
}
