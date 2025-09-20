// import {
//   Plus,
//   Printer,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
//   Edit,
//   Search,
//   X,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { IoEyeOutline } from "react-icons/io5";
// import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";
// import AddStaffFormModal from "../modal/add-staff.modal";
// import AssignStaffModal from "../modal/assign-teacher.modal";
// import ViewStaffModal from "../modal/view-staff.modal";
// import EditStaffModal from "../modal/edit-staff.modal";
// import DeleteStaffModal from "../modal/delete-staff.modal";
// import Print from "../../../../general/common/print";

// type Staff = {
//   id: number;
//   no: number;
//   name: string;
//   subject: string;
//   class: string;
//   address: string;
//   number: string;
//   regNo: string;
//   dateEmpoyed: string;
//   payroll: string;
//   campus: string;
//   duty: string;
// };

// export default function ListOfStaff() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isPrinting, setIsPrinting] = useState(false);
//   const [activeTab, setActiveTab] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
//   const [isAssignTeacherModalOpen, setIsAssignTeacherModalOpen] = useState(false);
//   const [isViewStaffModalOpen, setIsViewStaffModalOpen] = useState(false);
//   const [isEditStaffModalOpen, setIsEditStaffModalOpen] = useState(false);
//   const [isDeleteStaffModalOpen, setIsDeleteStaffModalOpen] = useState({
//     isOpen: false,
//     staff: null as Staff | null,
//     isLoading: false,
//   });


//    useEffect(() => {
//      const timer = setTimeout(() => {
//        setIsLoading(false);
//      }, 2000);
//      return () => clearTimeout(timer);
//    }, []);

//      const handleEdit = () => {
//        setIsViewStaffModalOpen(false);
//        setTimeout(() => {
//          setIsEditStaffModalOpen(true);
//        }, 300);
//      };

//   const handleDeleteConfirm = () => {
//     setIsDeleteStaffModalOpen((prev) => ({ ...prev, isLoading: true }));
//     // Simulate API call
//     setTimeout(() => {
//       setIsDeleteStaffModalOpen({
//         isOpen: false,
//         staff: null,
//         isLoading: false,
//       });
//     }, 1500);
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteStaffModalOpen({
//       isOpen: false,
//       staff: null,
//       isLoading: false,
//     });
//   };


//   const tabs = ["All", "Teaching", "Security", "Cleaners", "HR"];

//   // Sample staff data matching the image
//   const staff = Array.from({ length: 9 }, (_, index) => ({
//     id: index + 1,
//     no: index + 1,
//     name: "Jude Pedro",
//     subject: "English Language",
//     class: "Jss1",
//     address: "N0 5 adama street, fct.",
//     number: "09044523114",
//     regNo: "ECO12543",
//     dateEmpoyed: "2022-01-01",
//     payroll: "#90,000",
//     campus: "Campus 1",
//     duty: "Cleaners",
//   }));

//   const totalStaff = 223;
//   const staffPerPage = 9;
//   const totalPages = Math.ceil(totalStaff / staffPerPage);

//   return (
//     <>
//       {isLoading ? (
//         <TableSkeleton />
//       ) : (
//         <div className="min-h-screen bg-gray-50">
//           <div className="bg-[#8000BD] px-6 py-3">
//             <div className="flex items-center justify-center">
//               <Search className="w-5 h-5 mr-2 text-white" />
//               <button
//                 type="button"
//                 className="bg-transparent text-white font-semibold outline-none placeholder-white"
//               >
//                 DISPLAY STAFF
//               </button>
//             </div>
//           </div>

//           {/* Print button */}
//           <div className="flex justify-end mt-10">
//             <button 
//             onClick={() => setIsPrinting(true)}
//             className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer">
//               <Printer size={20} />
//               <span>PRINT RECORD</span>
//             </button>
//           </div>

//           <div className="mt-5">
//             {/* Top Section */}
//             <div className="flex items-center justify-end mb-2">
//               <div className="flex items-center">
//                 <button
//                   onClick={() => setIsAssignTeacherModalOpen(true)}
//                   className="bg-[#E8EDF5] text-[#6E6D71] font-inter px-3 py-2 rounded-lg border border-gray-300 shadow-md text-[10px] md:text-sm font-semibold cursor-pointer"
//                 >
//                   <h1>Assign Teacher to Class</h1>
//                 </button>
//                 <div className=" text-[#000000] px-2 py-2 rounded-lg text-[15px] md:text-lg font-medium font-inter transition-colors">
//                   <span>Register New Staff</span>
//                 </div>
//                 <div
//                   onClick={() => setIsAddStaffModalOpen(true)}
//                   className="bg-white shadow-2xl p-1 rounded-lg flex items-center border border-gray-300 justify-center cursor-pointer hover:bg-[#4b0082] hover:text-white"
//                 >
//                   <Plus size={20} />
//                 </div>
//               </div>
//             </div>

//             {/* Tabs */}
//             <div className="p-5">
//               <div className="flex items-center space-x-6 md:space-x-8 border-b border-gray-200 relative">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`
//               relative pb-3 text-lg font-medium font-inter transition-colors duration-200
//               ${
//                 activeTab === tab
//                   ? "text-gray-900 font-semibold"
//                   : "text-gray-500 hover:text-gray-700"
//               }
//             `}
//                   >
//                     {tab}
//                     {activeTab === tab && (
//                       <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8000BD] rounded-full"></div>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Table Container */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//               className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5 mt-"
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <h1 className="text-xl text-gray-900 mb-2 font-inter">
//                   All Staff List
//                 </h1>
//                 <button className="bg-[#ED294A] text-white px-5 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer">
//                   <X size={20} />
//                   <h1> REMOVE</h1>
//                 </button>
//               </div>
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="w-full border-collapse">
//                     <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                      // <tr>
                      //   <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      //     No
                      //   </th>
                      //   <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      //     Name
                      //   </th>
                      //   <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      //     Subject
                      //   </th>
                      //   <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      //     Class
                      //   </th>
                      //   <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      //     Address
                      //   </th>
                      //   <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      //     Number
                      //   </th>
                      //   <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      //     Reg.No
                      //   </th>
                      //   <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      //     Date Employeed
                      //   </th>
                      //   <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      //     Payroll
                      //   </th>
                      //   <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      //     Campus
                      //   </th>
                      //   <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      //     Duty
                      //   </th>
                      //   <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      //     Action
                      //   </th>
                      // </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                       {staff.map((staff, index) => (
//                         <tr key={index} className="hover:bg-gray-50">
//                           <td className="py-3 px-4 text-sm text-gray-900 border-r border-gray-200">
//                             {staff.no}
//                           </td>
//                           <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                             {staff.name }
//                           </td>
                          // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                          //   {staff.subject}
                          // </td>
                          // <td className="py-3 px-2 text-sm text-gray-600 font-semibold border-r border-gray-200">
                          //   {staff.class}
                          // </td>
                          // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                          //   {staff.address}
                          // </td>
                          // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                          //   {staff.number}
                          // </td>
                          // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                          //   {staff.regNo}
                          // </td>
                          // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                          //   { staff.dateEmpoyed}
                          // </td>
                          // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                          //   {staff.payroll}
                          // </td>
                          // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                          //   { staff.campus}
                          // </td>
                          // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                          //   {staff.duty}
                          // </td>
//                           <td className="py-3 px-5">
//                             <div className="flex items-center space-x-1">
//                               <button
//                                 onClick={() => setIsViewStaffModalOpen(true)}
//                                 className="p-1 cursor-pointer"
//                               >
//                                 <IoEyeOutline
//                                   size={20}
//                                   className="text-gray-400 hover:text-purple-600"
//                                 />
//                               </button>
                              // <button
                              //   onClick={() => setIsEditStaffModalOpen(true)}
                              //   className="p-1 cursor-pointer"
                              // >
                              //   <Edit
                              //     size={20}
                              //     className="text-gray-400 hover:text-yellow-600"
                              //   />
                              // </button>
                              // <button
                              //   onClick={() =>
                              //     setIsDeleteStaffModalOpen({
                              //       isOpen: true,
                              //       staff: staff,
                              //       isLoading: false,
                              //     })
                              //   }
                              //   className="p-1 cursor-pointer"
                              // >
                              //   <Trash2
                              //     size={20}
                              //     className="text-gray-400 hover:text-red-600"
                              //   />
                              // </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

                // {isAddStaffModalOpen && (
                //   <AddStaffFormModal
                //     onClose={() => setIsAddStaffModalOpen(false)}
                //   />
                // )}

                // {isAssignTeacherModalOpen && (
                //   <AssignStaffModal
                //     onClose={() => setIsAssignTeacherModalOpen(false)}
                //   />
                // )}

                // {isViewStaffModalOpen && (
                //   <ViewStaffModal
                //     onClose={() => setIsViewStaffModalOpen(false)}
                //     onEdit={handleEdit}
                //   />
                // )}

                // {isEditStaffModalOpen && (
                //   <EditStaffModal
                //     onClose={() => setIsEditStaffModalOpen(false)}
                //   />
                // )}

                // {isPrinting && <Print onClose={() => setIsPrinting(false)} />}

                // {isDeleteStaffModalOpen && (
                //   <DeleteStaffModal
                //     isOpen={isDeleteStaffModalOpen.isOpen}
                //     onClose={handleDeleteCancel}
                //     onConfirm={handleDeleteConfirm}
                //     staffName={isDeleteStaffModalOpen.staff?.name}
                //     isLoading={isDeleteStaffModalOpen.isLoading}
                //   />
                // )}

//                 {/* Pagination */}
//                 <div className="p-2 md:px-6 py-2 border-t border-gray-200 bg-gray-50">
//                   <div className="flex items-center justify-between">
//                     <div className="text-[12px] md:text-sm text-gray-600">
//                       Showing 1-9 of {totalStaff}
//                     </div>
//                     <div className="flex items-center">
//                       <button
//                         onClick={() =>
//                           setCurrentPage(Math.max(1, currentPage - 1))
//                         }
//                         disabled={currentPage === 1}
//                         className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <ChevronLeft size={20} />
//                       </button>

//                       <div className="flex items-center font-space">
//                         {[1, 2, 3].map((page) => (
//                           <button
//                             key={page}
//                             onClick={() => setCurrentPage(page)}
//                             className={`w-8 h-8 rounded text-sm font-semibold transition-colors font-space ${
//                               currentPage === page
//                                 ? "bg-[#8000BD] text-white"
//                                 : "text-gray-600 hover:bg-gray-100"
//                             }`}
//                           >
//                             {page}
//                           </button>
//                         ))}
//                         <span className="text-gray-400 px-2">...</span>
//                         <button
//                           onClick={() => setCurrentPage(totalPages)}
//                           className="w-8 h-8 rounded text-sm font-semibold text-gray-600 hover:bg-gray-100 font-space"
//                         >
//                           {totalPages}
//                         </button>
//                       </div>

//                       <button
//                         onClick={() =>
//                           setCurrentPage(Math.min(totalPages, currentPage + 1))
//                         }
//                         disabled={currentPage === totalPages}
//                         className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <ChevronRight size={20} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }





import {
  Plus,
  Printer,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Edit,
  X,
  AlertCircle,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoEyeOutline } from "react-icons/io5";
import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";
import AddStaffFormModal from "../modal/add-staff.modal";
import AssignStaffModal from "../modal/assign-teacher.modal";
import ViewStaffModal from "../modal/view-staff.modal";
import EditStaffModal from "../modal/edit-staff.modal";
import DeleteStaffModal from "../modal/delete-staff.modal";
import Print from "../../../../general/common/print";
import SearchStaffComp from "../components/search-staff-comp";
import { useDeleteStaffMutation, useGetAllStaffQuery } from "../api/staff-api";
import { MdOutlineNetworkCheck } from "react-icons/md";

// Remove the mock Staff type and use your actual interface
import type { Staff as ApiStaff } from "../model/staff.model";
import { toast } from "sonner";

export default function ListOfStaff() {
  const [filters, setFilters] = useState({
    campusId: undefined as string | undefined,
    duty: undefined as string | undefined,
    name: undefined as string | undefined,
    page: 1,
    pageSize: 9,
  });

  const [showTable, setShowTable] = useState(true);

  const [hasFilters, setHasFilters] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isAssignTeacherModalOpen, setIsAssignTeacherModalOpen] =
    useState(false);
  const [isViewStaffModalOpen, setIsViewStaffModalOpen] = useState(false);
  const [isEditStaffModalOpen, setIsEditStaffModalOpen] = useState(false);
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

      // Simulate a small delay to show the loading card
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
      toast.error("Failed to delete staff!");
      console.error("Failed to delete staff:", error);
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

  const handleClearFilters = () => {
    setHasFilters(false);
    setFilters({
      campusId: undefined,
      duty: undefined,
      name: undefined,
      page: 1,
      pageSize: 9,
    });
  };

  const tabs = ["All", "Teacher", "Security", "Cleaner", "HR"];

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

          {/* Print button */}
          <div className="flex justify-end mt-4 mx-4">
            <button
              onClick={() => setIsPrinting(true)}
              className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer"
            >
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
                <div className="text-[#000000] px-2 py-2 rounded-lg text-[15px] md:text-lg font-medium font-inter transition-colors">
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

            {/* Tabs */}
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
                    disabled={isFetching || isTabLoading}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8000BD] rounded-full"></div>
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

            {/* Error state - Show only when there's an error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex flex-col items-center text-center mt-4">
                <MdOutlineNetworkCheck
                  size={60}
                  className="text-red-500 mb-4"
                />

                {/* Error details */}
                <div className="flex items-start justify-center">
                  <AlertCircle className="h-6 w-6 text-red-500 mr-2 mt-1" />
                  <div>
                    <p className="text-red-800 font-medium">
                      Failed to load staff data
                    </p>
                    <p className="text-red-600 text-sm">
                      Please check your connection and try again.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Table Container - Only show when not loading from tab change and no error */}
            <AnimatePresence mode="wait">
              {!error &&
              !isTabLoading &&
              data &&
              data.staff.length > 0 &&
              showTable ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5 mt-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-xl text-gray-900 mb-2 font-inter">
                      All Staff List
                    </h1>
                    <button
                      onClick={() => setShowTable(false)}
                      className="bg-[#ED294A] text-white px-5 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer"
                    >
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
                                {"N/A"}
                              </td>
                              <td className="py-3 px-2 text-sm text-gray-600 font-semibold border-r border-gray-200">
                                {"N/A"}
                              </td>
                              <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                {staff.address}
                              </td>
                              <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                {staff.phoneNumber}
                              </td>
                              <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                {"N/A"}
                              </td>
                              <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                {staff.dateEmployed}
                              </td>
                              <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                {staff.payroll}
                              </td>
                              <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                {staff.campus?.name}
                              </td>
                              <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                                {staff.duty}
                              </td>
                              <td className="py-3 px-5">
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
                      <div className="p-2 md:px-6 py-2 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="text-[12px] md:text-sm text-gray-600">
                            Showing {(filters.page - 1) * filters.pageSize + 1}-
                            {Math.min(
                              filters.page * filters.pageSize,
                              data.pagination.total
                            )}{" "}
                            of {data.pagination.total}
                          </div>
                          <div className="flex items-center">
                            <button
                              onClick={() => handlePageChange(filters.page - 1)}
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
                                      onClick={() => handlePageChange(pageNum)}
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
                              onClick={() => handlePageChange(filters.page + 1)}
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
                !error &&
                !isFetching &&
                !isTabLoading && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center mt-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No staff found
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                      No staff members match your current search criteria. Try
                      adjusting your filters or search terms.
                    </p>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setIsAddStaffModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 bg-[#4B0082] text-white rounded-md text-sm font-medium hover:bg-[#3a0066] transition-colors cursor-pointer"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Staff
                      </button>
                    </div>
                  </div>
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
                initialData={selectedStaffId}
              />
            )}

            {isPrinting && <Print onClose={() => setIsPrinting(false)} />}

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