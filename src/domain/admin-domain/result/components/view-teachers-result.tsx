import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Printer, SearchX } from "lucide-react";
import SearchTeachersComp from "./search-teachers.comp";
import { useViewTeacherResult } from "../hooks";
import { printContent } from "../../../../utils/print-content";
import EmptyBroadsheet from "../../../../assets/image/classResult.png";
import passportFemale from "../../../../assets/image/passport.png";
import passportMale from "../../../../assets/image/passport_2.png";

export default function ViewTeacherResultTab() {
  const {
    searchParams,
    page, setPage,
    teacherInformation, students, totalCount, totalPages, PAGE_SIZE,
    isFetching, isError,
    handleSearch, renderPageButtons,
  } = useViewTeacherResult();

  const contentRef = useRef<HTMLDivElement>(null);

  // Derive CA column headers from the first student's cas array
  const caHeaders = students[0]?.cas.map((ca) => ca.name) ?? [];

  return (
    <div>
      <SearchTeachersComp onSearch={handleSearch} isSearching={isFetching} />

      {!searchParams && (
        <div className="mt-6 flex flex-col items-center justify-center py-16 px-4 text-center">
          <img src={EmptyBroadsheet} alt="No result yet" className="w-52 h-52 object-contain" />
          <p className="text-sm font-semibold text-gray-700">No result displayed yet</p>
          <p className="text-xs text-gray-400 max-w-xs mt-1">
            Select a session, teacher, class, and subject above, then click{" "}
            <span className="font-medium text-[#8000BD]">Display Result</span> to view the teacher's result.
          </p>
        </div>
      )}

      {searchParams && (
        <>
          {isFetching ? (
            <div className="mt-6 bg-white rounded shadow-sm border border-gray-200 p-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <div className="w-8 h-8 border-4 border-[#8000BD] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Loading result...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="mt-6 bg-white rounded shadow-sm border border-gray-200 p-10 text-center text-sm text-red-500">
              Failed to load result. Please try again.
            </div>
          ) : !teacherInformation ? (
            <div className="mt-6 bg-white rounded shadow-sm border border-gray-200 p-16 flex flex-col items-center justify-center text-center">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <SearchX className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">No Results Found</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                No records found for the selected criteria. Please adjust your filters.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6"
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => contentRef.current && printContent(contentRef.current.innerHTML, "Teacher Result")}
                  className="bg-[#4B0082] text-white cursor-pointer px-3 py-2 rounded-sm flex items-center gap-2 text-sm font-semibold hover:bg-[#3a006b] transition-colors"
                >
                  <Printer size={18} /> PRINT RECORD
                </button>
              </div>

              <div ref={contentRef} className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
                {/* Teacher Info Header */}
                <div className="flex justify-between items-start bg-[#e6e7e8] p-5">
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <h2 className="text-base font-semibold text-gray-800 mb-3">Teacher's Information</h2>
                    <div><span className="font-medium">Name:</span> {teacherInformation.name}</div>
                    <div><span className="font-medium">Reg. No:</span> {teacherInformation.registrationNumber}</div>
                    <div><span className="font-medium">Subject:</span> {teacherInformation.subject} ({teacherInformation.subjectCode})</div>
                    <div><span className="font-medium">Class:</span> {teacherInformation.class}</div>
                    <div><span className="font-medium">Campus:</span> {teacherInformation.campus}</div>
                    <div><span className="font-medium">Session:</span> {teacherInformation.session}</div>
                    <div><span className="font-medium">Term:</span> {teacherInformation.term}</div>
                    <div>
                      <span className="font-medium">Date Submitted:</span>{" "}
                      {teacherInformation.dateSubmitted
                        ? new Date(teacherInformation.dateSubmitted).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                        : "—"}
                    </div>
                  </div>
                  <div className="w-28 h-28 bg-pink-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={teacherInformation.gender?.toLowerCase() === "male" ? passportMale : passportFemale}
                      className="w-full h-full object-cover"
                      alt="avatar"
                    />
                  </div>
                </div>

                {/* Students Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-[#EDF9FD] border-b border-gray-200">
                      <tr>
                        <th className="py-3 px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-center">S/N</th>
                        <th className="py-3 px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-left">Reg. No</th>
                        <th className="py-3 px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-left">Student Name</th>
                        {caHeaders.map((ca) => (
                          <th key={ca} className="py-3 px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-center">
                            {ca}
                          </th>
                        ))}
                        <th className="py-3 px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-center">CA Score</th>
                        <th className="py-3 px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-center">Exam Score</th>
                        <th className="py-3 px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-center">Total</th>
                        <th className="py-3 px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-center">Grade</th>
                        <th className="py-3 px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider text-left">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {students.map((student, idx) => (
                        <tr key={student.registrationNumber} className="hover:bg-gray-50">
                          <td className="py-3 px-3 text-sm text-gray-700 border-r border-gray-200 text-center">
                            {(page - 1) * PAGE_SIZE + idx + 1}
                          </td>
                          <td className="py-3 px-3 text-sm text-gray-500 border-r border-gray-200">{student.registrationNumber}</td>
                          <td className="py-3 px-3 text-sm font-medium text-gray-800 border-r border-gray-200">{student.studentName}</td>
                          {student.cas.map((ca, i) => (
                            <td key={i} className="py-3 px-3 text-sm text-gray-700 border-r border-gray-200 text-center">
                              {ca.score ?? "—"}
                            </td>
                          ))}
                          <td className="py-3 px-3 text-sm text-gray-700 border-r border-gray-200 text-center">{student.caScore}</td>
                          <td className="py-3 px-3 text-sm text-gray-700 border-r border-gray-200 text-center">{student.examScore ?? "—"}</td>
                          <td className="py-3 px-3 text-sm font-semibold text-[#8000BD] border-r border-gray-200 text-center">{student.total}</td>
                          <td className="py-3 px-3 text-sm font-semibold text-gray-800 border-r border-gray-200 text-center">{student.grade}</td>
                          <td className="py-3 px-3 text-sm text-gray-500">{student.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing {students.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, totalCount)} of {totalCount}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    {renderPageButtons().map((p, idx) =>
                      p === "..." ? (
                        <span key={`e-${idx}`} className="px-2 text-sm text-gray-400">...</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p as number)}
                          className={`w-8 h-8 rounded text-sm font-medium ${page === p ? "bg-[#8000BD] text-white" : "border border-gray-300 hover:bg-gray-50"}`}
                        >
                          {p}
                        </button>
                      )
                    )}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
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

    </div>
  );
}
