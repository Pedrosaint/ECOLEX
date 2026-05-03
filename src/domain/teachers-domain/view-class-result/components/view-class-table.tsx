import { SearchX } from "lucide-react";
import type { TeacherBroadsheetResponse, BroadsheetRow } from "../../overview/types";

interface Props {
  broadsheetData: TeacherBroadsheetResponse | undefined;
  isLoading: boolean;
  hasFiltered: boolean;
}

const ViewClassTable = ({ broadsheetData, isLoading, hasFiltered }: Props) => {
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

  const data = broadsheetData?.data;
  const subjects = data?.subjects ?? [];
  const rows: BroadsheetRow[] = data?.rows ?? [];
  const usePosition = data?.usePosition ?? false;

  if (rows.length === 0) {
    return (
      <div className="p-10 bg-white mt-5 border border-gray-200 flex flex-col items-center justify-center gap-3 text-center">
        <SearchX className="w-12 h-12 text-gray-300" />
        <p className="text-gray-500 font-medium">No students found</p>
        <p className="text-sm text-gray-400">
          No results available for the selected class and term.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white mt-5 border border-gray-200">
      <div className="overflow-x-auto">
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
                  colSpan={4}
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

            {/* Sub-header row for CA / Exam / Total / Grade */}
            <tr className="bg-gray-50">
              {subjects.map((subject) => (
                <>
                  <th key={`${subject}-ca`} className="border border-gray-300 px-2 py-1 text-center text-xs text-gray-500 font-medium">CA</th>
                  <th key={`${subject}-exam`} className="border border-gray-300 px-2 py-1 text-center text-xs text-gray-500 font-medium">Exam</th>
                  <th key={`${subject}-total`} className="border border-gray-300 px-2 py-1 text-center text-xs text-gray-500 font-medium">Total</th>
                  <th key={`${subject}-grade`} className="border border-gray-300 px-2 py-1 text-center text-xs text-gray-500 font-medium">Grade</th>
                </>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={row.studentId} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">{index + 1}</td>
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
                    </>
                  );
                })}
                <td className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-800">{row.grandTotal}</td>
                {usePosition && (
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">{row.position ?? "—"}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewClassTable;
