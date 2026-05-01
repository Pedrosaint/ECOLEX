/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEditGroup } from "../hooks";

interface DropdownOption {
  value: string;
  label: string;
}

const EditGroup = ({
  onClose,
  groupId,
  initialClassId,
  initialGroupName,
}: {
  onClose: () => void;
  groupId: number;
  initialClassId: number;
  initialGroupName: string;
}) => {
  const {
    classId,
    setClassId,
    groupName,
    setGroupName,
    isDropdownOpen,
    setIsDropdownOpen,
    showSuccess,
    inputRef,
    classOptions,
    isLoading,
    getSelectedLabel,
    handleSave,
  } = useEditGroup({ onClose, groupId, initialClassId, initialGroupName });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">EDIT GROUP</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-[#8000BD] text-white px-4 py-2 text-sm rounded-md flex items-center disabled:opacity-50"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
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
            {/* Class Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Class</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-3 py-2 border border-gray-300 text-left flex justify-between items-center focus:outline-none"
                >
                  {getSelectedLabel(classId, classOptions as DropdownOption[])}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
                    {(classOptions as DropdownOption[]).map((option) => (
                      <div
                        key={option.value}
                        onClick={() => {
                          setClassId(option.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
                          classId === option.value
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Group Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Group</label>
              <input
                ref={inputRef}
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              />
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-[#67D424] text-white px-4 py-3 text-center text-sm font-medium"
              >
                Group was updated successfully
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditGroup;
