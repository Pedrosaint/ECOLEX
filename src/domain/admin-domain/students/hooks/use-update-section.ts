/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface UseUpdateSectionProps {
  campusData: any;
  classData: any;
  groupData: any;
  onUpdate: (values: { campusId: string; classId: string; groupId: string }) => void;
}

export function useUpdateSection({
  campusData,
  classData,
  groupData,
  onUpdate,
}: UseUpdateSectionProps) {
  const [campusId, setCampusId] = useState("");
  const [classId, setClassId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filteredClasses = classData?.classes?.filter(
    (cls: any) => !campusId || cls.campusId === Number(campusId)
  );

  const filteredGroups = groupData?.groups?.filter(
    (grp: any) => !classId || grp.classId === Number(classId)
  );

  const getOptions = (data: any, label: string) => [
    { value: "", label },
    ...(data?.map((d: any) => ({ value: String(d.id), label: d.name })) || []),
  ];

  const campusOptions = getOptions(campusData?.campuses, "Select Campus");
  const classOptions = getOptions(filteredClasses, "Select Class");
  const groupOptions = getOptions(filteredGroups, "Select Group");

  const getLabel = (id: string, options: any[]) =>
    options.find((opt) => opt.value === id)?.label || options[0]?.label;

  const handleDropdownSelect = (name: string, value: string) => {
    if (name === "campus") {
      setCampusId(value);
      setClassId("");
      setGroupId("");
    } else if (name === "class") {
      setClassId(value);
      setGroupId("");
    } else if (name === "group") {
      setGroupId(value);
    }
    setOpenDropdown(null);
  };

  const handleUpdate = () => {
    if (!campusId || !classId || !groupId) return;
    onUpdate({ campusId, classId, groupId });
  };

  return {
    campusId,
    classId,
    groupId,
    openDropdown,
    setOpenDropdown,
    campusOptions,
    classOptions,
    groupOptions,
    getLabel,
    handleDropdownSelect,
    handleUpdate,
  };
}
