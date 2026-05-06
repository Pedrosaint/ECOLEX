import { useState } from "react";
import { ListFilter, ChevronDown } from "lucide-react";
import { useSearchComp } from "../hooks";

interface SearchStudentCompProps {
  onDisplayStudents: (filters: {
    campusId?: string;
    classId?: string;
    classGroupId?: string;
    gender?: string;
    name?: string;
  }) => void;
  isLoading?: boolean;
  onClearFilters: () => void;
  hasFilters?: boolean;
}

export default function SearchStudentComp({
  onDisplayStudents,
  isLoading,
  onClearFilters,
  hasFilters,
}: SearchStudentCompProps) {
  const [showFilters, setShowFilters] = useState(false);

  const {
    campusId,
    setCampusId,
    classId,
    setClassId,
    groupId,
    setGroupId,
    gender,
    setGender,
    searchName,
    setSearchName,
    isCampusOpen,
    setIsCampusOpen,
    isClassOpen,
    setIsClassOpen,
    isGroupOpen,
    setIsGroupOpen,
    isGenderOpen,
    setIsGenderOpen,
    campusRef,
    classRef,
    groupRef,
    genderRef,
    campusOptions,
    classOptions,
    groupOptions,
    genderOptions,
    handleDisplayStudents,
    handleClearFilters,
    getSelectedLabel,
  } = useSearchComp({ onDisplayStudents, onClearFilters });

  const Dropdown = ({
    label,
    value,
    options,
    isOpen,
    setIsOpen,
    setValue,
    ref: divRef,
  }: {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    setValue: (v: string) => void;
    ref?: React.RefObject<HTMLDivElement>;
  }) => (
    <div className="flex flex-col" ref={divRef}>
      <label className="text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-left focus:outline-none flex items-center justify-between disabled:opacity-50"
        >
          <span className={value ? "text-gray-900" : "text-gray-400"}>
            {getSelectedLabel(value, options)}
          </span>
          <ChevronDown size={15} className={`transition-transform text-gray-500 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => { setValue(opt.value); setIsOpen(false); }}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-purple-600 hover:text-white ${value === opt.value ? "bg-gray-100 font-medium" : "text-gray-700"}`}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Top row: name search + Filters toggle */}
      <div className="flex items-center gap-3 mb-3">
        <input
          type="text"
          placeholder="Search students by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-400 disabled:opacity-50"
        />
        <button
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          className={`flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium transition-colors cursor-pointer ${
            showFilters
              ? "bg-purple-50 border-purple-400 text-purple-700"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <ListFilter size={15} />
          Filters
        </button>
      </div>

      {/* Collapsible filter panel */}
      {showFilters && (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Dropdown
              label="Campus"
              value={campusId}
              options={campusOptions}
              isOpen={isCampusOpen}
              setIsOpen={setIsCampusOpen}
              setValue={setCampusId}
              ref={campusRef}
            />
            <Dropdown
              label="Class"
              value={classId}
              options={classOptions}
              isOpen={isClassOpen}
              setIsOpen={setIsClassOpen}
              setValue={setClassId}
              ref={classRef}
            />
            <Dropdown
              label="Group"
              value={groupId}
              options={groupOptions}
              isOpen={isGroupOpen}
              setIsOpen={setIsGroupOpen}
              setValue={setGroupId}
              ref={groupRef}
            />
            <Dropdown
              label="Gender"
              value={gender}
              options={genderOptions}
              isOpen={isGenderOpen}
              setIsOpen={setIsGenderOpen}
              setValue={setGender}
              ref={genderRef}
            />
          </div>

          {/* Footer actions */}
          <div className="flex justify-end gap-2 mt-4">
            {hasFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Clear Filters
              </button>
            )}
            <button
              type="button"
              onClick={handleDisplayStudents}
              disabled={isLoading || (!campusId && !classId && !groupId && !gender && !searchName.trim())}
              className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-[#8000BD] hover:bg-[#6a00a1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? "Loading..." : "Display Students"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
