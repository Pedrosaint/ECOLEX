
import { motion } from "framer-motion";
import ClassView from "./classess";



export default function CustomizeCANaming() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 xl:w-1/4">
          <div>
            <label
              htmlFor="view-campus"
              className="block text-sm font-semibold font-inter text-gray-700 mb-2"
            >
              CA Title
            </label>
            <input
              type="text"
              placeholder="e.g.. 1st CA"
              className="w-full px-4 py-4 border border-gray-300 rounded-md text-sm text-gray-700 appearance-none focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="view-term"
              className="block text-sm font-semibold font-inter text-gray-700 mb-2"
            >
              Max Score
            </label>
            <input
              type="text"
              placeholder="e.g..20"
              className="w-full px-4 py-4 border border-gray-300 rounded-md text-sm text-gray-700 appearance-none focus:outline-none"
            />
          </div>
        </div>
        <div className="max-h-[450px] overflow-y-auto">
          <ClassView />
        </div>
        <div className="flex justify-center mt-5">
          <button className="bg-[#4B0082] w-full max-w-md text-white px-6 py-3 rounded-md text-base font-semibold font-inter transition-colors cursor-pointer">
            Submit
          </button>
        </div>
      </motion.div>
    </>
  );
}
