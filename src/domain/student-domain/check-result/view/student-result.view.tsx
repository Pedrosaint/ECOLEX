import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Printer, SearchX } from "lucide-react";
import { skipToken } from "@reduxjs/toolkit/query";
import SearchComp from "../components/search-result.comp";
import { useGetStudentResultsQuery } from "../hooks";
import { printContent } from "../../../../utils/print-content";

const toOrdinal = (n: number): string => {
  const j = n % 10, k = n % 100;
  if (j === 1 && k !== 11) return n + "st";
  if (j === 2 && k !== 12) return n + "nd";
  if (j === 3 && k !== 13) return n + "rd";
  return n + "th";
};

const StudentResultView = () => {
  const [academicSessionId, setAcademicSessionId] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data, isFetching, isError } = useGetStudentResultsQuery(
    academicSessionId ? { academicSessionId } : skipToken,
    { refetchOnMountOrArgChange: true }
  );

  const results = data?.data ?? [];
  const hasResults = results.length > 0;

  // Determine number of CA columns from the row with the most CAs
  const maxCas = results.reduce((max, row) => Math.max(max, row.cas.length), 0);
  const caHeaders = Array.from({ length: maxCas }, (_, i) => `CA${i + 1}`);

  return (
    <div>
      <SearchComp onSearch={setAcademicSessionId} />

      {!academicSessionId && (
        <div className="mt-10 flex flex-col items-center justify-center py-16 text-center text-gray-400">
          <p className="text-sm font-medium">Select an academic session above to view your results.</p>
        </div>
      )}

      {academicSessionId && (
        <>
          {isFetching ? (
            <div className="mt-10 bg-white rounded shadow-sm border border-gray-200 p-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <div className="w-8 h-8 border-4 border-[#8000BD] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Loading results...</p>
              </div>
            </div>
          ) : isError || !data?.success ? (
            <div className="mt-10 bg-white rounded shadow-sm border border-gray-200 p-10 flex flex-col items-center justify-center text-center">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <SearchX className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">No Results Found</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                No result records found for the selected session.
              </p>
            </div>
          ) : !hasResults ? (
            <div className="mt-10 bg-white rounded shadow-sm border border-gray-200 p-10 flex flex-col items-center justify-center text-center">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <SearchX className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">No results available for this session.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-10"
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => contentRef.current && printContent(contentRef.current.innerHTML, "Student Result")}
                  className="bg-[#4B0082] text-white px-3 py-2 rounded-sm flex items-center gap-2 text-sm font-semibold transition-colors cursor-pointer hover:bg-[#3a0066]"
                >
                  <Printer size={18} />
                  PRINT RECORD
                </button>
              </div>

              <div ref={contentRef} className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h2 className="text-sm font-semibold text-gray-800">Academic Results</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-[#EDF9FD] border-b border-gray-200">
                      <tr>
                        <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-center">S/N</th>
                        <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-left">Subject</th>
                        {caHeaders.map((ca) => (
                          <th key={ca} className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-center">
                            {ca}
                          </th>
                        ))}
                        <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-center">Exam</th>
                        <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-center">Total</th>
                        <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-center">Grade</th>
                        <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-center">Class Avg</th>
                        <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">Position</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {results.map((row) => (
                        <tr key={row.sn} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200 text-center">{row.sn}</td>
                          <td className="py-3 px-4 text-sm font-medium text-gray-800 border-r border-gray-200">{row.subject}</td>
                          {caHeaders.map((_, i) => (
                            <td key={i} className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200 text-center">
                              {row.cas[i] ?? "—"}
                            </td>
                          ))}
                          <td className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200 text-center">{row.exam}</td>
                          <td className="py-3 px-4 text-sm font-semibold text-[#8000BD] border-r border-gray-200 text-center">{row.total}</td>
                          <td className="py-3 px-4 text-sm font-semibold text-gray-800 border-r border-gray-200 text-center">{row.grade}</td>
                          <td className="py-3 px-4 text-sm text-gray-500 border-r border-gray-200 text-center">{row.classAvg}</td>
                          <td className="py-3 px-4 text-sm font-semibold text-gray-700 text-center">{row.position != null ? toOrdinal(row.position) : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

    </div>
  );
};

export default StudentResultView;
