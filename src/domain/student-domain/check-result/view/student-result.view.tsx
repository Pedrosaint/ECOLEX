import { motion } from "framer-motion";
import SearchComp from "../components/search-result.comp"
import { Printer, X } from "lucide-react";
import { useState } from "react";
import Print from "../../../../general/common/print";

const StudentResultView = () => {
    const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
    const Result = Array.from({ length: 9 }, (_, index) => ({
      id: index + 1,
      no: index + 1,
      subject: "Mathematics",
      ca1: "8",
      ca2: "8",
      ca3: "20",
      exam: "35",
      total: "51",
      grade: "C",
      classAvg: "62.71",
      postion: "10th",
    }));
  return (
    <div>
      <SearchComp />

      <>
        <div className="flex justify-end mt-10">
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer"
          >
            <Printer size={20} />
            <span>PRINT RECORD</span>
          </button>
        </div>

        {/* Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden py-6 px-5 mt-10"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className=" text-gray-900 mb-2 font-inter">Result Sheet</h1>
            <button className="bg-[#ED294A] text-white px-5 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors cursor-pointer">
              <X size={20} />
              <h1> REMOVE</h1>
            </button>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className=" border-b border-[#D1D1D1] h-15">
                  <tr>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      S/N
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Subject
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      1st CA (10)
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      2nd CA (20)
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      3rd CA (30)
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Exam
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Total
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Grade
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Class Avg
                    </th>
                    <th className="text-cneter py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Position
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
                        {result.subject}
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
                        {result.classAvg}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                        {result.postion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {isPrintModalOpen && (
          <Print onClose={() => setIsPrintModalOpen(false)} />
        )}
      </>
    </div>
  );
}

export default StudentResultView
