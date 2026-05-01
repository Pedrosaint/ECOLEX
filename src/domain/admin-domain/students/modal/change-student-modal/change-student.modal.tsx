import { X } from "lucide-react";
import { useChangeStudent } from "../../hooks";
import FilterSection from "./filter-section";
import UpdateSection from "./update-section";
import StudentTable from "./student-table";
import students from "../../../../../assets/image/emptystate_filter.png";

const ChangeStudentModal = ({ onClose }: { onClose: () => void }) => {
  const {
    selectedStudents,
    setSelectedStudents,
    selectAll,
    setSelectAll,
    isFiltered,
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
  } = useChangeStudent();

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
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
            <div className="w-10 h-10 border-4 border-[#8000BD] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-gray-500">Fetching students...</p>
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
