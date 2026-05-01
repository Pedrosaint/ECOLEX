/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useAddClass } from "../hooks";

export default function AddClass() {
  const {
    classes,
    setClasses,
    campusId,
    setCampusId,
    className,
    setClassName,
    isCampusOpen,
    setIsCampusOpen,
    showSuccess,
    campusOptions,
    isLoading,
    isError,
    error,
    handleSubmit,
    isFormComplete,
    getSelectedLabel,
  } = useAddClass();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full border border-gray-300 rounded-lg p-6 bg-white shadow-md"
    >
      {/* Progress indicator */}
      <div className="mb-4">
        <div className="flex space-x-2">
          <div
            className={`h-1 rounded-full transition-all duration-500 ${
              campusId
                ? "bg-gradient-to-r from-purple-500 to-blue-500 w-8"
                : "bg-gray-200 w-4"
            }`}
          ></div>
          <div
            className={`h-1 rounded-full transition-all duration-500 delay-200 ${
              className
                ? "bg-gradient-to-r from-purple-500 to-blue-500 w-8"
                : "bg-gray-200 w-4"
            }`}
          ></div>
          <div
            className={`h-1 rounded-full transition-all duration-500 delay-400 ${
              classes
                ? "bg-gradient-to-r from-purple-500 to-blue-500 w-8"
                : "bg-gray-200 w-4"
            }`}
          ></div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-end"
      >
        <div className="flex flex-col relative">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Campus
          </label>
          <div
            className="w-full px-4 py-4 border border-gray-300 rounded cursor-pointer flex items-center justify-between"
            onClick={() => setIsCampusOpen((prev) => !prev)}
          >
            {getSelectedLabel(campusId, campusOptions)}
            <ChevronDown
              size={16}
              className={`transition-transform ${
                isCampusOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isCampusOpen && (
            <div className="absolute z-10 w-full mt-25 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
              {campusOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setCampusId(option.value);
                    setIsCampusOpen(false);
                  }}
                  className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
                    campusId === option.value ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Class Name Input */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Custom Class Name
          </label>
          <input
            value={className}
            placeholder="E.g Pink Class"
            onChange={(e) => setClassName(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          />
        </div>

        {/* Class Name Input */}
        <div className="flex flex-col relative">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Class Name
          </label>
          <input
            value={classes}
            placeholder="E.g Jss 1"
            onChange={(e) => setClasses(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center">
          <button
            disabled={!isFormComplete || isLoading}
            className={`text-white w-full px-4 py-3 rounded text-lg font-semibold transition-colors duration-200 ${
              isFormComplete && !isLoading
                ? "bg-[#8000BD] cursor-pointer"
                : "bg-[#D9D9D9] cursor-not-allowed"
            }`}
          >
            {isLoading ? "Adding..." : "Add Class"}
          </button>
        </div>
      </form>

      {/* Success Message */}
      {showSuccess && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-[#67D424] px-6 py-3 mt-4"
          >
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="bg-transparent text-white font-semibold outline-none placeholder-white"
              >
                Class added successfully
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Error Message */}
      {isError && (
        <div className="bg-red-500 px-6 py-3 mt-4 rounded">
          <p className="text-white font-semibold text-center">
            {error && "data" in error
              ? (error as any).data.message
              : "Something went wrong"}
          </p>
        </div>
      )}
    </motion.div>
  );
}
