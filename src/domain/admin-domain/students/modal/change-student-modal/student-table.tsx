/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface StudentTableProps {
  data: any;
  selectedStudents: number[];
  setSelectedStudents: React.Dispatch<React.SetStateAction<number[]>>;
  selectAll: boolean;
  setSelectAll: React.Dispatch<React.SetStateAction<boolean>>;
}

const StudentTable: React.FC<StudentTableProps> = ({
  data,
  selectedStudents,
  setSelectedStudents,
  selectAll,
  setSelectAll,
}) => {
  const students = data?.students || [];

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      const allIds = students.map((s: any) => s.id);
      setSelectedStudents(allIds);
    }
    setSelectAll(!selectAll);
  };

  // Handle single select
  const handleSelect = (id: number) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((sid) => sid !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  return (
    <div className="p-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
          <tr className="border-b border-gray-200">
            <th className="p-3 text-left flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="h-4 w-4 accent-[#8000BD]"
              />
              <span className="text-sm sm:text-base sm:rotate-0 -rotate-45 block">
                Mark All
              </span>
            </th>
            <th className="p-3 text-left border border-gray-200">Reg No</th>
            <th className="p-3 text-left border border-gray-200">Surname</th>
            <th className="p-3 text-left border border-gray-200">
              other Names
            </th>
            <th className="p-3 text-left border border-gray-200">Gender</th>
            <th className="p-3 text-left border border-gray-200">
              Current Class
            </th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-12">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#8000BD]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">No students found</p>
                  <p className="text-xs text-gray-400">Try adjusting the campus, class, or group filter.</p>
                </div>
              </td>
            </tr>
          ) : (
            students.map((student: any) => (
              <tr
                key={student.id}
                className="hover:bg-gray-50 transition-colors duration-150 border-t border-gray-200"
              >
                <td className="p-3 border border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleSelect(student.id)}
                    className="h-4 w-4 accent-[#8000BD]"
                  />
                </td>
                <td className="p-3 border border-gray-200 text-gray-700">
                  {student.registrationNumber || "—"}
                </td>
                <td className="p-3 border border-gray-200 text-gray-700">
                  {student.surname || "—"}
                </td>
                <td className="p-3 border border-gray-200 text-gray-700">
                  {student.otherNames || "—"}
                </td>
                <td className="p-3 border border-gray-200 text-gray-700">
                  {student.gender || "—"}
                </td>
                <td className="p-3 border border-gray-200 text-gray-700">
                  {student.class?.name || "—"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {data?.pagination && students.length > 0 && (
        <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
          <span>
            Page {data.pagination.page} of {data.pagination.totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={data.pagination.page <= 1}
              className={`px-3 py-1 rounded border ${
                data.pagination.page <= 1
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-[#8000BD] text-[#8000BD] hover:bg-[#8000BD] hover:text-white"
              }`}
            >
              Prev
            </button>
            <button
              disabled={data.pagination.page >= data.pagination.totalPages}
              className={`px-3 py-1 rounded border ${
                data.pagination.page >= data.pagination.totalPages
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-[#8000BD] text-[#8000BD] hover:bg-[#8000BD] hover:text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
