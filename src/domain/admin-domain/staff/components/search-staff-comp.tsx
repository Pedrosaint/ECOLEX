import { useState } from "react";
import { ListFilter, ChevronDown } from "lucide-react";
import { useSearchStaffComp } from "../hooks";

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

export default function SearchStaffComp({
  onDisplayStaff,
  isLoading,
  onClearFilters,
  hasFilters,
}: SearchStaffCompProps) {
  const [showFilters, setShowFilters] = useState(false);

  const {
    campusId,
    setCampusId,
    searchName,
    setSearchName,
    duty,
    setDuty,
    isCampusOpen,
    setIsCampusOpen,
    isDutyOpen,
    setIsDutyOpen,
    campusRef,
    dutyRef,
    campusOptions,
    dutyOptions,
    handleDisplayStaff,
    handleClearFilters,
    getSelectedLabel,
  } = useSearchStaffComp({ onDisplayStaff, onClearFilters });

  return (
    <div className="w-full">
      {/* Top row: name search + Filters toggle */}
      <div className="flex items-center gap-3 mb-3">
        <input
          type="text"
          placeholder="Search staff by name..."
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campus Dropdown */}
            <div className="flex flex-col" ref={campusRef}>
              <label className="text-sm font-semibold text-gray-700 mb-1">Campus</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCampusOpen(!isCampusOpen)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-left focus:outline-none flex items-center justify-between disabled:opacity-50 text-gray-900"
                >
                  <span className={campusId ? "text-gray-900" : "text-gray-400"}>
                    {getSelectedLabel(campusId, campusOptions)}
                  </span>
                  <ChevronDown size={15} className={`transition-transform text-gray-500 ${isCampusOpen ? "rotate-180" : ""}`} />
                </button>
                {isCampusOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {campusOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => { setCampusId(option.value); setIsCampusOpen(false); }}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-purple-600 hover:text-white ${campusId === option.value ? "bg-gray-100 font-medium" : "text-gray-700"}`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Duty Dropdown */}
            <div className="flex flex-col" ref={dutyRef}>
              <label className="text-sm font-semibold text-gray-700 mb-1">Duty</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDutyOpen(!isDutyOpen)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-left focus:outline-none flex items-center justify-between disabled:opacity-50"
                >
                  <span className={duty ? "text-gray-900" : "text-gray-400"}>
                    {getSelectedLabel(duty, dutyOptions)}
                  </span>
                  <ChevronDown size={15} className={`transition-transform text-gray-500 ${isDutyOpen ? "rotate-180" : ""}`} />
                </button>
                {isDutyOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {dutyOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => { setDuty(option.value); setIsDutyOpen(false); }}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-purple-600 hover:text-white ${duty === option.value ? "bg-gray-100 font-medium" : "text-gray-700"}`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
              onClick={handleDisplayStaff}
              disabled={isLoading || (!campusId && !duty && !searchName.trim())}
              className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-[#8000BD] hover:bg-[#6a00a1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? "Loading..." : "Display Staff"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
