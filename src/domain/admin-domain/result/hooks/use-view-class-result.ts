import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetBroadsheetQuery } from "./index";
import type { ClassSearchParams } from "../types";

const PAGE_SIZE = 10;

export function useViewClassResult() {
  const [searchParams, setSearchParams] = useState<ClassSearchParams | null>(null);
  const [page, setPage] = useState(1);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const { data, isFetching, isError } = useGetBroadsheetQuery(searchParams ?? skipToken);

  const broadsheet = data?.data;
  const allRows = broadsheet?.rows ?? [];
  const totalPages = Math.max(1, Math.ceil(allRows.length / PAGE_SIZE));
  const paginatedRows = allRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (params: ClassSearchParams) => {
    setSearchParams(params);
    setPage(1);
  };

  const renderPageButtons = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return {
    searchParams,
    page, setPage,
    isPrintModalOpen, setIsPrintModalOpen,
    broadsheet, allRows, paginatedRows,
    totalPages, PAGE_SIZE,
    isFetching, isError,
    handleSearch, renderPageButtons,
  };
}
