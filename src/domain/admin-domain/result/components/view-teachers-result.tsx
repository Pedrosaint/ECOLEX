import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Printer, SearchX } from "lucide-react";
import SearchTeachersComp from "./search-teachers.comp";
import { useViewTeacherResult } from "../hooks";
import Print from "../../../../general/common/print";
import EmptyBroadsheet from "../../../../assets/image/classResult.png";
import passport from "../../../../assets/image/passport.png";
import type { TeacherResultStaff } from "../types";

const TeacherBlock = ({ staff }: { staff: TeacherResultStaff }) => {
  const allSubjects = staff.assignments?.map((a) => a.subjectName).join(", ") || "—";
  const allClasses = staff.assignments?.map((a) => a.className).join(", ") || "—";

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Teacher Info Header */}
      <div className="md:flex md:justify-between items-start bg-[#e6e7e8] border-b border-[#D1D1D1] p-5 rounded-t-2xl">
        <div className="hidden md:block">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Teacher's Information</h1>
          <div className="space-y-1 text-sm text-gray-600">
            <div><span className="font-medium">Name:</span> {staff.staffName || "—"}</div>
            <div><span className="font-medium">Registration Number:</span> {staff.registrationNumber || "—"}</div>
            <div><span className="font-medium">Subject:</span> {allSubjects}</div>
            <div><span className="font-medium">Class:</span> {allClasses}</div>
            <div><span className="font-medium">Session:</span> —</div>
            <div><span className="font-medium">Campus:</span> —</div>
            <div><span className="font-medium">Submission Status:</span> —</div>
            <div><span className="font-medium">Date Submitted:</span> —</div>
          </div>
        </div>

        {/* Avatar */}
        <div className="w-32 h-32 bg-pink-200 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={passport}
            className="w-full h-full object-cover"
            alt="avatar"
          />
        </div>

        {/* Mobile info */}
        <div className="md:hidden mt-3">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Teacher's Information</h1>
          <div className="space-y-1 text-sm text-gray-600">
            <div><span className="font-medium">Name:</span> {staff.staffName || "—"}</div>
            <div><span className="font-medium">Registration Number:</span> {staff.registrationNumber || "—"}</div>
            <div><span className="font-medium">Subject:</span> {allSubjects}</div>
            <div><span className="font-medium">Class:</span> {allClasses}</div>
            <div><span className="font-medium">Session:</span> —</div>
            <div><span className="font-medium">Campus:</span> —</div>
            <div><span className="font-medium">Submission Status:</span> —</div>
            <div><span className="font-medium">Date Submitted:</span> —</div>
          </div>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="mb-4 rounded-b-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 bg-[#FAFAFA] min-w-[400px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">Reg. No</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">Student Name</th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">1st CA</th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">2nd CA</th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Exam Score</th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Total</th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Grade</th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {staff.assignments.length > 0 ? (
                staff.assignments.map((a, i) => (
                  <tr key={i}>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">—</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">—</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-blue-600">—</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-blue-600">—</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">—</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">—</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-green-600">—</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-green-600">—</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="border border-gray-300 px-4 py-6 text-center text-sm text-gray-400">
                    No assignments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function ViewTeacherResultTab() {
  const {
    searchParams,
    page, setPage,
    isPrintModalOpen, setIsPrintModalOpen,
    staffArray, totalCount, totalPages, PAGE_SIZE,
    isFetching, isError,
    handleSearch, renderPageButtons,
  } = useViewTeacherResult();

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
          ) : staffArray.length === 0 ? (
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-16 flex flex-col items-center justify-center text-center">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <SearchX className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">No Results Found</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                We couldn't find any records matching your selected criteria. Please try adjusting your filters.
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
                  onClick={() => setIsPrintModalOpen(true)}
                  className="bg-[#4B0082] text-white cursor-pointer px-3 py-2 rounded-sm flex items-center gap-2 text-sm font-semibold hover:bg-[#3a006b] transition-colors"
                >
                  <Printer size={18} /> PRINT RECORD
                </button>
              </div>

              {staffArray.map((staff) => (
                <TeacherBlock key={staff.staffId} staff={staff} />
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-2 mb-4 px-2">
                  <p className="text-sm text-gray-500">
                    Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, totalCount)} of {totalCount}
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
                        <span key={`e-${idx}`} className="px-2 text-sm text-gray-400">...</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p as number)}
                          className={`w-8 h-8 rounded-lg text-sm font-medium ${page === p ? "bg-[#8000BD] text-white" : "border border-gray-300 hover:bg-gray-50"}`}
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
              )}
            </motion.div>
          )}
        </>
      )}

      {isPrintModalOpen && <Print onClose={() => setIsPrintModalOpen(false)} />}
    </div>
  );
}
