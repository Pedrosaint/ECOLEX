import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useGetClassesQuery, useGetClassGroupsQuery } from "../../classes/api/class-api";
import { useGetCampusQuery } from "../../campus/api/campus.api";
import { useGetSessionsQuery } from "../../overview/api/admin-overview.api";

export interface ClassSearchParams {
  classId: number;
  classGroupId: number;
  campusId: number;
  sessionId: number;
  termId: number;
}

interface Props {
  onSearch: (params: ClassSearchParams) => void;
  isSearching: boolean;
}

export default function SearchClassComp({ onSearch, isSearching }: Props) {
  const [campusId, setCampusId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [termId, setTermId] = useState("");
  const [classId, setClassId] = useState("");
  const [classGroupId, setClassGroupId] = useState("");

  const { data: campusData, isLoading: campusLoading } = useGetCampusQuery();
  const { data: sessionsData, isLoading: sessionsLoading } = useGetSessionsQuery();
  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data: groupsData, isLoading: groupsLoading } = useGetClassGroupsQuery({ limit: 1000 });

  const selectedSession = (sessionsData?.data ?? []).find((s) => s.id === Number(sessionId));
  const terms = selectedSession?.terms ?? [];

  const filteredGroups = (groupsData?.groups ?? []).filter(
    (g) => g.classId === Number(classId)
  );

  const canSearch = campusId && sessionId && termId && classId && classGroupId;

  const handleSessionChange = (val: string) => {
    setSessionId(val);
    setTermId("");
  };

  const handleClassChange = (val: string) => {
    setClassId(val);
    setClassGroupId("");
  };

  const handleSearch = () => {
    if (!canSearch) return;
    onSearch({
      campusId: Number(campusId),
      sessionId: Number(sessionId),
      termId: Number(termId),
      classId: Number(classId),
      classGroupId: Number(classGroupId),
    });
  };

  const selectBase = "w-full px-4 py-4 border border-gray-300 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10";
  const disabledClass = "bg-gray-50 text-gray-400 cursor-not-allowed";

  const chevronSvg = (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">

        {/* 1. Campus */}
        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Campus</label>
          <div className="relative">
            <select
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              disabled={campusLoading}
              className={`${selectBase} ${campusId ? "text-gray-700" : "text-gray-400"}`}
            >
              <option value="">{campusLoading ? "Loading..." : "Select Campus"}</option>
              {(campusData?.campuses ?? []).map((c) => (
                <option key={c.id} value={String(c.id)}>{c.name}</option>
              ))}
            </select>
            {chevronSvg}
          </div>
        </div>

        {/* 2. Academic Session */}
        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Academic Session</label>
          <div className="relative">
            <select
              value={sessionId}
              onChange={(e) => handleSessionChange(e.target.value)}
              disabled={sessionsLoading}
              className={`${selectBase} ${sessionId ? "text-gray-700" : "text-gray-400"}`}
            >
              <option value="">{sessionsLoading ? "Loading..." : "Select Session"}</option>
              {(sessionsData?.data ?? []).map((s) => (
                <option key={s.id} value={String(s.id)}>{s.name}</option>
              ))}
            </select>
            {chevronSvg}
          </div>
        </div>

        {/* 3. Term — locked until session picked */}
        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Term</label>
          <div className="relative">
            <select
              value={termId}
              onChange={(e) => setTermId(e.target.value)}
              disabled={!sessionId}
              className={`${selectBase} ${termId ? "text-gray-700" : "text-gray-400"} ${!sessionId ? disabledClass : ""}`}
            >
              <option value="">
                {!sessionId ? "Select session first" : terms.length === 0 ? "No terms for session" : "Select Term"}
              </option>
              {terms.map((t) => (
                <option key={t.id} value={String(t.id)}>{t.name}</option>
              ))}
            </select>
            {chevronSvg}
          </div>
        </div>

        {/* 4. Class */}
        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Class</label>
          <div className="relative">
            <select
              value={classId}
              onChange={(e) => handleClassChange(e.target.value)}
              disabled={classesLoading}
              className={`${selectBase} ${classId ? "text-gray-700" : "text-gray-400"}`}
            >
              <option value="">{classesLoading ? "Loading..." : "Select Class"}</option>
              {(classesData?.classes ?? []).map((c) => (
                <option key={c.id} value={String(c.id)}>{c.name}</option>
              ))}
            </select>
            {chevronSvg}
          </div>
        </div>

        {/* 5. Group — locked until class picked */}
        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Group</label>
          <div className="relative">
            <select
              value={classGroupId}
              onChange={(e) => setClassGroupId(e.target.value)}
              disabled={!classId || groupsLoading}
              className={`${selectBase} ${classGroupId ? "text-gray-700" : "text-gray-400"} ${!classId ? disabledClass : ""}`}
            >
              <option value="">
                {!classId ? "Select a class first" : groupsLoading ? "Loading..." : filteredGroups.length === 0 ? "No groups for this class" : "Select Group"}
              </option>
              {filteredGroups.map((g) => (
                <option key={g.id} value={String(g.id)}>{g.name}</option>
              ))}
            </select>
            {chevronSvg}
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
}
