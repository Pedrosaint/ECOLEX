import { Printer, ChevronLeft, ChevronRight, Edit, Users } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";
import Print from "../../../../general/common/print";
import EditClass from "../modal/edit-class";
import { useGetClassesQuery } from "../api/class-api";

export default function ViewClass() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  // ✅ Fetch classes from API
  const { data, isLoading } = useGetClassesQuery();

  const classes = data?.classes ?? [];
  const total = data?.count ?? 0;

  // ✅ Frontend pagination setup
  const itemsPerPage = 9;
  const totalPages = Math.ceil(total / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClasses = classes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="min-h-screen bg-gray-50">
          {/* Print Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsPrinting(true)}
              className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer"
            >
              <Printer size={20} />
              <span>PRINT RECORD</span>
            </button>
          </div>

          {/* Table */}
          <div className="mt-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden px-4 xl:px-9 py-4"
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
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          No
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          Campus
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          Custom Classname
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          Class name
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-900 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    {/* <tbody className="divide-y divide-gray-200">
                      {paginatedClasses.length > 0 ? (
                        paginatedClasses.map((classItem, index) => (
                          <tr key={classItem.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-gray-900 border-r border-gray-200 text-center">
                              {startIndex + index + 1}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                              {classItem.campus?.name}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                              {classItem.customName}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                              {classItem.name}
                            </td>
                            <td className="py-3 px-5">
                              <div className="flex items-center justify-center space-x-1">
                                <button
                                  onClick={() => {
                                    setIsEditOpen(true);
                                    setSelectedClassId(classItem.id);
                                  }}
                                  className="p-1 cursor-pointer"
                                >
                                  <Edit
                                    size={20}
                                    className="text-gray-400 hover:text-gray-600"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="py-6 text-center text-gray-500"
                          >
                            No classes found
                          </td>
                        </tr>
                      )}
                    </tbody> */}
                    <tbody className="divide-y divide-gray-200">
                      {paginatedClasses.length > 0 ? (
                        paginatedClasses.map((classItem, index) => (
                          <tr key={classItem.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-gray-900 border-r border-gray-200 text-center">
                              {startIndex + index + 1}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                              {classItem.campus?.name}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                              {classItem.customName}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                              {classItem.name}
                            </td>
                            <td className="py-3 px-5">
                              <div className="flex items-center justify-center space-x-1">
                                <button
                                  onClick={() => {
                                    setIsEditOpen(true);
                                    setSelectedClassId(classItem.id);
                                  }}
                                  className="p-1 cursor-pointer"
                                >
                                  <Edit
                                    size={20}
                                    className="text-gray-400 hover:text-gray-600"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-10">
                            <div className="flex flex-col items-center justify-center text-center space-y-4">
                              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                <Users size={32} />
                              </div>
                              <h3 className="text-lg font-semibold text-gray-800">
                                No Classes Added Yet
                              </h3>
                              <p className="text-sm text-gray-500 max-w-sm">
                                It looks like you haven’t created any classes.
                                Start by adding your first class to organize
                                students and staff better.
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Print Modal */}
                {isPrinting && <Print onClose={() => setIsPrinting(false)} />}

                {/* Pagination */}
                <div className="px-6 py-2 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1}-
                      {Math.min(startIndex + itemsPerPage, total)} of {total}
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
                        {[...Array(totalPages)].map((_, page) => (
                          <button
                            key={page + 1}
                            onClick={() => setCurrentPage(page + 1)}
                            className={`w-8 h-8 rounded text-sm font-semibold transition-colors font-space ${
                              currentPage === page + 1
                                ? "bg-[#8000BD] text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {page + 1}
                          </button>
                        ))}
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

          {isEditOpen && selectedClassId !== null && (
            <EditClass
              onClose={() => setIsEditOpen(false)}
              classId={selectedClassId}
            />
          )}
        </div>
      )}
    </>
  );
}
