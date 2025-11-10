// /* eslint-disable @typescript-eslint/no-explicit-any */




// // import {
// //   Search,
// //   Plus,
// //   Printer,
// //   Trash2,
// //   ChevronLeft,
// //   ChevronRight,
// //   X,
// // } from "lucide-react";
// // import { useEffect, useState } from "react";
// // import CompareIcon from "../../../../assets/icon/change-icon";
// // import { motion } from "framer-motion";
// // import AddStudentFormModal from "../modal/add-student.modal";
// // import { IoEyeOutline } from "react-icons/io5";
// // import DeleteStudentModal from "../modal/delete-student.modal";
// // import ViewStudentFormModal from "../modal/view-student.modal";
// // import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";
// // import EditStudentModal from "../modal/edit-student.modal";
// // import ChangeStudentModal from "../modal/change-student.modal";
// // import Print from "../../../../general/common/print";
// // import { EmptyStudentState } from "./empty-state";
// // import SearchComp from "./search-comp";

// // type Student = {
// //   id: number;
// //   no: number;
// //   campus: string;
// //   regNo: string;
// //   surname: string;
// //   otherName: string;
// //   gender: string;
// //   dob: string;
// //   guardianName: string;
// //   guardianNo: string;
// //   lifestyle: string;
// //   class: string;
// //   passport: string;
// // };

// // export default function StudentsList() {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isPrinting, setIsPrinting] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
// //   const [isViewStudentModalOpen, setIsViewStudentModalOpen] = useState(false);
// //   const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false);
// //   const [isChangeStudentModalOpen, setIsChangeStudentModalOpen] = useState(false);
// //   const [deleteModal, setDeleteModal] = useState({
// //     isOpen: false,
// //     student: null as Student | null,
// //     isLoading: false,
// //   });


// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setIsLoading(false);
// //     }, 2000);
// //     return () => clearTimeout(timer);
// //   }, []);


// //    const handleEdit = () => {
// //      setIsViewStudentModalOpen(false);
// //      setTimeout(() => {
// //        setIsEditStudentModalOpen(true);
// //      }, 300);
// //    };

// //   const handleDeleteConfirm = () => {
// //     setDeleteModal(prev => ({ ...prev, isLoading: true }));
// //     // Simulate API call
// //     setTimeout(() => {
// //       setDeleteModal({
// //         isOpen: false,
// //         student: null,
// //         isLoading: false,
// //       });
// //     }, 1500);
// //   };

// //   const handleDeleteCancel = () => {
// //     setDeleteModal({
// //       isOpen: false,
// //       student: null,
// //       isLoading: false,
// //     });
// //   };

// //   // Sample student data matching the image
// //   const students = Array.from({ length: 9 }, (_, index) => ({
// //     id: index + 1,
// //     no: index + 1,
// //     campus: "Campus 1",
// //     regNo: "ECO12543",
// //     surname: index === 1 ? "Obi" : "Amachi",
// //     otherName: "chinyere Victoria",
// //     gender: "Female",
// //     dob: "12/2/25",
// //     guardianName: "Mrs Uzoechi",
// //     guardianNo: "09044523114",
// //     lifestyle: index === 1 ? "Boarder" : "Day",
// //     class: index === 1 ? "ss1" : "ss2",
// //     passport: "🛂",
// //   }));

// //   const totalStudents = 223;
// //   const studentsPerPage = 9;
// //   const totalPages = Math.ceil(totalStudents / studentsPerPage);

// //   return (
// //     <>
// //       {isLoading ? (
// //         <TableSkeleton />
// //       ) : (
// //         <div className="min-h-screen bg-gray-50">
// //           <div>
// //             <SearchComp 
            
// //             />
// //           </div>

// //           <div className="flex justify-end mt-10">
// //             <button
// //               onClick={() => setIsPrinting(true)}
// //               className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer"
// //             >
// //               <Printer size={20} />
// //               <span>PRINT RECORD</span>
// //             </button>
// //           </div>
// //           <div className="mt-10">
// //             {/* Top Section */}
// //             <div className="flex items-center justify-between mb-2">
// //               <div>
// //                 <h1 className="text-2xl md:text-4xl font-meduim text-gray-900 mb-1 font-inter">
// //                   Students
// //                 </h1>
// //               </div>
// //               <div className="flex items-center">
// //                 <div className=" text-[#000000] px-2 py-2 rounded-lg text-lg font-semibold transition-colors">
// //                   <span>Add New Student</span>
// //                 </div>
// //                 <div
// //                   onClick={() => setIsAddStudentModalOpen(true)}
// //                   className="bg-white shadow-2xl p-1 rounded-lg border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-[#4b0082] hover:text-white"
// //                 >
// //                   <Plus size={20} />
// //                 </div>
// //               </div>{" "}
// //             </div>

// //             {/* Table Container */}
// //             {students.length > 0 ? (
// //               <motion.div
// //                 initial={{ opacity: 0, y: 30 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.6, ease: "easeOut" }}
// //                 className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5"
// //               >
// //                 <div className="flex items-center justify-between mb-2">
// //                   <h1 className="text-xl text-gray-900 mb-2 font-inter">
// //                     All Student List
// //                   </h1>
// //                   <button className="bg-[#ED294A] text-white px-5 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer">
// //                     <X size={20} />
// //                     <h1> REMOVE</h1>
// //                   </button>
// //                 </div>
// //                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
// //                   <div className="overflow-x-auto">
// //                     <table className="w-full border-collapse">
// //                       <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
// //                         <tr>
// //                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
// //                             No
// //                           </th>
// //                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
// //                             Campus
// //                           </th>
// //                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
// //                             Reg. No
// //                           </th>
// //                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
// //                             Surname
// //                           </th>
// //                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
// //                             Other name
// //                           </th>
// //                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
// //                             Gender
// //                           </th>
// //                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
// //                             DOB
// //                           </th>
// //                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
// //                             Guardian Name
// //                           </th>
// //                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
// //                             Guardian No.
// //                           </th>
// //                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
// //                             Lifestyle
// //                           </th>
// //                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
// //                             Class
// //                           </th>
// //                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200 text-">
// //                             <span>Pass</span>
// //                             <span className="">port</span>
// //                           </th>
// //                           <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider">
// //                             Action
// //                           </th>
// //                         </tr>
// //                       </thead>
// //                       <tbody className="divide-y divide-gray-200">
// //                         {students.map((student, index) => (
// //                           <tr key={index} className="hover:bg-gray-50">
// //                             <td className="py-3 px-4 text-sm text-gray-900 border-r border-gray-200">
// //                               {student.no}
// //                             </td>
//                             // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                             //   {student.campus}
//                             // </td>
//                             // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                             //   {student.regNo}
//                             // </td>
//                             // <td className="py-3 px-2 text-sm text-gray-600 font-semibold border-r border-gray-200">
//                             //   {student.surname}
//                             // </td>
//                             // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                             //   {student.otherName}
//                             // </td>
//                             // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                             //   {student.gender}
//                             // </td>
//                             // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                             //   {student.dob}
//                             // </td>
//                             // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                             //   {student.guardianName}
//                             // </td>
//                             // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                             //   {student.guardianNo}
//                             // </td>
//                             // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                             //   {student.lifestyle}
//                             // </td>
//                             // <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                             //   {student.class}
//                             // </td>
//                             // <td className="py-3 px-2 text-sm border-r border-gray-200">
//                             //   <div className="">
//                             //     <div className="rounded flex items-center justify-center">
//                             //       <img
//                             //         src="images/passport.png"
//                             //         alt="passport"
//                             //       />
//                             //     </div>
//                             //     <p className="ml-1 text-xs text-gray-600">
//                             //       Passport
//                             //     </p>
//                             //   </div>
//                             // </td>
//                             // <td className="py-3 px-5">
//                             //   <div className="flex items-center space-x-1">
//                             //     <button
//                             //       onClick={() =>
//                             //         setIsViewStudentModalOpen(true)
//                             //       }
//                             //       className="p-1 transition-colors cursor-pointer"
//                             //     >
//                             //       <IoEyeOutline
//                             //         size={20}
//                             //         className="text-gray-400"
//                             //       />
//                             //     </button>
//                             //     <button
//                             //       onClick={() =>
//                             //         setIsChangeStudentModalOpen(true)
//                             //       }
//                             //       className="p-1 transition-colors"
//                             //     >
//                             //       <CompareIcon
//                             //         size={20}
//                             //         className="text-gray-400 cursor-pointer"
//                             //       />
//                             //     </button>
//                             //     <button
//                             //       onClick={() =>
//                             //         setDeleteModal({
//                             //           isOpen: true,
//                             //           student: student,
//                             //           isLoading: false,
//                             //         })
//                             //       }
//                             //       className="p-1 transition-colors cursor-pointer"
//                             //     >
//                             //       <Trash2
//                             //         size={20}
//                             //         className="text-gray-400 hover:text-red-600"
//                             //       />
//                             //     </button>
//                             //   </div>
//                             // </td>
// //                           </tr>
// //                         ))}
// //                       </tbody>
// //                     </table>
// //                   </div>

// //                   {/* Pagination */}
// //                   <div className="px-6 py-2 border-t border-gray-200 bg-gray-50">
// //                     <div className="flex items-center justify-between">
// //                       <div className="text-sm text-gray-600">
// //                         Showing 1-9 of {totalStudents}
// //                       </div>
// //                       <div className="flex items-center space-x-2">
// //                         <button
// //                           onClick={() =>
// //                             setCurrentPage(Math.max(1, currentPage - 1))
// //                           }
// //                           disabled={currentPage === 1}
// //                           className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
// //                         >
// //                           <ChevronLeft size={20} />
// //                         </button>

// //                         <div className="flex items-center space-x-1 font-space">
// //                           {[1, 2, 3].map((page) => (
// //                             <button
// //                               key={page}
// //                               onClick={() => setCurrentPage(page)}
// //                               className={`w-8 h-8 rounded text-sm font-semibold transition-colors font-space ${
// //                                 currentPage === page
// //                                   ? "bg-[#8000BD] text-white"
// //                                   : "text-gray-600 hover:bg-gray-100"
// //                               }`}
// //                             >
// //                               {page}
// //                             </button>
// //                           ))}
// //                           <span className="text-gray-400 px-2">...</span>
// //                           <button
// //                             onClick={() => setCurrentPage(totalPages)}
// //                             className="w-8 h-8 rounded text-sm font-semibold text-gray-600 hover:bg-gray-100 font-space"
// //                           >
// //                             {totalPages}
// //                           </button>
// //                         </div>

// //                         <button
// //                           onClick={() =>
// //                             setCurrentPage(
// //                               Math.min(totalPages, currentPage + 1)
// //                             )
// //                           }
// //                           disabled={currentPage === totalPages}
// //                           className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
// //                         >
// //                           <ChevronRight size={20} />
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ) : (
// //               <EmptyStudentState />
// //             )}
// //           </div>

//           // {isAddStudentModalOpen && (
//           //   <AddStudentFormModal
//           //     onClose={() => setIsAddStudentModalOpen(false)}
//           //   />
//           // )}

//           // {isViewStudentModalOpen && (
//           //   <ViewStudentFormModal
//           //     onClose={() => setIsViewStudentModalOpen(false)}
//           //     onEdit={handleEdit}
//           //   />
//           // )}

//           // {isChangeStudentModalOpen && (
//           //   <ChangeStudentModal
//           //     onClose={() => setIsChangeStudentModalOpen(false)}
//           //   />
//           // )}

//           // {isEditStudentModalOpen && (
//           //   <EditStudentModal
//           //     onClose={() => setIsEditStudentModalOpen(false)}
//           //   />
//           // )}

//           // {isPrinting && <Print onClose={() => setIsPrinting(false)} />}

//           // <DeleteStudentModal
//           //   isOpen={deleteModal.isOpen}
//           //   onClose={handleDeleteCancel}
//           //   onConfirm={handleDeleteConfirm}
//           //   studentName={deleteModal.student?.surname}
//           //   isLoading={deleteModal.isLoading}
//           // />
// //         </div>
// //       )}
// //     </>
// //   );
// // }























// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useRef, useState } from "react";
// import {
//   Plus,
//   Printer,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
//   X,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoEyeOutline } from "react-icons/io5";

// import SearchComp from "./search-comp";
// import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";
// import { EmptyStudentState } from "./empty-state";
// import type { Student as ApiStudent } from "../model/student.model";

// import AddStudentFormModal from "../modal/add-student.modal";
// import EditStudentModal from "../modal/edit-student.modal";
// // import DeleteStudentModal from "../modal/delete-student.modal";
// import ViewStudentFormModal from "../modal/view-student.modal";
// import ChangeStudentModal from "../modal/change-student-modal/change-student.modal";

// import {
//   useGetAllStudentQuery,
//   // useDeleteStudentMutation,
// } from "../api/student.api";

// import { printContent } from "../../../../utils/print-content";

// export default function StudentsList() {
//   const [filters, setFilters] = useState({
//     campusId: undefined as string | undefined,
//     classId: undefined as string | undefined,
//     name: undefined as string | undefined,
//     classGroupId: undefined as string | undefined,
//     page: 1,
//     pageSize: 9,
//   });

//   const [hasFilters, setHasFilters] = useState(false);
//   const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
//     null
//   );
//   const [selectedStudentData, setSelectedStudentData] = useState<any>(null);

//   const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
//   const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false);
//   const [isViewStudentModalOpen, setIsViewStudentModalOpen] = useState(false);
//   const [isChangeStudentModalOpen, setIsChangeStudentModalOpen] =
//     useState(false);

//   const [deleteModal, setDeleteModal] = useState({
//     isOpen: false,
//     student: null as ApiStudent | null,
//     isLoading: false,
//   });

//   // ref for printable content
//   const contentRef = useRef<HTMLDivElement>(null);

//   // persisted "removed" state: if true -> show Empty state until new data arrives after filtering
//   const [isRemoved, setIsRemoved] = useState<boolean>(() => {
//     try {
//       const stored = localStorage.getItem("studentTableRemoved");
//       return stored === "true";
//     } catch {
//       return false;
//     }
//   });

//   // data fetching
//   const { data, error, isLoading, isFetching } =
//     useGetAllStudentQuery(filters);

//   // delete mutation
//   // const [deleteStudent] = useDeleteStudentMutation();

//   // keep localStorage in sync
//   useEffect(() => {
//     try {
//       localStorage.setItem("studentTableRemoved", String(isRemoved));
//     } catch {
//       // ignore storage errors silently
//     }
//   }, [isRemoved]);

//   // If new data appears after filtering, clear the removed flag so table shows up again
//   useEffect(() => {
//     if (data && data.students && data.students.length > 0) {
//       // only reset if there are students to show
//       setIsRemoved(false);
//       try {
//         localStorage.removeItem("studentTableRemoved");
//       } catch {
//         /* ignore */
//       }
//     }
//   }, [data]);

//   // --- SearchComp handler ---
//   const handleDisplayStudent = (newFilters: {
//     campusId?: string;
//     classId?: string;
//     name?: string;
//     classGroupId?: string;
//   }) => {
//     const hasActiveFilters =
//       !!newFilters.campusId ||
//       !!newFilters.classId ||
//       !!newFilters.name ||
//       !!newFilters.classGroupId;
//     setHasFilters(hasActiveFilters);

//     // apply filters; page resets to 1
//     setFilters((prev) => ({
//       ...prev,
//       ...newFilters,
//       page: 1,
//     }));
//   };

//   const handleClearFilters = () => {
//     setHasFilters(false);
//     setFilters({
//       campusId: undefined,
//       classId: undefined,
//       name: undefined,
//       classGroupId: undefined,
//       page: 1,
//       pageSize: 9,
//     });
//   };

//   const handlePageChange = (newPage: number) => {
//     if (newPage < 1) return;
//     setFilters((prev) => ({ ...prev, page: newPage }));
//   };

//   const handleEdit = () => {
//     setIsViewStudentModalOpen(false);
//     // small delay for smooth modal transition
//     setTimeout(() => setIsEditStudentModalOpen(true), 300);
//   };

//   // delete flow
//   // const handleDeleteConfirm = async () => {
//   //   setDeleteModal((p) => ({ ...p, isLoading: true }));
//   //   const studentId = deleteModal.student?.id;
//   //   if (!studentId) {
//   //     toast.error("Student ID missing!");
//   //     setDeleteModal({ isOpen: false, student: null, isLoading: false });
//   //     return;
//   //   }

//   //   try {
//   //     await deleteStudent({ id: studentId }).unwrap();
//   //     toast.success("Student deleted successfully!");
//   //     // refresh list after delete
//   //     refetch();
//   //   } catch (err) {
//   //     toast.error("Failed to delete student!");
//   //   } finally {
//   //     // close modal after small delay for UX
//   //     setTimeout(() => {
//   //       setDeleteModal({ isOpen: false, student: null, isLoading: false });
//   //     }, 600);
//   //   }
//   // };

//   // const handleDeleteCancel = () => {
//   //   setDeleteModal({ isOpen: false, student: null, isLoading: false });
//   // };

//   const handlePrint = () => {
//     if (contentRef.current) {
//       printContent(contentRef.current.innerHTML, "All Student List");
//     }
//   };

//   // Remove table (persist)
//   const handleRemoveTable = () => {
//     setIsRemoved(true);
//     try {
//       localStorage.setItem("studentTableRemoved", "true");
//     } catch {
//       /* ignore storage errors */
//     }
//   };

//   return (
//     <>
//       {isLoading ? (
//         <TableSkeleton />
//       ) : (
//         <div className="min-h-screen bg-gray-50">
//           <div>
//             <SearchComp
//               onDisplayStudents={handleDisplayStudent}
//               isLoading={isFetching}
//               onClearFilters={handleClearFilters}
//               hasFilters={hasFilters}
//             />
//           </div>

//           {/* Print */}
//           <div className="flex justify-end mt-6 no-print">
//             <button
//               onClick={handlePrint}
//               className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer"
//             >
//               <Printer size={20} />
//               <span>PRINT RECORD</span>
//             </button>
//           </div>

//           <div className="mt-8">
//             {/* Header */}
//             <div className="flex md:items-center items-end justify-between mb-3 no-print">
//               <h1 className="text-2xl font-semibold text-gray-900 font-inter">
//                 Students
//               </h1>
//               <div className="flex flex-col md:flex-row items-center gap-3">
//                 <div
//                   onClick={() => setIsChangeStudentModalOpen(true)}
//                   className="flex items-center border-2 border-[#8000BD] rounded-xl p-2 cursor-pointer"
//                 >
//                   <span className="text-[#8000BD] font-bold">
//                     Change Student Class
//                   </span>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <span className="text-gray-800 md:text-lg font-medium">
//                     Add New Student
//                   </span>
//                   <div
//                     onClick={() => setIsAddStudentModalOpen(true)}
//                     className="bg-white shadow-2xl p-1 rounded-lg border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-[#4b0082] hover:text-white"
//                   >
//                     <Plus size={20} />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Table or Empty State */}
//             <AnimatePresence mode="wait">
//               {!isRemoved && !error && data && data.students.length > 0 ? (
//                 <motion.div
//                   ref={contentRef}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   transition={{ duration: 0.5 }}
//                   className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5"
//                 >
//                   <div className="flex items-center justify-between mb-2 no-print">
//                     <h1 className="text-xl text-gray-900 font-inter">
//                       All Student List
//                     </h1>
//                     <button
//                       onClick={handleRemoveTable}
//                       className="bg-[#ED294A] text-white cursor-pointer px-5 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold"
//                     >
//                       <X size={20} />
//                       <span>REMOVE</span>
//                     </button>
//                   </div>

//                   <div className="overflow-x-auto">
//                     <table className="w-full border-collapse">
//                       <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
//                         <tr>
//                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                             No
//                           </th>
//                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                             Campus
//                           </th>
//                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                             Reg. No
//                           </th>
//                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                             Surname
//                           </th>
//                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                             Name
//                           </th>
//                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                             Other name
//                           </th>
//                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                             Gender
//                           </th>
//                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                             DOB
//                           </th>
//                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                             Guardian Name
//                           </th>
//                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                             Guardian No.
//                           </th>
//                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                             Lifestyle
//                           </th>
//                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                             Class
//                           </th>
//                           <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                             <span>Pass</span>
//                             <span className="">port</span>
//                           </th>
//                           <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider no-print">
//                             Action
//                           </th>
//                         </tr>
//                       </thead>

//                       <tbody className="divide-y divide-gray-200">
//                         {data.students.map((student: any, index: number) => (
//                           <tr key={student.id} className="hover:bg-gray-50">
//                             <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                               {(filters.page - 1) * filters.pageSize +
//                                 index +
//                                 1}
//                             </td>
//                             <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                               {student.campus?.name ?? "—"}
//                             </td>
//                             <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                               {student.registrationNumber ?? "—"}
//                             </td>
//                             <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                               {student.surname ?? "—"}
//                             </td>
//                             <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                               {student.name ?? "—"}
//                             </td>
//                             <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                               {student.otherNames ?? "—"}
//                             </td>
//                             <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                               {student.gender ?? "—"}
//                             </td>
//                             <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                               {student.dateOfBirth ?? "—"}
//                             </td>
//                             <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                               {student.guardianName ?? "—"}
//                             </td>
//                             <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                               {student.guardianNumber ?? "—"}
//                             </td>
//                             <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                               {student.lifestyle ?? "—"}
//                             </td>
//                             <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
//                               {student.class?.name ?? "—"}
//                             </td>
//                             <td className="py-3 px-2 text-sm border-r border-gray-200">
//                               <div className="flex flex-col items-center">
//                                 <div className="rounded flex items-center justify-center w-12 h-12 bg-gray-100">
//                                   <img
//                                     src="/images/passport.png"
//                                     alt="passport"
//                                     className="max-w-full max-h-full"
//                                   />
//                                 </div>
//                                 <p className="ml-1 text-xs text-gray-600">
//                                   Passport
//                                 </p>
//                               </div>
//                             </td>

//                             <td className="py-3 px-5 no-print">
//                               <div className="flex items-center space-x-1">
//                                 <button
//                                   onClick={() => {
//                                     setIsViewStudentModalOpen(true);
//                                     setSelectedStudentId(student.id);
//                                     setSelectedStudentData(student);
//                                   }}
//                                   className="p-1 transition-colors cursor-pointer"
//                                   aria-label={`View ${student.surname}`}
//                                 >
//                                   <IoEyeOutline
//                                     size={20}
//                                     className="text-gray-400"
//                                   />
//                                 </button>

//                                 <button
//                                   onClick={() =>
//                                     setDeleteModal({
//                                       isOpen: true,
//                                       student: student as unknown as ApiStudent,
//                                       isLoading: false,
//                                     })
//                                   }
//                                   className="p-1 transition-colors cursor-pointer"
//                                   aria-label={`Delete ${student.surname}`}
//                                 >
//                                   <Trash2
//                                     size={20}
//                                     className="text-gray-400 hover:text-red-600"
//                                   />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Pagination */}
//                   {data.pagination && data.pagination.totalPages > 1 && (
//                     <div className="p-3 border-t border-gray-200 bg-gray-50 no-print">
//                       <div className="flex items-center justify-between">
//                         <div className="text-xs text-gray-600">
//                           Showing{" "}
//                           {(filters.page - 1) * filters.pageSize + 1}-
//                           {Math.min(
//                             filters.page * filters.pageSize,
//                             data.pagination.total
//                           )}{" "}
//                           of {data.pagination.total}
//                         </div>
//                         <div className="flex items-center">
//                           <button
//                             onClick={() => handlePageChange(filters.page - 1)}
//                             disabled={filters.page === 1}
//                             className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
//                           >
//                             <ChevronLeft size={20} />
//                           </button>
//                           <button
//                             onClick={() => handlePageChange(filters.page + 1)}
//                             disabled={
//                               filters.page === data.pagination.totalPages
//                             }
//                             className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
//                           >
//                             <ChevronRight size={20} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </motion.div>
//               ) : (
//                 <EmptyStudentState />
//               )}
//             </AnimatePresence>

//             {/* === Modals === */}
//             {isAddStudentModalOpen && (
//               <AddStudentFormModal
//                 onClose={() => setIsAddStudentModalOpen(false)}
//               />
//             )}

//             {isViewStudentModalOpen && selectedStudentId !== null && (
//               <ViewStudentFormModal
//                 onClose={() => setIsViewStudentModalOpen(false)}
//                 onEdit={handleEdit}
//                 studentId={selectedStudentId}
//               />
//             )}

//             {isChangeStudentModalOpen && (
//               <ChangeStudentModal
//                 onClose={() => setIsChangeStudentModalOpen(false)}
//               />
//             )}

//             {isEditStudentModalOpen && selectedStudentId !== null && (
//               <EditStudentModal
//                 onClose={() => setIsEditStudentModalOpen(false)}
//                 studentId={selectedStudentId}
//                 initialData={selectedStudentData}
//               />
//             )}

//             {/* <DeleteStudentModal
//               isOpen={deleteModal.isOpen}
//               onClose={handleDeleteCancel}
//               onConfirm={}
//               studentName={deleteModal.student?.surname}
//               isLoading={deleteModal.isLoading}
//             /> */}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }













/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Printer,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
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
import { printContent } from "../../../../utils/print-content";

export default function StudentsList() {
  const [filters, setFilters] = useState({
    campusId: undefined as string | undefined,
    classId: undefined as string | undefined,
    name: undefined as string | undefined,
    classGroupId: undefined as string | undefined,
    page: 1,
    pageSize: 9,
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

  //  Persist "removed" state (so it stays even after refresh)
  const [isRemoved, setIsRemoved] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("studentTableRemoved");
      return stored === "true";
    } catch {
      return false;
    }
  });

  //  Data fetching
  const { data, isLoading, isFetching } =
    useGetAllStudentQuery(filters);

  // Keep localStorage in sync with removed state
  useEffect(() => {
    try {
      localStorage.setItem("studentTableRemoved", String(isRemoved));
    } catch {
      // ignore storage errors silently
    }
  }, [isRemoved]);

  //  Search handler
  const handleDisplayStudent = (newFilters: {
    campusId?: string;
    classId?: string;
    name?: string;
    classGroupId?: string;
  }) => {
    const hasActiveFilters =
      !!newFilters.campusId ||
      !!newFilters.classId ||
      !!newFilters.name ||
      !!newFilters.classGroupId;
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
      page: 1,
      pageSize: 9,
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

  //  Remove table (persist locally)
  const handleRemoveTable = () => {
    setIsRemoved(true);
    try {
      localStorage.setItem("studentTableRemoved", "true");
    } catch {
      /* ignore storage errors */
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

          {/* Print Button */}
          <div className="flex justify-end mt-6 no-print">
            <button
              onClick={handlePrint}
              className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer"
            >
              <Printer size={20} />
              <span>PRINT RECORD</span>
            </button>
          </div>

          <div className="mt-8">
            {/* Header */}
            <div className="flex md:items-center items-end justify-between mb-3 no-print">
              <h1 className="text-2xl font-semibold text-gray-900 font-inter">
                Students
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div
                  onClick={() => setIsChangeStudentModalOpen(true)}
                  className="flex items-center border-2 border-[#8000BD] rounded-xl p-2 cursor-pointer"
                >
                  <span className="text-[#8000BD] font-bold">
                    Change Student Class
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-gray-800 md:text-lg font-medium">
                    Add New Student
                  </span>
                  <div
                    onClick={() => setIsAddStudentModalOpen(true)}
                    className="bg-white shadow-2xl p-1 rounded-lg border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-[#4b0082] hover:text-white"
                  >
                    <Plus size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Table or Empty State */}
            <AnimatePresence mode="wait">
              {!isRemoved && hasFilters && data && data.students.length > 0 ? (
                <motion.div
                  ref={contentRef}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5"
                >
                  <div className="flex items-center justify-between mb-2 no-print">
                    <h1 className="text-xl text-gray-900 font-inter">
                      All Student List
                    </h1>
                    <button
                      onClick={handleRemoveTable}
                      className="bg-[#ED294A] text-white cursor-pointer px-5 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold"
                    >
                      <X size={20} />
                      <span>REMOVE</span>
                    </button>
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
                        {data.students.map((student: any, index: number) => (
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
                                <div className="rounded flex items-center justify-center w-12 h-12 bg-gray-100">
                                  <img
                                    src="/images/passport.png"
                                    alt="passport"
                                    className="max-w-full max-h-full"
                                  />
                                </div>
                                <p className="ml-1 text-xs text-gray-600">
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
                  {data.pagination && data.pagination.totalPages > 1 && (
                    <div className="p-3 border-t border-gray-200 bg-gray-50 no-print">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-600">
                          Showing{" "}
                          {(filters.page - 1) * filters.pageSize + 1}-{" "}
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
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={() => handlePageChange(filters.page + 1)}
                            disabled={
                              filters.page === data.pagination.totalPages
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
