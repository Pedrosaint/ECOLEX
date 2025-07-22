import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

export default function ViewClassTeacherRemarkTab() {
  const [grades, setGrades] = useState([
    {
      min: "0",
      max: "39",
      remarks: "What is your remark for this grade",
    },
    {
      min: "55",
      max: "64",
      remarks: "What is your remark for this grade",
    },
    {
      min: "65",
      max: "74",
      remarks: "What is your remark for this grade",
    },
    {
      min: "75",
      max: "84",
      remarks: "What is your remark for this grade",
    },
    {
      min: "85",
      max: "100",
      remarks: "What is your remark for this grade",
    },
  ]);

  const grade = [
    {
      minimumScore: "85",
      maximumScore: "100",
      remarks: "What is your remark for this grade",
    },
    {
      minimumScore: "75",
      maximumScore: "84",
      remarks: "What is your remark for this grade",
    },
    {
      minimumScore: "65",
      maximumScore: "74",
      remarks: "What is your remark for this grade",
    },
    {
      minimumScore: "55",
      maximumScore: "64",
      remarks: "What is your remark for this grade",
    },
    {
      minimumScore: "55",
      maximumScore: "100",
      remarks: "What is your remark for this grade",
    },
  ];

  const handleAddGrade = () => {
    setGrades([...grades, { min: "", max: "", remarks: "" }]);
  };

  return (
    <div className="">
      {/* Warning Banner */}
      <div className="bg-[#F4A300] text-white p-3 rounded mb-6 text-sm text-center">
        Kindly remove any grade not applicable using the close button or modify
        to get your grading.
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5">
        {/* Grading Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
              <tr className="">
                <th className="text-center py-6 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                  Minimum Score
                </th>
                <th className="text-center py-6 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                  Maximum Score
                </th>
                <th className="text-center py-6 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                  Teachers Remarks
                </th>
                <th className="text-center py-6 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {grade.map((grade, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 text-center text-sm text-gray-600 border-r bg border-gray-200">
                    <div className="border border-gray-300 p-3 mx-auto w-30">
                      {grade.minimumScore}
                    </div>
                  </td>
                  <td className="py-3 text-center text-sm text-gray-600 border-r border-gray-200">
                    <div className="border border-gray-300 p-3 mx-auto w-30">
                      {grade.maximumScore}
                    </div>
                  </td>
                  <td className="py-3 text-center text-sm text-gray-600 border-r border-gray-200">
                    <div className="border border-gray-300 p-3 mx-auto w-70">
                      {grade.remarks}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600 border-r border-gray-200">
                    <div className="border border-gray-300 p-1 flex justify-center bg-gray-200 cursor-pointer mx-auto w-10">
                      <RxCross2 className="text-red-700" size={20} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-5">
          {" "}
          <button className="w-full max-w-lg bg-[#4B0082] text-white px-6 py-2 rounded-lg text-base font-medium transition-colors">
            Add Teacher's Remark
          </button>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button
          onClick={handleAddGrade}
          className="bg-[#E8EDF5] text-[#545454] px-4 py-2 rounded-md border border-gray-300 text-sm font-medium cursor-pointer shadow-md"
        >
          Add Another Grade
        </button>
      </div>
    </div>
  );
}
