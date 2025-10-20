import { Printer, ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";
import EditGroup from "../modal/edit-group";
import { useGetClassGroupsQuery } from "../api/class-api";
import { printContent } from "../../../../utils/print-content";

export default function ViewGroup() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (contentRef.current) {
      printContent(contentRef.current.innerHTML, "All Group List");
    }
  };

  const { data, isFetching, isError } = useGetClassGroupsQuery({
    page: currentPage,
    limit: 7,
  });

  const groups = data?.groups ?? [];
  const pagination = data?.pagination;

  return (
    <>
      {isFetching ? (
        <TableSkeleton />
      ) : (
        <div className="min-h-screen bg-gray-50">
          {/* Print Button */}
          <div className="flex justify-end no-print">
            <button
              onClick={handlePrint}
              className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer"
            >
              <Printer size={20} />
              <span>PRINT RECORD</span>
            </button>
          </div>

          <div className="mt-7">
            {/* Table Container */}
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden px-4 py-4 xl:px-6"
            >
              <div className="flex items-center justify-between mb-2 no-print">
                <h1 className="text-xl text-gray-900 mb-2 font-inter">
                  All Group List
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
                          Class Name
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          Group
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-900 uppercase tracking-wider border-r border-gray-200 no-print">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {isError && (
                        <tr>
                          <td
                            colSpan={4}
                            className="text-center py-4 text-red-500"
                          >
                            Failed to load groups
                          </td>
                        </tr>
                      )}

                      {!isError &&
                        groups.map((group, index) => (
                          <tr key={group.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-gray-900 border-r border-gray-200 text-center">
                              {(currentPage - 1) * 7 + (index + 1)}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                              {group.class.name}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 font-semibold border-r border-gray-200 text-center">
                              {group.name}
                            </td>
                            <td className="py-3 px-5 no-print">
                              <div className="flex items-center justify-center space-x-1">
                                <button
                                  onClick={() => {
                                    setIsEditOpen(true);
                                    setSelectedGroupId(group.id);
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
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination && (
                  <div className="px-6 py-2 border-t border-gray-200 bg-gray-50 no-print">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Showing page {pagination.page} of{" "}
                        {pagination.totalPages}
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
                          {[...Array(pagination.totalPages).keys()]
                            .slice(0, 3)
                            .map((page) => (
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
                          <span className="text-gray-400 px-2">...</span>
                          <button
                            onClick={() =>
                              setCurrentPage(pagination.totalPages)
                            }
                            className="w-8 h-8 rounded text-sm font-semibold text-gray-600 hover:bg-gray-100 font-space"
                          >
                            {pagination.totalPages}
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            setCurrentPage(
                              Math.min(pagination.totalPages, currentPage + 1)
                            )
                          }
                          disabled={currentPage === pagination.totalPages}
                          className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {isEditOpen && selectedGroupId !== null && (
            <EditGroup
              onClose={() => setIsEditOpen(false)}
              groupId={selectedGroupId}
              initialClassId={
                groups.find((g) => g.id === selectedGroupId)?.classId ??
                groups.find((g) => g.id === selectedGroupId)?.class.id ??
                0
              }
              initialGroupName={
                groups.find((g) => g.id === selectedGroupId)?.name ?? ""
              }
            />
          )}
        </div>
      )}
    </>
  );
}
