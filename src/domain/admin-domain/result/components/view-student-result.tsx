import { motion } from "framer-motion";
import { Printer, SearchX, UserX } from "lucide-react";
import SearchStudentComp from "./search-student.comp";
import { useViewStudentResult } from "../hooks";
import Print from "../../../../general/common/print";
import passport from "../../../../assets/image/passport.png";
import EmptyBroadsheet from "../../../../assets/image/classResult.png";
import type { StudentResultData } from "../types";

const SERVER_BASE = (import.meta.env.VITE_API_BASE_URL as string).replace(/\/$/, "");

const StudentBlock = ({ result }: { result: StudentResultData }) => {
  const { studentInformation: info, academicInfo, subjects, performanceSummary, teacherRemark, schoolRecommendationDate } = result;

  const maxCAs = Math.max(...subjects.map((s) => s.cas.length), 0);
  const caHeaders = Array.from({ length: maxCAs }, (_, i) => `CA ${i + 1}`);

  const passportSrc = info.passportUrl
    ? `${SERVER_BASE}${info.passportUrl}`
    : passport;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Student Info Header */}
      <div className="flex justify-between items-start bg-[#e6e7e8] border-b border-[#D1D1D1] p-5 rounded-t-2xl gap-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Student Information</h1>
          <div className="space-y-1 text-sm text-gray-600">
            <div><span className="font-medium">Name:</span> {info.surname} {info.name} {info.otherNames}</div>
            <div><span className="font-medium">Reg. Number:</span> {info.registrationNumber}</div>
            <div><span className="font-medium">Class:</span> {info.className}</div>
            <div><span className="font-medium">Campus:</span> {info.campus}</div>
            <div><span className="font-medium">Gender:</span> {info.gender}</div>
            <div><span className="font-medium">Date of Birth:</span> {new Date(info.dateOfBirth).toLocaleDateString()}</div>
            <div><span className="font-medium">Academic Session:</span> {academicInfo.academicSessionName}</div>
            <div><span className="font-medium">Term:</span> {academicInfo.termName}</div>
          </div>
        </div>

        <div className="w-28 h-28 bg-pink-200 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={passportSrc}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = passport; }}
            className="w-full h-full object-cover"
            alt="passport"
          />
        </div>
      </div>

      {/* Subjects Table */}
      <div className="mb-8 rounded-b-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 bg-[#FAFAFA]" style={{ minWidth: `${400 + maxCAs * 80}px` }}>
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">Subject</th>
                {caHeaders.map((h) => (
                  <th key={h} className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">{h}</th>
                ))}
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">CA Total</th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Exam Score</th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Total</th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Grade</th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Remark</th>
              </tr>
            </thead>
            <tbody>
              {subjects.length > 0 ? (
                subjects.map((subj) => (
                  <tr key={subj.id}>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      {subj.name} <span className="text-xs text-gray-400">({subj.code})</span>
                    </td>
                    {caHeaders.map((_, i) => (
                      <td key={i} className="border border-gray-300 px-4 py-3 text-center text-sm text-blue-600">
                        {subj.cas[i] != null ? (subj.cas[i].score ?? "—") : "—"}
                      </td>
                    ))}
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">{subj.caTotal}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">{subj.examTotal}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-800">{subj.subjectTotal}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-green-600">{subj.grade}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-600">{subj.remark}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5 + maxCAs} className="border border-gray-300 px-4 py-6 text-center text-sm text-gray-400">
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 text-sm mb-6">
          <div className="border-t border-gray-300 py-2">
            <div className="text-gray-500 mb-1">Total Score</div>
            <div className="font-semibold text-gray-800">{performanceSummary.totalScore}</div>
          </div>
          <div className="border-t border-gray-300 py-2">
            <div className="text-gray-500 mb-1">Average Score</div>
            <div className="font-semibold text-gray-800">{performanceSummary.averageScore}</div>
          </div>
          <div className="border-t border-gray-300 py-2">
            <div className="text-gray-500 mb-1">Class Position</div>
            <div className="font-semibold text-gray-800">{performanceSummary.classPosition}</div>
          </div>
          <div className="border-t border-gray-300 py-2">
            <div className="text-gray-500 mb-1">Overall Grade</div>
            <div className="font-semibold text-green-600">{performanceSummary.overallGrade}</div>
          </div>
          <div className="border-t border-gray-300 py-2">
            <div className="text-gray-500 mb-1">No. of Subjects</div>
            <div className="font-semibold text-gray-800">{performanceSummary.sessionLength}</div>
          </div>
          <div className="border-t border-gray-300 py-2">
            <div className="text-gray-500 mb-1">School Resumption Date</div>
            <div className="font-semibold text-gray-800">
              {schoolRecommendationDate ? new Date(schoolRecommendationDate).toLocaleDateString() : "—"}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 py-3">
          <div className="text-gray-500 text-sm mb-1">Teacher's Remark</div>
          <div className="text-sm font-medium text-gray-800 italic">"{teacherRemark}"</div>
        </div>
      </div>
    </div>
  );
};

export default function ViewStudentResultTab() {
  const {
    searchParams, setSearchParams,
    isPrintModalOpen, setIsPrintModalOpen,
    result,
    isFetching, isError,
  } = useViewStudentResult();

  return (
    <div>
      <SearchStudentComp onSearch={setSearchParams} isSearching={isFetching} />

      {!searchParams && (
        <div className="mt-6 flex flex-col items-center justify-center py-16 px-4 text-center">
          <img src={EmptyBroadsheet} alt="No result yet" className="w-52 h-52 object-contain" loading="lazy" />
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
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-10 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                <UserX className="text-red-400" size={28} />
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">Result Not Found</h3>
              <p className="text-sm text-gray-400 max-w-xs">
                We couldn't load the result for this student. Please check your filters and try again.
              </p>
            </div>
          ) : !result ? (
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

              <StudentBlock result={result} />
            </motion.div>
          )}
        </>
      )}

      {isPrintModalOpen && <Print onClose={() => setIsPrintModalOpen(false)} />}
    </div>
  );
}
