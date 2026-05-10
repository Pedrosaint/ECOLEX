import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetStudentResultQuery } from "./index";
import type { StudentSearchParams } from "../types";

export function useViewStudentResult() {
  const [searchParams, setSearchParams] = useState<StudentSearchParams | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const { data, isFetching, isError } = useGetStudentResultQuery(
    searchParams
      ? { 
          studentId: searchParams.studentId, 
          classId: searchParams.classId, 
          academicSessionId: searchParams.academicSessionId,
          termId: searchParams.termId 
        }
      : skipToken
  );

  const resultsArray = data?.data?.data ?? [];

  return {
    searchParams, setSearchParams,
    isPrintModalOpen, setIsPrintModalOpen,
    resultsArray,
    isFetching, isError,
  };
}
