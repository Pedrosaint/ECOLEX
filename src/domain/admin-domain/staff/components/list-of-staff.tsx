/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Plus,
  Printer,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Edit,
  UserPlus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoEyeOutline } from "react-icons/io5";
import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";
import AddStaffFormModal from "../modal/add-staff.modal";
import AssignStaffModal from "../modal/assign-teacher.modal";
import ViewStaffModal from "../modal/view-staff.modal";
import EditStaffModal from "../modal/edit-staff.modal";
import DeleteStaffModal from "../modal/delete-staff.modal";
import SearchStaffComp from "../components/search-staff-comp";
import { useDeleteStaffMutation, useGetAllStaffQuery } from "../api/staff-api";


// Remove the mock Staff type and use your actual interface
import type { Staff as ApiStaff } from "../model/staff.model";
import { toast } from "sonner";
import EmptyStaffData from "./empty-staff-data";
import NetworkError from "./network-error";
import { printContent } from "../../../../utils/print-content";

export default function ListOfStaff() {
  const [filters, setFilters] = useState({
    campusId: undefined as string | undefined,
    duty: undefined as string | undefined,
    name: undefined as string | undefined,
    page: 1,
    pageSize: 9,
  });

  const [selectedStaffData, setSelectedStaffData] = useState<any>(null);
  const [showTable, setShowTable] = useState(true);
  const [hasFilters, setHasFilters] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isAssignTeacherModalOpen, setIsAssignTeacherModalOpen] =
    useState(false);
  const [isViewStaffModalOpen, setIsViewStaffModalOpen] = useState(false);
  const [isEditStaffModalOpen, setIsEditStaffModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDeleteStaffModalOpen, setIsDeleteStaffModalOpen] = useState({
    isOpen: false,
    staff: null as ApiStaff | null,
    isLoading: false,
  });

  const [deleteStaff] = useDeleteStaffMutation();
  const { data, error, isLoading, isFetching, refetch } =
    useGetAllStaffQuery(filters);

  // Handle tab changes - they filter by duty
  useEffect(() => {
    const handleTabChange = async () => {
      setIsTabLoading(true);

      if (activeTab === "All") {
        setFilters((prev) => ({ ...prev, duty: undefined, page: 1 }));
      } else {
        setFilters((prev) => ({ ...prev, duty: activeTab, page: 1 }));
      }
      setTimeout(() => {
        setIsTabLoading(false);
      }, 500);
    };

    handleTabChange();
  }, [activeTab]);

const handleDisplayStaff = (newFilters: {
  campusId?: string;
  duty?: string;
  name?: string;
}) => {
  const hasActiveFilters =
    !!newFilters.campusId || !!newFilters.duty || !!newFilters.name;
  setHasFilters(hasActiveFilters);

  setFilters((prev) => ({
    ...prev,
    campusId: newFilters.campusId,
    duty: newFilters.duty,
    name: newFilters.name,
    classId: undefined,
    subjectId: undefined,
    page: 1,
  }));

  // ✅ When user filters, show table again
  if (hasActiveFilters) {
    setShowTable(true);
  } else {
    setShowTable(false);
  }
};

const handleClearFilters = () => {
  setHasFilters(false);
  setFilters({
    campusId: undefined,
    duty: undefined,
    name: undefined,
    page: 1,
    pageSize: 9,
  });


  setShowTable(false);
};


  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleEdit = () => {
    setIsViewStaffModalOpen(false);
    setTimeout(() => {
      setIsEditStaffModalOpen(true);
    }, 300);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleteStaffModalOpen((prev) => ({ ...prev, isLoading: true }));
    const staffId = isDeleteStaffModalOpen.staff?.id;
    if (staffId === undefined) {
      toast.error("Staff ID is missing!");
      setIsDeleteStaffModalOpen({
        isOpen: false,
        staff: null,
        isLoading: false,
      });
      return;
    }
    try {
      await deleteStaff({ id: staffId }).unwrap();
      toast.success("Staff deleted successfully!");
    } catch (error) {
      console.error("Failed to delete staff:", error);
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to delete staff!");
    }
    setTimeout(() => {
      setIsDeleteStaffModalOpen({
        isOpen: false,
        staff: null,
        isLoading: false,
      });
      refetch();
    }, 1500);
  };

  const handleDeleteCancel = () => {
    setIsDeleteStaffModalOpen({
      isOpen: false,
      staff: null,
      isLoading: false,
    });
  };

  const isNetworkError = (err: any) => {
    return (
      err?.code === "ERR_NETWORK" ||
      err?.message?.includes("Failed to fetch") ||
      err?.message?.includes("NetworkError")
    );
  };

  const tabs = ["All", "Teacher", "Security", "Cleaner", "HR"];

    const handlePrint = () => {
      if (contentRef.current) {
        printContent(contentRef.current.innerHTML, "All Staff List");
      }
    };

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="min-h-screen bg-gray-50">
          <div className="">
            <SearchStaffComp
              onDisplayStaff={handleDisplayStaff}
              isLoading={isFetching}
              onClearFilters={handleClearFilters}
              hasFilters={hasFilters}
            />
          </div>

          <div className="mt-5">
            {/* Header: title + actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-1">
              <div>
                <h1 className="text-xl font-bold text-gray-800">Staff Management</h1>
                {data && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {data.pagination?.total ?? data.staff.length} staff member{(data.pagination?.total ?? data.staff.length) !== 1 ? "s" : ""} found
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
                  onClick={() => setIsAssignTeacherModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#8000BD] text-[#8000BD] text-sm font-medium hover:bg-purple-50 transition-colors cursor-pointer"
                >
                  <UserPlus size={15} />
                  <span className="hidden sm:inline">Assign Teacher</span>
                </button>
                <button
                  onClick={() => setIsAddStaffModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8000BD] text-white text-sm font-semibold hover:bg-[#6a00a1] transition-colors cursor-pointer"
                >
                  <Plus size={15} />
                  <span>New Staff</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 overflow-x-auto scrollbar-hide">
              <div className="flex min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    disabled={isFetching || isTabLoading}
                    className={`relative px-4 py-3 text-sm font-medium font-inter transition-colors duration-200 whitespace-nowrap disabled:opacity-50 cursor-pointer ${
                      activeTab === tab
                        ? "text-gray-900 font-semibold"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8000BD] rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading state for tab changes */}
            {isTabLoading && (
              <div className="bg-white p-6 rounded-lg shadow-sm mt-4">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#8000BD] border-t-transparent mb-4"></div>
                    <p className="text-gray-600 font-medium">
                      Loading staff information
                    </p>
                    <p className="text-gray-400 text-sm mt-1">Please wait...</p>
                  </div>
                </div>
              </div>
            )}

            {/*== Network error ==*/}
            {isNetworkError(error) && <NetworkError />}

            <AnimatePresence mode="wait">
              {!error && !isTabLoading && data && data.staff.length > 0 ? (
                showTable ? (
                  <motion.div
                    ref={contentRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-white overflow-hidden p-5 mt-4"
                  >
                    <div className="flex items-center justify-between mb-2 no-print">
                      <h1 className="text-xl text-gray-900 mb-2 font-inter">
                        All Staff List
                      </h1>
                    </div>
                    <div className="bg-white overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                            <tr>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                                No
                              </th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                                Name
                              </th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                                Subject
                              </th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                                Class
                              </th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                                Address
                              </th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                                Number
                              </th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                                Reg.No
                              </th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                                Date Employeed
                              </th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                                Payroll
                              </th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                                Campus
                              </th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                                Duty
                              </th>
                              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider no-print">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {data.staff.map((staff, index) => (
                              <tr key={staff.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-900 border-r border-gray-200">
                                  {(filters.page - 1) * filters.pageSize +
                                    index +
                                    1}
                                </td>
                                <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                  {staff.name}
                                </td>
                                <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                  {staff.assignments?.length ? (
                                    <ul className="list-disc ml-4">
                                      {staff.assignments.map((a) => {
                                        const subjectName = a.subject?.name;
                                        return (
                                          <li key={a.id}>
                                            {subjectName &&
                                            typeof subjectName === "string"
                                              ? subjectName
                                              : "No subject"}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  ) : (
                                    "N/A"
                                  )}
                                </td>

                                <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                  {staff.assignments?.length ? (
                                    <ul className="list-disc ml-4">
                                      {staff.assignments.map((a) => {
                                        const className = a.class?.name;
                                        return (
                                          <li key={a.id}>
                                            {className &&
                                            typeof className === "string"
                                              ? className
                                              : "No class"}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  ) : (
                                    "N/A"
                                  )}
                                </td>

                                <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                  {staff.address}
                                </td>
                                <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                  {staff.phoneNumber}
                                </td>
                                <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 whitespace-nowrap">
                                  {staff.registrationNumber}
                                </td>
                                <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                  {staff.dateEmployed ? new Date(staff.dateEmployed).toLocaleDateString("en-GB") : "—"}
                                </td>
                                <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                  ₦{Number(staff.payroll).toLocaleString()}
                                </td>
                                <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                  {staff.campus?.name}
                                </td>
                                <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                  {staff.duty}
                                </td>
                                <td className="py-3 px-5 no-print">
                                  <div className="flex items-center space-x-1">
                                    <button
                                      onClick={() => {
                                        setIsViewStaffModalOpen(true);
                                        setSelectedStaffId(staff.id);
                                      }}
                                      className="p-1 cursor-pointer"
                                    >
                                      <IoEyeOutline
                                        size={20}
                                        className="text-gray-400 hover:text-purple-600"
                                      />
                                    </button>
                                    <button
                                      onClick={() => {
                                        setIsEditStaffModalOpen(true);
                                        setSelectedStaffId(staff.id);
                                        setSelectedStaffData(staff);
                                      }}
                                      className="p-1 cursor-pointer"
                                    >
                                      <Edit
                                        size={20}
                                        className="text-gray-400 hover:text-yellow-600"
                                      />
                                    </button>
                                    <button
                                      onClick={() =>
                                        setIsDeleteStaffModalOpen({
                                          isOpen: true,
                                          staff: staff as unknown as ApiStaff,
                                          isLoading: false,
                                        })
                                      }
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
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      {data.pagination && data.pagination.totalPages > 1 && (
                        <div className="p-2 md:px-6 py-2 border-t border-gray-200 bg-gray-50 no-print">
                          <div className="flex items-center justify-between">
                            <div className="text-[12px] md:text-sm text-gray-600">
                              Showing{" "}
                              {(filters.page - 1) * filters.pageSize + 1}-
                              {Math.min(
                                filters.page * filters.pageSize,
                                data.pagination.total
                              )}{" "}
                              of {data.pagination.total}
                            </div>
                            <div className="flex items-center">
                              <button
                                onClick={() =>
                                  handlePageChange(filters.page - 1)
                                }
                                disabled={filters.page === 1}
                                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <ChevronLeft size={20} />
                              </button>

                              <div className="flex items-center font-space">
                                {Array.from(
                                  {
                                    length: Math.min(
                                      5,
                                      data.pagination.totalPages
                                    ),
                                  },
                                  (_, i) => {
                                    const pageNum = i + 1;
                                    return (
                                      <button
                                        key={pageNum}
                                        onClick={() =>
                                          handlePageChange(pageNum)
                                        }
                                        className={`w-8 h-8 rounded text-sm font-semibold transition-colors font-space ${
                                          filters.page === pageNum
                                            ? "bg-[#8000BD] text-white"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                      >
                                        {pageNum}
                                      </button>
                                    );
                                  }
                                )}
                                {data.pagination.totalPages > 5 && (
                                  <>
                                    <span className="text-gray-400 px-2">
                                      ...
                                    </span>
                                    <button
                                      onClick={() =>
                                        handlePageChange(
                                          data.pagination.totalPages
                                        )
                                      }
                                      className="w-8 h-8 rounded text-sm font-semibold text-gray-600 hover:bg-gray-100 font-space"
                                    >
                                      {data.pagination.totalPages}
                                    </button>
                                  </>
                                )}
                              </div>

                              <button
                                onClick={() =>
                                  handlePageChange(filters.page + 1)
                                }
                                disabled={
                                  filters.page === data.pagination.totalPages
                                }
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
                ) : (
                  <EmptyStaffData
                    onAddStaffClick={() => setIsAddStaffModalOpen(true)}
                  />
                )
              ) : (
                !error &&
                !isFetching &&
                !isTabLoading && (
                  <EmptyStaffData
                    onAddStaffClick={() => setIsAddStaffModalOpen(true)}
                  />
                )
              )}
            </AnimatePresence>

            {/* Your modals */}
            {isAddStaffModalOpen && (
              <AddStaffFormModal
                onClose={() => setIsAddStaffModalOpen(false)}
              />
            )}

            {isAssignTeacherModalOpen && (
              <AssignStaffModal
                onClose={() => setIsAssignTeacherModalOpen(false)}
              />
            )}

            {isViewStaffModalOpen && selectedStaffId !== null && (
              <ViewStaffModal
                onClose={() => setIsViewStaffModalOpen(false)}
                onEdit={handleEdit}
                staffId={selectedStaffId}
              />
            )}

            {isEditStaffModalOpen && selectedStaffId !== null && (
              <EditStaffModal
                onClose={() => setIsEditStaffModalOpen(false)}
                staffId={selectedStaffId}
                initialData={selectedStaffData}
              />
            )}

            {isDeleteStaffModalOpen && (
              <DeleteStaffModal
                isOpen={isDeleteStaffModalOpen.isOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                staffName={isDeleteStaffModalOpen.staff?.name}
                isLoading={isDeleteStaffModalOpen.isLoading}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
