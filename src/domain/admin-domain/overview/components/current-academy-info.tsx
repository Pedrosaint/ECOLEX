import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { IoReload } from "react-icons/io5";

const CurrentAcademyInfo = () => {
  const [selectedSession, setSelectedSession] = useState("2024-2025");
  const [selectedTerm, setSelectedTerm] = useState("Second Term");
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);

  const sessions = ["2023-2024", "2024-2025", "2025-2026"];
  const terms = ["First Term", "Second Term", "Third Term"];

  const handleUpdate = () => {
    console.log("Updating academy info:", { selectedSession, selectedTerm });
    // Add your update logic here
  };

  return (
    <div className="bg-white rounded-4xl shadow-sm border border-gray-200 py-4 px-4">
      {/* Header */}
      <h2 className="text-[15px] font-semibold text-gray-900 mb-2">
        Current Academy Info
      </h2>

      {/* Warning Banner */}
      <div className="bg-[#F4A300] text-white text-[13px] px-4 py-2 rounded-sm mb-3">
        Always ensure your current session & term is updated
      </div>

      {/* Academic Session Dropdown */}
      <div className="mb-6">
        <label className="flex items-center text-gray-700 text-sm font-medium mb-2">
          <IoReload size={20} className="mr-2 cursor-pointer" />
          Update Academic Session
        </label>
        <div className="relative ml-6">
          <button
            onClick={() => setIsSessionOpen(!isSessionOpen)}
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-left text-gray-700 flex items-center justify-between hover:border-gray-400 focus:outline-none"
          >
            <span>{selectedSession}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isSessionOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSessionOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              {sessions.map((session) => (
                <button
                  key={session}
                  onClick={() => {
                    setSelectedSession(session);
                    setIsSessionOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                >
                  {session}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Academic Term Dropdown */}
      <div className="mb-4">
        <label className="flex items-center text-gray-700 text-sm font-medium mb-2">
          <IoReload size={20} className="mr-2 cursor-pointer" />
          Update Academic Term
        </label>
        <div className="relative ml-6">
          <button
            onClick={() => setIsTermOpen(!isTermOpen)}
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-left text-gray-700 flex items-center justify-between hover:border-gray-400 focus:outline-none"
          >
            <span>{selectedTerm}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isTermOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isTermOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              {terms.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSelectedTerm(term);
                    setIsTermOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Update Button */}
      <div className="ml-6">
        <button
          onClick={handleUpdate}
          className="w-full bg-[#8000BD] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default CurrentAcademyInfo;
