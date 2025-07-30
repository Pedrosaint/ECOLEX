import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

export default function ViewBroadsheet() {
    const subjects = [
      "Mathematics",
      "English",
      "Basic Science",
      "Physics",
      "Chemistry",
      "Biology",
      "Civic Education",
      "Basic Technology",
      "Agricultural Science",
      "Literature",
      "French",
      "Commerce",
      "Geography",
      "Geography",
      "Geography",
      "Geography",
      "Geography",
    ];

      const students = [
        {
          id: 1,
          regNo: "1ECO 345",
          name: "Joel Victory",
          grades: Array(17).fill("23"),
        },
        { id: 2, regNo: "1ECO 345", name: "", grades: Array(17).fill("") },
        { id: 3, regNo: "1ECO 345", name: "", grades: Array(17).fill("") },
        { id: 4, regNo: "1ECO 345", name: "", grades: Array(17).fill("") },
        { id: 5, regNo: "1ECO 345", name: "", grades: Array(17).fill("") },
        { id: 6, regNo: "1ECO 345", name: "", grades: Array(17).fill("") },
        { id: 7, regNo: "1ECO 345", name: "", grades: Array(17).fill("") },
        { id: 8, regNo: "1ECO 345", name: "", grades: Array(17).fill("") },
        { id: 9, regNo: "1ECO 345", name: "", grades: Array(17).fill("") },
        { id: 10, regNo: "1ECO 345", name: "", grades: Array(17).fill("") },
        { id: 11, regNo: "1ECO 345", name: "", grades: Array(17).fill("") },
      ];
  return (
    <>
      <div className="w-full mb-5">
        <div className="grid grid-cols-1:grid-cols-4 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label
              htmlFor="view-campus"
              className="block text-sm font-semibold font-inter text-gray-700 mb-2"
            >
              Select Campus
            </label>
            <input
              type="text"
              placeholder="Enter part of student’s name or Reg. No to autocomplete"
              className="w-full px-4 py-4 border border-gray-300 rounded-md text-sm text-gray-700 appearance-none focus:outline-none"
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
                className="w-full px-4 py-4 border border-gray-300 rounded-md text-sm text-gray-400 appearance-none focus:outline-none pr-10"
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
                className="w-full px-4 py-4 border border-gray-300 rounded-md text-sm text-gray-400 appearance-none focus:outline-none pr-10"
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
                className="w-full px-4 py-4 border border-gray-300 rounded-md text-sm text-gray-400 appearance-none focus:outline-none"
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
      </div>

      {/* Display Result Button */}
      <div className="bg-[#F4A300] px-6 py-3 flex items-center justify-center cursor-pointer">
        <button className="flex text-white font-semibold cursor-pointer">
          <Search className="w-5 h-5 mr-2" />
          DISPLAY RESULT
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-5"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-gray-900">
            <span className="font-bold">Broadsheet</span> for sss1 - 2024/2025
            First Term
          </h1>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <div className="rounded-lg border-[#d1d1d1] p-4">
            <table className="w-full border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
              {/* Table Header */}
              {/* <thead className="!bg-[#EDF9FD] !border !border-[#D1D1D1]">
                <tr className="">
                  <th className="p-2 text-xs font-medium text-gray-700 min-w-[40px]">
                    S/N
                  </th>
                  <th className="p-2 text-xs font-medium text-gray-700 min-w-[80px]">
                    Reg No
                  </th>
                  <th className="p-2 text-xs font-medium text-gray-700 min-w-[120px]">
                    Students Name
                  </th>
                  {subjects.map((subject, index) => (
                    <th
                      key={index}
                      className="p-1 text-xs font-medium text-gray-700 min-w-[60px] writing-mode-vertical text-center"
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                      }}
                    >
                      <div className="transform rotate-180 whitespace-nowrap py-2">
                        {subject}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead> */}
              <thead className="bg-[#EDF9FD]">
                <tr>
                  <th className="border-t border-l border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700 min-w-[40px] first:rounded-tl-2xl">
                    S/N
                  </th>
                  <th className="border-t border-l border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700 min-w-[80px]">
                    Reg No
                  </th>
                  <th className="border-t border-l border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700 min-w-[120px]">
                    Students Name
                  </th>
                  {subjects.map((subject, index) => (
                    <th
                      key={index}
                      className={`border-t border-l border-gray-300 bg-[#EDF9FD] p-1 text-xs font-medium text-gray-700 min-w-[60px] writing-mode-vertical text-center ${
                        index === subjects.length - 1
                          ? "border-r rounded-tr-2xl"
                          : ""
                      }`}
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                      }}
                    >
                      <div className="transform rotate-200 whitespace-nowrap py-2">
                        {subject}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="border-collapse">
                {students.map((student, i) => (
                  <tr key={i} className="hover:bg-blue-25">
                    <td className="border border-gray-300 bg-white p-2 text-xs text-center font-medium">
                      {student.id}
                    </td>
                    <td className="border border-gray-300 bg-white p-2 text-xs font-medium">
                      {student.regNo}
                    </td>
                    <td className="border border-gray-300 bg-white p-2 text-xs font-medium">
                      {student.name}
                    </td>
                    {student.grades.map((grade, gradeIndex) => (
                      <td
                        key={gradeIndex}
                        className="border border-gray-300 bg-white p-2 text-xs text-center min-w-[60px]"
                      >
                        {grade}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">Showing 1-8 of 223</div>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 rounded-lg bg-purple-600 text-white text-sm font-medium">
                1
              </button>
              <button className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium">
                2
              </button>
              <button className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium">
                3
              </button>
              <span className="px-2 text-sm text-gray-500">...</span>
              <button className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium">
                126
              </button>
            </div>

            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
