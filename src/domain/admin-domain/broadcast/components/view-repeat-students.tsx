import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ViewRepeatStudents() {
  const [formData, setFormData] = useState({
    campus: "",
    averageScore: "",
    currentSession: "",
    currentClass: "",
    nextSession: "",
  });

  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isNextSessionOpen, setIsNextSessionOpen] = useState(false);

  const campuses = ["Campus 1", "Campus 2"];
  const classes = ["Class 1", "Class 2", "Class 3"];
  const currentSession = ["2022/2023", "2023/2024", "2024/2025"];
  const nextSession = ["2022/2023", "2023/2024", "2024/2025"];


  const handleSelect = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const allFieldsFilled = Object.values(formData).every(
    (val) => val.trim() !== ""
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-md text-end font-medium text-[#F4A300] mb-2 font-inter">
        Repeat student's by average
      </h2>

      <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Campus - Custom Dropdown */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Campus
            </label>
            <div
              className="w-full px-4 py-3 border border-gray-300 rounded text-sm text-gray-700 cursor-pointer flex justify-between items-center"
              onClick={() => setIsCampusOpen((prev) => !prev)}
            >
              <span>{formData.campus || "Choose a campus"}</span>
              <ChevronDown size={16} />
            </div>
            {isCampusOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-md">
                {campuses.map((campus) => (
                  <div
                    key={campus}
                    className="px-4 py-2 hover:bg-[#8000bd] hover:text-white cursor-pointer text-sm"
                    onClick={() => {
                      handleSelect("campus", campus);
                      setIsCampusOpen(false);
                    }}
                  >
                    {campus}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Average Score - Input */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Average Score Above (Inclusive)
            </label>
            <input
              type="number"
              name="averageScore"
              placeholder="Enter score"
              value={formData.averageScore}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  averageScore: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded text-sm focus:outline-none"
            />
          </div>

          {/* Current Session Dropdown */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Current Session (From)
            </label>
            <div
              className="w-full px-4 py-3 border border-gray-300 rounded text-sm text-gray-700 cursor-pointer flex justify-between items-center"
              onClick={() => setIsSessionOpen((prev) => !prev)}
            >
              <span>{formData.currentSession || "Choose current session"}</span>
              <ChevronDown size={16} />
            </div>
            {isSessionOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-md">
                {currentSession.map((session) => (
                  <div
                    key={session}
                    className="px-4 py-2 hover:bg-[#8000bd] hover:text-white cursor-pointer text-sm"
                    onClick={() => {
                      handleSelect("currentSession", session);
                      setIsSessionOpen(false);
                    }}
                  >
                    {session}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Current Class - Custom Dropdown */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Current Class (From)
            </label>
            <div
              className="w-full px-4 py-3 border border-gray-300 rounded text-sm text-gray-700 cursor-pointer flex justify-between items-center"
              onClick={() => setIsClassOpen((prev) => !prev)}
            >
              <span>{formData.currentClass || "Choose class"}</span>
              <ChevronDown size={16} />
            </div>
            {isClassOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-md">
                {classes.map((cls) => (
                  <div
                    key={cls}
                    className="px-4 py-2 hover:bg-[#8000bd] hover:text-white cursor-pointer text-sm"
                    onClick={() => {
                      handleSelect("currentClass", cls);
                      setIsClassOpen(false);
                    }}
                  >
                    {cls}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* You can repeat the pattern for currentSession, nextSession */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Next Session (To)
            </label>
            <div
              className="w-full px-4 py-3 border border-gray-300 rounded text-sm text-gray-700 cursor-pointer flex justify-between items-center"
              onClick={() => setIsNextSessionOpen((prev) => !prev)}
            >
              <span>{formData.nextSession || "Choose next session"}</span>
              <ChevronDown size={16} />
            </div>
            {isNextSessionOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-md">
                {nextSession.map((session) => (
                  <div
                    key={session}
                    className="px-4 py-2 hover:bg-[#8000bd] hover:text-white cursor-pointer text-sm"
                    onClick={() => {
                      handleSelect("nextSession", session);
                      setIsNextSessionOpen(false);
                    }}
                  >
                    {session}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <button
          disabled={!allFieldsFilled}
          className={`w-full px-6 py-3 rounded text-base font-semibold transition-colors ${
            allFieldsFilled
              ? "bg-[#4B0082] text-white hover:bg-[#3a0063] cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Repeat
        </button>
      </div>
    </motion.div>
  );
}
