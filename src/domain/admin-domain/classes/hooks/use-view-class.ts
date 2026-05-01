import { useRef, useState } from "react";
import { useGetClassesQuery } from "../api/class-api";
import { printContent } from "../../../../utils/print-content";

export function useViewClass() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<{
    id: number;
    name: string;
    customName: string;
  } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (contentRef.current) {
      printContent(contentRef.current.innerHTML, "All Classes List");
    }
  };

  const { data, isLoading } = useGetClassesQuery();

  const classes = data?.classes ?? [];
  const total = data?.count ?? 0;

  const itemsPerPage = 9;
  const totalPages = Math.ceil(total / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClasses = classes.slice(startIndex, startIndex + itemsPerPage);

  const openEdit = (classItem: { id: number; name: string; customName: string }) => {
    setIsEditOpen(true);
    setSelectedClass(classItem);
  };

  const closeEdit = () => setIsEditOpen(false);

  return {
    currentPage,
    setCurrentPage,
    isEditOpen,
    selectedClass,
    contentRef,
    handlePrint,
    isLoading,
    classes,
    total,
    itemsPerPage,
    totalPages,
    startIndex,
    paginatedClasses,
    openEdit,
    closeEdit,
  };
}
