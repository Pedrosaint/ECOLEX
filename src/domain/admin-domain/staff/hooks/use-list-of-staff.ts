/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDeleteStaffMutation, useGetAllStaffQuery } from "../api/staff-api";
import type { Staff as ApiStaff } from "../model/staff.model";
import { printContent } from "../../../../utils/print-content";

export function useListOfStaff() {
  const [filters, setFilters] = useState({
    campusId: undefined as string | undefined,
    duty: undefined as string | undefined,
    name: undefined as string | undefined,
    page: 1,
    pageSize: 9,
  });

  const [selectedStaffData, setSelectedStaffData] = useState<any>(null);
  const [showTable, setShowTable] = useState(true);
  const [hasFilters, setHasFilters] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isAssignTeacherModalOpen, setIsAssignTeacherModalOpen] = useState(false);
  const [isViewStaffModalOpen, setIsViewStaffModalOpen] = useState(false);
  const [isEditStaffModalOpen, setIsEditStaffModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDeleteStaffModalOpen, setIsDeleteStaffModalOpen] = useState({
    isOpen: false,
    staff: null as ApiStaff | null,
    isLoading: false,
  });

  const [deleteStaff] = useDeleteStaffMutation();
  const { data, error, isLoading, isFetching, refetch } = useGetAllStaffQuery(filters);

  useEffect(() => {
    const handleTabChange = async () => {
      setIsTabLoading(true);
      if (activeTab === "All") {
        setFilters((prev) => ({ ...prev, duty: undefined, page: 1 }));
      } else {
        setFilters((prev) => ({ ...prev, duty: activeTab, page: 1 }));
      }
      setTimeout(() => {
        setIsTabLoading(false);
      }, 500);
    };
    handleTabChange();
  }, [activeTab]);

  const handleDisplayStaff = (newFilters: {
    campusId?: string;
    duty?: string;
    name?: string;
  }) => {
    const hasActiveFilters =
      !!newFilters.campusId || !!newFilters.duty || !!newFilters.name;
    setHasFilters(hasActiveFilters);

    setFilters((prev) => ({
      ...prev,
      campusId: newFilters.campusId,
      duty: newFilters.duty,
      name: newFilters.name,
      classId: undefined,
      subjectId: undefined,
      page: 1,
    }));

    if (hasActiveFilters) {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  };

  const handleClearFilters = () => {
    setHasFilters(false);
    setFilters({
      campusId: undefined,
      duty: undefined,
      name: undefined,
      page: 1,
      pageSize: 9,
    });
    setShowTable(false);
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleEdit = () => {
    setIsViewStaffModalOpen(false);
    setTimeout(() => {
      setIsEditStaffModalOpen(true);
    }, 300);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleteStaffModalOpen((prev) => ({ ...prev, isLoading: true }));
    const staffId = isDeleteStaffModalOpen.staff?.id;
    if (staffId === undefined) {
      toast.error("Staff ID is missing!");
      setIsDeleteStaffModalOpen({ isOpen: false, staff: null, isLoading: false });
      return;
    }
    try {
      await deleteStaff({ id: staffId }).unwrap();
      toast.success("Staff deleted successfully!");
    } catch (error) {
      console.error("Failed to delete staff:", error);
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to delete staff!"
      );
    }
    setTimeout(() => {
      setIsDeleteStaffModalOpen({ isOpen: false, staff: null, isLoading: false });
      refetch();
    }, 1500);
  };

  const handleDeleteCancel = () => {
    setIsDeleteStaffModalOpen({ isOpen: false, staff: null, isLoading: false });
  };

  const isNetworkError = (err: any) => {
    return (
      err?.code === "ERR_NETWORK" ||
      err?.message?.includes("Failed to fetch") ||
      err?.message?.includes("NetworkError")
    );
  };

  const handlePrint = () => {
    if (contentRef.current) {
      printContent(contentRef.current.innerHTML, "All Staff List");
    }
  };

  const tabs = ["All", "Teacher", "Security", "Cleaner", "HR"];

  return {
    filters,
    data,
    error,
    isLoading,
    isFetching,
    selectedStaffData,
    setSelectedStaffData,
    showTable,
    hasFilters,
    selectedStaffId,
    setSelectedStaffId,
    activeTab,
    setActiveTab,
    isTabLoading,
    isAddStaffModalOpen,
    setIsAddStaffModalOpen,
    isAssignTeacherModalOpen,
    setIsAssignTeacherModalOpen,
    isViewStaffModalOpen,
    setIsViewStaffModalOpen,
    isEditStaffModalOpen,
    setIsEditStaffModalOpen,
    contentRef,
    isDeleteStaffModalOpen,
    setIsDeleteStaffModalOpen,
    handleDisplayStaff,
    handleClearFilters,
    handlePageChange,
    handleEdit,
    handleDeleteConfirm,
    handleDeleteCancel,
    isNetworkError,
    handlePrint,
    tabs,
  };
}
