import { motion } from "framer-motion";
import empty from '../../../../assets/image/emptystate_student.png'

// Empty state component
export function EmptyStaffState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <motion.div
        className="mb-6"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img src={empty} alt="empty" className="h-[400px]" />
      </motion.div>

      <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
        No students found
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        We couldn't find any staff matching your current filters. Try
        adjusting your search criteria or adding new students.
      </p>
      <button className="bg-[#4B0082] text-white px-6 py-2 rounded-md font-medium hover:bg-[#3a0066] transition-colors">
        Clear Filters
      </button>
    </motion.div>
  );
}
