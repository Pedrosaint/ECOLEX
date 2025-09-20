/* eslint-disable @typescript-eslint/no-explicit-any */
// import { X } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// const EditGroup = ({ onClose }: { onClose: () => void }) => {
//   const [showSuccess] = useState(true);
//   const [campuses, setcampuses] = useState("");
//   const [groupes, setGroupes] = useState("");
//   const [className, setClassName] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
//   const [classNo, setClassNo] = useState("")
//   const inputRef = useRef<HTMLInputElement>(null);
  

// useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [className]);

//   const handlecampusesSelect = (campus: string) => {
//     setcampuses(campus);
//     setIsDropdownOpen(false);
//   };
//   const handleGroupSelect = (grp: string) => {
//     setGroupes(grp);
//     setIsGroupDropdownOpen(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-2xl">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900">EDIT GROUP</h2>
//           <div className="flex items-center gap-2">
//             <button className="bg-[#8000BD] text-white px-4 py-2 text-sm rounded-md flex items-center">
//               <svg
//                 className="w-4 h-4 mr-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//               Save
//             </button>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 p-1"
//             >
//               <X />
//             </button>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="p-6 space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-900">
//                 Class
//               </label>
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="w-full px-3 py-2 border border-gray-300 text-left flex justify-between items-center focus:outline-none"
//                 >
//                   {campuses}
//                   <svg
//                     className={`w-5 h-5 text-gray-400 transition-transform ml-[95%] ${
//                       isDropdownOpen ? "transform rotate-180" : ""
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </button>

//                 {isDropdownOpen && (
//                   <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-200">
//                     {campus.map((campus, index) => (
//                       <div
//                         key={index}
//                         onClick={() => handlecampusesSelect(campus)}
//                         className={`px-4 py-2 cursor-pointer ${
//                           campuses === campus ? "bg-[#8000BD] text-white" : ""
//                         }`}
//                       >
//                         {campus}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-900">Group</label>
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
//                   className="w-full px-3 py-2 border border-gray-300 text-left flex justify-between items-center focus:outline-none"
//                 >
//                   {groupes}
//                   <svg
//                     className={`w-5 h-5 text-gray-400 transition-transform ml-[95%] ${
//                       isGroupDropdownOpen ? "transform rotate-180" : ""
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </button>

//                 {isGroupDropdownOpen && (
//                   <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-200">
//                     {group.map((grp, index) => (
//                       <div
//                         key={index}
//                         onClick={() => handleGroupSelect(grp)}
//                         className={`px-4 py-2 cursor-pointer ${
//                           groupes === grp ? "bg-[#8000BD] text-white" : ""
//                         }`}
//                       >
//                         {grp}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="className"
//                 className="text-sm font-medium text-gray-900"
//               >
//                 Class Name
//               </label>
//               <div className="flex">
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   value={className}
//                   onChange={(e) => setClassName(e.target.value)}
//                   className="w-full px-3 py-2 bg-[#222222] text-white focus:outline-none"
//                   placeholder="E.g., SS 1"
//                   autoFocus
//                 />
//                 <input
//                   type="text"
//                   value={classNo}
//                   onChange={(e) => setClassNo(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
//                   placeholder="E.g., 1"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Success Message */}
//           {showSuccess && (
//             <div className="bg-[#67D424] text-white px-4 py-3 text-center text-sm font-medium">
//               Group was updated successfully
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditGroup;














import { ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGetClassesQuery } from "../api/class-api";
import { useEditGroupMutation } from "../api/class-api"
import { AnimatePresence, motion } from "framer-motion";

interface DropdownOption {
  value: string;
  label: string;
}

const EditGroup = ({
  onClose,
  groupId,
  initialClassId,
  initialGroupName,
}: {
  onClose: () => void;
  groupId: number;
  initialClassId: number;
  initialGroupName: string;
}) => {
  const [classId, setClassId] = useState(String(initialClassId));
  const [groupName, setGroupName] = useState(initialGroupName);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  //  auto-focus group input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  //  get classes for dropdown
  const { data } = useGetClassesQuery();
  const classOptions: DropdownOption[] = [
    { value: "", label: "Select Class" },
    ...(data?.classes?.map((c: any) => ({
      value: String(c.id),
      label: c.name,
    })) || []),
  ];

  const getSelectedLabel = (
    value: string,
    options: DropdownOption[]
  ): string => {
    if (!options || options.length === 0) return "";
    const found = options.find((option) => option.value === value);
    return found ? found.label : options[0].label;
  };

  // ✅ use mutation
  const [editGroup, { isLoading }] = useEditGroupMutation();

  const handleSave = async () => {
    if (!classId || !groupName.trim()) return;

    try {
      await editGroup({
        id: groupId,
        payload: {
          name: groupName,
          classId: Number(classId),
        },
      }).unwrap();

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Failed to update group:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">EDIT GROUP</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-[#8000BD] text-white px-4 py-2 text-sm rounded-md flex items-center disabled:opacity-50"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Class Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Class</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-3 py-2 border border-gray-300 text-left flex justify-between items-center focus:outline-none"
                >
                  {getSelectedLabel(classId, classOptions)}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
                    {classOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => {
                          setClassId(option.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
                          classId === option.value
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Group Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Group</label>
              <input
                ref={inputRef}
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <AnimatePresence>
              <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-[#67D424] text-white px-4 py-3 text-center text-sm font-medium">
                Group was updated successfully
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditGroup;
