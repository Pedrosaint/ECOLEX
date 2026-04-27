/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Printer,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
  ArrowLeftRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IoEyeOutline } from "react-icons/io5";

import SearchComp from "./search-comp";
import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";
import { EmptyStudentState } from "./empty-state";


import AddStudentFormModal from "../modal/add-student.modal";
import EditStudentModal from "../modal/edit-student.modal";
import ViewStudentFormModal from "../modal/view-student.modal";
import ChangeStudentModal from "../modal/change-student-modal/change-student.modal";

import { useGetAllStudentQuery } from "../api/student.api";
import type { Student } from "../response/get-student-response";
import { printContent } from "../../../../utils/print-content";

export default function StudentsList() {
  const [filters, setFilters] = useState({
    campusId: undefined as string | undefined,
    classId: undefined as string | undefined,
    name: undefined as string | undefined,
    classGroupId: undefined as string | undefined,
    gender: undefined as string | undefined,
    page: 1,
    pageSize: 10,
  });

  const [hasFilters, setHasFilters] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null
  );
  const [selectedStudentData, setSelectedStudentData] = useState<any>(null);

  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false);
  const [isViewStudentModalOpen, setIsViewStudentModalOpen] = useState(false);
  const [isChangeStudentModalOpen, setIsChangeStudentModalOpen] =
    useState(false);

  // ref for printable content
  const contentRef = useRef<HTMLDivElement>(null);



  //  Data fetching
  const { data, isLoading, isFetching } =
    useGetAllStudentQuery(filters);

  // Clear any legacy removed state from localStorage
  useEffect(() => {
    localStorage.removeItem("studentTableRemoved");
  }, []);



  //  Search handler
  const handleDisplayStudent = (newFilters: {
    campusId?: string;
    classId?: string;
    name?: string;
    classGroupId?: string;
    gender?: string;
  }) => {
    const hasActiveFilters =
      !!newFilters.campusId ||
      !!newFilters.classId ||
      !!newFilters.name ||
      !!newFilters.classGroupId ||
      !!newFilters.gender;
    setHasFilters(hasActiveFilters);

    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  };

  const handleClearFilters = () => {
    setHasFilters(false);
    setFilters({
      campusId: undefined,
      classId: undefined,
      name: undefined,
      classGroupId: undefined,
      gender: undefined,
      page: 1,
      pageSize: 10,
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleEdit = () => {
    setIsViewStudentModalOpen(false);
    setTimeout(() => setIsEditStudentModalOpen(true), 300);
  };

  const handlePrint = () => {
    if (contentRef.current) {
      printContent(contentRef.current.innerHTML, "All Student List");
    }
  };



  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="min-h-screen bg-gray-50">
          <div>
            <SearchComp
              onDisplayStudents={handleDisplayStudent}
              isLoading={isFetching}
              onClearFilters={handleClearFilters}
              hasFilters={hasFilters}
            />
          </div>

          <div className="mt-8">
            {/* Header: title + actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-1 no-print">
              <div>
                <h1 className="text-xl font-bold text-gray-800">Students</h1>
                {data && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {data.meta?.total ?? data.students.length} student{(data.meta?.total ?? data.students.length) !== 1 ? "s" : ""} found
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Printer size={15} />
                  <span className="hidden sm:inline">Print</span>
                </button>
                <button
                  onClick={() => setIsChangeStudentModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#8000BD] text-[#8000BD] text-sm font-medium hover:bg-purple-50 transition-colors cursor-pointer"
                >
                  <ArrowLeftRight size={15} />
                  <span className="hidden sm:inline">Change Student Class</span>
                </button>
                <button
                  onClick={() => setIsAddStudentModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8000BD] text-white text-sm font-semibold hover:bg-[#6a00a1] transition-colors cursor-pointer"
                >
                  <Plus size={15} />
                  <span>New Student</span>
                </button>
              </div>
            </div>

            {/* Table or Empty State */}
            <AnimatePresence mode="wait">
              {data && data.students.length > 0 ? (
                <motion.div
                  ref={contentRef}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white overflow-hidden p-5"
                >
                  <div className="flex items-center justify-between mb-2 no-print">
                    <h1 className="text-xl text-gray-900 font-inter">
                      All Student List
                    </h1>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                        <tr>
                          {[
                            "No",
                            "Campus",
                            "Reg. No",
                            "Surname",
                            "Name",
                            "Other name",
                            "Gender",
                            "DOB",
                            "Guardian Name",
                            "Guardian No.",
                            "Lifestyle",
                            "Class",
                            "Passport",
                            "Action",
                          ].map((th) => (
                            <th
                              key={th}
                              className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200"
                            >
                              {th}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {data.students.map((student: Student, index: number) => (
                          <tr key={student.id} className="hover:bg-gray-50">
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                              {(filters.page - 1) * filters.pageSize +
                                index +
                                1}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                              {student.campus?.name ?? "—"}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                              {student.registrationNumber ?? "—"}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                              {student.surname ?? "—"}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                              {student.name ?? "—"}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                              {student.otherNames ?? "—"}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                              {student.gender ?? "—"}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                              {student.dateOfBirth ?? "—"}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                              {student.guardianName ?? "—"}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                              {student.guardianNumber ?? "—"}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                              {student.lifestyle ?? "—"}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                              {student.class?.name ?? "—"}
                            </td>
                            <td className="py-3 px-2 text-sm border-r border-gray-200">
                              <div className="flex flex-col items-center">
                                <div className="rounded-full flex items-center justify-center w-10 h-10 bg-gray-100 border border-gray-200 overflow-hidden">
                                  {student.passport ? (
                                    <img
                                      src={student.passport}
                                      alt="passport"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <User size={24} className="text-gray-400" />
                                  )}
                                </div>
                                <p className="mt-1 text-[10px] font-medium text-gray-500 uppercase tracking-tight">
                                  Passport
                                </p>
                              </div>
                            </td>

                            <td className="py-3 px-5 no-print">
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => {
                                    setIsViewStudentModalOpen(true);
                                    setSelectedStudentId(student.id);
                                    setSelectedStudentData(student);
                                  }}
                                  className="p-1 transition-colors cursor-pointer"
                                  aria-label={`View ${student.surname}`}
                                >
                                  <IoEyeOutline
                                    size={20}
                                    className="text-gray-400"
                                  />
                                </button>
                                <button
                                  className="p-1 transition-colors cursor-pointer"
                                  aria-label={`Delete ${student.surname}`}
                                >
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
                  {data.meta && data.meta.totalPages > 1 && (
                    <div className="p-3 border-t border-gray-200 bg-gray-50 no-print">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-600">
                          Showing{" "}
                          {(filters.page - 1) * filters.pageSize + 1}-{" "}
                          {Math.min(
                            filters.page * filters.pageSize,
                            data.meta.total
                          )}{" "}
                          of {data.meta.total}
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => handlePageChange(filters.page - 1)}
                            disabled={filters.page === 1}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={() => handlePageChange(filters.page + 1)}
                            disabled={
                              filters.page === data.meta.totalPages
                            }
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <EmptyStudentState />
              )}
            </AnimatePresence>

            {/* === Modals === */}
            {isAddStudentModalOpen && (
              <AddStudentFormModal
                onClose={() => setIsAddStudentModalOpen(false)}
              />
            )}

            {isViewStudentModalOpen && selectedStudentId !== null && (
              <ViewStudentFormModal
                onClose={() => setIsViewStudentModalOpen(false)}
                onEdit={handleEdit}
                studentId={selectedStudentId}
              />
            )}

            {isChangeStudentModalOpen && (
              <ChangeStudentModal
                onClose={() => setIsChangeStudentModalOpen(false)}
              />
            )}

            {isEditStudentModalOpen && selectedStudentId !== null && (
              <EditStudentModal
                onClose={() => setIsEditStudentModalOpen(false)}
                studentId={selectedStudentId}
                initialData={selectedStudentData}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
