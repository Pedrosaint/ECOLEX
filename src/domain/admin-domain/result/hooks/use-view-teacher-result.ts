import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { useGetTeacherResultQuery, usePublishResultsMutation } from "./index";
import type { TeacherSearchParams } from "../types";

export function useViewTeacherResult() {
  const [searchParams, setSearchParams] = useState<TeacherSearchParams | null>(null);
  const [page, setPage] = useState(1);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const { data, isFetching, isError } = useGetTeacherResultQuery(
    searchParams ? { ...searchParams, page } : skipToken
  );
  const [publishResults, { isLoading: isPublishing }] = usePublishResultsMutation();

  const result = data?.data;
  const caHeaders = result?.rows?.[0]?.caScores?.map((c) => c.name) ?? [];
  const totalPages = result?.meta?.totalPages ?? 1;

  const handleSearch = (params: TeacherSearchParams) => {
    setSearchParams(params);
    setPage(1);
  };

  const handleApprove = async () => {
    if (!searchParams) return;
    try {
      await publishResults({
        classId: searchParams.classId,
        subjectId: searchParams.subjectId,
        academicSessionId: searchParams.academicSessionId,
        termId: searchParams.termId,
      }).unwrap();
      toast.success("Results published successfully");
    } catch {
      toast.error("Failed to publish results. Please try again.");
    }
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
    result, caHeaders, totalPages,
    isFetching, isError, isPublishing,
    handleSearch, handleApprove, renderPageButtons,
  };
}
