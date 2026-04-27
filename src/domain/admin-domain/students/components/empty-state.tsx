import { motion } from "framer-motion";
import empty from '../../../../assets/image/emptystate_student.png'

// Empty state component
export function EmptyStudentState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center px-4"
    >
      <motion.div
        className=""
        transition={{
          duration: 1.5,
        }}
      >
        <img src={empty} alt="empty" className="h-[400px]" />
      </motion.div>

      <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
        No students found
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        filter your students by name, class, or campus
      </p>
    </motion.div>
  );
}
