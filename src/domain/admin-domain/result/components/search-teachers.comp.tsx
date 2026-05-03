import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useSearchTeachers } from "../hooks";
import type { TeacherSearchParams } from "../types";
import type { Campuse } from "../../campus/response/campuse.response";

export type { TeacherSearchParams };

interface Props {
  onSearch: (params: TeacherSearchParams) => void;
  isSearching: boolean;
}

const selectBase = "w-full px-4 py-4 border border-gray-300 rounded text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10";
const chevron = (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </div>
);

export default function SearchTeachersComp({ onSearch, isSearching }: Props) {
  const {
    sessionId, termId, setTermId,
    staffId, setStaffId, classId, subjectId, setSubjectId,
    campusId, setCampusId,
    sessionsData, sessionsLoading,
    classesData, classesLoading,
    staffData, staffLoading,
    subjectsLoading, subjects,
    campusesLoading, campuses,
    terms, canSearch,
    handleSessionChange, handleClassChange, handleSearch,
  } = useSearchTeachers({ onSearch, isSearching });

  return (
    <motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">

        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Academic Session <span className="text-red-500">*</span></label>
          <div className="relative">
            <select value={sessionId} onChange={(e) => handleSessionChange(e.target.value)} disabled={sessionsLoading} className={`${selectBase} ${sessionId ? "text-gray-900" : "text-gray-400"}`}>
              <option value="">{sessionsLoading ? "Loading..." : "Select Session"}</option>
              {(sessionsData?.data ?? []).map((s) => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
            </select>
            {chevron}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Academic Term <span className="text-red-500">*</span></label>
          <div className="relative">
            <select value={termId} onChange={(e) => setTermId(e.target.value)} disabled={!sessionId} className={`${selectBase} ${termId ? "text-gray-900" : "text-gray-400"} ${!sessionId ? "bg-gray-50 cursor-not-allowed" : ""}`}>
              <option value="">{!sessionId ? "Select session first" : terms.length === 0 ? "No terms" : "Select Term"}</option>
              {terms.map((t) => <option key={t.id} value={String(t.id)}>{t.name}</option>)}
            </select>
            {chevron}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Teacher <span className="text-red-500">*</span></label>
          <div className="relative">
            <select value={staffId} onChange={(e) => setStaffId(e.target.value)} disabled={staffLoading} className={`${selectBase} ${staffId ? "text-gray-900" : "text-gray-400"}`}>
              <option value="">{staffLoading ? "Loading..." : "Select Teacher"}</option>
              {(staffData?.staff ?? []).map((s) => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
            </select>
            {chevron}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Class <span className="text-red-500">*</span></label>
          <div className="relative">
            <select value={classId} onChange={(e) => handleClassChange(e.target.value)} disabled={classesLoading} className={`${selectBase} ${classId ? "text-gray-900" : "text-gray-400"}`}>
              <option value="">{classesLoading ? "Loading..." : "Select Class"}</option>
              {(classesData?.classes ?? []).map((c) => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
            </select>
            {chevron}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Subject <span className="text-red-500">*</span></label>
          <div className="relative">
            <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} disabled={!classId || subjectsLoading} className={`${selectBase} ${subjectId ? "text-gray-900" : "text-gray-400"} ${!classId ? "bg-gray-50 cursor-not-allowed" : ""}`}>
              <option value="">{!classId ? "Select a class first" : subjectsLoading ? "Loading subjects..." : subjects.length === 0 ? "No subjects for class" : "Select Subject"}</option>
              {subjects.map((s) => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
            </select>
            {chevron}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Campus <span className="text-red-500">*</span></label>
          <div className="relative">
            <select value={campusId} onChange={(e) => setCampusId(e.target.value)} disabled={campusesLoading} className={`${selectBase} ${campusId ? "text-gray-900" : "text-gray-400"}`}>
              <option value="">{campusesLoading ? "Loading..." : "Select Campus"}</option>
              {campuses.map((c: Campuse) => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
            </select>
            {chevron}
          </div>
        </div>
      </div>

      <button type="button" onClick={handleSearch} disabled={!canSearch || isSearching} className={`w-full py-3 flex items-center justify-center gap-2 font-semibold text-white transition-colors ${canSearch && !isSearching ? "bg-[#8000BD] hover:bg-[#640094] cursor-pointer" : "bg-[#D9D9D9] cursor-not-allowed"}`}>
        <Search className="w-4 h-4" />
        {isSearching ? "LOADING..." : "DISPLAY RESULT"}
      </button>
    </motion.div>
  );
}
