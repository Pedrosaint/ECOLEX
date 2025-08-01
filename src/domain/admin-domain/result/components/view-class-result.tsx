import { ChevronLeft, ChevronRight, Printer, Search } from "lucide-react";
import SearchClassComp from "./search-class.comp"
import { motion } from "framer-motion";
import { useState } from "react";
import Print from "../../../../general/common/print";

const ViewClassResult = () => {
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
      const subjects = [
        "Mathematics",
        "English",
        "Basic Science",
        "Physics",
        "Chemistry",
        "Biology",
        "Economics",
        "Government",
        "Basic Technology",
        "Agricultural Science",
        "Literature",
        "Account",
        "Commerce",
        "Geography",
      ];

      const students = [
        {
          id: 1,
          regNo: "1ECO 345",
          name: "Joel Victory",
          total: "98",
          grades: Array(14).fill("23"),
          grade: "98",
          position: "1st",
          remark: "Excellent",
        },
        { id: 2, regNo: "1ECO 345", name: "", grades: Array(14).fill("") },
        { id: 3, regNo: "1ECO 345", name: "", grades: Array(14).fill("") },
        { id: 4, regNo: "1ECO 345", name: "", grades: Array(14).fill("") },
        { id: 5, regNo: "1ECO 345", name: "", grades: Array(14).fill("") },
        { id: 6, regNo: "1ECO 345", name: "", grades: Array(14).fill("") },
        { id: 7, regNo: "1ECO 345", name: "", grades: Array(14).fill("") },
        { id: 8, regNo: "1ECO 345", name: "", grades: Array(14).fill("") },
        { id: 9, regNo: "1ECO 345", name: "", grades: Array(14).fill("") },
        { id: 10, regNo: "1ECO 345", name: "", grades: Array(14).fill("") },
        { id: 11, regNo: "1ECO 345", name: "", grades: Array(14).fill("") },
      ];
  return (
    <div>
      <SearchClassComp />

      <>
        {/* Display Result Button */}
        <div className="bg-[#8000BD] px-6 py-3">
          <div className="flex items-center justify-center">
            <Search className="w-5 h-5 mr-2 text-white" />
            <button
              type="button"
              className="bg-transparent text-white font-semibold outline-none placeholder-white"
            >
              DISPLAY RESULT
            </button>
          </div>
        </div>
        <div className="flex justify-end mt-10">
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="bg-[#4B0082] text-white cursor-pointer px-2 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors"
          >
            <Printer size={20} />
            <span>PRINT RECORD</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-5"
        >
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">
              <span className="font-bold">Class Result</span> for sss1 -
              2024/2025 First Term
            </h1>
            <h1>
              <span className="font-bold">Class Teacher -</span> Mr. John Smith
            </h1>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <div className="rounded-lg border-[#d1d1d1] p-4">
              <table className="w-full border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
                {/* Table Header */}
                <thead className="bg-[#EDF9FD]">
                  <tr>
                    <th className="border-t border-l border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700 min-w-[40px]">
                      S/N
                    </th>
                    <th className="border-t border-l border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700 min-w-[80px]">
                      Reg No
                    </th>
                    <th className="border-t border-l border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700">
                      Students Name
                    </th>
                    {subjects.map((subject, index) => (
                      <th
                        key={index}
                        className={`border-t border-l border-gray-300 bg-[#EDF9FD] p-1 text-xs font-medium text-gray-700 min-w-[60px] writing-mode-vertical text-center`}
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
                    <th className="border-t border-l border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700">
                      Total
                    </th>
                    <th className="border-t border-l border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700">
                      Grade
                    </th>
                    <th className="border-t border-l border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700">
                      Position
                    </th>
                    <th className="border-t border-l border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700">
                      Remark
                    </th>
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
                      <td className="border border-gray-300 bg-white p-2 text-xs text-center min-w-[60px]">
                        {student.total}
                      </td>
                      <td className="border border-gray-300 bg-white p-2 text-xs text-center min-w-[60px]">
                        {student.grade}
                      </td>
                      <td className="border border-gray-300 bg-white p-2 text-xs text-center min-w-[60px]">
                        {student.position}
                      </td>
                      <td className="border border-gray-300 bg-white p-2 text-xs text-center min-w-[60px]">
                        {student.remark}
                      </td>
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

      {isPrintModalOpen && <Print onClose={() => setIsPrintModalOpen(false)} />}
    </div>
  );
}

export default ViewClassResult
