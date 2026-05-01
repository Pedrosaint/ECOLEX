import { useState } from "react";
import { useGetClassesQuery } from "../../classes/api/class-api";
import { useGetClassSubjectsQuery } from "../api/subject.api";

export function useViewClassSubjects() {
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data, isLoading, isError } = useGetClassSubjectsQuery(selectedClassId!, {
    skip: !selectedClassId,
  });

  const selectedClass = classesData?.classes.find(
    (c) => c.id === selectedClassId
  );

  const subjects = data?.data.subjects ?? [];

  const handleClassSelect = (id: number) => {
    setSelectedClassId(id);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen((v) => !v);

  return {
    selectedClassId,
    dropdownOpen,
    classesData,
    classesLoading,
    isLoading,
    isError,
    selectedClass,
    subjects,
    handleClassSelect,
    toggleDropdown,
  };
}
