/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { useGetAllSubjectQuery, useDeleteSubjectMutation } from "../api/subject.api";
import { printContent } from "../../../../utils/print-content";
import { toast } from "sonner";

export function useViewSubject() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useGetAllSubjectQuery();
  const [deleteSubject, { isLoading: isDeleting }] = useDeleteSubjectMutation();

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteSubject({ id: deleteTarget.id }).unwrap();
      toast.success("Subject deleted successfully");
      setDeleteTarget(null);
    } catch (error) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to delete subject"
      );
    }
  };

  const handlePrint = () => {
    if (contentRef.current) {
      printContent(contentRef.current.innerHTML, "All Subject List");
    }
  };

  const subjects = data?.subjects || [];
  const totalSubjects = data?.count || 0;
  const subjectsPerPage = 9;
  const totalPages = Math.ceil(totalSubjects / subjectsPerPage);
  const startIndex = (currentPage - 1) * subjectsPerPage;
  const paginatedSubjects = subjects.slice(startIndex, startIndex + subjectsPerPage);

  const openEdit = (subject: any) => {
    setSelectedSubject(subject);
    setIsEditOpen(true);
  };

  const closeEdit = () => setIsEditOpen(false);

  return {
    currentPage,
    setCurrentPage,
    isEditOpen,
    selectedSubject,
    deleteTarget,
    setDeleteTarget,
    contentRef,
    data,
    isLoading,
    isError,
    isDeleting,
    handleDelete,
    handlePrint,
    subjects,
    totalSubjects,
    subjectsPerPage,
    totalPages,
    startIndex,
    paginatedSubjects,
    openEdit,
    closeEdit,
  };
}
