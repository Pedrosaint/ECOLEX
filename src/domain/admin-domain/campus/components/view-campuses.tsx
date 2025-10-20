/* eslint-disable @typescript-eslint/no-explicit-any */
import { Printer, Trash2, ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";
import EditCampus from "../modal/edit-campus.modal";
import CampuseDeleteModal from "../modal/campuse-delete.modal";
import { useGetCampusParamsQuery } from "../api/campus.api";
import { printContent } from "../../../../utils/print-content";

export default function ViewCampuses() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

   const [selectedCampus, setSelectedCampus] = useState<any>(null);

  // ✅ Fetch data with pagination
  const { data, isLoading } = useGetCampusParamsQuery({
    page: currentPage,
    limit: 9,
  });

  const campuses = data?.campuses ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.pages ?? 1;

    const handlePrint = () => {
      if (contentRef.current) {
        printContent(contentRef.current.innerHTML, "All Campuses List");
      }
    };

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="min-h-screen bg-gray-50">
          {/* Print Button */}
          <div className="flex justify-end mt-10">
            <button
              onClick={handlePrint}
              className="bg-[#4B0082] text-white cursor-pointer px-2 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors"
            >
              <Printer size={20} />
              <span>PRINT RECORD</span>
            </button>
          </div>

          {/* Table */}
          <div className="mt-9">
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden p-5"
            >
              <h1 className="text-xl text-gray-900 mb-2 font-inter no-print">
                All Campuses List
              </h1>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                    <tr>
                      <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                        No
                      </th>
                      <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                        Campus Name
                      </th>
                      <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                        Address
                      </th>
                      <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                        Number
                      </th>
                      <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                        Email
                      </th>
                      <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider no-print">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {campuses.length > 0 ? (
                      campuses.map((campus, index) => (
                        <tr key={campus.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-center text-sm text-gray-900 border-r border-gray-200">
                            {(currentPage - 1) * 9 + index + 1}
                          </td>
                          <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                            {campus.name}
                          </td>
                          <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                            {campus.address}
                          </td>
                          <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                            {campus.phoneNumber}
                          </td>
                          <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                            {campus.email}
                          </td>
                          <td className="py-3 px-5 no-print">
                            <div className="flex items-center justify-center space-x-1">
                              <button
                                onClick={() => { 
                                  setIsEditOpen(true);
                                   setSelectedCampus(campus);
                                }}
                                className="p-1 cursor-pointer"
                              >
                                <Edit size={20} className="text-gray-400" />
                              </button>
                              <button
                                onClick={() => setIsDeleteOpen(true)}
                                className="p-1 cursor-pointer"
                              >
                                <Trash2
                                  size={20}
                                  className="text-gray-400 hover:text-red-600"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-6 text-center text-gray-500"
                        >
                          No campuses found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-2 border-t border-gray-200 bg-gray-50 no-print">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * 9 + 1}-
                    {Math.min(currentPage * 9, total)} of {total}
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
            </motion.div>
          </div>

          {isEditOpen && selectedCampus&& <EditCampus onClose={() => setIsEditOpen(false)}  campus={selectedCampus}/>}
          {isDeleteOpen && (
            <CampuseDeleteModal
              isOpen={isDeleteOpen}
              onClose={() => setIsDeleteOpen(false)}
              onConfirm={() => setIsDeleteOpen(false)}
            />
          )}
        </div>
      )}
    </>
  );
}
