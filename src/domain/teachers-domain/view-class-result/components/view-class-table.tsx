import { X } from "lucide-react";

const ViewClassTable = () => {
  // Student data array
  const students = [
    {
      id: 1,
      regNo: "FIS10550",
      surname: "EZENWAJAKU",
      otherNames: "JESSICA OLUEBUIBE",
      gender: "Female",
      totalScore: 1414.0,
      average: 88.38,
      remark: "Excellent",
      position: "1st",
    },
    {
      id: 2,
      regNo: "FIS84545",
      surname: "OLUGHU",
      otherNames: "HENRIETTA CHIDIADI",
      gender: "Female",
      totalScore: 1387.0,
      average: 86.69,
      remark: "Excellent",
      position: "2nd",
    },
    {
      id: 3,
      regNo: "FIS45544",
      surname: "JEREMIAH",
      otherNames: "EMMANUELLA CHIZARAM",
      gender: "Female",
      totalScore: 1370.0,
      average: 85.63,
      remark: "Excellent",
      position: "3rd",
    },
    {
      id: 4,
      regNo: "FIS40556",
      surname: "IHUMEZIE",
      otherNames: "MICHAEL ONYEDIKACHI",
      gender: "Male",
      totalScore: 1357.0,
      average: 84.81,
      remark: "Excellent",
      position: "4th",
    },
    {
      id: 5,
      regNo: "FIS4259",
      surname: "Uzoma",
      otherNames: "Emmanuella",
      gender: "Female",
      totalScore: 1244.0,
      average: 77.75,
      remark: "Very Good",
      position: "5th",
    },
    {
      id: 6,
      regNo: "FIS4549",
      surname: "EZENWAJAKU",
      otherNames: "JUDITH NMESOMA",
      gender: "Female",
      totalScore: 1210.0,
      average: 75.63,
      remark: "Very Good",
      position: "6th",
    },
    {
      id: 7,
      regNo: "FIS30561",
      surname: "BARTHOLOMEOW",
      otherNames: "EMMANUEL CHINEMEREM",
      gender: "Male",
      totalScore: 1172.0,
      average: 73.25,
      remark: "Good",
      position: "7th",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getRemarkColor = (remark: any) => {
    switch (remark) {
      case "Excellent":
        return "text-green-600";
      case "Very Good":
        return "text-blue-600";
      case "Good":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-white mt-5 border border-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-medium text-gray-800">
          Result for JSS 3 - 2023/2024 Second Term
        </h1>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm cursor-pointer">
          <span>
            <X />
          </span>
          REMOVE
        </button>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                S/N
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                Reg. No.
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                Surname
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                Other Names
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                Gender
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                Total Score
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                Average
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                Remark
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                Position
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                  {student.id}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                  {student.regNo}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                  {student.surname}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                  {student.otherNames}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                  {student.gender}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                  {student.totalScore.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                  {student.average.toFixed(2)}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-3 text-sm ${getRemarkColor(
                    student.remark
                  )}`}
                >
                  {student.remark}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                  {student.position}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewClassTable;
