import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Printer } from "lucide-react";
import SearchTeachersComp from "./search-teachers.comp";
import { useViewTeacherResult } from "../hooks";
import Print from "../../../../general/common/print";
import EmptyBroadsheet from "../../../../assets/image/classResult.png";

export default function ViewTeacherResultTab() {
  const {
    searchParams, page, setPage,
    isPrintModalOpen, setIsPrintModalOpen,
    result, caHeaders, totalPages,
    isFetching, isError,
    handleSearch, renderPageButtons,
  } = useViewTeacherResult();

  const TeacherInfo = () => result ? (
    <div className="space-y-1 text-sm text-gray-600">
      <div><span className="font-medium">Name:</span> {result.teacher?.name ?? "—"}</div>
      <div><span className="font-medium">Registration Number:</span> {result.teacher?.registrationNumber ?? "—"}</div>
      {result.teacher?.campus && <div><span className="font-medium">Campus:</span> {result.teacher.campus}</div>}
      <div><span className="font-medium">Class:</span> {result.class ?? "—"}</div>
      <div><span className="font-medium">Subject:</span> {result.subject ?? "—"}</div>
      <div><span className="font-medium">Session:</span> {result.session ?? "—"}</div>
      <div>
        <span className="font-medium">Submission Status:</span>{" "}
        <span className={result.submission?.status === "PENDING" ? "text-yellow-600 font-semibold" : "text-green-600 font-semibold"}>
          {result.submission?.status ?? "—"}
        </span>
      </div>
      <div><span className="font-medium">Date Submitted:</span> {result.submission?.submittedAt ? new Date(result.submission.submittedAt).toLocaleDateString() : "—"}</div>
    </div>
  ) : null;

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
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <div className="w-8 h-8 border-4 border-[#8000BD] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Loading result...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center text-sm text-red-500">
              Failed to load result. Please try again.
            </div>
          ) : !result ? (
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center text-sm text-gray-400">
              No result found for the selected criteria.
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="mt-6">
              <div className="flex justify-end mb-4">
                <button onClick={() => setIsPrintModalOpen(true)} className="bg-[#4B0082] text-white cursor-pointer px-3 py-2 rounded-sm flex items-center gap-2 text-sm font-semibold hover:bg-[#3a006b] transition-colors">
                  <Printer size={18} /> PRINT RECORD
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="md:flex md:justify-between items-start bg-[#e6e7e8] border-b border-[#D1D1D1] p-5 rounded-t-2xl mb-0">
                  <div>
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">Teacher's Information</h1>
                    <TeacherInfo />
                  </div>
                </div>

                <div className="mb-4 rounded-b-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-0 bg-[#FAFAFA] min-w-[400px]">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">Reg. No</th>
                          <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">Student Name</th>
                          {caHeaders.map((name) => <th key={name} className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">{name}</th>)}
                          <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">CA Total</th>
                          <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Exam</th>
                          <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Total</th>
                          <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Grade</th>
                          <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Remark</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(result.rows ?? []).map((row) => (
                          <tr key={row.registrationNumber}>
                            <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">{row.registrationNumber}</td>
                            <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">{row.studentName}</td>
                            {caHeaders.map((name) => {
                              const ca = row.caScores?.find((c) => c.name === name);
                              return <td key={name} className="border border-gray-300 px-4 py-3 text-center text-sm text-blue-600">{ca?.score ?? "—"}</td>;
                            })}
                            <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">{row.caTotal}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">{row.examTotal}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">{row.subjectTotal}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-green-600">{row.grade}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-sm text-green-600">{row.remark}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-2 mb-4">
                    <p className="text-sm text-gray-500">
                      Showing {(page - 1) * (result.meta?.pageSize ?? 10) + 1}–{Math.min(page * (result.meta?.pageSize ?? 10), result.meta?.total ?? 0)} of {result.meta?.total ?? 0}
                    </p>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      {renderPageButtons().map((p, idx) =>
                        p === "..." ? (
                          <span key={`e-${idx}`} className="px-2 text-sm text-gray-400">...</span>
                        ) : (
                          <button key={p} onClick={() => setPage(p as number)} className={`w-8 h-8 rounded-lg text-sm font-medium ${page === p ? "bg-[#8000BD] text-white" : "border border-gray-300 hover:bg-gray-50"}`}>{p}</button>
                        )
                      )}
                      <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </>
      )}

      {isPrintModalOpen && <Print onClose={() => setIsPrintModalOpen(false)} />}
    </div>
  );
}
