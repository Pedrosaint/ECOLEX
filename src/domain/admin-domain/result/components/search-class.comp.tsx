import { useState } from "react";
import { ListFilter } from "lucide-react";
import { useSearchClass } from "../hooks";
import type { ClassSearchParams } from "../types";

export type { ClassSearchParams };

interface Props {
  onSearch: (params: ClassSearchParams) => void;
  isSearching: boolean;
}

const selectBase = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-purple-400 pr-8";
const disabledCls = "bg-gray-50 text-gray-400 cursor-not-allowed";
const chevron = (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </div>
);

export default function SearchClassComp({ onSearch, isSearching }: Props) {
  const [showFilters, setShowFilters] = useState(false);

  const {
    campusId, setCampusId, sessionId, termId, setTermId,
    classId, classGroupId, setClassGroupId,
    campusData, campusLoading, sessionsData, sessionsLoading,
    classesData, classesLoading, groupsLoading,
    terms, filteredGroups, canSearch,
    handleSessionChange, handleClassChange, handleSearch,
  } = useSearchClass({ onSearch, isSearching });

  return (
    <div className="w-full">
      {/* Top row: Filters toggle */}
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

      {/* Collapsible filter panel */}
      {showFilters && (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Campus</label>
              <div className="relative">
                <select value={campusId} onChange={(e) => setCampusId(e.target.value)} disabled={campusLoading} className={`${selectBase} ${campusId ? "text-gray-900" : "text-gray-400"}`}>
                  <option value="">{campusLoading ? "Loading..." : "Select Campus"}</option>
                  {(campusData?.campuses ?? []).map((c) => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
                </select>
                {chevron}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Academic Session</label>
              <div className="relative">
                <select value={sessionId} onChange={(e) => handleSessionChange(e.target.value)} disabled={sessionsLoading} className={`${selectBase} ${sessionId ? "text-gray-900" : "text-gray-400"}`}>
                  <option value="">{sessionsLoading ? "Loading..." : "Select Session"}</option>
                  {(sessionsData?.data ?? []).map((s) => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
                </select>
                {chevron}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Term</label>
              <div className="relative">
                <select value={termId} onChange={(e) => setTermId(e.target.value)} disabled={!sessionId} className={`${selectBase} ${termId ? "text-gray-900" : "text-gray-400"} ${!sessionId ? disabledCls : ""}`}>
                  <option value="">{!sessionId ? "Select session first" : terms.length === 0 ? "No terms" : "Select Term"}</option>
                  {terms.map((t) => <option key={t.id} value={String(t.id)}>{t.name}</option>)}
                </select>
                {chevron}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Class</label>
              <div className="relative">
                <select value={classId} onChange={(e) => handleClassChange(e.target.value)} disabled={classesLoading} className={`${selectBase} ${classId ? "text-gray-900" : "text-gray-400"}`}>
                  <option value="">{classesLoading ? "Loading..." : "Select Class"}</option>
                  {(classesData?.classes ?? []).map((c) => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
                </select>
                {chevron}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Group</label>
              <div className="relative">
                <select value={classGroupId} onChange={(e) => setClassGroupId(e.target.value)} disabled={!classId || groupsLoading} className={`${selectBase} ${classGroupId ? "text-gray-900" : "text-gray-400"} ${!classId ? disabledCls : ""}`}>
                  <option value="">{!classId ? "Select a class first" : groupsLoading ? "Loading..." : filteredGroups.length === 0 ? "No groups" : "Select Group"}</option>
                  {filteredGroups.map((g) => <option key={g.id} value={String(g.id)}>{g.name}</option>)}
                </select>
                {chevron}
              </div>
            </div>
          </div>

          {/* Footer */}
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
