import { useState } from "react";
import { toast } from "sonner";
import { useGetClassesQuery } from "../../classes/api/class-api";
import { useGetClassSubjectsQuery, useDeleteClassSubjectMutation } from "../api/subject.api";

export function useViewClassSubjects() {
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ subjectId: number; subjectName: string } | null>(null);

  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data, isLoading, isError } = useGetClassSubjectsQuery(selectedClassId!, {
    skip: !selectedClassId,
  });
  const [deleteClassSubject, { isLoading: isDeleting }] = useDeleteClassSubjectMutation();

  const selectedClass = classesData?.classes.find((c) => c.id === selectedClassId);
  const subjects = data?.data.subjects ?? [];

  const handleClassSelect = (id: number) => {
    setSelectedClassId(id);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen((v) => !v);

  const handleDeleteConfirm = async () => {
    if (!confirmDelete || !selectedClassId) return;
    try {
      const res = await deleteClassSubject({ classId: selectedClassId, subjectId: confirmDelete.subjectId }).unwrap();
      toast.success(res.message || "Subject removed from class");
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to remove subject");
    } finally {
      setConfirmDelete(null);
    }
  };

  return {
    selectedClassId,
    dropdownOpen,
    classesData,
    classesLoading,
    isLoading,
    isError,
    selectedClass,
    subjects,
    confirmDelete,
    isDeleting,
    setConfirmDelete,
    handleClassSelect,
    toggleDropdown,
    handleDeleteConfirm,
  };
}
