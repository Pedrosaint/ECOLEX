import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  EearlyEducationDropdown,
  JuniorSecondaryDropdown,
  PrimaryDropdown,
  SeniorSecondaryDropdown,
} from "../../../../auth/dropdown-data";
import { useEditClassMutation } from "../api/class-api";
import { AnimatePresence, motion } from "framer-motion";

const groupedCategories = {
  "Early Education": EearlyEducationDropdown,
  Primary: PrimaryDropdown,
  "Junior Secondary": JuniorSecondaryDropdown,
  "Senior Secondary": SeniorSecondaryDropdown,
};

const EditClass = ({
  onClose,
  classId,
}: {
  onClose: () => void;
  classId: number;
}) => {
  const [category, setCategory] = useState("Select Category");
  const [className, setClassName] = useState("");
  const [customName, setCustomName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [editClass, { isLoading, isSuccess, isError }] = useEditClassMutation();

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await editClass({
        id: classId,
        payload: {
          name: `${category} ${className}`,
          customName,
        },
      }).unwrap();

      setClassName("");
      setCustomName("");
    } catch (err) {
      console.error("Failed to update class:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">EDIT CLASS</h2>
          <div className="flex items-center gap-2">
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              className={`px-4 py-2 text-sm rounded-md flex items-center text-white cursor-pointer ${
                isLoading
                  ? "bg-[#8000BD]/40 cursor-not-allowed"
                  : "bg-[#8000BD]"
              }`}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Select Category
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-3 py-2 border border-gray-300 text-left flex justify-between items-center focus:outline-none"
                >
                  {category}
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                    {Object.entries(groupedCategories).map(
                      ([group, items], i) => (
                        <div key={i}>
                          <div className="px-4 py-2 bg-gray-100 text-sm font-semibold text-gray-700">
                            {group}
                          </div>
                          {items.map((cat, index) => (
                            <div
                              key={index}
                              onClick={() => handleCategorySelect(cat)}
                              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                category === cat
                                  ? "bg-[#8000BD] text-white"
                                  : ""
                              }`}
                            >
                              {cat}
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Class Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Class Name
              </label>
              <div className="flex">
                <div className="bg-[#222222] text-white w-full flex items-center justify-center px-4 py-2 truncate">
                  {category}
                </div>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
                  placeholder="E.g., 1"
                />
              </div>
            </div>

            {/* Custom Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Custom Name
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
                placeholder="E.g., Pink Class"
              />
            </div>
          </div>

          {/* Messages */}
          {showSuccess && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#67D424] text-white px-4 py-3 text-center text-sm font-medium"
              >
                Class was updated successfully
              </motion.div>
            </AnimatePresence>
          )}

          {isError && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-red-500 text-white px-4 py-3 text-center text-sm font-medium"
            >
              Failed to update class
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditClass;
