/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, AnimatePresence } from "framer-motion";
import { Printer, ChevronLeft, ChevronRight, Edit, Trash2, AlertTriangle } from "lucide-react";
import { useRef, useState } from "react";
import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";
import EditSubject from "../modal/edit-subject.modal";
import { useGetAllSubjectQuery, useDeleteSubjectMutation } from "../api/subject.api";
import { printContent } from "../../../../utils/print-content";
import { toast } from "sonner";


export default function ViewSubject() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useGetAllSubjectQuery();
  const [deleteSubject, { isLoading: isDeleting }] = useDeleteSubjectMutation();

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteSubject({ id: deleteTarget.id }).unwrap();
      toast.success("Subject deleted successfully");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete subject");
    }
  };

  const subjects = data?.subjects || [];
  const totalSubjects = data?.count || 0;
  const subjectsPerPage = 9;
  const totalPages = Math.ceil(totalSubjects / subjectsPerPage);

  // Handle pagination manually (client-side)
  const startIndex = (currentPage - 1) * subjectsPerPage;
  const paginatedSubjects = subjects.slice(
    startIndex,
    startIndex + subjectsPerPage
  );

  if (isLoading) return <TableSkeleton />;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-600">
        Failed to load subjects. Please try again later.
      </div>
    );

  const handlePrint = () => {
    if (contentRef.current) {
      printContent(contentRef.current.innerHTML, "All Subject List");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-end mt-5">
        <button
          onClick={handlePrint}
          className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center cursor-pointer space-x-2 text-sm font-semibold transition-colors"
        >
          <Printer size={20} />
          <span>PRINT RECORD</span>
        </button>
      </div>

      <div className="mt-4">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white overflow-hidden p-5"
        >
          <h1 className="text-xl text-gray-900 mb-2 font-inter no-print">
            All Subjects List
          </h1>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                <tr>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Campus
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Subject Name
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Code
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider no-print">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {paginatedSubjects.length > 0 ? (
                  paginatedSubjects.map((subject) => (
                    <tr key={subject.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-center text-sm text-gray-900 border-r border-gray-200">
                        {subject.campus?.name || "-"}
                      </td>
                      <td className="py-3 px-4 text-center text-sm text-gray-900 border-r border-gray-200">
                        {subject.name}
                      </td>
                      <td className="py-3 px-4 text-center text-sm text-gray-900 border-r border-gray-200">
                        {subject.code || "-"}
                      </td>
                      <td className="py-3 px-5 no-print">
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            onClick={() => { setSelectedSubject(subject); setIsEditOpen(true); }}
                            className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                          >
                            <Edit size={18} className="text-gray-400 hover:text-amber-500" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget({ id: subject.id, name: subject.name })}
                            className="p-1 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 size={18} className="text-gray-400 hover:text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No subjects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {isEditOpen && (
            <EditSubject
              onClose={() => setIsEditOpen(false)}
              subjectId={selectedSubject?.id}
              initialName={selectedSubject?.name}
              initialCampusId={selectedSubject?.campusId}
              initialCode={selectedSubject?.code}
            />
          )}

          <AnimatePresence>
            {deleteTarget && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Delete Subject</h2>
                  <p className="text-sm text-gray-500 mb-6">
                    Are you sure you want to delete <span className="font-semibold text-gray-700">"{deleteTarget.name}"</span>? This action cannot be undone.
                  </p>
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={() => setDeleteTarget(null)}
                      disabled={isDeleting}
                      className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex flex-col md:flex-row items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 no-print">
              <p className="text-sm text-gray-600 mb-2 md:mb-0">
                Showing {startIndex + 1}–
                {Math.min(startIndex + subjectsPerPage, totalSubjects)} of{" "}
                {totalSubjects}
              </p>

              <div className="flex items-center space-x-1">
                {/* Previous Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page + 1)}
                    className={`w-8 h-8 rounded text-sm font-semibold transition-colors ${currentPage === page + 1
                      ? "bg-[#8000BD] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {page + 1}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
