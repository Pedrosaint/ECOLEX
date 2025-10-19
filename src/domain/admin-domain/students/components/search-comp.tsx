/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { useGetCampusQuery } from "../../campus/api/campus.api";
import DotLoader from "../../../../general/ui/dot-loader";
import { useGetClassesQuery, useGetClassGroupsQuery } from "../../classes/api/class-api";

interface SearchStudentCompProps {
  onDisplayStudents: (filters: {
    campusId?: string;
    classId?: string;
    groupId?: string;
    gender?: string;
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

export default function SearchStudentComp({
  onDisplayStudents,
  isLoading,
  onClearFilters,
  hasFilters,
}: SearchStudentCompProps) {
  const [campusId, setCampusId] = useState("");
  const [classId, setClassId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [gender, setGender] = useState("");
  const [searchName, setSearchName] = useState("");
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  const campusRef = useRef<HTMLDivElement>(null);
  const classRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);

  const { data: campusData } = useGetCampusQuery();
  const { data: classData } = useGetClassesQuery();
  const { data: groupData } = useGetClassGroupsQuery({});

  // Campus dropdown options
  const campusOptions: DropdownOption[] = [
    { value: "", label: "Select Campus" },
    ...(campusData?.campuses?.map((c: any) => ({
      value: String(c.id),
      label: c.name,
    })) || []),
  ];

  // Class dropdown options
  const classOptions: DropdownOption[] = [
    { value: "", label: "Select Class" },
    ...(classData?.classes?.map((c: any) => ({
      value: String(c.id),
      label: c.name,
    })) || []),
  ];

  // Group dropdown options
  const groupOptions: DropdownOption[] = [
    { value: "", label: "Select Group" },
    ...(groupData?.groups?.map((g: any) => ({
      value: String(g.id),
      label: g.name,
    })) || []),
  ];

  // Gender dropdown options
  const genderOptions: DropdownOption[] = [
    { value: "", label: "Select Gender" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const handleDisplayStudents = () => {
    onDisplayStudents({
      campusId: campusId || undefined,
      classId: classId || undefined,
      groupId: groupId || undefined,
      gender: gender || undefined,
      name: searchName || undefined,
    });
  };

  const handleClearFilters = () => {
    setCampusId("");
    setClassId("");
    setGroupId("");
    setGender("");
    setSearchName("");
    onClearFilters();
  };

  const getSelectedLabel = (
    value: string,
    options: DropdownOption[]
  ): string => {
    if (!options || options.length === 0) return "";
    const found = options.find((option) => option.value === value);
    return found ? found.label : options[0].label;
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
      if (
        classRef.current &&
        !classRef.current.contains(event.target as Node)
      ) {
        setIsClassOpen(false);
      }
      if (
        groupRef.current &&
        !groupRef.current.contains(event.target as Node)
      ) {
        setIsGroupOpen(false);
      }
      if (
        genderRef.current &&
        !genderRef.current.contains(event.target as Node)
      ) {
        setIsGenderOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
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
              className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm flex items-center justify-between disabled:opacity-50"
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

        {/* Name Input */}
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

        {/* Gender Dropdown */}
        <div className="flex flex-col" ref={genderRef}>
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
            Gender
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsGenderOpen(!isGenderOpen)}
              disabled={isLoading}
              className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm flex items-center justify-between disabled:opacity-50"
            >
              {getSelectedLabel(gender, genderOptions)}
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isGenderOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isGenderOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
                {genderOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setGender(option.value);
                      setIsGenderOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
                      gender === option.value ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Class Dropdown */}
        <div className="flex flex-col" ref={classRef}>
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
            Class
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsClassOpen(!isClassOpen)}
              disabled={isLoading}
              className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm flex items-center justify-between disabled:opacity-50"
            >
              {getSelectedLabel(classId, classOptions)}
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isClassOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isClassOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
                {classOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setClassId(option.value);
                      setIsClassOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
                      classId === option.value ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Group Dropdown */}
        <div className="flex flex-col" ref={groupRef}>
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
            Group
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsGroupOpen(!isGroupOpen)}
              disabled={isLoading}
              className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm flex items-center justify-between disabled:opacity-50"
            >
              {getSelectedLabel(groupId, groupOptions)}
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isGroupOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isGroupOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
                {groupOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setGroupId(option.value);
                      setIsGroupOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
                      groupId === option.value ? "bg-gray-100 font-medium" : ""
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

      {/* Clear Filters Button */}
      <div className="flex justify-end mt-3 mb-2 gap-4">
        {hasFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            disabled={isLoading}
            className="bg-red-600 text-[13px] text-white px-3 py-1 rounded flex items-center gap-2 font-semibold disabled:opacity-50 hover:bg-red-700 transition-colors cursor-pointer"
          >
            <X size={20} />
            CLEAR FILTERS
          </button>
        )}
      </div>

      {/* Display Button */}
      {isLoading ||
      (!campusId && !searchName.trim() && !gender && !classId && !groupId) ? (
        <div className="bg-[#8000BD]/80 px-6 py-3 mb-4 rounded cursor-not-allowed opacity-50">
          <div className="flex items-center justify-center">
            {!isLoading && <Search className="w-5 h-5 mr-2 text-white" />}
            <button
              type="button"
              disabled
              className="bg-transparent text-white font-semibold cursor-not-allowed"
            >
              {isLoading ? <DotLoader /> : "DISPLAY STUDENTS"}
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleDisplayStudents}
          className="bg-[#8000BD] px-6 py-3 mb-4 rounded cursor-pointer hover:bg-[#6a00a1] transition-colors"
        >
          <div className="flex items-center justify-center">
            <Search className="w-5 h-5 mr-2 text-white" />
            <button
              type="button"
              className="bg-transparent text-white font-semibold cursor-pointer"
            >
              DISPLAY STUDENTS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
