// import { useState } from "react";
// import { Search } from "lucide-react";

// interface SearchStaffCompProps {
//   onDisplayStaff: (filters: {
//     campusId?: string;
//     duty?: string;
//     classId?: string;
//     subjectId?: string;
//     name?: string;
//   }) => void;
//   isLoading?: boolean;
// }

// export default function SearchStaffComp({
//   onDisplayStaff,
//   isLoading,
// }: SearchStaffCompProps) {
//   const [campusId, setCampusId] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [duty, setDuty] = useState("");
//   // const [classId, setClassId] = useState("");
//   // const [subjectId, setSubjectId] = useState("");

//   const handleDisplayStaff = () => {
//     onDisplayStaff({
//       campusId: campusId || undefined,
//       duty: duty || undefined,
//       // classId: classId || undefined,
//       // subjectId: subjectId || undefined,
//       name: searchName || undefined,
//     });
//   };

//   return (
//     <div className="w-full">
//       {/* Search Form */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
//         {/* Campus Dropdown */}
//         <div className="flex flex-col">
//           <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
//             Campus
//           </label>
//           <select
//             value={campusId}
//             onChange={(e) => setCampusId(e.target.value)}
//             className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm focus:outline-none"
//             disabled={isLoading}
//           >
//             <option value="">Select Campus</option>
//             <option value="1">Campus 1</option>
//             <option value="2">Campus 2</option>
//           </select>
//         </div>

//         {/* Search By Name Input */}
//         <div className="flex flex-col">
//           <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
//             Search By Name
//           </label>
//           <input
//             type="text"
//             placeholder="e.g Emeka"
//             value={searchName}
//             onChange={(e) => setSearchName(e.target.value)}
//             className="w-full px-3 py-3 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
//             disabled={isLoading}
//           />
//         </div>

//         {/* Search By Duty Dropdown */}
//         <div className="flex flex-col">
//           <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
//             Search By Duty
//           </label>
//           <select
//             value={duty}
//             onChange={(e) => setDuty(e.target.value)}
//             className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm focus:outline-none"
//             disabled={isLoading}
//           >
//             <option value="">Select Duty</option>
//             <option value="Teacher">Teacher</option>
//             <option value="Security">Security</option>
//             <option value="Cleaner">Cleaner</option>
//             <option value="HR">HR</option>
//           </select>
//         </div>

//         {/* Search By Class Dropdown */}
//         {/* <div className="flex flex-col">
//           <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
//             Search By Class
//           </label>
//           <select
//             value={classId}
//             onChange={(e) => setClassId(e.target.value)}
//             className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm focus:outline-none"
//             disabled={isLoading}
//           >
//             <option value="">Select Class</option>
//             <option value="1">JSS1</option>
//             <option value="2">JSS2</option>
//           </select>
//         </div> */}

//         {/* Select Subject Input */}
//         {/* <div className="flex flex-col">
//           <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
//             Select Subject
//           </label>
//           <input
//             type="text"
//             placeholder="e.g Mathematics"
//             value={subjectId}
//             onChange={(e) => setSubjectId(e.target.value)}
//             className="w-full px-3 py-3 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
//             disabled={isLoading}
//           />
//         </div> */}
//       </div>

//       <div className="bg-[#8000BD] px-6 py-3 mb-4 mt-5">
//         <div className="flex items-center justify-center">
//           <Search className="w-5 h-5 mr-2 text-white" />
//           <button
//             type="button"
//             onClick={handleDisplayStaff}
//             disabled={isLoading}
//             className="bg-transparent text-white font-semibold outline-none placeholder-white disabled:opacity-50"
//           >
//             DISPLAY STAFF
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown } from "lucide-react";

interface SearchStaffCompProps {
  onDisplayStaff: (filters: {
    campusId?: string;
    duty?: string;
    name?: string;
  }) => void;
  isLoading?: boolean;
  onClearFilters: () => void;
  hasFilters?: boolean;
}

interface DropdownOption {
  value: string;
  label: string;
}

export default function SearchStaffComp({
  onDisplayStaff,
  isLoading,
  onClearFilters,
  hasFilters,
}: SearchStaffCompProps) {
  const [campusId, setCampusId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [duty, setDuty] = useState("");
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [isDutyOpen, setIsDutyOpen] = useState(false);
  const campusRef = useRef<HTMLDivElement>(null);
  const dutyRef = useRef<HTMLDivElement>(null);

  const campusOptions: DropdownOption[] = [
    { value: "", label: "Select Campus" },
    { value: "1", label: "Campus 1" },
    { value: "2", label: "Campus 2" },
  ];

  const dutyOptions: DropdownOption[] = [
    { value: "", label: "Select Duty" },
    { value: "Teacher", label: "Teacher" },
    { value: "Security", label: "Security" },
    { value: "Cleaner", label: "Cleaner" },
    { value: "HR", label: "HR" },
  ];

  const handleDisplayStaff = () => {
    onDisplayStaff({
      campusId: campusId || undefined,
      duty: duty || undefined,
      name: searchName || undefined,
    });
  };

  const handleClearFilters = () => {
    setCampusId("");
    setSearchName("");
    setDuty("");
    onClearFilters();
  };

  const getSelectedLabel = (
    value: string,
    options: DropdownOption[]
  ): string => {
    return (
      options.find((option) => option.value === value)?.label ||
      options[0].label
    );
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        campusRef.current &&
        !campusRef.current.contains(event.target as Node)
      ) {
        setIsCampusOpen(false);
      }
      if (dutyRef.current && !dutyRef.current.contains(event.target as Node)) {
        setIsDutyOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      {/* Search Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Campus Dropdown */}
        <div className="flex flex-col" ref={campusRef}>
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
            Campus
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCampusOpen(!isCampusOpen)}
              disabled={isLoading}
              className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm text-left focus:outline-none flex items-center justify-between disabled:opacity-50"
            >
              {getSelectedLabel(campusId, campusOptions)}
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isCampusOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCampusOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
                {campusOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setCampusId(option.value);
                      setIsCampusOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
                      campusId === option.value ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search By Name Input */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
            Search By Name
          </label>
          <input
            type="text"
            placeholder="e.g Emeka"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
            disabled={isLoading}
          />
        </div>

        {/* Search By Duty Dropdown */}
        <div className="flex flex-col" ref={dutyRef}>
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
            Search By Duty
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDutyOpen(!isDutyOpen)}
              disabled={isLoading}
              className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm text-left focus:outline-none flex items-center justify-between disabled:opacity-50"
            >
              {getSelectedLabel(duty, dutyOptions)}
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isDutyOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDutyOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-[#D1D1D1] rounded shadow-lg max-h-60 overflow-auto">
                {dutyOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setDuty(option.value);
                      setIsDutyOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
                      duty === option.value ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-5 gap-4">
        {hasFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            disabled={isLoading}
            className="bg-gray-500 text-white px-6 py-3 rounded flex items-center gap-2 font-semibold disabled:opacity-50 hover:bg-gray-600 transition-colors"
          >
            <X size={20} />
            CLEAR FILTERS
          </button>
        )}
      </div>

      <div
        onClick={handleDisplayStaff}
        className="bg-[#8000BD] px-6 py-3 mb-4 mt-5 rounded cursor-pointer hover:bg-[#6a00a1] transition-colors"
      >
        <div className="flex items-center justify-center">
          <Search className="w-5 h-5 mr-2 text-white" />
          <button
            type="button"
            disabled={isLoading}
            className="bg-transparent text-white font-semibold outline-none placeholder-white disabled:opacity-50"
          >
            {isLoading ? "LOADING..." : "DISPLAY STAFF"}
          </button>
        </div>
      </div>
    </div>
  );
}