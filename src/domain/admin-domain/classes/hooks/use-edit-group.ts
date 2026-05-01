/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useGetClassesQuery, useEditGroupMutation } from "../api/class-api";

interface DropdownOption {
  value: string;
  label: string;
}

interface UseEditGroupProps {
  onClose: () => void;
  groupId: number;
  initialClassId: number;
  initialGroupName: string;
}

export function useEditGroup({
  onClose,
  groupId,
  initialClassId,
  initialGroupName,
}: UseEditGroupProps) {
  const [classId, setClassId] = useState(String(initialClassId));
  const [groupName, setGroupName] = useState(initialGroupName);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const { data } = useGetClassesQuery();
  const classOptions: DropdownOption[] = [
    { value: "", label: "Select Class" },
    ...(data?.classes?.map((c: any) => ({
      value: String(c.id),
      label: c.name,
    })) || []),
  ];

  const getSelectedLabel = (
    value: string,
    options: DropdownOption[]
  ): string => {
    if (!options || options.length === 0) return "";
    const found = options.find((option) => option.value === value);
    return found ? found.label : options[0].label;
  };

  const [editGroup, { isLoading }] = useEditGroupMutation();

  const handleSave = async () => {
    if (!classId || !groupName.trim()) return;
    try {
      await editGroup({
        id: groupId,
        payload: {
          name: groupName,
          classId: Number(classId),
        },
      }).unwrap();

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Failed to update group:", error);
    }
  };

  return {
    classId,
    setClassId,
    groupName,
    setGroupName,
    isDropdownOpen,
    setIsDropdownOpen,
    showSuccess,
    inputRef,
    classOptions,
    isLoading,
    getSelectedLabel,
    handleSave,
  };
}
