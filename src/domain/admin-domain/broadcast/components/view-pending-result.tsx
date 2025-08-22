import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useState } from "react";


export default function ViewPendingResult() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalResult = 223;
    const resultPerPage = 9;
    const totalPages = Math.ceil(totalResult / resultPerPage);

    const Result = Array.from({ length: 9 }, (_, index) => ({
      id: index + 1,
      no: index + 1,
      regNo: "ECO323",
      studentName: "John Doe",
      ca1: "6",
      ca2: "15",
      ca3: "7",
      exam: "45",
      total: "73",
      grade: "A",
      result: "Not Approved",
    }));

  return (
    <>
      <h1 className="font-semibold mb-2 text-gray-500">
        Filter Pending Result to view and Approve
      </h1>
      <motion.div
        // initial={{ opacity: 0, y: 30 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-6 rounded-md shadow-sm border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
          <div>
            <label
              htmlFor="view-campus"
              className="block text-sm font-semibold font-inter text-gray-700 mb-2"
            >
              Select Campus
            </label>
            <input
              type="text"
              placeholder="Campus 1"
              className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-700 appearance-none focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="view-term"
              className="block text-sm font-semibold font-inter text-gray-700 mb-2"
            >
              Select Class
            </label>
            <div className="relative">
              <select
                id="view-term"
                className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-400 appearance-none focus:outline-none pr-10"
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
                className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-400 appearance-none focus:outline-none pr-10"
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
              Select Academic Term
            </label>
            <div className="relative">
              <select
                id="view-class"
                className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-400 appearance-none focus:outline-none"
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
              Select Subjects Applicable
            </label>
            <div className="relative">
              <select
                id="view-class"
                className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-400 appearance-none focus:outline-none"
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
        <div className="bg-[#8000BD] px-6 py-3">
          <div className="flex items-center justify-center">
            <Search className="w-5 h-5 mr-2 text-white" />
            <button
              type="button"
              className="bg-transparent text-white font-semibold outline-none placeholder-white"
            >
              DISPLAY PENDING RESULT
            </button>
          </div>
        </div>
      </motion.div>

      {/* Table Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden py-6 px-3 xl:px-15 mt-10"
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className=" text-gray-900 mb-2 font-inter">
            <span className="font-semibold">Result</span> for sss1 - 2024/2025
            First Term for Geography
          </h1>
          <button className="bg-[#ED294A] text-white px-2 md:px-5 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer">
            <X size={20} />
            <h1> REMOVE</h1>
          </button>
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                <tr>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    S/N
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Reg. No
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    results Fullname
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    CA1 (10)
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    CA2 (20)
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    CA3 (30)
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Exam (60)
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Total
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Grade
                  </th>
                  <th className="text-cneter py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Approve Result
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Result.map((result, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900 border-r border-gray-200 text-center">
                      {result.no}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                      {result.regNo}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                      {result.studentName}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 font-semibold border-r border-gray-200 text-center">
                      {result.ca1}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                      {result.ca2}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                      {result.ca3}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                      {result.exam}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                      {result.total}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                      {result.grade}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                      {result.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-2 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing 1-9 of {totalResult}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex items-center space-x-1 font-space">
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded text-sm font-semibold transition-colors font-space ${
                        currentPage === page
                          ? "bg-[#8000BD] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <span className="text-gray-400 px-2">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 rounded text-sm font-semibold text-gray-600 hover:bg-gray-100 font-space"
                  >
                    {totalPages}
                  </button>
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
