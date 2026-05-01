/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useGetClassesQuery, useAddGroupMutation } from "../api/class-api";

interface GroupForm {
  classId: string;
  groupName: string;
  isClassOpen: boolean;
  isSubmitted: boolean;
  isLoading: boolean;
  isError: boolean;
}

interface DropdownOption {
  value: string;
  label: string;
}

export function useAddGroup() {
  const [groups, setGroups] = useState<GroupForm[]>([
    {
      classId: "",
      groupName: "",
      isClassOpen: false,
      isSubmitted: false,
      isLoading: false,
      isError: false,
    },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const { data } = useGetClassesQuery();
  const [addGroup, { error, isError, isSuccess }] = useAddGroupMutation();

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const classOptions: DropdownOption[] = [
    { value: "", label: "Select Class" },
    ...(data?.classes
      ?.filter((c: any) => c.classGroups?.length === 0)
      ?.map((c: any) => ({
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

  const handleAddGroupRow = () => {
    setGroups([
      ...groups,
      {
        classId: "",
        groupName: "",
        isClassOpen: false,
        isSubmitted: false,
        isLoading: false,
        isError: false,
      },
    ]);
  };

  const handleRemoveGroup = (index: number) => {
    const updated = groups.filter((_, i) => i !== index);
    setGroups(updated);
  };

  const handleChange = <K extends keyof GroupForm>(
    index: number,
    field: K,
    value: GroupForm[K]
  ) => {
    const updated = [...groups];
    updated[index][field] = value;
    setGroups(updated);
  };

  const handleSubmitGroup = async (index: number) => {
    const group = groups[index];
    handleChange(index, "isLoading", true);
    handleChange(index, "isError", false);
    try {
      await addGroup({
        name: group.groupName,
        classId: group.classId,
      }).unwrap();
      handleChange(index, "isSubmitted", true);
      handleChange(index, "isLoading", false);
      console.log("Group added successfully");
    } catch (error) {
      handleChange(index, "isError", true);
      handleChange(index, "isLoading", false);
      console.error("Failed to add group", error);
    }
  };

  return {
    groups,
    showSuccess,
    classOptions,
    error,
    isError,
    getSelectedLabel,
    handleAddGroupRow,
    handleRemoveGroup,
    handleChange,
    handleSubmitGroup,
  };
}
