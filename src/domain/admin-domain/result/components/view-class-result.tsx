import { ChevronLeft, ChevronRight, Printer } from "lucide-react";
import SearchClassComp, { type ClassSearchParams } from "./search-class.comp";
import { motion } from "framer-motion";
import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetBroadsheetQuery } from "../api/grading.api";
import Print from "../../../../general/common/print";
import EmptyBroadsheet from "../../../../assets/image/classResult.png";

const PAGE_SIZE = 10;

const ViewClassResult = () => {
  const [searchParams, setSearchParams] = useState<ClassSearchParams | null>(null);
  const [page, setPage] = useState(1);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const { data, isFetching, isError } = useGetBroadsheetQuery(
    searchParams ?? skipToken
  );

  const broadsheet = data?.data;
  const allRows = broadsheet?.rows ?? [];
  const totalPages = Math.max(1, Math.ceil(allRows.length / PAGE_SIZE));
  const paginatedRows = allRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (params: ClassSearchParams) => {
    setSearchParams(params);
    setPage(1);
  };

  const renderPageButtons = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div>
      <SearchClassComp onSearch={handleSearch} isSearching={isFetching} />

      {/* Empty state — before any search */}
      {!searchParams && (
        <div className="mt-6 flex flex-col items-center justify-center py-16 px-4 text-center">
          <img src={EmptyBroadsheet} alt="Empty broadsheet" className="w-52 h-52 object-contain" />
          <p className="text-sm font-semibold text-gray-700">No result displayed yet</p>
          <p className="text-xs text-gray-400 max-w-xs">
            Select an academic session, class, and group above, then click{" "}
            <span className="font-medium text-[#8000BD]">Display Result</span> to view the broadsheet.
          </p>
        </div>
      )}

      {/* Show result area only after first search */}
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
          ) : !broadsheet || allRows.length === 0 ? (
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center text-sm text-gray-400">
              No results found for the selected criteria.
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6"
            >
              {/* Print button */}
              <div className="flex justify-end mb-3">
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="bg-[#4B0082] text-white cursor-pointer px-3 py-2 rounded-sm flex items-center gap-2 text-sm font-semibold"
                >
                  <Printer size={18} />
                  PRINT RECORD
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                {/* Header */}
                <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h1 className="text-base font-semibold text-gray-900">
                    Class Result — <span className="font-bold">{broadsheet.className}</span>
                    {" · "}{broadsheet.sessionName}
                  </h1>
                  {broadsheet.classTeacher && (
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Class Teacher:</span> {broadsheet.classTeacher}
                    </p>
                  )}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-separate border-spacing-0 rounded-lg overflow-hidden shadow-sm text-xs">
                    <thead className="bg-[#EDF9FD]">
                      <tr>
                        <th className="border border-gray-300 bg-[#EDF9FD] p-2 font-semibold text-gray-700 min-w-[40px]">S/N</th>
                        <th className="border border-gray-300 bg-[#EDF9FD] p-2 font-semibold text-gray-700 min-w-[100px] whitespace-nowrap">Reg No</th>
                        <th className="border border-gray-300 bg-[#EDF9FD] p-2 font-semibold text-gray-700 min-w-[150px]">Student Name</th>
                        {broadsheet.subjects.map((subject) => (
                          <th
                            key={subject}
                            className="border border-gray-300 bg-[#EDF9FD] p-1 font-semibold text-gray-700 min-w-[50px]"
                            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                          >
                            <div className="whitespace-nowrap py-2">{subject.trim()}</div>
                          </th>
                        ))}
                        <th className="border border-gray-300 bg-[#EDF9FD] p-2 font-semibold text-gray-700 min-w-[60px] whitespace-nowrap">Grand Total</th>
                        {broadsheet.usePosition && (
                          <th className="border border-gray-300 bg-[#EDF9FD] p-2 font-semibold text-gray-700 min-w-[60px]">Position</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedRows.map((row, i) => (
                        <tr key={row.studentId} className="hover:bg-purple-50">
                          <td className="border border-gray-300 bg-white p-2 text-center">
                            {(page - 1) * PAGE_SIZE + i + 1}
                          </td>
                          <td className="border border-gray-300 bg-white p-2 whitespace-nowrap">
                            {row.registrationNumber}
                          </td>
                          <td className="border border-gray-300 bg-white p-2">{row.studentName}</td>
                          {broadsheet.subjects.map((subject) => {
                            const score = row.scores[subject];
                            return (
                              <td key={subject} className="border border-gray-300 bg-white p-2 text-center">
                                {score ? score.subjectTotal : "—"}
                              </td>
                            );
                          })}
                          <td className="border border-gray-300 bg-white p-2 text-center font-semibold">
                            {row.grandTotal}
                          </td>
                          {broadsheet.usePosition && (
                            <td className="border border-gray-300 bg-white p-2 text-center">
                              {row.position ?? "—"}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-5">
                  <p className="text-sm text-gray-500">
                    Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, allRows.length)} of {allRows.length}
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
                        <span key={`ellipsis-${idx}`} className="px-2 text-sm text-gray-400">...</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p as number)}
                          className={`w-8 h-8 rounded-lg text-sm font-medium ${
                            page === p
                              ? "bg-[#8000BD] text-white"
                              : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {p}
                        </button>
                      )
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
              </div>
            </motion.div>
          )}
        </>
      )}

      {isPrintModalOpen && <Print onClose={() => setIsPrintModalOpen(false)} />}
    </div>
  );
};

export default ViewClassResult;
