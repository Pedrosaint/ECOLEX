import {
  Plus,
  Printer,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";
import { IoEyeOutline } from "react-icons/io5";

type ContextType = {
  showSensitiveData: boolean;
};

export default function ListOfClasses() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { showSensitiveData } = useOutletContext<ContextType>();

   useEffect(() => {
     const timer = setTimeout(() => {
       setIsLoading(false);
     }, 2000);
     return () => clearTimeout(timer);
   }, []);

  // Sample student data matching the image
  const students = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    no: index + 1,
    className: "Class A",
    group: "Group 1",
    campus: "Campus 1",
    noOfStudent: "23",
  }));

  const totalStudents = 223;
  const studentsPerPage = 9;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="min-h-screen bg-gray-50">
          <div className="bg-[#F4A300] px-6 py-3">
            <div className="flex items-center justify-center">
              <Search className="w-5 h-5 mr-2 text-white" />
              <input
                type="text"
                placeholder="DISPLAY CLASS"
                className="bg-transparent placeholder-white text-white font-semibold outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end mt-10">
            <button className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors">
              <Printer size={20} />
              <span>PRINT RECORD</span>
            </button>
          </div>

          <div className="mt-9">
            {/* Top Section */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-4xl font-meduim text-gray-900 mb-1 font-inter">
                  Classes
                </h1>
              </div>
              <div className="flex items-center">
                <button className="bg-[#E8EDF5] text-[#6E6D71] font-inter px-3 py-2 rounded-lg border border-gray-300 shadow-md text-sm font-semibold">
                  <h1>Add Group</h1>
                </button>
                <div className=" text-[#000000] px-2 py-2 rounded-lg text-lg font-medium font-inter transition-colors">
                  <span>Add Class</span>
                </div>
                <div className="bg-white shadow-2xl p-1 rounded-lg border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-[#4b0082] hover:text-white">
                  <Plus size={20} />
                </div>
              </div>
            </div>

            {/* Table Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5 mt-"
            >
              <h1 className="text-xl text-gray-900 mb-2 font-inter">
                All Classes List
              </h1>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                      <tr>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          No
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          Class Name
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          Groups
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          Campus
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          No of Students
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students.map((student, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-center text-sm text-gray-900 border-r border-gray-200">
                            {student.no}
                          </td>
                          <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                            {showSensitiveData
                              ? student.className
                              : "*********"}
                          </td>
                          <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                            {showSensitiveData ? student.group : "*********"}
                          </td>
                          <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                            {showSensitiveData ? student.campus : "*********"}
                          </td>
                          <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                            {showSensitiveData
                              ? student.noOfStudent
                              : "*********"}
                          </td>
                          <td className="py-3 px-5">
                            <div className="flex items-center justify-center space-x-1">
                              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                <IoEyeOutline
                                  size={20}
                                  className="text-gray-400"
                                />
                              </button>
                              {/* <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <Edit size={20} className="text-gray-400" />
                          </button> */}
                              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                <Trash2
                                  size={20}
                                  className="text-gray-400 hover:text-red-600"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-2 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Showing 1-9 of {totalStudents}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <div className="flex items-center space-x-1 font-space">
                        {[1, 2, 3].map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded text-sm font-semibold transition-colors font-space ${
                              currentPage === page
                                ? "bg-[#8000BD] text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <span className="text-gray-400 px-2">...</span>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className="w-8 h-8 rounded text-sm font-semibold text-gray-600 hover:bg-gray-100 font-space"
                        >
                          {totalPages}
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}
