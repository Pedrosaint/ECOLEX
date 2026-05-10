import { motion } from "framer-motion";
import { Printer, SearchX } from "lucide-react";
import SearchStudentComp from "./search-student.comp";
import { useViewStudentResult } from "../hooks";
import Print from "../../../../general/common/print";
import passport from "../../../../assets/image/passport.png";
import EmptyBroadsheet from "../../../../assets/image/classResult.png";
import type { PaginatedStudentResultData } from "../types";

const StudentBlock = ({ student }: { student: PaginatedStudentResultData }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
    {/* Student Info Header */}
    <div className="md:flex md:justify-between items-start bg-[#e6e7e8] border-b border-[#D1D1D1] p-5 rounded-t-2xl">
      <div className="hidden md:block">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Student Information</h1>
        <div className="space-y-1 text-sm text-gray-600">
          <div><span className="font-medium">Name:</span> {student.studentName || "—"}</div>
          <div><span className="font-medium">Registration Number:</span> {student.registrationNumber || "—"}</div>
          <div><span className="font-medium">Class:</span> —</div>
          <div><span className="font-medium">Session:</span> —</div>
          <div><span className="font-medium">Campus:</span> —</div>
          <div><span className="font-medium">Academic Year:</span> —</div>
          <div><span className="font-medium">Term:</span> —</div>
        </div>
      </div>

      {/* Avatar */}
      <div className="w-32 h-32 bg-pink-200 rounded-lg overflow-hidden flex-shrink-0">
        <img src={passport} className="w-full h-full object-cover" alt="passport" />
      </div>

      {/* Mobile info */}
      <div className="md:hidden mt-3">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Student Information</h1>
        <div className="space-y-1 text-sm text-gray-600">
          <div><span className="font-medium">Name:</span> {student.studentName || "—"}</div>
          <div><span className="font-medium">Registration Number:</span> {student.registrationNumber || "—"}</div>
          <div><span className="font-medium">Class:</span> —</div>
          <div><span className="font-medium">Session:</span> —</div>
          <div><span className="font-medium">Campus:</span> —</div>
          <div><span className="font-medium">Academic Year:</span> —</div>
          <div><span className="font-medium">Term:</span> —</div>
        </div>
      </div>
    </div>

    {/* Subjects Table */}
    <div className="mb-8 rounded-b-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 bg-[#FAFAFA] min-w-[400px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">Subject</th>
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">1st CA</th>
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">2nd CA</th>
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Exam Score</th>
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Total</th>
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Grade</th>
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {student.subjects.length > 0 ? (
              student.subjects.map((subj, i) => (
                <tr key={i}>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">{subj.subjectName || "—"}</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm text-blue-600">—</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm text-blue-600">—</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">{subj.examTotal ?? "—"}</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                    {subj.caTotal != null && subj.examTotal != null ? subj.caTotal + subj.examTotal : "—"}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-green-600">—</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm text-green-600">—</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="border border-gray-300 px-4 py-6 text-center text-sm text-gray-400">
                  No subject data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

    {/* Performance Summary */}
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Summary</h2>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <div className="border-t border-gray-300 py-2">
          <div className="text-gray-600 mb-1">Total Score</div>
          <div className="font-semibold text-gray-800">{student.grandTotal ?? "—"}</div>
        </div>
        <div className="border-t border-gray-300 py-2">
          <div className="text-gray-600 mb-1">Average Score</div>
          <div className="font-semibold text-gray-800">—</div>
        </div>
        <div className="border-t border-gray-300 py-2">
          <div className="text-gray-600 mb-1">Class Position</div>
          <div className="font-semibold text-gray-800">—</div>
        </div>
        <div className="border-t border-gray-300 py-2">
          <div className="text-gray-600 mb-1">Overall Grade</div>
          <div className="font-semibold text-gray-800">—</div>
        </div>
        <div className="border-t border-gray-300 py-2">
          <div className="text-gray-600 mb-1">Teacher's Remark</div>
          <div className="font-semibold text-gray-800">—</div>
        </div>
        <div className="border-t border-gray-300 py-2">
          <div className="text-gray-600 mb-1">School Resumption Date</div>
          <div className="font-semibold text-gray-800">—</div>
        </div>
        <div className="border-t border-gray-300 py-2">
          <div className="text-gray-600 mb-1">Session Length</div>
          <div className="font-semibold text-gray-800">—</div>
        </div>
      </div>
    </div>
  </div>
);

export default function ViewStudentResultTab() {
  const {
    searchParams, setSearchParams,
    isPrintModalOpen, setIsPrintModalOpen,
    resultsArray,
    isFetching, isError,
  } = useViewStudentResult();

  return (
    <div>
      <SearchStudentComp onSearch={setSearchParams} isSearching={isFetching} />

      {!searchParams && (
        <div className="mt-6 flex flex-col items-center justify-center py-16 px-4 text-center">
          <img src={EmptyBroadsheet} alt="No result yet" className="w-52 h-52 object-contain" />
          <p className="text-sm font-semibold text-gray-700">No result displayed yet</p>
          <p className="text-xs text-gray-400 max-w-xs mt-1">
            Select a session, term, class, and student above, then click{" "}
            <span className="font-medium text-[#8000BD]">Display Result</span> to view the student's result.
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
          ) : resultsArray.length === 0 ? (
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

              {resultsArray.map((student) => (
                <StudentBlock key={student.studentId} student={student} />
              ))}
            </motion.div>
          )}
        </>
      )}

      {isPrintModalOpen && <Print onClose={() => setIsPrintModalOpen(false)} />}
    </div>
  );
}
