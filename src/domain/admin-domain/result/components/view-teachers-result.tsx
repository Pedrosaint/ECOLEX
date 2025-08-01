
import { motion } from "framer-motion";
import SearchTeachersComp from "./search-teachers.comp";
import { ChevronLeft, ChevronRight, Printer, Search } from "lucide-react";
import { useState } from "react";
import Print from "../../../../general/common/print";
import passport from "../../../../assets/image/passport.png";


export default function ViewTeacherResultTab() {
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

   const totalResults = 223;
   const resultsPerPage = 9;
   const totalPages = Math.ceil(totalResults / resultsPerPage);
  return (
    <>
      <SearchTeachersComp />

      <div>
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
                    Teache's Information
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
                    <div>
                      <span className="font-medium">Date Submitted:</span>{" "}
                      01/01/2022
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
                    Teacher's Information
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
                    <div>
                      <span className="font-medium">Date Submitted:</span>{" "}
                      01/01/2022
                    </div>
                  </div>
                </div>
              </div>

              {/* Grades Table */}
              <div className="mb-2 rounded-b-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  {" "}
                  <table className="w-full border-separate border-spacing-0 bg-[#FAFAFA] min-w-[400px]">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Reg. No
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                          Student Name
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                          1nd CA
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
                          ECO342
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-sm text-blue-600">
                          Sophia Clark
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">
                          17
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">
                          13
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">
                          45
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                          75
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-green-600">
                          A
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-sm text-green-600">
                          Excellent
                        </td>
                      </tr>
                      {[
                        "ECO342",
                        "ECO342",
                        "ECO342",
                        "ECO342",
                        "ECO342",
                        "ECO342",
                        "ECO342",
                        "ECO342",
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
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

                 {/* Pagination */}
                <div className="px-10">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Showing 1-9 of {totalResults}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
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


              <div className="flex md:justify-end mt-10 pr-6 gap-3">
                <button className="bg-[#4B0082] text-white px-6 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer">
                  Appove Result
                </button>
                <button className="bg-[#EBE5F5] text-gray-700 px-6 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer">
                  Reject Result
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {isPrintModalOpen && (
          <Print onClose={() => setIsPrintModalOpen(false)} />
        )}
      </div>
    </>
  );
}
