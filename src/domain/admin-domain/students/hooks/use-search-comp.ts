import { useState, useRef, useEffect } from "react";
import { useGetCampusQuery } from "../../campus/api/campus.api";
import { useGetClassesQuery, useGetClassGroupsQuery } from "../../classes/api/class-api";
import type { Class } from "../../classes/response/get-class.response";
import type { Group } from "../../classes/response/get-group.response";
import type { Campuse } from "../../campus/response/campuse.response";

interface DropdownOption {
  value: string;
  label: string;
}

interface UseSearchCompProps {
  onDisplayStudents: (filters: {
    campusId?: string;
    classId?: string;
    classGroupId?: string;
    gender?: string;
    name?: string;
  }) => void;
  onClearFilters: () => void;
}

export function useSearchComp({ onDisplayStudents, onClearFilters }: UseSearchCompProps) {
  const [campusId, setCampusId] = useState("");
  const [classId, setClassId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [gender, setGender] = useState("");
  const [searchName, setSearchName] = useState("");
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  const campusRef = useRef<HTMLDivElement>(null);
  const classRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);

  const { data: campusData } = useGetCampusQuery();
  const { data: classData } = useGetClassesQuery();
  const { data: groupData } = useGetClassGroupsQuery({});

  const filteredClasses = classData?.classes?.filter(
    (cls: Class) => !campusId || cls.campusId === Number(campusId)
  );

  const filteredGroups = groupData?.groups?.filter(
    (grp: Group) => !classId || grp.classId === Number(classId)
  );

  const campusOptions: DropdownOption[] = [
    { value: "", label: "Select Campus" },
    ...(campusData?.campuses?.map((c: Campuse) => ({
      value: String(c.id),
      label: c.name,
    })) || []),
  ];

  const classOptions: DropdownOption[] = [
    { value: "", label: "Select Class" },
    ...(filteredClasses?.map((c: Class) => ({
      value: String(c.id),
      label: c.name,
    })) || []),
  ];

  const groupOptions: DropdownOption[] = [
    { value: "", label: "Select Group" },
    ...(filteredGroups?.map((g: Group) => ({
      value: String(g.id),
      label: g.name,
    })) || []),
  ];

  const genderOptions: DropdownOption[] = [
    { value: "", label: "Select Gender" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const handleDisplayStudents = () => {
    onDisplayStudents({
      campusId: campusId || undefined,
      classId: classId || undefined,
      classGroupId: groupId || undefined,
      gender: gender || undefined,
      name: searchName || undefined,
    });
  };

  const handleClearFilters = () => {
    setCampusId("");
    setClassId("");
    setGroupId("");
    setGender("");
    setSearchName("");
    onClearFilters();
  };

  const getSelectedLabel = (value: string, options: DropdownOption[]): string => {
    if (!options || options.length === 0) return "";
    const found = options.find((option) => option.value === value);
    return found ? found.label : options[0].label;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (campusRef.current && !campusRef.current.contains(event.target as Node)) {
        setIsCampusOpen(false);
      }
      if (classRef.current && !classRef.current.contains(event.target as Node)) {
        setIsClassOpen(false);
      }
      if (groupRef.current && !groupRef.current.contains(event.target as Node)) {
        setIsGroupOpen(false);
      }
      if (genderRef.current && !genderRef.current.contains(event.target as Node)) {
        setIsGenderOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    campusId,
    setCampusId,
    classId,
    setClassId,
    groupId,
    setGroupId,
    gender,
    setGender,
    searchName,
    setSearchName,
    isCampusOpen,
    setIsCampusOpen,
    isClassOpen,
    setIsClassOpen,
    isGroupOpen,
    setIsGroupOpen,
    isGenderOpen,
    setIsGenderOpen,
    campusRef,
    classRef,
    groupRef,
    genderRef,
    campusOptions,
    classOptions,
    groupOptions,
    genderOptions,
    handleDisplayStudents,
    handleClearFilters,
    getSelectedLabel,
  };
}
