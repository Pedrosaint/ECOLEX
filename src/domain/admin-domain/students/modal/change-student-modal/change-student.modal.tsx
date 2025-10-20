// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useRef, useState } from "react";
// import { ChevronDown, Search, X } from "lucide-react";
// import { IoRefreshSharp } from "react-icons/io5";
// import { useGetCampusQuery } from "../../../campus/api/campus.api";
// import {
//   useGetClassesQuery,
//   useGetClassGroupsQuery,
// } from "../../../classes/api/class-api";
// import {
//   useChangeClassMutation,
//   useGetAllStudentQuery,
// } from "../../api/student.api";
// import { skipToken } from "@reduxjs/toolkit/query";
// import { toast } from "sonner";
// import DotLoader from "../../../../../general/ui/dot-loader";

// interface DropdownOption {
//   value: string;
//   label: string;
// }

// const ChangeStudentModal = ({ onClose }: { onClose: () => void }) => {
//   const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
//   const [selectAll, setSelectAll] = useState(false);

//   const [filters, setFilters] = useState({
//     campusId: undefined as string | undefined,
//     classId: undefined as string | undefined,
//     groupId: undefined as string | undefined,
//     page: 1,
//     pageSize: 9,
//   });

//   const [isFiltered, setIsFiltered] = useState(false);

//   // ---------- Filter section dropdown open states ----------
//   const [isCampusOpen, setIsCampusOpen] = useState(false);
//   const [isClassOpen, setIsClassOpen] = useState(false);
//   const [isGroupOpen, setIsGroupOpen] = useState(false);

//   // ---------- Update section dropdown open states ----------
//   const [isUpdateCampusOpen, setIsUpdateCampusOpen] = useState(false);
//   const [isUpdateClassOpen, setIsUpdateClassOpen] = useState(false);
//   const [isUpdateGroupOpen, setIsUpdateGroupOpen] = useState(false);

//   // ---------- Filter values ----------
//   const [campusId, setCampusId] = useState("");
//   const [classId, setClassId] = useState("");
//   const [groupId, setGroupId] = useState("");

//   // ---------- Update values ----------
//   const [updateCampusId, setUpdateCampusId] = useState("");
//   const [updateClassId, setUpdateClassId] = useState("");
//   const [updateGroupId, setUpdateGroupId] = useState("");

//   // ---------- Separate refs for filter vs update (important) ----------
//   const filterCampusRef = useRef<HTMLDivElement>(null);
//   const filterClassRef = useRef<HTMLDivElement>(null);
//   const filterGroupRef = useRef<HTMLDivElement>(null);

//   const updateCampusRef = useRef<HTMLDivElement>(null);
//   const updateClassRef = useRef<HTMLDivElement>(null);
//   const updateGroupRef = useRef<HTMLDivElement>(null);

//   const { data: campusData, isLoading: isCampusLoading } = useGetCampusQuery();
//   // NOTE: we fetch all classes/groups then filter locally (ok for small datasets).
//   // If your backend supports query params, change the hooks as discussed earlier.
//   const { data: classData, isLoading: isClassLoading } = useGetClassesQuery();
//   const { data: groupData, isLoading: isGroupLoading } = useGetClassGroupsQuery({});

  // // derived filtered lists (based on selected parents)
  // const filteredClasses = classData?.classes?.filter(
  //   (cls: any) => !campusId || cls.campusId === Number(campusId)
  // );
  // const filteredGroups = groupData?.groups?.filter(
  //   (grp: any) => !classId || grp.classId === Number(classId)
  // );a

//   const { data, isLoading, isFetching } = useGetAllStudentQuery(
//     isFiltered ? filters : skipToken
//   );
//   const [changeClass, { isLoading: isUpdating }] = useChangeClassMutation();

//   // Campus dropdown options
//   const campusOptions: DropdownOption[] = [
//     { value: "", label: "Select Campus" },
//     ...(campusData?.campuses?.map((c: any) => ({ value: String(c.id), label: c.name })) || []),
//   ];

//   // Class dropdown options (filtered)
//   const classOptions: DropdownOption[] = [
//     { value: "", label: "Select Class" },
//     ...(filteredClasses?.map((c: any) => ({ value: String(c.id), label: c.name })) || []),
//   ];

//   // Group dropdown options (filtered)
//   const groupOptions: DropdownOption[] = [
//     { value: "", label: "Select Group" },
//     ...(filteredGroups?.map((g: any) => ({ value: String(g.id), label: g.name })) || []),
//   ];

//   const getSelectedLabel = (value: string, options: DropdownOption[]): string => {
//     if (!options || options.length === 0) return "Select...";
//     if (!value) return options[0].label;
//     const found = options.find((option) => option.value === value);
//     return found ? found.label : options[0].label;
//   };

//   // Close dropdowns when clicking outside (handles BOTH filter & update refs)
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       // filter dropdowns
//       if (filterCampusRef.current && !filterCampusRef.current.contains(event.target as Node)) setIsCampusOpen(false);
//       if (filterClassRef.current && !filterClassRef.current.contains(event.target as Node)) setIsClassOpen(false);
//       if (filterGroupRef.current && !filterGroupRef.current.contains(event.target as Node)) setIsGroupOpen(false);

//       // update dropdowns
//       if (updateCampusRef.current && !updateCampusRef.current.contains(event.target as Node)) setIsUpdateCampusOpen(false);
//       if (updateClassRef.current && !updateClassRef.current.contains(event.target as Node)) setIsUpdateClassOpen(false);
//       if (updateGroupRef.current && !updateGroupRef.current.contains(event.target as Node)) setIsUpdateGroupOpen(false);
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // --- When parent changes, always reset children (keeps consistency) ---
//   useEffect(() => {
//     // whenever campus selection changes we clear class and group
//     setClassId("");
//     setGroupId("");
//     // reset page to 1 when changing filter
//     setFilters((p) => ({ ...p, page: 1 }));
//   }, [campusId]);

//   useEffect(() => {
//     // whenever class selection changes we clear group
//     setGroupId("");
//     setFilters((p) => ({ ...p, page: 1 }));
//   }, [classId]);

//   // --- Auto-apply filter in real-time: whenever any filter field changes
//   //     we update filters state and flip isFiltered to true (so query runs)
//   useEffect(() => {
//     // only apply if something is selected (avoid initial empty)
//     if (!campusId && !classId && !groupId) {
//       // If user clears everything, clear filtered flag and skip query
//       setIsFiltered(false);
//       setFilters((p) => ({ ...p, campusId: undefined, classId: undefined, groupId: undefined, page: 1 }));
//       return;
//     }

//     setFilters({
//       campusId: campusId || undefined,
//       classId: classId || undefined,
//       groupId: groupId || undefined,
//       page: 1,
//       pageSize: 9,
//     });
//     setIsFiltered(true);
//     // clear selected students when filters change
//     setSelectedStudents([]);
//     setSelectAll(false);
//   }, [campusId, classId, groupId]);

//   // Handle select all
//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedStudents([]);
//     } else if (data?.students) {
//       setSelectedStudents(data.students.map((s: any) => s.id));
//     }
//     setSelectAll(!selectAll);
//   };

//   // Handle individual selection
//   const handleSelectStudent = (studentId: number) => {
//     setSelectedStudents((prev) => (prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]));
//   };

//   // Optional explicit filter button (keeps for backward compatibility)
//   const handleFilterBtn = () => {
//     if (!campusId && !classId && !groupId) return;
//     setFilters({
//       campusId: campusId || undefined,
//       classId: classId || undefined,
//       groupId: groupId || undefined,
//       page: 1,
//       pageSize: 9,
//     });
//     setIsFiltered(true);
//   };

//   // Handle Update
//   const handleUpdate = async () => {
//     if (selectedStudents.length === 0) {
//       toast.warning("Please select at least one student to update.");
//       return;
//     }
//     if (!updateCampusId || !updateClassId || !updateGroupId) {
//       toast.warning("Please select campus, class, and group to update.");
//       return;
//     }

//     try {
//       await changeClass({
//         studentIds: selectedStudents,
//         classId: Number(updateClassId),
//         groupId: Number(updateGroupId),
//         campusId: Number(updateCampusId),
//       }).unwrap();

//       toast.success("Student class updated successfully!");
//       setSelectedStudents([]);
//       setSelectAll(false);
//     } catch (error: any) {
//       console.error("Update failed:", error);
//       toast.error(error?.data?.message || "Failed to update student class.");
//     }
//   };

//   // Pagination helpers
//   const goToPage = (pageNum: number) => {
//     setFilters((p) => ({ ...p, page: pageNum }));
//     setIsFiltered(true);
//   };
//   const prevPage = () => goToPage(Math.max(1, (filters.page || 1) - 1));
//   const nextPage = () => goToPage((filters.page || 1) + 1);

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white -2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-auto rounded-2xl">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <h2 className="text-2xl font-semibold text-gray-900">
//             Change Student Class
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 -lg transition-colors duration-200"
//           >
//             <X />
//           </button>
//         </div>

//         {/* Filter Section */}
//         <div className="p-6 border-b border-gray-200">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//             {/* Campus Filter */}
//             <div className="flex flex-col" ref={filterCampusRef}>
//               <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
//                 Campus
//               </label>
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setIsCampusOpen((s) => !s)}
//                   disabled={isCampusLoading}
//                   className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm flex items-center justify-between disabled:opacity-50"
//                 >
//                   {getSelectedLabel(campusId, campusOptions)}
//                   <ChevronDown
//                     size={16}
//                     className={`transition-transform ${
//                       isCampusOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//                 {isCampusOpen && (
//                   <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
//                     {campusOptions.map((option) => (
//                       <div
//                         key={option.value}
//                         onClick={() => {
//                           setCampusId(option.value);
//                           setIsCampusOpen(false);
//                         }}
//                         className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
//                           campusId === option.value
//                             ? "bg-gray-100 font-medium"
//                             : ""
//                         }`}
//                       >
//                         {option.label}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Class Filter */}
//             <div className="flex flex-col" ref={filterClassRef}>
//               <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
//                 Select Student Class
//               </label>
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setIsClassOpen((s) => !s)}
//                   disabled={isClassLoading}
//                   className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm flex items-center justify-between disabled:opacity-50"
//                 >
//                   {getSelectedLabel(classId, classOptions)}
//                   <ChevronDown
//                     size={16}
//                     className={`transition-transform ${
//                       isClassOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//                 {isClassOpen && (
//                   <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
//                     {classOptions.map((option) => (
//                       <div
//                         key={option.value}
//                         onClick={() => {
//                           setClassId(option.value);
//                           setIsClassOpen(false);
//                         }}
//                         className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
//                           classId === option.value
//                             ? "bg-gray-100 font-medium"
//                             : ""
//                         }`}
//                       >
//                         {option.label}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Group Filter */}
//             <div className="flex flex-col" ref={filterGroupRef}>
//               <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
//                 Select Group
//               </label>
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setIsGroupOpen((s) => !s)}
//                   disabled={isGroupLoading}
//                   className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm flex items-center justify-between disabled:opacity-50"
//                 >
//                   {getSelectedLabel(groupId, groupOptions)}
//                   <ChevronDown
//                     size={16}
//                     className={`transition-transform ${
//                       isGroupOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//                 {isGroupOpen && (
//                   <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
//                     {groupOptions.map((option) => (
//                       <div
//                         key={option.value}
//                         onClick={() => {
//                           setGroupId(option.value);
//                           setIsGroupOpen(false);
//                         }}
//                         className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
//                           groupId === option.value
//                             ? "bg-gray-100 font-medium"
//                             : ""
//                         }`}
//                       >
//                         {option.label}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Filter button (optional) */}
//             <div>
//               <button
//                 onClick={handleFilterBtn}
//                 disabled={!campusId && !classId && !groupId}
//                 className={`w-full px-6 py-3 font-medium flex items-center justify-center space-x-2 rounded transition-all duration-150 ${
//                   !campusId && !classId && !groupId
//                     ? "bg-gray-400 cursor-not-allowed text-white"
//                     : "bg-[#8000BD] hover:bg-[#590085] text-white"
//                 }`}
//               >
//                 {isLoading || isFetching ? (
//                   <DotLoader />
//                 ) : (
//                   <Search className="h-4 w-4" />
//                 )}
//                 <span>FILTER</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {!isFiltered ? (
//           <div className="text-center py-10 text-gray-500">
//             No data filtered yet.
//           </div>
//         ) : isLoading || isFetching ? (
//           <div className="text-center py-10 text-gray-500">
//             Loading students...
//           </div>
//         ) : (
//           <div className="px-5 md:px-10 py-6">
//             {/* Update Section */}
//             <div className="p-6 bg-[#EDEDED] border border-gray-200 rounded-t-xl">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//                 {/* Update campus (uses own refs) */}
//                 <div className="flex flex-col" ref={updateCampusRef}>
//                   <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
//                     Update Student To
//                   </label>
//                   <div className="relative">
//                     <button
//                       type="button"
//                       onClick={() => setIsUpdateCampusOpen((s) => !s)}
//                       disabled={isCampusLoading}
//                       className="w-full px-3 py-3 border border-gray-300 rounded text-sm flex items-center justify-between disabled:opacity-50"
//                     >
//                       {getSelectedLabel(updateCampusId, campusOptions)}
//                       <ChevronDown
//                         size={16}
//                         className={`transition-transform ${
//                           isUpdateCampusOpen ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>

//                     {isUpdateCampusOpen && (
//                       <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
//                         {campusOptions.map((option) => (
//                           <div
//                             key={option.value}
//                             onClick={() => {
//                               setUpdateCampusId(option.value);
//                               setIsUpdateCampusOpen(false);
//                             }}
//                             className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
//                               updateCampusId === option.value
//                                 ? "bg-gray-100 font-medium"
//                                 : ""
//                             }`}
//                           >
//                             {option.label}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Update class */}
//                 <div className="flex flex-col" ref={updateClassRef}>
//                   <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
//                     Select Class
//                   </label>
//                   <div className="relative">
//                     <button
//                       type="button"
//                       onClick={() => setIsUpdateClassOpen((s) => !s)}
//                       disabled={isClassLoading}
//                       className="w-full px-3 py-3 border border-gray-300 rounded text-sm flex items-center justify-between disabled:opacity-50"
//                     >
//                       {getSelectedLabel(updateClassId, classOptions)}
//                       <ChevronDown
//                         size={16}
//                         className={`transition-transform ${
//                           isUpdateClassOpen ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>

//                     {isUpdateClassOpen && (
//                       <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
//                         {classOptions.map((option) => (
//                           <div
//                             key={option.value}
//                             onClick={() => {
//                               setUpdateClassId(option.value);
//                               setIsUpdateClassOpen(false);
//                             }}
//                             className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
//                               updateClassId === option.value
//                                 ? "bg-gray-100 font-medium"
//                                 : ""
//                             }`}
//                           >
//                             {option.label}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Update group */}
//                 <div className="flex flex-col" ref={updateGroupRef}>
//                   <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
//                     Select Group
//                   </label>
//                   <div className="relative">
//                     <button
//                       type="button"
//                       onClick={() => setIsUpdateGroupOpen((s) => !s)}
//                       disabled={isGroupLoading}
//                       className="w-full px-3 py-3 border border-gray-300 rounded text-sm flex items-center justify-between disabled:opacity-50"
//                     >
//                       {getSelectedLabel(updateGroupId, groupOptions)}
//                       <ChevronDown
//                         size={16}
//                         className={`transition-transform ${
//                           isUpdateGroupOpen ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>

//                     {isUpdateGroupOpen && (
//                       <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
//                         {groupOptions.map((option) => (
//                           <div
//                             key={option.value}
//                             onClick={() => {
//                               setUpdateGroupId(option.value);
//                               setIsUpdateGroupOpen(false);
//                             }}
//                             className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
//                               updateGroupId === option.value
//                                 ? "bg-gray-100 font-medium"
//                                 : ""
//                             }`}
//                           >
//                             {option.label}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <button
//                     onClick={handleUpdate}
//                     disabled={isUpdating}
//                     className={`w-full text-white px-6 py-3 flex items-center justify-center space-x-2 rounded-lg font-medium transition-all duration-300 ${
//                       updateCampusId || updateClassId || updateGroupId
//                         ? "bg-[#8000BD] hover:bg-[#590085] cursor-pointer"
//                         : "bg-[#A4A9AE] cursor-not-allowed"
//                     } ${isUpdating ? "opacity-80 cursor-wait" : ""}`}
//                   >
//                     {isUpdating ? (
//                       <>
//                         <IoRefreshSharp className="animate-spin" size={20} />
//                         <span>Updating...</span>
//                       </>
//                     ) : (
//                       <>
//                         <IoRefreshSharp size={20} />
//                         <span>UPDATE</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Table Section */}
//             <div className="p-6 max-h-96 bg-[#F5F4F9] border border-gray-200 rounded-b-2xl">
//               <div className="overflow-x-auto border border-gray-200 rounded-lg">
//                 <table className="w-full border-collapse bg-white">
                  // <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
//                     <tr className="border-b border-gray-200">
//                       <th className="text-left p-3 font-medium text-gray-700 border-r border-gray-200">
                        // <div className="md:flex items-center md:space-x-2 space-y-6 md:space-y-0">
//                           <input
//                             type="checkbox"
//                             checked={selectAll}
//                             onChange={handleSelectAll}
//                             className="border-gray-300"
//                           />
                          // <span className="text-sm sm:text-base sm:rotate-0 -rotate-45 block">
                          //   Mark All
                          // </span>
//                         </div>
//                       </th>
//                       <th className="text-left p-5 font-medium text-gray-700 border-r border-gray-200">
//                         Reg. No
//                       </th>
//                       <th className="text-left p-5 font-medium text-gray-700 border-r border-gray-200">
//                         Surname
//                       </th>
//                       <th className="text-left p-5 font-medium text-gray-700 border-r border-gray-200">
//                         Other Names
//                       </th>
//                       <th className="text-left p-5 font-medium text-gray-700 border-r border-gray-200">
//                         Gender
//                       </th>
//                       <th className="text-left p-5 font-medium text-gray-700 border-r border-gray-200">
//                         Current Class
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data?.students?.map((student: any) => (
//                       <tr
//                         key={student.id}
//                         className="border-b border-gray-300 hover:bg-gray-50"
//                       >
//                         <td className="p-3 border-r border-gray-200">
//                           <input
//                             type="checkbox"
//                             checked={selectedStudents.includes(student.id)}
//                             onChange={() => handleSelectStudent(student.id)}
//                             className=" border-gray-300 text-purple-600 "
//                           />
//                         </td>
//                         <td className="p-3 text-gray-900 border-r border-gray-200">
//                           {student.registrationNumber}
//                         </td>
//                         <td className="p-3 text-gray-900 border-r border-gray-200">
//                           {student.surname}
//                         </td>
//                         <td className="p-3 text-gray-900 border-r border-gray-200">
//                           {student.otherNames}
//                         </td>
//                         <td className="p-3 text-gray-900 border-r border-gray-200">
//                           {student.gender}
//                         </td>
//                         <td className="p-3 text-gray-900 border-r border-gray-200">
//                           {student.class?.name}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Pagination */}
//         {data?.students?.length > 0 && data.students.length >= 10 && (
//           <div className="p-6 border-t border-gray-200">
//             <div className="flex items-center justify-between">
//               <div className="text-sm text-gray-600">
//                 Showing page {filters.page} (pageSize {filters.pageSize})
//               </div>

//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={prevPage}
//                   disabled={filters.page === 1}
//                   className={`px-2 py-1 transition-colors ${
//                     filters.page === 1
//                       ? "text-gray-400 cursor-not-allowed"
//                       : "hover:text-gray-700"
//                   }`}
//                 >
//                   {"<"}
//                 </button>

//                 <div className="flex items-center space-x-1">
//                   {[1, 2, 3].map((num) => (
//                     <button
//                       key={num}
//                       onClick={() => goToPage(num)}
//                       className={`w-8 h-8 rounded-lg transition-all ${
//                         filters.page === num
//                           ? "bg-purple-600 text-white shadow-sm"
//                           : "border border-gray-300 hover:bg-gray-100"
//                       }`}
//                     >
//                       {num}
//                     </button>
//                   ))}
//                   <span className="px-2 text-gray-500">...</span>
//                   <button
//                     onClick={() => goToPage(126)}
//                     className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100"
//                   >
//                     126
//                   </button>
//                 </div>

//                 <button
//                   onClick={nextPage}
//                   className={`px-2 py-1 transition-colors ${
//                     filters.page === 126
//                       ? "text-gray-400 cursor-not-allowed"
//                       : "hover:text-gray-700"
//                   }`}
//                   disabled={filters.page === 126}
//                 >
//                   {">"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChangeStudentModal;







/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { X } from "lucide-react";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { useGetAllStudentQuery, useChangeClassMutation } from "../../api/student.api";
import { useGetCampusQuery } from "../../../campus/api/campus.api";
import { useGetClassesQuery, useGetClassGroupsQuery } from "../../../classes/api/class-api";
import FilterSection from "./filter-section";
import UpdateSection from "./update-section";
import StudentTable from "./student-table"
import DotLoader from "../../../../../general/ui/dot-loader";

const ChangeStudentModal = ({ onClose }: { onClose: () => void }) => {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const [filters, setFilters] = useState({
    campusId: undefined as string | undefined,
    classId: undefined as string | undefined,
    groupId: undefined as string | undefined,
    page: 1,
    pageSize: 9,
  });

  const { data: campusData, isLoading: isCampusLoading } = useGetCampusQuery();
  const { data: classData, isLoading: isClassLoading } = useGetClassesQuery();
  const { data: groupData, isLoading: isGroupLoading } = useGetClassGroupsQuery({});

  const { data, isLoading, isFetching } = useGetAllStudentQuery(isFiltered ? filters : skipToken);
  const [changeClass, { isLoading: isUpdating }] = useChangeClassMutation();

  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setIsFiltered(true);
    setSelectedStudents([]);
    setSelectAll(false);
  };

  const handleUpdate = async (updateValues: { campusId: string; classId: string; groupId: string }) => {
    if (selectedStudents.length === 0) {
      toast.warning("Please select at least one student.");
      return;
    }
    try {
      await changeClass({
        studentIds: selectedStudents,
        campusId: Number(updateValues.campusId),
        classId: Number(updateValues.classId),
        groupId: Number(updateValues.groupId),
      }).unwrap();
      toast.success("Students updated successfully!");
      setSelectedStudents([]);
      setSelectAll(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Change Student Class</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X />
          </button>
        </div>

        {/* Filter Section */}
        <FilterSection
          campusData={campusData}
          classData={classData}
          groupData={groupData}
          isCampusLoading={isCampusLoading}
          isClassLoading={isClassLoading}
          isGroupLoading={isGroupLoading}
          onFilter={handleFilter}
          isLoading={isLoading || isFetching}
        />

        {/* Conditional display */}
        {!isFiltered ? (
          <div className="text-center py-10 text-gray-500">No data filtered yet.</div>
        ) : isLoading || isFetching ? (
          <div className="text-center py-10 text-gray-500 flex justify-center">
            <DotLoader />
          </div>
        ) : (
          <>
            {/* Update Section */}
            <UpdateSection
              campusData={campusData}
              classData={classData}
              groupData={groupData}
              onUpdate={handleUpdate}
              isUpdating={isUpdating}
            />

            {/* Table Section */}
            <StudentTable
              data={data}
              selectedStudents={selectedStudents}
              setSelectedStudents={setSelectedStudents}
              selectAll={selectAll}
              setSelectAll={setSelectAll}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ChangeStudentModal;
