
export default function ListOfReport() {

const grade = [
  {
    minimumScore: "0",
    maximumScore: "39",
    grades: "F",
    remarks: "Fail",
  },
  {
    minimumScore: "40",
    maximumScore: "49",
    grades: "D",
    remarks: "Pass",
  },
  {
    minimumScore: "50",
    maximumScore: "59",
    grades: "C",
    remarks: "Good",
  },
  {
    minimumScore: "60",
    maximumScore: "79",
    grades: "B",
    remarks: "Very Good",
  },
  {
    minimumScore: "80",
    maximumScore: "100",
    grades: "A",
    remarks: "Excellent"
  },
];

  return (
    <div className=" bg-gray-50">
      <div className="mt-5">
        <h1 className="text-4xl font-meduim text-gray-900 mb-1 font-inter">
          View Report
        </h1>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5 mt-">
        <h1 className="text-xl text-gray-900 mb-2 font-inter">Grading Setup</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                <tr>
                  <th className="py-3 text-center px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Minimum Score
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Maximum Score
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Grades
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {grade.map((grade, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                      {grade.minimumScore}
                    </td>
                    <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                      {grade.maximumScore}
                    </td>
                    <td className="py-3 px-2 text-center text-sm text-gray-600 font-semibold border-r border-gray-200">
                      {grade.grades}
                    </td>
                    <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                      {grade.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button className="cursor-pointer mt-4 bg-[#E8EDF5] text-[#6E6D71] font-inter px-4 py-3 rounded-lg border border-gray-300 shadow-md text-sm font-semibold">
          <h1>Edit Grading Setup</h1>
        </button>
      </div>
    </div>
  );
}
