import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetSessionsQuery } from "../../overview/api/admin-overview.api";
import { useGetClassesQuery } from "../../classes/api/class-api";
import { useGetAllStudentQuery } from "../../students/api/student.api";

export interface StudentSearchParams {
  studentId: number;
  classId: number;
  academicSessionId: number;
  termId: number;
}

interface Props {
  onSearch: (params: StudentSearchParams) => void;
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

const SearchStudentComp = ({ onSearch, isSearching }: Props) => {
  const [sessionId, setSessionId] = useState("");
  const [termId, setTermId] = useState("");
  const [classId, setClassId] = useState("");
  const [studentId, setStudentId] = useState("");

  const { data: sessionsData, isLoading: sessionsLoading } = useGetSessionsQuery();
  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data: studentsData, isLoading: studentsLoading } = useGetAllStudentQuery(
    classId ? { classId, pageSize: 200 } : skipToken
  );

  const selectedSession = (sessionsData?.data ?? []).find((s) => s.id === Number(sessionId));
  const terms = selectedSession?.terms ?? [];

  const canSearch = sessionId && termId && classId && studentId;

  const handleSessionChange = (val: string) => {
    setSessionId(val);
    setTermId("");
  };

  const handleClassChange = (val: string) => {
    setClassId(val);
    setStudentId("");
  };

  const handleSearch = () => {
    if (!canSearch) return;
    onSearch({
      studentId: Number(studentId),
      classId: Number(classId),
      academicSessionId: Number(sessionId),
      termId: Number(termId),
    });
  };

  return (
    <motion.div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">

        {/* Academic Session */}
        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
            Academic Session <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={sessionId}
              onChange={(e) => handleSessionChange(e.target.value)}
              disabled={sessionsLoading}
              className={`${selectBase} ${sessionId ? "text-gray-900" : "text-gray-400"}`}
            >
              <option value="">{sessionsLoading ? "Loading..." : "Select Session"}</option>
              {(sessionsData?.data ?? []).map((s) => (
                <option key={s.id} value={String(s.id)}>{s.name}</option>
              ))}
            </select>
            {chevron}
          </div>
        </div>

        {/* Term — locked until session picked */}
        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
            Select Term <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={termId}
              onChange={(e) => setTermId(e.target.value)}
              disabled={!sessionId}
              className={`${selectBase} ${termId ? "text-gray-900" : "text-gray-400"} ${!sessionId ? "bg-gray-50 cursor-not-allowed" : ""}`}
            >
              <option value="">
                {!sessionId ? "Select session first" : terms.length === 0 ? "No terms for session" : "Select Term"}
              </option>
              {terms.map((t) => (
                <option key={t.id} value={String(t.id)}>{t.name}</option>
              ))}
            </select>
            {chevron}
          </div>
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
            Select Class <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={classId}
              onChange={(e) => handleClassChange(e.target.value)}
              disabled={classesLoading}
              className={`${selectBase} ${classId ? "text-gray-900" : "text-gray-400"}`}
            >
              <option value="">{classesLoading ? "Loading..." : "Select Class"}</option>
              {(classesData?.classes ?? []).map((c) => (
                <option key={c.id} value={String(c.id)}>{c.name ?? c.name}</option>
              ))}
            </select>
            {chevron}
          </div>
        </div>

        {/* Student — disabled until class is picked */}
        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
            Select Student <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              disabled={!classId || studentsLoading}
              className={`${selectBase} ${studentId ? "text-gray-900" : "text-gray-400"} ${!classId ? "bg-gray-50 cursor-not-allowed" : ""}`}
            >
              <option value="">
                {!classId
                  ? "Select a class first"
                  : studentsLoading
                  ? "Loading students..."
                  : (studentsData?.students ?? []).length === 0
                  ? "No students in this class"
                  : "Select Student"}
              </option>
              {(studentsData?.students ?? []).map((s) => (
                <option key={s.id} value={String(s.id)}>
                  {s.surname} {s.name} — {s.registrationNumber}
                </option>
              ))}
            </select>
            {chevron}
          </div>
        </div>
      </div>

      {/* Display Result Button */}
      <button
        type="button"
        onClick={handleSearch}
        disabled={!canSearch || isSearching}
        className={`w-full py-3 flex items-center justify-center gap-2 font-semibold text-white transition-colors ${
          canSearch && !isSearching
            ? "bg-[#8000BD] hover:bg-[#640094] cursor-pointer"
            : "bg-[#D9D9D9] cursor-not-allowed"
        }`}
      >
        <Search className="w-4 h-4" />
        {isSearching ? "LOADING..." : "DISPLAY RESULT"}
      </button>
    </motion.div>
  );
};

export default SearchStudentComp;
