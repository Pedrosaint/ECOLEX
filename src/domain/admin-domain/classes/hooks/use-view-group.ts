import { useRef, useState } from "react";
import { useGetClassGroupsQuery } from "../api/class-api";
import { printContent } from "../../../../utils/print-content";

export function useViewGroup() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (contentRef.current) {
      printContent(contentRef.current.innerHTML, "All Group List");
    }
  };

  const { data, isFetching, isError } = useGetClassGroupsQuery({
    page: currentPage,
    limit: 7,
  });

  const groups = data?.groups ?? [];
  const pagination = data?.pagination;

  const openEdit = (groupId: number) => {
    setIsEditOpen(true);
    setSelectedGroupId(groupId);
  };

  const closeEdit = () => setIsEditOpen(false);

  const getSelectedGroup = () =>
    groups.find((g) => g.id === selectedGroupId) ?? null;

  return {
    isEditOpen,
    currentPage,
    setCurrentPage,
    selectedGroupId,
    contentRef,
    handlePrint,
    isFetching,
    isError,
    groups,
    pagination,
    openEdit,
    closeEdit,
    getSelectedGroup,
  };
}
