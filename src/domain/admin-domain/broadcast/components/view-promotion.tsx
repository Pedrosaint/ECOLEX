import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ViewPromotion() {
  const [formData, setFormData] = useState({
    campus: "",
    averageScore: "",
    currentSession: "",
    currentClass: "",
    nextSection: "",
    nextClass: "",
  });


  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);


  const sessions = ["2022/2023", "2023/2024"];
  const classes = ["Class 1", "Class 2", "Class 3"];

  const handleSelect = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const allFieldsFilled = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-md text-end font-medium text-[#F4A300] mb-2 font-inter">
        Promote student's by average
      </h2>

      <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Campus Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Campus
            </label>
            <input
              type="text"
              name="campus"
              placeholder="Campus 1"
              className="w-full px-4 py-4 border border-gray-300 rounded text-sm outline-none"
              value={formData.campus}
              onChange={handleInputChange}
            />
          </div>

          {/* Average Score Dropdown */}
          {/* <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Average Score Above (Inclusive)
            </label>
            <div
              onClick={() => setIsScoreOpen(!isScoreOpen)}
              className="w-full px-4 py-4 border border-gray-300 rounded text-sm cursor-pointer flex justify-between items-center"
            >
              <span>{formData.averageScore || "Select score"}</span>
              <ChevronDown size={16} />
            </div>
            {isScoreOpen && (
              <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded shadow z-10">
                {scores.map((score) => (
                  <div
                    key={score}
                    onClick={() => {
                      handleSelect("averageScore", score);
                      setIsScoreOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-[#8000bd] hover:text-white cursor-pointer text-sm"
                  >
                    {score}
                  </div>
                ))}
              </div>
            )}
          </div> */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Campus
            </label>
            <input
              type="text"
              name="avearge"
              placeholder="type average here"
              className="w-full px-4 py-4 border border-gray-300 rounded text-sm outline-none"
              value={formData.averageScore}
              onChange={handleInputChange}
            />
          </div>

          {/* Current Session Dropdown */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Session (From)
            </label>
            <div
              onClick={() => setIsSessionOpen(!isSessionOpen)}
              className="w-full px-4 py-4 border border-gray-300 rounded text-sm cursor-pointer flex justify-between items-center"
            >
              <span>{formData.currentSession || "Select session"}</span>
              <ChevronDown size={16} />
            </div>
            {isSessionOpen && (
              <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded shadow z-10">
                {sessions.map((session) => (
                  <div
                    key={session}
                    onClick={() => {
                      handleSelect("currentSession", session);
                      setIsSessionOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-[#8000bd] hover:text-white cursor-pointer text-sm"
                  >
                    {session}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Current Class Dropdown */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Class (From)
            </label>
            <div
              onClick={() => setIsClassOpen(!isClassOpen)}
              className="w-full px-4 py-4 border border-gray-300 rounded text-sm cursor-pointer flex justify-between items-center"
            >
              <span>{formData.currentClass || "Select class"}</span>
              <ChevronDown size={16} />
            </div>
            {isClassOpen && (
              <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded shadow z-10">
                {classes.map((cls) => (
                  <div
                    key={cls}
                    onClick={() => {
                      handleSelect("currentClass", cls);
                      setIsClassOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-[#8000bd] hover:text-white cursor-pointer text-sm"
                  >
                    {cls}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Next Section (date input) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Next Section (To)
            </label>
            <input
              type="date"
              name="nextSection"
              className="w-full px-4 py-4 border border-gray-300 rounded text-sm"
              value={formData.nextSection}
              onChange={handleInputChange}
            />
          </div>

          {/* Next Class (text input) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Next Class (To)
            </label>
            <input
              type="text"
              name="nextClass"
              placeholder="Enter next class"
              className="w-full px-4 py-4 border border-gray-300 rounded text-sm outline-none"
              value={formData.nextClass}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className={`w-full text-white px-6 py-3 rounded mt-5 text-base font-semibold font-inter transition-colors ${
            allFieldsFilled
              ? "bg-[#4B0082] hover:bg-[#3a0063]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!allFieldsFilled}
        >
          Promote
        </button>
      </div>
    </motion.div>
  );
}
