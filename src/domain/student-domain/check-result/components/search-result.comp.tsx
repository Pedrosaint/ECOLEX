import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSearchResult } from "../hooks";

interface Props {
  onSearch: (academicSessionId: number) => void;
}

export default function SearchComp({ onSearch }: Props) {
  const {
    selectedSessionId,
    setSelectedSessionId,
    isSessionOpen,
    setIsSessionOpen,
    sessions,
    sessionsLoading,
    selectedSession,
  } = useSearchResult();

  const handleProceed = () => {
    if (selectedSessionId) onSearch(selectedSessionId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded shadow-sm border border-gray-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
              {sessionsLoading ? "Loading..." : selectedSession?.name || "Choose session"}
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
                    setIsSessionOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-[#8000BD] hover:text-white first:rounded-t last:rounded-b"
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-end">
        <button
          onClick={handleProceed}
          disabled={!selectedSessionId}
          className={`w-full px-4 py-4 rounded text-white font-semibold text-md transition-colors ${
            selectedSessionId
              ? "bg-[#8000BD] hover:bg-[#6900a5] cursor-pointer"
              : "bg-[#D9D9D9] cursor-not-allowed"
          }`}
        >
          Proceed to check result
        </button>
      </div>
    </motion.div>
  );
}
