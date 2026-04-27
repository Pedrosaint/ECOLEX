/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { X } from "lucide-react";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { useGetAllStudentQuery, useChangeClassMutation } from "../../api/student.api";
import { useGetCampusQuery } from "../../../campus/api/campus.api";
import { useGetClassesQuery, useGetClassGroupsQuery } from "../../../classes/api/class-api";
import FilterSection from "./filter-section";
import UpdateSection from "./update-section";
import StudentTable from "./student-table"
import DotLoader from "../../../../../general/ui/dot-loader";
import students from "../../../../../assets/image/emptystate_filter.png";

const ChangeStudentModal = ({ onClose }: { onClose: () => void }) => {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const [filters, setFilters] = useState({
    campusId: undefined as string | undefined,
    classId: undefined as string | undefined,
    groupId: undefined as string | undefined,
    page: 1,
    pageSize: 9,
  });

  const { data: campusData, isLoading: isCampusLoading } = useGetCampusQuery();
  const { data: classData, isLoading: isClassLoading } = useGetClassesQuery();
  const { data: groupData, isLoading: isGroupLoading } = useGetClassGroupsQuery({});

  const { data, isLoading, isFetching } = useGetAllStudentQuery(isFiltered ? filters : skipToken);
  const [changeClass, { isLoading: isUpdating }] = useChangeClassMutation();

  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setIsFiltered(true);
    setSelectedStudents([]);
    setSelectAll(false);
  };

  const handleUpdate = async (updateValues: { campusId: string; classId: string; groupId: string }) => {
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Change Student Class</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X />
          </button>
        </div>

        {/* Filter Section */}
        <FilterSection
          campusData={campusData}
          classData={classData}
          groupData={groupData}
          isCampusLoading={isCampusLoading}
          isClassLoading={isClassLoading}
          isGroupLoading={isGroupLoading}
          onFilter={handleFilter}
          isLoading={isLoading || isFetching}
        />

        {/* Conditional display */}
        {!isFiltered ? (
          <>
            <div className="w-[100px] h-[100px] mx-auto my-10">
              <img src={students} alt="" className="" />
            </div>
            <p className="text-center text-lg font-semibold">Oops! No result was found</p>
            <p className="text-center text-gray-500 text-sm mb-9">Please select a campus, class, and group to view students.</p>
          </>
        ) : isLoading || isFetching ? (
          <div className="text-center py-10 text-gray-500 flex justify-center">
            <DotLoader />
          </div>
        ) : (
          <>
            {/* Update Section */}
            <UpdateSection
              campusData={campusData}
              classData={classData}
              groupData={groupData}
              onUpdate={handleUpdate}
              isUpdating={isUpdating}
            />

            {/* Table Section */}
            <StudentTable
              data={data}
              selectedStudents={selectedStudents}
              setSelectedStudents={setSelectedStudents}
              selectAll={selectAll}
              setSelectAll={setSelectAll}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ChangeStudentModal;
