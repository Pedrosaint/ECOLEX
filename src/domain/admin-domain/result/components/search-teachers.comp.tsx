import { motion } from "framer-motion";


const SearchTeachersComp = () => {
  return (
    <div>
      <motion.div
        className=""
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div>
            <label
              htmlFor="view-campus"
              className="block text-sm font-semibold font-inter text-gray-700 mb-2"
            >
              Select Campus <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="view-campus"
                className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
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
              Select Teacher <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="view-term"
                className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
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
              Select Classes Applicable <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="view-academy-year"
                className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
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
              Select Subject Applicable <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="view-class"
                className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
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
              Select Academic Year <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="view-group"
                className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
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
              Select Academic Term <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="view-group"
                className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
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
      </motion.div>
    </div>
  );
}

export default SearchTeachersComp
