import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetBroadsheetQuery } from "./index";
import type { ClassSearchParams } from "../types";

const PAGE_SIZE = 10;

export function useViewClassResult() {
  const [searchParams, setSearchParams] = useState<ClassSearchParams | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const { data, isFetching, isError } = useGetBroadsheetQuery(searchParams ?? skipToken);

  const broadsheetDataArray = data?.data ?? [];

  const handleSearch = (params: ClassSearchParams) => {
    setSearchParams(params);
  };

  return {
    searchParams,
    isPrintModalOpen, setIsPrintModalOpen,
    broadsheetDataArray,
    PAGE_SIZE,
    isFetching, isError,
    handleSearch,
  };
}
