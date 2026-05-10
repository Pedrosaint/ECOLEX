import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetTeacherResultQuery } from "./index";
import type { TeacherSearchParams } from "../types";

const PAGE_SIZE = 10;

export function useViewTeacherResult() {
  const [searchParams, setSearchParams] = useState<TeacherSearchParams | null>(null);
  const [page, setPage] = useState(1);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const { data, isFetching, isError } = useGetTeacherResultQuery(
    searchParams ? { ...searchParams, page } : skipToken
  );

  const staffArray = data?.data?.data ?? [];
  const totalCount = data?.data?.pagination?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const handleSearch = (params: TeacherSearchParams) => {
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
    staffArray, totalCount, totalPages, PAGE_SIZE,
    isFetching, isError,
    handleSearch, renderPageButtons,
  };
}
