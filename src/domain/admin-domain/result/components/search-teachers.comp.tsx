import { useState } from "react";
import { ListFilter } from "lucide-react";
import { useSearchTeachers } from "../hooks";
import type { TeacherSearchParams } from "../types";

export type { TeacherSearchParams };

interface Props {
  onSearch: (params: TeacherSearchParams) => void;
  isSearching: boolean;
}

const selectBase = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-purple-400 pr-8";
const chevron = (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </div>
);

export default function SearchTeachersComp({ onSearch, isSearching }: Props) {
  const [showFilters, setShowFilters] = useState(false);

  const {
    sessionId,
    staffId, setStaffId,
    subjectId, setSubjectId,
    classId, setClassId,
    sessionsData, sessionsLoading,
    classesData, classesLoading,
    staffData, staffLoading,
    subjectsLoading, subjects,
    canSearch,
    handleSessionChange, handleSearch,
  } = useSearchTeachers({ onSearch, isSearching });

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-3">
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

      {showFilters && (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Academic Session */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Academic Session <span className="text-red-500">*</span></label>
              <div className="relative">
                <select value={sessionId} onChange={(e) => handleSessionChange(e.target.value)} disabled={sessionsLoading} className={`${selectBase} ${sessionId ? "text-gray-900" : "text-gray-400"}`}>
                  <option value="">{sessionsLoading ? "Loading..." : "Select Session"}</option>
                  {(sessionsData?.data ?? []).map((s) => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
                </select>
                {chevron}
              </div>
            </div>

            {/* Teacher */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Teacher <span className="text-red-500">*</span></label>
              <div className="relative">
                <select value={staffId} onChange={(e) => setStaffId(e.target.value)} disabled={staffLoading} className={`${selectBase} ${staffId ? "text-gray-900" : "text-gray-400"}`}>
                  <option value="">{staffLoading ? "Loading..." : "Select Teacher"}</option>
                  {(staffData?.staff ?? []).map((s) => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
                </select>
                {chevron}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Subject <span className="text-red-500">*</span></label>
              <div className="relative">
                <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} disabled={subjectsLoading} className={`${selectBase} ${subjectId ? "text-gray-900" : "text-gray-400"}`}>
                  <option value="">{subjectsLoading ? "Loading..." : "Select Subject"}</option>
                  {subjects.map((s) => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
                </select>
                {chevron}
              </div>
            </div>

            {/* Class */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Class <span className="text-red-500">*</span></label>
              <div className="relative">
                <select value={classId} onChange={(e) => setClassId(e.target.value)} disabled={classesLoading} className={`${selectBase} ${classId ? "text-gray-900" : "text-gray-400"}`}>
                  <option value="">{classesLoading ? "Loading..." : "Select Class"}</option>
                  {(classesData?.classes ?? []).map((c) => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
                </select>
                {chevron}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSearch}
              disabled={!canSearch || isSearching}
              className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-[#8000BD] hover:bg-[#640094] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSearching ? "Loading..." : "Display Result"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
