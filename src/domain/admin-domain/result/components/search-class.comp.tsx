import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useGetClassesQuery, useGetClassGroupsQuery } from "../../classes/api/class-api";

export interface ClassSearchParams {
  classId: number;
  classGroupId: number;
}

interface Props {
  onSearch: (params: ClassSearchParams) => void;
  isSearching: boolean;
}

export default function SearchClassComp({ onSearch, isSearching }: Props) {
  const [classId, setClassId] = useState<string>("");
  const [classGroupId, setClassGroupId] = useState<string>("");

  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data: groupsData, isLoading: groupsLoading } = useGetClassGroupsQuery({ limit: 1000 });

  const filteredGroups = (groupsData?.groups ?? []).filter(
    (g) => g.classId === Number(classId)
  );

  const canSearch = classId !== "" && classGroupId !== "";

  const handleClassChange = (val: string) => {
    setClassId(val);
    setClassGroupId("");
  };

  const handleSearch = () => {
    if (!canSearch) return;
    onSearch({ classId: Number(classId), classGroupId: Number(classGroupId) });
  };

  const selectClass = "w-full px-4 py-4 border border-gray-300 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10";
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

        {/* Campus — coming soon */}
        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Campus</label>
          <div className="relative">
            <select disabled className={`${selectClass} bg-gray-50 text-gray-400 cursor-not-allowed`}>
              <option value="">Coming Soon</option>
            </select>
            {chevronSvg}
          </div>
        </div>

        {/* Select Term — coming soon */}
        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Term</label>
          <div className="relative">
            <select disabled className={`${selectClass} bg-gray-50 text-gray-400 cursor-not-allowed`}>
              <option value="">Coming Soon</option>
            </select>
            {chevronSvg}
          </div>
        </div>

        {/* Academic Session — coming soon */}
        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Academic Session</label>
          <div className="relative">
            <select disabled className={`${selectClass} bg-gray-50 text-gray-400 cursor-not-allowed`}>
              <option value="">Coming Soon</option>
            </select>
            {chevronSvg}
          </div>
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Class</label>
          <div className="relative">
            <select
              value={classId}
              onChange={(e) => handleClassChange(e.target.value)}
              disabled={classesLoading}
              className={`${selectClass} ${classId ? "text-gray-700" : "text-gray-400"}`}
            >
              <option value="">{classesLoading ? "Loading..." : "Select Class"}</option>
              {classesData?.classes.map((c) => (
                <option key={c.id} value={String(c.id)}>{c.name}</option>
              ))}
            </select>
            {chevronSvg}
          </div>
        </div>

        {/* Group */}
        <div>
          <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Group</label>
          <div className="relative">
            <select
              value={classGroupId}
              onChange={(e) => setClassGroupId(e.target.value)}
              disabled={!classId || groupsLoading}
              className={`${selectClass} ${classGroupId ? "text-gray-700" : "text-gray-400"} ${!classId ? "cursor-not-allowed bg-gray-50" : ""}`}
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
