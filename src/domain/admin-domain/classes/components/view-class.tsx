import {
  Printer,
  ChevronLeft,
  ChevronRight,
  Edit,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";


export default function ViewClass() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);


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
    classCategory: "junior secondary school",
    claaName: "JSS 1",
    addedBy: "Admin",

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
          <div className="flex justify-end mt-10">
            <button className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors">
              <Printer size={20} />
              <span>PRINT RECORD</span>
            </button>
          </div>
          <div className="mt-7">
            {/* Table Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden px-4 md:px-17 py-4 md:py-10"
            >
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl text-gray-900 mb-2 font-inter">
                  All Classes List
                </h1>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                      <tr>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          No
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          Class Category
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          Class Name
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          Added By
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students.map((student, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900 border-r border-gray-200 text-center">
                            {student.no}
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                            {student.classCategory}
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                            {student.claaName}
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600 font-semibold border-r border-gray-200 text-center">
                            {student.addedBy}
                          </td>
                          <td className="py-3 px-5">
                            <div className="flex items-center justify-center space-x-1">
                              <button className="p-1 transition-colors">
                                <Edit
                                  size={20}
                                  className="text-gray-400 hover:text-gray-600"
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