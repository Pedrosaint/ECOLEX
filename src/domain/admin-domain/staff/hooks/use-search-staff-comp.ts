/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useGetCampusQuery } from "../../campus/api/campus.api";

interface DropdownOption {
  value: string;
  label: string;
}

interface UseSearchStaffCompProps {
  onDisplayStaff: (filters: {
    campusId?: string;
    duty?: string;
    name?: string;
  }) => void;
  onClearFilters: () => void;
}

export function useSearchStaffComp({
  onDisplayStaff,
  onClearFilters,
}: UseSearchStaffCompProps) {
  const [campusId, setCampusId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [duty, setDuty] = useState("");
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [isDutyOpen, setIsDutyOpen] = useState(false);
  const campusRef = useRef<HTMLDivElement>(null);
  const dutyRef = useRef<HTMLDivElement>(null);

  const { data } = useGetCampusQuery();
  const campusOptions: DropdownOption[] = [
    { value: "", label: "Select Campus" },
    ...(data?.campuses?.map((c: any) => ({
      value: String(c.id),
      label: c.name,
    })) || []),
  ];

  const dutyOptions: DropdownOption[] = [
    { value: "", label: "Select Duty" },
    { value: "Teacher", label: "Teacher" },
    { value: "Security", label: "Security" },
    { value: "Cleaner", label: "Cleaner" },
    { value: "HR", label: "HR" },
  ];

  const handleDisplayStaff = () => {
    onDisplayStaff({
      campusId: campusId || undefined,
      duty: duty || undefined,
      name: searchName || undefined,
    });
  };

  const handleClearFilters = () => {
    setCampusId("");
    setSearchName("");
    setDuty("");
    onClearFilters();
  };

  const getSelectedLabel = (value: string, options: DropdownOption[]): string => {
    if (!options || options.length === 0) return "";
    const found = options.find((option) => option.value === value);
    return found ? found.label : options[0].label;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        campusRef.current &&
        !campusRef.current.contains(event.target as Node)
      ) {
        setIsCampusOpen(false);
      }
      if (dutyRef.current && !dutyRef.current.contains(event.target as Node)) {
        setIsDutyOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    campusId,
    setCampusId,
    searchName,
    setSearchName,
    duty,
    setDuty,
    isCampusOpen,
    setIsCampusOpen,
    isDutyOpen,
    setIsDutyOpen,
    campusRef,
    dutyRef,
    campusOptions,
    dutyOptions,
    handleDisplayStaff,
    handleClearFilters,
    getSelectedLabel,
  };
}
