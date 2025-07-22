import { X, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UpcomingExamsModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {/* Overlay with fade animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 z-50"
        onClick={onClose}
      />

      {/* Modal Container with scale animation */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.2,
          }}
          className="relative w-full max-w-xl bg-white rounded-lg shadow-xl p-6 md:p-8 mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with subtle animation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6"
          >
            <h2 className="text-2xl font-medium text-gray-900 font-inter">
              Add Upcoming Exams
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors border border-gray-300 shadow-md cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-500" />
            </motion.button>
          </motion.div>

          {/* Form Fields with staggered animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.2,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8"
          >
            {/* Exam Name */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-col"
            >
              <label className="text-sm font-medium text-gray-700 mb-1">
                Exam Name
              </label>
              <motion.input
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none"
                placeholder="Enter exam name"
              />
            </motion.div>

            {/* Date */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-col"
            >
              <label className="text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <motion.input
                type="date"
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none"
              />
            </motion.div>

            {/* Class */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-col"
            >
              <label className="text-sm font-medium text-gray-700 mb-1">
                Class
              </label>
              <div className="relative">
                <motion.select
                  className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 pr-8"
                  defaultValue=""
                >
                  <option value="">Select Class</option>
                  <option value="grade1">Grade 1</option>
                  <option value="grade2">Grade 2</option>
                  <option value="grade3">Grade 3</option>
                </motion.select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>

          {/* Action Buttons with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-end gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="inline-flex items-center justify-center cursor-pointer whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 h-9 px-4 py-2"
            >
              Add More
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none bg-[#4B0082] text-white h-9 px-4 py-2 cursor-pointer"
            >
              <Check className="h-4 w-4 mr-2" />
              Save
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}