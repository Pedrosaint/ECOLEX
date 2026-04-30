import { useState } from "react";
import { Printer } from "lucide-react";
import { skipToken } from "@reduxjs/toolkit/query";
import { motion } from "framer-motion";
import SearchStudentComp from "./search-student.comp";
import type { StudentSearchParams } from "./search-student.comp";
import { useGetStudentResultQuery } from "../api/grading.api";
import Print from "../../../../general/common/print";
import { getImageUrl } from "../../../../utils/get-image-url";
import passport from "../../../../assets/image/passport.png";
import EmptyBroadsheet from "../../../../assets/image/classResult.png";

export default function ViewStudentResultTab() {
  const [searchParams, setSearchParams] = useState<StudentSearchParams | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const { data, isFetching, isError } = useGetStudentResultQuery(
    searchParams
      ? { studentId: searchParams.studentId, classId: searchParams.classId, academicSessionId: searchParams.academicSessionId }
      : skipToken
  );

  const result = data?.data;
  const caHeaders = result?.subjects[0]?.cas.map((ca) => ca.name) ?? [];

  const StudentInfo = () => (
    <div className="space-y-1 text-sm text-gray-600">
      <div><span className="font-medium">Name:</span> {result!.student.name}</div>
      <div><span className="font-medium">Registration Number:</span> {result!.student.registrationNumber}</div>
      <div><span className="font-medium">Class:</span> {result!.student.class}</div>
      <div><span className="font-medium">Campus:</span> {result!.student.campus}</div>
      <div><span className="font-medium">Session:</span> {result!.student.session}</div>
    </div>
  );

  return (
    <div>
      <SearchStudentComp onSearch={setSearchParams} isSearching={isFetching} />

      {/* Empty state — before any search */}
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

      {/* Show result area only after first search */}
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
              No result found for the selected student.
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
                  <Printer size={18} />
                  PRINT RECORD
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Student info header */}
                <div className="md:flex md:justify-between items-start bg-[#e6e7e8] border-b border-[#D1D1D1] p-5 rounded-t-2xl">
                  <div className="hidden md:block">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">Student Information</h1>
                    <StudentInfo />
                  </div>

                  <div className="w-32 h-32 bg-pink-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={result.student.passportUrl ? getImageUrl(result.student.passportUrl) : passport}
                      className="w-full h-full object-cover"
                      alt="passport"
                      onError={(e) => { (e.target as HTMLImageElement).src = passport; }}
                    />
                  </div>

                  <div className="md:hidden mt-3">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">Student Information</h1>
                    <StudentInfo />
                  </div>
                </div>

                {/* Grades table */}
                <div className="mb-8 rounded-b-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-0 bg-[#FAFAFA] min-w-[400px]">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">Subject</th>
                          {caHeaders.map((name) => (
                            <th key={name} className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">{name}</th>
                          ))}
                          <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">CA Total</th>
                          <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Exam Score</th>
                          <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Total</th>
                          <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Grade</th>
                          <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">Remark</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.subjects.map((subject) => (
                          <tr key={subject.subjectName}>
                            <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">{subject.subjectName}</td>
                            {caHeaders.map((name) => {
                              const ca = subject.cas.find((c) => c.name === name);
                              return (
                                <td key={name} className="border border-gray-300 px-4 py-3 text-center text-sm text-blue-600">
                                  {ca?.score ?? "—"}
                                </td>
                              );
                            })}
                            <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">{subject.caTotal}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">{subject.examTotal}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">{subject.subjectTotal}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-green-600">{subject.grade}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-sm text-green-600">{subject.remark}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Performance summary */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Summary</h2>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div className="border-t border-gray-300 py-2">
                      <div className="text-gray-600 mb-1">Total Score</div>
                      <div className="font-semibold text-gray-800">{result.performance.totalScore}</div>
                    </div>
                    <div className="border-t border-gray-300 py-2">
                      <div className="text-gray-600 mb-1">Average Score</div>
                      <div className="font-semibold text-gray-800">{result.performance.averageScore}</div>
                    </div>
                    <div className="border-t border-gray-300 py-2">
                      <div className="text-gray-600 mb-1">Class Position</div>
                      <div className="font-semibold text-gray-800">
                        {result.performance.position != null ? `${result.performance.position}` : "N/A"}
                      </div>
                    </div>
                    <div className="border-t border-gray-300 py-2">
                      <div className="text-gray-600 mb-1">Overall Grade</div>
                      <div className="font-semibold text-gray-800">{result.performance.overallGrade}</div>
                    </div>
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
}
