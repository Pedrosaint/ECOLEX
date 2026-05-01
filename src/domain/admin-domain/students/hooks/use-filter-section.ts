/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface FilterValues {
  campusId: string | undefined;
  classId: string | undefined;
  groupId: string | undefined;
  page: number;
  pageSize: number;
}

interface UseFilterSectionProps {
  campusData: any;
  classData: any;
  groupData: any;
  onFilter: (filters: FilterValues) => void;
}

export function useFilterSection({
  campusData,
  classData,
  groupData,
  onFilter,
}: UseFilterSectionProps) {
  const [campusId, setCampusId] = useState("");
  const [classId, setClassId] = useState("");
  const [groupId, setGroupId] = useState("");

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

  const handleFilterClick = () => {
    if (!campusId && !classId && !groupId) return;
    onFilter({
      campusId: campusId || undefined,
      classId: classId || undefined,
      groupId: groupId || undefined,
      page: 1,
      pageSize: 9,
    });
  };

  return {
    campusId,
    setCampusId,
    classId,
    setClassId,
    groupId,
    setGroupId,
    campusOptions,
    classOptions,
    groupOptions,
    handleFilterClick,
  };
}
