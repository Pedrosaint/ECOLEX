/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { useGetAllStudentQuery, useChangeClassMutation } from "../api/student.api";
import { useGetCampusQuery } from "../../campus/api/campus.api";
import { useGetClassesQuery, useGetClassGroupsQuery } from "../../classes/api/class-api";

interface ChangeStudentFilters {
  campusId: string | undefined;
  classId: string | undefined;
  groupId: string | undefined;
  page: number;
  pageSize: number;
}

export function useChangeStudent() {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const [filters, setFilters] = useState<ChangeStudentFilters>({
    campusId: undefined,
    classId: undefined,
    groupId: undefined,
    page: 1,
    pageSize: 9,
  });

  const { data: campusData, isLoading: isCampusLoading } = useGetCampusQuery();
  const { data: classData, isLoading: isClassLoading } = useGetClassesQuery();
  const { data: groupData, isLoading: isGroupLoading } = useGetClassGroupsQuery({});

  const { data, isLoading, isFetching } = useGetAllStudentQuery(
    isFiltered ? filters : skipToken
  );
  const [changeClass, { isLoading: isUpdating }] = useChangeClassMutation();

  const handleFilter = (newFilters: ChangeStudentFilters) => {
    setFilters(newFilters);
    setIsFiltered(true);
    setSelectedStudents([]);
    setSelectAll(false);
  };

  const handleUpdate = async (updateValues: {
    campusId: string;
    classId: string;
    groupId: string;
  }) => {
    if (selectedStudents.length === 0) {
      toast.warning("Please select at least one student.");
      return;
    }
    try {
      await changeClass({
        studentIds: selectedStudents,
        campusId: Number(updateValues.campusId),
        classId: Number(updateValues.classId),
        groupId: Number(updateValues.groupId),
      }).unwrap();
      toast.success("Students updated successfully!");
      setSelectedStudents([]);
      setSelectAll(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed.");
    }
  };

  return {
    selectedStudents,
    setSelectedStudents,
    selectAll,
    setSelectAll,
    isFiltered,
    filters,
    campusData,
    isCampusLoading,
    classData,
    isClassLoading,
    groupData,
    isGroupLoading,
    data,
    isLoading,
    isFetching,
    isUpdating,
    handleFilter,
    handleUpdate,
  };
}
