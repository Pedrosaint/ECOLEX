import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useGetSessionsQuery } from "../../../admin-domain/overview/api/admin-overview.api";

export default function SearchComp() {
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [termId, setTermId] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState("");

  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);

  const { data: sessionsData } = useGetSessionsQuery();
  const sessions = sessionsData?.data ?? [];
  const selectedSession = sessions.find((s) => s.id === selectedSessionId);
  const terms = selectedSession?.terms ?? [];
  const classes = ["Class 1", "Class 2", "Class 3"];

  const allFieldsFilled = selectedSessionId && termId && selectedClass.trim();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-md shadow-sm border border-gray-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {/* Academic Session Dropdown */}
        <div className="flex flex-col relative">
          <label className="text-sm font-semibold font-inter text-gray-700 mb-2">
            Select Academic Session
          </label>
          <div
            className="w-full px-4 py-4 border border-gray-300 rounded cursor-pointer flex items-center justify-between"
            onClick={() => setIsSessionOpen(!isSessionOpen)}
          >
            <span className="text-sm text-gray-700">
              {selectedSession?.name || "Choose session"}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          {isSessionOpen && (
            <div className="absolute w-full z-10 top-22 bg-white border border-gray-200 rounded shadow-md">
              {sessions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedSessionId(s.id);
                    setTermId(null);
                    setIsSessionOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-700 hover:bg-[#8000BD] hover:text-white first:rounded-t last:rounded-b"
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Term Dropdown */}
        <div className="flex flex-col relative">
          <label className="text-sm font-semibold font-inter text-gray-700 mb-2">
            Select Term
          </label>
          <div
            className={`w-full px-4 py-4 border border-gray-300 rounded flex items-center justify-between ${selectedSessionId ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
            onClick={() => selectedSessionId && setIsTermOpen(!isTermOpen)}
          >
            <span className="text-sm text-gray-700">
              {terms.find((t) => t.id === termId)?.name || (selectedSessionId ? "Choose term" : "Select session first")}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          {isTermOpen && (
            <div className="absolute w-full z-10 top-22 bg-white border border-gray-200 rounded shadow-md">
              {terms.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTermId(t.id);
                    setIsTermOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-700 hover:bg-[#8000BD] hover:text-white first:rounded-t last:rounded-b"
                >
                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Class Dropdown */}
        <div className="flex flex-col relative">
          <label className="text-sm font-semibold font-inter text-gray-700 mb-2">
            Select Class
          </label>
          <div
            className="w-full px-4 py-4 border border-gray-300 rounded cursor-pointer flex items-center justify-between"
            onClick={() => setIsClassOpen(!isClassOpen)}
          >
            <span className="text-sm text-gray-700">
              {selectedClass || "Choose class"}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          {isClassOpen && (
            <div className="absolute w-full z-10 top-22 bg-white border border-gray-200 rounded shadow-md">
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => {
                    setSelectedClass(cls);
                    setIsClassOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-700 hover:bg-[#8000BD] hover:text-white first:rounded-t last:rounded-b"
                >
                  {cls}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Button */}
      <div className="flex items-end">
        <button
          className={`w-full px-4 py-4 rounded text-white font-semibold text-md transition-colors ${
            allFieldsFilled
              ? "bg-[#8000BD] hover:bg-[#6900a5]"
              : "bg-[#D9D9D9] cursor-not-allowed"
          }`}
          disabled={!allFieldsFilled}
        >
          Proceed to check result
        </button>
      </div>
    </motion.div>
  );
}
