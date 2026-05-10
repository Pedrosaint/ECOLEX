import { useState, useEffect } from "react";
import { SearchX, ChevronLeft, ChevronRight } from "lucide-react";
import type { TeacherBroadsheetResponse, BroadsheetRow } from "../../overview/types";

interface Props {
  broadsheetData: TeacherBroadsheetResponse | undefined;
  isLoading: boolean;
  hasFiltered: boolean;
  error?: unknown;
}

const PAGE_SIZE = 10;

const ViewClassTable = ({ broadsheetData, isLoading, hasFiltered, error }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [broadsheetData]);

  if (!hasFiltered) {
    return (
      <div className="p-10 bg-white mt-5 border border-gray-200 flex flex-col items-center justify-center gap-3 text-center">
        <SearchX className="w-12 h-12 text-gray-300" />
        <p className="text-gray-500 font-medium">No results to display</p>
        <p className="text-sm text-gray-400">
          Select a class and click{" "}
          <span className="font-semibold text-[#8000BD]">Display Result</span>{" "}
          to view the broadsheet.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 bg-white mt-5 border border-gray-200 space-y-3">
        <div className="h-6 w-64 bg-gray-200 rounded animate-pulse mb-4" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  const dataArray = broadsheetData?.data ?? [];

  if (dataArray.length === 0) {
    const errorMessage = (error as { data?: { message?: string } })?.data?.message;
    return (
      <div className="p-10 bg-white mt-5 border border-gray-200 flex flex-col items-center justify-center gap-3 text-center">
        <SearchX className="w-12 h-12 text-gray-300" />
        <p className="text-gray-500 font-medium">No results found</p>
        <p className="text-sm text-gray-400">
          {errorMessage ?? "No results available for the selected class and term."}
        </p>
      </div>
    );
  }

  const getOrdinalSuffix = (num: number | string | null | undefined): string => {
    if (num === null || num === undefined || num === "—") return "—";
    
    const n = typeof num === "string" ? parseInt(num, 10) : num;
    if (isNaN(n)) return String(num);

    const j = n % 10;
    const k = n % 100;

    if (j === 1 && k !== 11) return n + "st";
    if (j === 2 && k !== 12) return n + "nd";
    if (j === 3 && k !== 13) return n + "rd";
    return n + "th";
  };

  return (
    <div className="space-y-6">
      {dataArray.map((classData, dataIdx) => {
        const subjects = classData.subjects ?? [];
        const allRows: BroadsheetRow[] = classData.rows ?? [];
        const usePosition = classData.usePosition ?? false;

        if (allRows.length === 0) return null;

        const totalRows = allRows.length;
        const totalPages = Math.ceil(totalRows / PAGE_SIZE);
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const currentRows = allRows.slice(startIndex, startIndex + PAGE_SIZE);

        const handlePageChange = (pageNum: number) => {
          if (pageNum >= 1 && pageNum <= totalPages) {
            setCurrentPage(pageNum);
          }
        };

        return (
          <div key={dataIdx} className="bg-white mt-5 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto p-6">
              <table className="w-full border-collapse bg-white text-sm">
                <thead>
                  {/* Top header row */}
                  <tr className="bg-gray-50">
                    <th rowSpan={2} className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-700">S/N</th>
                    <th rowSpan={2} className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">Reg. No.</th>
                    <th rowSpan={2} className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">Student Name</th>
                    {subjects.map((subject) => (
                      <th
                        key={subject}
                        colSpan={5}
                        className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-700"
                      >
                        {subject.trim()}
                      </th>
                    ))}
                    <th rowSpan={2} className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-700">Grand Total</th>
                    {usePosition && (
                      <th rowSpan={2} className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-700">Position</th>
                    )}
                  </tr>

                  {/* Sub-header row for CA / Exam / Total / Grade / Remark */}
                  <tr className="bg-gray-50">
                    {subjects.map((subject) => (
                      <>
                        <th key={`${subject}-ca`} className="border border-gray-300 px-2 py-1 text-center text-xs text-gray-500 font-medium">CA</th>
                        <th key={`${subject}-exam`} className="border border-gray-300 px-2 py-1 text-center text-xs text-gray-500 font-medium">Exam</th>
                        <th key={`${subject}-total`} className="border border-gray-300 px-2 py-1 text-center text-xs text-gray-500 font-medium">Total</th>
                        <th key={`${subject}-grade`} className="border border-gray-300 px-2 py-1 text-center text-xs text-gray-500 font-medium">Grade</th>
                        <th key={`${subject}-remark`} className="border border-gray-300 px-2 py-1 text-center text-xs text-gray-500 font-medium">Remark</th>
                      </>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {currentRows.map((row, index) => (
                    <tr key={row.studentId} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">{startIndex + index + 1}</td>
                      <td className="border border-gray-300 px-3 py-2 text-[#8000BD]">{row.registrationNumber}</td>
                      <td className="border border-gray-300 px-3 py-2 text-gray-800 whitespace-nowrap">{row.studentName}</td>
                      {subjects.map((subject) => {
                        const score = row.scores[subject];
                        return (
                          <>
                            <td key={`${row.studentId}-${subject}-ca`} className="border border-gray-300 px-2 py-2 text-center text-gray-700">{score?.caTotal ?? "—"}</td>
                            <td key={`${row.studentId}-${subject}-exam`} className="border border-gray-300 px-2 py-2 text-center text-gray-700">{score?.examTotal ?? "—"}</td>
                            <td key={`${row.studentId}-${subject}-total`} className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-800">{score?.subjectTotal ?? "—"}</td>
                            <td key={`${row.studentId}-${subject}-grade`} className="border border-gray-300 px-2 py-2 text-center font-semibold text-[#8000BD]">{score?.grade ?? "—"}</td>
                            <td key={`${row.studentId}-${subject}-remark`} className="border border-gray-300 px-2 py-2 text-center text-xs text-gray-600">{score?.remark ?? "—"}</td>
                          </>
                        );
                      })}
                      <td className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-800">{row.grandTotal}</td>
                      {usePosition && (
                        <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">{getOrdinalSuffix(row.position)}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-200 bg-gray-50 no-print">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to{" "}
                    <span className="font-medium text-gray-900">{Math.min(startIndex + PAGE_SIZE, totalRows)}</span> of{" "}
                    <span className="font-medium text-gray-900">{totalRows}</span> results
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-1.5 text-gray-500 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <div className="flex items-center px-2 space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Logic to show a window of 5 pages max around current page
                        let pageNum = i + 1;
                        if (totalPages > 5) {
                           if (currentPage > 3 && currentPage < totalPages - 1) {
                             pageNum = currentPage - 2 + i;
                           } else if (currentPage >= totalPages - 1) {
                             pageNum = totalPages - 4 + i;
                           }
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-8 h-8 rounded text-sm font-medium transition-colors cursor-pointer ${
                              currentPage === pageNum
                                ? "bg-[#8000BD] text-white"
                                : "text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-1.5 text-gray-500 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ViewClassTable;

