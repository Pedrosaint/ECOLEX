import { motion } from "framer-motion";

export default function ViewClassResultTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-lg text-gray-900 mb-6 font-inter">Class Result</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label
            htmlFor="view-campus"
            className="block text-sm font-semibold font-inter text-gray-700 mb-2"
          >
            Campus
          </label>
          <div className="relative">
            <select
              id="view-campus"
              className="w-full px-4 py-4 border border-gray-300 rounded-md text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
            ></select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="view-term"
            className="block text-sm font-semibold font-inter text-gray-700 mb-2"
          >
            Select Term
          </label>
          <div className="relative">
            <select
              id="view-term"
              className="w-full px-4 py-4 border border-gray-300 rounded-md text-sm text-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
            ></select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="view-academy-year"
            className="block text-sm font-semibold font-inter text-gray-700 mb-2"
          >
            Select Academy Year
          </label>
          <div className="relative">
            <select
              id="view-academy-year"
              className="w-full px-4 py-4 border border-gray-300 rounded-md text-sm text-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
            ></select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="view-class"
            className="block text-sm font-semibold font-inter text-gray-700 mb-2"
          >
            Select Class
          </label>
          <div className="relative">
            <select
              id="view-class"
              className="w-full px-4 py-4 border border-gray-300 rounded-md text-sm text-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
            ></select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="">
          <label
            htmlFor="view-group"
            className="block text-sm font-semibold font-inter text-gray-700 mb-2"
          >
            Select Group
          </label>
          <div className="relative">
            <select
              id="view-group"
              className="w-full px-4 py-4 border border-gray-300 rounded-md text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
            ></select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-[#4B0082] w-full max-w-md text-white px-6 py-3 rounded-md text-base font-semibold font-inter transition-colors">
          Display Result
        </button>
      </div>
    </motion.div>
  );
}
