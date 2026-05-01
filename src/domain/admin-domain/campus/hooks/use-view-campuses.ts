import { useRef, useState } from "react";
import { useGetCampusParamsQuery } from "../api/campus.api";
import { printContent } from "../../../../utils/print-content";

export function useViewCampuses() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedCampus, setSelectedCampus] = useState<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetCampusParamsQuery({
    page: currentPage,
    limit: 9,
  });

  const campuses = data?.campuses ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.pages ?? 1;

  const handlePrint = () => {
    if (contentRef.current) {
      printContent(contentRef.current.innerHTML, "All Campuses List");
    }
  };

  const openEdit = (campus: unknown) => {
    setSelectedCampus(campus);
    setIsEditOpen(true);
  };

  const closeEdit = () => setIsEditOpen(false);
  const openDelete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);

  const goToPrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goToPage = (page: number) => setCurrentPage(page);

  return {
    currentPage,
    isEditOpen,
    isDeleteOpen,
    selectedCampus,
    contentRef,
    campuses,
    total,
    totalPages,
    isLoading,
    handlePrint,
    openEdit,
    closeEdit,
    openDelete,
    closeDelete,
    goToPrevPage,
    goToNextPage,
    goToPage,
  };
}
