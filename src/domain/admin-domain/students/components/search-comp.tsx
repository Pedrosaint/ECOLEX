import { useState } from "react";


export default function SearchInterface() {
  const [campus, setCampus] = useState("Campus 1");
  const [searchName, setSearchName] = useState("");
  const [gender, setGender] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [group, setGroup] = useState("All Groups");

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
        {/* Campus Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">Campus</label>
          <select
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          >
            <option value="Campus 1">Campus 1</option>
            <option value="Campus 4">Campus 4</option>
            <option value="Campus 3">Campus 3</option>
          </select>
        </div>

        {/* Search By Name Input */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Search By Name
          </label>
          <input
            type="text"
            placeholder="e.g Emeka"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Search By Gender Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Search By Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm text-gray-400 focus:outline-none"
          >
            <option value="" disabled>
              Choose
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Search By Class Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Search By Class
          </label>
          <select
            value={searchClass}
            onChange={(e) => setSearchClass(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm text-gray-400 focus:outline-none"
          >
            <option value="" disabled>
              Choose
            </option>
            <option value="Class A">Class A</option>
            <option value="Class B">Class B</option>
            <option value="Class C">Class C</option>
          </select>
        </div>

        {/* Select Group Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Select Group
          </label>
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          >
            <option value="All Groups">All Groups</option>
            <option value="Group 1">Group 1</option>
            <option value="Group 4">Group 4</option>
            <option value="Group 3">Group 3</option>
          </select>
        </div>
      </div>
    </div>
  );
}










// import { useState } from "react";
// import { Search, X } from "lucide-react";

// interface SearchStudentCompProps {
//   onDisplayStaff: (filters: {
//     campusId?: string;
//     groupId?: string;
//     classId?: string;
//     gender?: string;
//     name?: string;
//   }) => void;
//   isLoading?: boolean;
//   onClearFilters: () => void;
// }

// export default function SearchInterface({
//   onDisplayStaff,
//   isLoading = false,
//   onClearFilters,
// }: SearchStudentCompProps) {
//   const [campus, setCampus] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [gender, setGender] = useState("");
//   const [searchClass, setSearchClass] = useState("");
//   const [group, setGroup] = useState("");

//   // ✅ Check if any filters are active
//   const hasFilters =
//     !!campus || !!searchName.trim() || !!gender || !!searchClass || !!group;

//   const handleDisplayStaff = () => {
//     onDisplayStaff({
//       campusId: campus || undefined,
//       name: searchName || undefined,
//       gender: gender || undefined,
//       classId: searchClass || undefined,
//       groupId: group || undefined,
//     });
//   };

//   const handleClearFilters = () => {
//     setCampus("");
//     setSearchName("");
//     setGender("");
//     setSearchClass("");
//     setGroup("");
//     onClearFilters();
//   };

//   return (
//     <div className="w-full">
//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
//         {/* Campus */}
//         <div className="flex flex-col">
//           <label className="text-sm font-bold text-[#120D1C] mb-2">
//             Campus
//           </label>
//           <select
//             value={campus}
//             onChange={(e) => setCampus(e.target.value)}
//             className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm focus:outline-none"
//           >
//             <option value="">Select Campus</option>
//             <option value="Campus 1">Campus 1</option>
//             <option value="Campus 4">Campus 4</option>
//             <option value="Campus 3">Campus 3</option>
//           </select>
//         </div>

//         {/* Search By Name */}
//         <div className="flex flex-col">
//           <label className="text-sm font-bold text-[#120D1C] mb-2">
//             Search By Name
//           </label>
//           <input
//             type="text"
//             placeholder="e.g Emeka"
//             value={searchName}
//             onChange={(e) => setSearchName(e.target.value)}
//             className="w-full px-3 py-3 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
//           />
//         </div>

//         {/* Gender */}
//         <div className="flex flex-col">
//           <label className="text-sm font-bold text-[#120D1C] mb-2">
//             Gender
//           </label>
//           <select
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm"
//           >
//             <option value="">Choose</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>

//         {/* Class */}
//         <div className="flex flex-col">
//           <label className="text-sm font-bold text-[#120D1C] mb-2">Class</label>
//           <select
//             value={searchClass}
//             onChange={(e) => setSearchClass(e.target.value)}
//             className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm"
//           >
//             <option value="">Choose</option>
//             <option value="Class A">Class A</option>
//             <option value="Class B">Class B</option>
//             <option value="Class C">Class C</option>
//           </select>
//         </div>

//         {/* Group */}
//         <div className="flex flex-col">
//           <label className="text-sm font-bold text-[#120D1C] mb-2">Group</label>
//           <select
//             value={group}
//             onChange={(e) => setGroup(e.target.value)}
//             className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm"
//           >
//             <option value="">Select Group</option>
//             <option value="Group 1">Group 1</option>
//             <option value="Group 4">Group 4</option>
//             <option value="Group 3">Group 3</option>
//           </select>
//         </div>
//       </div>

//       {/* Clear Filters */}
//       <div className="flex justify-end mt-5 gap-4">
//         {hasFilters && (
//           <button
//             type="button"
//             onClick={handleClearFilters}
//             disabled={isLoading}
//             className="bg-gray-500 text-[13px] text-white px-3 py-1 rounded flex items-center gap-2 font-semibold disabled:opacity-50 hover:bg-gray-600"
//           >
//             <X size={18} /> CLEAR FILTERS
//           </button>
//         )}
//       </div>

//       {/* Display Staff button */}
//       {isLoading || !hasFilters ? (
//         <div className="bg-[#8000BD]/80 px-6 py-3 mb-4 mt-5 rounded cursor-not-allowed">
//           <div className="flex items-center justify-center">
//             <Search className="w-5 h-5 mr-2 text-white" />
//             <button
//               type="button"
//               disabled
//               className="bg-transparent text-white font-semibold"
//             >
//               {isLoading ? "LOADING..." : "DISPLAY STAFF"}
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div
//           onClick={handleDisplayStaff}
//           className="bg-[#8000BD] px-6 py-3 mb-4 mt-5 rounded cursor-pointer hover:bg-[#6a00a1]"
//         >
//           <div className="flex items-center justify-center">
//             <Search className="w-5 h-5 mr-2 text-white" />
//             <button
//               type="button"
//               disabled={isLoading}
//               className="bg-transparent text-white font-semibold"
//             >
//               DISPLAY STAFF
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
