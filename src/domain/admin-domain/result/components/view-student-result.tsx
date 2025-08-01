
import SearchStudentComp from "./search-student.comp";
import passport from "../../../../assets/image/passport.png";
import { Printer, Search } from "lucide-react";
import { useState } from "react";
import Print from "../../../../general/common/print";
import { motion } from "framer-motion";

export default function ViewStudentResultTab() {
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  return (
    <div>
      <SearchStudentComp />

      <>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
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

          <div className="">
            <div className="bg-white rounded-lg shadow-sm p-6 mt-5">
              {/* Student Information Header */}
              <div className="md:flex md:justify-between items-start bg-[#e6e7e8] border-b border-[#D1D1D1] p-5 rounded-t-2xl">
                <div className="hidden md:block">
                  <h1 className="text-xl font-semibold text-gray-800 mb-4">
                    Student Information
                  </h1>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Name:</span> Sophia Clark
                    </div>
                    <div>
                      <span className="font-medium">Registration Number:</span>{" "}
                      2023-SC-001
                    </div>
                    <div>
                      <span className="font-medium">Class:</span> sss1
                    </div>
                    <div>
                      <span className="font-medium">Session:</span> 2024/2025
                    </div>
                    <div>
                      <span className="font-medium">Campus:</span> Campus 1
                    </div>
                    <div>
                      <span className="font-medium">Academic Year:</span> 2024 /
                      2025
                    </div>
                    <div>
                      <span className="font-medium">Term:</span> First Term
                    </div>
                  </div>
                </div>
                <div className="md:w-50 md:h-50 bg-pink-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={passport}
                    className="w-[100%] h-[100%] object-cover"
                    alt="passport"
                  />
                </div>

                {/* for small screen */}
                <div className="md:hidden mt-3">
                  <h1 className="text-xl font-semibold text-gray-800 mb-4">
                    Student Information
                  </h1>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Name:</span> Sophia Clark
                    </div>
                    <div>
                      <span className="font-medium">Registration Number:</span>{" "}
                      2023-SC-001
                    </div>
                    <div>
                      <span className="font-medium">Class:</span> sss1
                    </div>
                    <div>
                      <span className="font-medium">Session:</span> 2024/2025
                    </div>
                    <div>
                      <span className="font-medium">Campus:</span> Campus 1
                    </div>
                    <div>
                      <span className="font-medium">Academic Year:</span> 2024 /
                      2025
                    </div>
                    <div>
                      <span className="font-medium">Term:</span> First Term
                    </div>
                  </div>
                </div>
              </div>

              {/* Grades Table */}
              <div className="mb-8 rounded-b-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  {" "}
                  <table className="w-full border-separate border-spacing-0 bg-[#FAFAFA] min-w-[400px]">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Subject
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                          1st CA
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                          2nd CA
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                          Exam Score
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                          Total
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                          Grade
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                          Mathematics
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-sm text-blue-600">
                          18
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">
                          17
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">
                          55
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                          90
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-green-600">
                          A
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-sm text-green-600">
                          Excellent
                        </td>
                      </tr>
                      {[
                        "English",
                        "Science",
                        "Social Studies",
                        "History",
                        "Geography",
                        "Art",
                        "Music",
                      ].map((subject) => (
                        <tr key={subject}>
                          <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            {subject}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400"></td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400"></td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400"></td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400"></td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400"></td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Performance Summary */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Performance Summary
                </h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                  <div className="border-t border-gray-300 py-2">
                    <div className="text-gray-600 mb-1">Total Score</div>
                    <div className="font-semibold text-gray-800">678</div>
                  </div>
                  <div className="border-t border-gray-300 py-2">
                    <div className="text-gray-600 mb-1">Average Score</div>
                    <div className="font-semibold text-gray-800">84.75</div>
                  </div>
                  <div className="border-t border-gray-300 py-2">
                    <div className="text-gray-600 mb-1">Class Position</div>
                    <div className="font-semibold text-gray-800">
                      2nd out of 50
                    </div>
                  </div>
                  <div className="border-t border-gray-300 py-2">
                    <div className="text-gray-600 mb-1">Overall Grade</div>
                    <div className="font-semibold text-gray-800">B</div>
                  </div>
                  <div className="border-t border-gray-300 py-2">
                    <div className="text-gray-600 mb-1">Teacher's Remark</div>
                    <div className="font-semibold text-gray-800">
                      Sophia is a diligent student with a strong academic
                      performance. Keep up the good work!
                    </div>
                  </div>
                  <div className="border-t border-gray-300 py-2">
                    <div className="text-gray-600 mb-1">
                      School Resumption Date
                    </div>
                    <div className="font-semibold text-gray-800">
                      2024-01-08
                    </div>
                  </div>
                  <div className="border-t border-gray-300 py-2">
                    <div className="text-gray-600 mb-1">Session Length</div>
                    <div className="font-semibold text-gray-800">12 weeks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </>

      {isPrintModalOpen && <Print onClose={() => setIsPrintModalOpen(false)} />}
    </div>
  );
}
