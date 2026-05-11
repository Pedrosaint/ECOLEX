import { useState } from "react";
import { ChevronLeft, ChevronRight, Printer, SearchX } from "lucide-react";
import { motion } from "framer-motion";
import SearchClassComp from "./search-class.comp";
import { useViewClassResult } from "../hooks";
import Print from "../../../../general/common/print";
import EmptyBroadsheet from "../../../../assets/image/classResult.png";
import type { BroadsheetData } from "../types";

const BroadsheetTable = ({
  broadsheet,
  PAGE_SIZE,
}: {
  broadsheet: BroadsheetData;
  PAGE_SIZE: number;
}) => {
  const [page, setPage] = useState(1);

  const allRows = broadsheet.rows ?? [];
  const totalPages = Math.max(1, Math.ceil(allRows.length / PAGE_SIZE));
  const paginatedRows = allRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const renderPageButtons = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      )
        pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const getOrdinalSuffix = (
    num: number | string | null | undefined,
  ): string => {
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
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <h1 className="text-base font-semibold text-gray-900">
          Class Result —{" "}
          <span className="font-bold">{broadsheet.className}</span>
          {" · "}
          {broadsheet.sessionName}
        </h1>
        {broadsheet.classTeacher && (
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Class Teacher:</span>{" "}
            {broadsheet.classTeacher}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 rounded-lg overflow-hidden shadow-sm text-xs">
          <thead className="bg-[#EDF9FD]">
            {/* Header Row */}
            <tr>
              <th className="border border-gray-300 bg-[#EDF9FD] p-2 font-semibold text-gray-700 min-w-[40px] text-center">
                S/N
              </th>
              <th className="border border-gray-300 bg-[#EDF9FD] p-2 font-semibold text-gray-700 min-w-[100px] whitespace-nowrap text-left">
                Reg No
              </th>
              <th className="border border-gray-300 bg-[#EDF9FD] p-2 font-semibold text-gray-700 min-w-[150px] text-left">
                Student Name
              </th>
              {broadsheet.subjects.map((subject) => (
                <th
                  key={subject}
                  className="border border-gray-300 bg-[#EDF9FD] p-2 font-semibold text-gray-700 text-center h-32"
                >
                  <div className="whitespace-nowrap transform -rotate-45 flex items-center justify-center h-full">
                    {subject.trim()}
                  </div>
                </th>
              ))}
              <th className="border border-gray-300 bg-[#EDF9FD] p-2 font-semibold text-gray-700 min-w-[60px] whitespace-nowrap text-center">
                Grand Total
              </th>
              {broadsheet.usePosition && (
                <th className="border border-gray-300 bg-[#EDF9FD] p-2 font-semibold text-gray-700 min-w-[60px] text-center">
                  Position
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row, i) => (
              <tr key={row.studentId} className="hover:bg-purple-50">
                <td className="border border-gray-300 bg-white p-2 text-center">
                  {(page - 1) * PAGE_SIZE + i + 1}
                </td>
                <td className="border border-gray-300 bg-white p-2 whitespace-nowrap font-medium text-[#8000BD]">
                  {row.registrationNumber}
                </td>
                <td className="border border-gray-300 bg-white p-2 whitespace-nowrap">
                  {row.studentName}
                </td>
                {broadsheet.subjects.map((subject) => {
                  const score = row.scores[subject];
                  return (
                    <td
                      key={`${row.studentId}-${subject}-total`}
                      className="border border-gray-300 bg-white p-2 text-center font-semibold text-gray-800"
                    >
                      {score?.subjectTotal ?? "—"}
                    </td>
                  );
                })}
                <td className="border border-gray-300 bg-white p-2 text-center font-bold text-gray-900">
                  {row.grandTotal}
                </td>
                {broadsheet.usePosition && (
                  <td className="border border-gray-300 bg-white p-2 text-center text-gray-700">
                    {getOrdinalSuffix(row.position)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {allRows.length > 0 && (
        <div className="flex items-center justify-between mt-5">
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, allRows.length)} of {allRows.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {renderPageButtons().map((p, idx) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 text-sm text-gray-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium ${page === p ? "bg-[#8000BD] text-white" : "border border-gray-300 hover:bg-gray-50"}`}
                >
                  {p}
                </button>
              ),
            )}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ViewClassResult = () => {
  const {
    searchParams,
    isPrintModalOpen,
    setIsPrintModalOpen,
    broadsheetDataArray,
    PAGE_SIZE,
    isFetching,
    isError,
    handleSearch,
  } = useViewClassResult();

  return (
    <div>
      <SearchClassComp onSearch={handleSearch} isSearching={isFetching} />

      {!searchParams && (
        <div className="mt-6 flex flex-col items-center justify-center py-16 px-4 text-center">
          <img
            src={EmptyBroadsheet}
            alt="Empty broadsheet"
            className="w-52 h-52 object-contain"
          />
          <p className="text-sm font-semibold text-gray-700">
            No result displayed yet
          </p>
          <p className="text-xs text-gray-400 max-w-xs">
            Select an academic session, class, and group above, then click{" "}
            <span className="font-medium text-[#8000BD]">Display Result</span>{" "}
            to view the broadsheet.
          </p>
        </div>
      )}

      {searchParams && (
        <>
          {isFetching ? (
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <div className="w-8 h-8 border-4 border-[#8000BD] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Loading broadsheet...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center text-sm text-red-500">
              Failed to load broadsheet. Please try again.
            </div>
          ) : broadsheetDataArray.length === 0 ? (
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-16 flex flex-col items-center justify-center text-center">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <SearchX className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                No Results Found
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                We couldn't find any records matching your selected criteria.
                Please try adjusting your filters.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6"
            >
              <div className="flex justify-end mb-3">
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="bg-[#4B0082] text-white cursor-pointer px-3 py-2 rounded-sm flex items-center gap-2 text-sm font-semibold"
                >
                  <Printer size={18} /> PRINT RECORD
                </button>
              </div>

              {broadsheetDataArray.map((broadsheet, idx) => (
                <BroadsheetTable
                  key={idx}
                  broadsheet={broadsheet}
                  PAGE_SIZE={PAGE_SIZE}
                />
              ))}
            </motion.div>
          )}
        </>
      )}

      {isPrintModalOpen && <Print onClose={() => setIsPrintModalOpen(false)} />}
    </div>
  );
};

export default ViewClassResult;
