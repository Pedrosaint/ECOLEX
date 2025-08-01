import {
  Plus,
  Printer,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Edit,
  Search,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoEyeOutline } from "react-icons/io5";
import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";
import AddStaffFormModal from "../modal/add-staff.modal";
import AssignStaffModal from "../modal/assign-teacher.modal";
import ViewStaffModal from "../modal/view-staff.modal";
import EditStaffModal from "../modal/edit-staff.modal";
import DeleteStaffModal from "../modal/delete-staff.modal";

type Staff = {
  id: number;
  no: number;
  name: string;
  subject: string;
  class: string;
  address: string;
  number: string;
  regNo: string;
  dateEmpoyed: string;
  payroll: string;
  campus: string;
  duty: string;
};

export default function ListOfStaff() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isAssignTeacherModalOpen, setIsAssignTeacherModalOpen] = useState(false);
  const [isViewStaffModalOpen, setIsViewStaffModalOpen] = useState(false);
  const [isEditStaffModalOpen, setIsEditStaffModalOpen] = useState(false);
  const [isDeleteStaffModalOpen, setIsDeleteStaffModalOpen] = useState({
    isOpen: false,
    staff: null as Staff | null,
    isLoading: false,
  });


   useEffect(() => {
     const timer = setTimeout(() => {
       setIsLoading(false);
     }, 2000);
     return () => clearTimeout(timer);
   }, []);

     const handleEdit = () => {
       setIsViewStaffModalOpen(false);
       setTimeout(() => {
         setIsEditStaffModalOpen(true);
       }, 300);
     };

  const handleDeleteConfirm = () => {
    setIsDeleteStaffModalOpen((prev) => ({ ...prev, isLoading: true }));
    // Simulate API call
    setTimeout(() => {
      setIsDeleteStaffModalOpen({
        isOpen: false,
        staff: null,
        isLoading: false,
      });
    }, 1500);
  };

  const handleDeleteCancel = () => {
    setIsDeleteStaffModalOpen({
      isOpen: false,
      staff: null,
      isLoading: false,
    });
  };


  const tabs = ["All", "Teaching", "Security", "Cleaners", "HR"];

  // Sample staff data matching the image
  const staff = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    no: index + 1,
    name: "Jude Pedro",
    subject: "English Language",
    class: "Jss1",
    address: "N0 5 adama street, fct.",
    number: "09044523114",
    regNo: "ECO12543",
    dateEmpoyed: "2022-01-01",
    payroll: "#90,000",
    campus: "Campus 1",
    duty: "Cleaners",
  }));

  const totalStaff = 223;
  const staffPerPage = 9;
  const totalPages = Math.ceil(totalStaff / staffPerPage);

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="min-h-screen bg-gray-50">
          <div className="bg-[#8000BD] px-6 py-3">
            <div className="flex items-center justify-center">
              <Search className="w-5 h-5 mr-2 text-white" />
              <button
                type="button"
                className="bg-transparent text-white font-semibold outline-none placeholder-white"
              >
                DISPLAY STAFF
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-10">
            <button className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors">
              <Printer size={20} />
              <span>PRINT RECORD</span>
            </button>
          </div>

          <div className="mt-5">
            {/* Top Section */}
            <div className="flex items-center justify-end mb-2">
              <div className="flex items-center">
                <button
                  onClick={() => setIsAssignTeacherModalOpen(true)}
                  className="bg-[#E8EDF5] text-[#6E6D71] font-inter px-3 py-2 rounded-lg border border-gray-300 shadow-md text-[10px] md:text-sm font-semibold cursor-pointer"
                >
                  <h1>Assign Teacher to Class</h1>
                </button>
                <div className=" text-[#000000] px-2 py-2 rounded-lg text-[15px] md:text-lg font-medium font-inter transition-colors">
                  <span>Register New Staff</span>
                </div>
                <div
                  onClick={() => setIsAddStaffModalOpen(true)}
                  className="bg-white shadow-2xl p-1 rounded-lg flex items-center border border-gray-300 justify-center cursor-pointer hover:bg-[#4b0082] hover:text-white"
                >
                  <Plus size={20} />
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center space-x-6 md:space-x-8 border-b border-gray-200 relative">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
              relative pb-3 text-lg font-medium font-inter transition-colors duration-200
              ${
                activeTab === tab
                  ? "text-gray-900 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8000BD] rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5 mt-"
            >
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl text-gray-900 mb-2 font-inter">
                  All Staff List
                </h1>
                <button className="bg-[#ED294A] text-white px-5 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer">
                  <X size={20} />
                  <h1> REMOVE</h1>
                </button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
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
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {staff.map((staff, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900 border-r border-gray-200">
                            {staff.no}
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                            {staff.name }
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                            {staff.subject}
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600 font-semibold border-r border-gray-200">
                            {staff.class}
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                            {staff.address}
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                            {staff.number}
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                            {staff.regNo}
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                            { staff.dateEmpoyed}
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                            {staff.payroll}
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                            { staff.campus}
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                            {staff.duty}
                          </td>
                          <td className="py-3 px-5">
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => setIsViewStaffModalOpen(true)}
                                className="p-1 cursor-pointer"
                              >
                                <IoEyeOutline
                                  size={20}
                                  className="text-gray-400 hover:text-purple-600"
                                />
                              </button>
                              <button
                                onClick={() => setIsEditStaffModalOpen(true)}
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
                                    staff: staff,
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

                {isViewStaffModalOpen && (
                  <ViewStaffModal
                    onClose={() => setIsViewStaffModalOpen(false)}
                    onEdit={handleEdit}
                  />
                )}

                {isEditStaffModalOpen && (
                  <EditStaffModal
                    onClose={() => setIsEditStaffModalOpen(false)}
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

                {/* Pagination */}
                <div className="p-2 md:px-6 py-2 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="text-[12px] md:text-sm text-gray-600">
                      Showing 1-9 of {totalStaff}
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <div className="flex items-center font-space">
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
