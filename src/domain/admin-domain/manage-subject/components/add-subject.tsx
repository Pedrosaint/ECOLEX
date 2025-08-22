import { motion } from "framer-motion";
import { useState } from "react";

export default function AddSubject() {
  const [subject, setSubject] = useState("");




  const isFormComplete =
    subject.trim() !== ""

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full border border-gray-300 rounded-lg p-6 bg-white shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
        {/* Custom Class Name Input */}
        <div className="flex flex-col">
          <div>
            <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
              Subject Name
            </label>
            <span className="text-red-400 text-md">*</span>
          </div>
          <input
            value={subject}
            placeholder="E.g English Language"
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center">
          <button
            disabled={!isFormComplete}
            className={`text-white w-full px-4 py-3 rounded text-lg uppercase font-semibold transition-colors duration-200 ${
              isFormComplete
                ? "bg-[#8000BD] cursor-pointer"
                : "bg-[#D9D9D9] cursor-not-allowed"
            }`}
          >
            Add Subject
          </button>
        </div>
      </div>

      {/* Success Message */}
      <div className="bg-[#67D424] px-6 py-3 mt-4">
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="bg-transparent text-white font-semibold outline-none placeholder-white"
          >
            Subject was added successfully
          </button>
        </div>
      </div>
    </motion.div>
  );
}
