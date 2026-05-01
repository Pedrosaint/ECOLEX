/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useGetAllStudentQuery } from "../api/student.api";
import { printContent } from "../../../../utils/print-content";

export function useListOfStudent() {
  const [filters, setFilters] = useState({
    campusId: undefined as string | undefined,
    classId: undefined as string | undefined,
    name: undefined as string | undefined,
    classGroupId: undefined as string | undefined,
    gender: undefined as string | undefined,
    page: 1,
    pageSize: 10,
  });

  const [hasFilters, setHasFilters] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [selectedStudentData, setSelectedStudentData] = useState<any>(null);

  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false);
  const [isViewStudentModalOpen, setIsViewStudentModalOpen] = useState(false);
  const [isChangeStudentModalOpen, setIsChangeStudentModalOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetching } = useGetAllStudentQuery(filters);

  useEffect(() => {
    localStorage.removeItem("studentTableRemoved");
  }, []);

  const handleDisplayStudent = (newFilters: {
    campusId?: string;
    classId?: string;
    name?: string;
    classGroupId?: string;
    gender?: string;
  }) => {
    const hasActiveFilters =
      !!newFilters.campusId ||
      !!newFilters.classId ||
      !!newFilters.name ||
      !!newFilters.classGroupId ||
      !!newFilters.gender;
    setHasFilters(hasActiveFilters);

    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  };

  const handleClearFilters = () => {
    setHasFilters(false);
    setFilters({
      campusId: undefined,
      classId: undefined,
      name: undefined,
      classGroupId: undefined,
      gender: undefined,
      page: 1,
      pageSize: 10,
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleEdit = () => {
    setIsViewStudentModalOpen(false);
    setTimeout(() => setIsEditStudentModalOpen(true), 300);
  };

  const handlePrint = () => {
    if (contentRef.current) {
      printContent(contentRef.current.innerHTML, "All Student List");
    }
  };

  return {
    filters,
    data,
    isLoading,
    isFetching,
    hasFilters,
    selectedStudentId,
    setSelectedStudentId,
    selectedStudentData,
    setSelectedStudentData,
    isAddStudentModalOpen,
    setIsAddStudentModalOpen,
    isEditStudentModalOpen,
    setIsEditStudentModalOpen,
    isViewStudentModalOpen,
    setIsViewStudentModalOpen,
    isChangeStudentModalOpen,
    setIsChangeStudentModalOpen,
    contentRef,
    handleDisplayStudent,
    handleClearFilters,
    handlePageChange,
    handleEdit,
    handlePrint,
  };
}
