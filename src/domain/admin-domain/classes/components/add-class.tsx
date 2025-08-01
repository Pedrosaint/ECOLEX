import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function AddClass() {
  const [classes, setClasses] = useState("Campus 1");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [className, setClassName] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);

  const categories = [
    "Nursery",
    "Primary",
    "Junior Secondary",
    "Senior Secondary",
  ];

  const classNames = [
    "Pink Class",
    "Blue Class",
    "Green Class",
    "Yellow Class",
    "Red Class",
  ];

  const isFormComplete =
    classes.trim() !== "" &&
    selectedCategory.trim() !== "" &&
    className.trim() !== "";

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
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Custom Class Name
          </label>
          <input
            value={classes}
            placeholder="E.g Pink Class"
            onChange={(e) => setClasses(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex flex-col relative">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Select Category
          </label>
          <div
            className="w-full px-4 py-4 border border-gray-300 rounded cursor-pointer flex items-center justify-between"
            onClick={() => setIsCategoryOpen((prev) => !prev)}
          >
            <span className="text-sm text-gray-700">
              {selectedCategory || "Choose a category"}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>

          {isCategoryOpen && (
            <div className="absolute w-full z-10 mt-24 bg-white border border-gray-200 rounded shadow-md">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsCategoryOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-700 hover:bg-[#8000BD] hover:text-white first:rounded-t-md last:rounded-b-md hover:cursor-pointer"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Class Name Dropdown (custom controlled like Category) */}
        <div className="flex flex-col relative">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Class Name
          </label>
          <div
            className="w-full px-4 py-4 border border-gray-300 rounded cursor-pointer flex items-center justify-between"
            onClick={() => setIsClassOpen((prev) => !prev)}
          >
            <span className="text-sm text-gray-700">
              {className || "Choose class"}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>

          {isClassOpen && (
            <div className="absolute w-full z-10 mt-24 bg-white border border-gray-200 rounded shadow-md">
              {classNames.map((cls) => (
                <button
                  key={cls}
                  onClick={() => {
                    setClassName(cls);
                    setIsClassOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-700 hover:bg-[#8000BD] hover:text-white first:rounded-t-md last:rounded-b-md hover:cursor-pointer"
                >
                  {cls}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center">
          <button
            disabled={!isFormComplete}
            className={`text-white w-full px-4 py-4 rounded text-lg font-semibold transition-colors duration-200 ${
              isFormComplete
                ? "bg-[#8000BD] cursor-pointer"
                : "bg-[#D9D9D9] cursor-not-allowed"
            }`}
          >
            Add Class
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
            Class was added successfully
          </button>
        </div>
      </div>
    </motion.div>
  );
}
