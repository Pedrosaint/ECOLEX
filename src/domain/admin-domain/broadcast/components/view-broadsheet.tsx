import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Printer, Search, SearchX } from "lucide-react";
import { useViewBroadsheet } from "../hooks";
import { printContent } from "../../../../utils/print-content";
import EmptyBroadsheet from "../../../../assets/image/classResult.png";

const selectBase =
  "w-full px-4 py-4 border border-gray-300 rounded-md text-sm appearance-none focus:outline-none pr-10";
const chevron = (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </div>
);

const getOrdinalSuffix = (num: number | null | undefined): string => {
  if (num === null || num === undefined) return "—";
  const j = num % 10, k = num % 100;
  if (j === 1 && k !== 11) return num + "st";
  if (j === 2 && k !== 12) return num + "nd";
  if (j === 3 && k !== 13) return num + "rd";
  return num + "th";
};

export default function ViewBroadsheet() {
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    academicSessionId, handleSessionChange,
    termId, setTermId,
    classId, setClassId,
    sessionsData, sessionsLoading,
    classesData, classesLoading,
    terms,
    canSearch,
    searchParams,
    broadsheetData,
    PAGE_SIZE,
    isFetching, isError,
    handleSearch,
  } = useViewBroadsheet();

  const [page, setPage] = useState(1);

  const allRows = broadsheetData?.rows ?? [];
  const subjects = broadsheetData?.subjects ?? [];
  const totalPages = Math.max(1, Math.ceil(allRows.length / PAGE_SIZE));
  const paginatedRows = allRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
    <>
      {/* Filters */}
      <div className="w-full mb-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
              Select Academic Session
            </label>
            <div className="relative">
              <select
                value={academicSessionId}
                onChange={(e) => handleSessionChange(e.target.value)}
                disabled={sessionsLoading}
                className={`${selectBase} ${academicSessionId ? "text-gray-700" : "text-gray-400"}`}
              >
                <option value="">{sessionsLoading ? "Loading..." : "Select Session"}</option>
                {(sessionsData?.data ?? []).map((s) => (
                  <option key={s.id} value={String(s.id)}>{s.name}</option>
                ))}
              </select>
              {chevron}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
              Select Academic Term
            </label>
            <div className="relative">
              <select
                value={termId}
                onChange={(e) => setTermId(e.target.value)}
                disabled={!academicSessionId}
                className={`${selectBase} ${termId ? "text-gray-700" : "text-gray-400"}`}
              >
                <option value="">
                  {!academicSessionId ? "Select session first" : terms.length === 0 ? "No terms" : "Select Term"}
                </option>
                {terms.map((t) => (
                  <option key={t.id} value={String(t.id)}>{t.name}</option>
                ))}
              </select>
              {chevron}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
              Select Class
            </label>
            <div className="relative">
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                disabled={classesLoading}
                className={`${selectBase} ${classId ? "text-gray-700" : "text-gray-400"}`}
              >
                <option value="">{classesLoading ? "Loading..." : "Select Class"}</option>
                {(classesData?.classes ?? []).map((c) => (
                  <option key={c.id} value={String(c.id)}>{c.name}</option>
                ))}
              </select>
              {chevron}
            </div>
          </div>
        </div>
      </div>

      {/* Display Result Button */}
      <div
        onClick={canSearch ? handleSearch : undefined}
        className={`px-6 py-3 mb-5 ${canSearch ? "bg-[#8000BD] cursor-pointer" : "bg-[#D9D9D9] cursor-not-allowed"}`}
      >
        <div className="flex items-center justify-center">
          <Search className="w-5 h-5 mr-2 text-white" />
          <button
            type="button"
            disabled={!canSearch || isFetching}
            className="bg-transparent text-white font-semibold outline-none"
          >
            {isFetching ? "LOADING..." : "DISPLAY RESULT"}
          </button>
        </div>
      </div>

      {/* Empty state before search */}
      {!searchParams && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <img src={EmptyBroadsheet} alt="Empty broadsheet" className="w-52 h-52 object-contain" loading="lazy" />
          <p className="text-sm font-semibold text-gray-700">No result displayed yet</p>
          <p className="text-xs text-gray-400 max-w-xs">
            Select a session, term, and class above, then click{" "}
            <span className="font-medium text-[#8000BD]">DISPLAY RESULT</span> to view the broadsheet.
          </p>
        </div>
      )}

      {searchParams && (
        <>
          {isFetching ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <div className="w-8 h-8 border-4 border-[#8000BD] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Loading broadsheet...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center text-sm text-red-500">
              Failed to load broadsheet. Please try again.
            </div>
          ) : !broadsheetData || allRows.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 flex flex-col items-center justify-center text-center">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <SearchX className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">No Results Found</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                No records found for the selected criteria. Please try adjusting your filters.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex justify-end mb-5">
                <button
                  onClick={() => contentRef.current && printContent(contentRef.current.innerHTML, "Broadsheet")}
                  className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center cursor-pointer space-x-2 text-sm font-semibold transition-colors"
                >
                  <Printer size={20} />
                  <span>PRINT RECORD</span>
                </button>
              </div>

              <div ref={contentRef} className="bg-white p-6 rounded shadow-sm border border-gray-200">
                <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h1 className="text-base font-semibold text-gray-900">
                    Broadsheet — <span className="font-bold">{broadsheetData.className}</span>
                    {" · "}
                    {broadsheetData.sessionName}
                  </h1>
                  {broadsheetData.classTeacher && (
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Class Teacher:</span> {broadsheetData.classTeacher}
                    </p>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <div className="rounded border-[#d1d1d1] p-4">
                    <table className="w-full border-separate border-spacing-0 rounded overflow-hidden shadow-sm">
                      <thead className="bg-[#EDF9FD]">
                        <tr>
                          <th className="border border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700 min-w-[40px]">
                            S/N
                          </th>
                          <th className="border border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700 min-w-[80px]">
                            Reg No
                          </th>
                          <th className="border border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700 min-w-[120px]">
                            Students Name
                          </th>
                          {subjects.map((subject) => (
                            <th
                              key={subject}
                              className="border border-gray-300 bg-[#EDF9FD] p-1 text-xs font-medium text-gray-700 min-w-[60px] text-center"
                              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                            >
                              <div className="transform rotate-200 whitespace-nowrap py-2">
                                {subject.trim()}
                              </div>
                            </th>
                          ))}
                          <th className="border border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700 min-w-[60px] text-center whitespace-nowrap">
                            Grand Total
                          </th>
                          {broadsheetData.usePosition && (
                            <th className="border border-gray-300 bg-[#EDF9FD] p-2 text-xs font-medium text-gray-700 min-w-[60px] text-center">
                              Position
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="border-collapse">
                        {paginatedRows.map((row, i) => (
                          <tr key={row.studentId} className="hover:bg-purple-50">
                            <td className="border border-gray-300 bg-white p-2 text-xs text-center font-medium">
                              {(page - 1) * PAGE_SIZE + i + 1}
                            </td>
                            <td className="border border-gray-300 bg-white p-2 text-xs font-medium text-[#8000BD]">
                              {row.registrationNumber}
                            </td>
                            <td className="border border-gray-300 bg-white p-2 text-xs font-medium whitespace-nowrap">
                              {row.studentName}
                            </td>
                            {subjects.map((subject) => {
                              const score = row.scores[subject];
                              return (
                                <td
                                  key={`${row.studentId}-${subject}`}
                                  className="border border-gray-300 bg-white p-2 text-xs text-center min-w-[60px] font-semibold text-gray-800"
                                >
                                  {score?.subjectTotal ?? "—"}
                                </td>
                              );
                            })}
                            <td className="border border-gray-300 bg-white p-2 text-xs text-center font-bold text-gray-900">
                              {row.grandTotal}
                            </td>
                            {broadsheetData.usePosition && (
                              <td className="border border-gray-300 bg-white p-2 text-xs text-center text-gray-700">
                                {getOrdinalSuffix(row.position)}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-600">
                    Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, allRows.length)} of {allRows.length}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <div className="flex items-center space-x-1">
                      {renderPageButtons().map((p, idx) =>
                        p === "..." ? (
                          <span key={`ellipsis-${idx}`} className="px-2 text-sm text-gray-500">...</span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => setPage(p as number)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium ${
                              page === p ? "bg-purple-600 text-white" : "border border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {p}
                          </button>
                        )
                      )}
                    </div>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
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

    </>
  );
}
