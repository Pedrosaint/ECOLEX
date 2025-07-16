
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

export default function SetupGradesTab() {
  const [grades, setGrades] = useState([
    { min: "0", max: "39", grade: "F", remarks: "Fail" },
    { min: "55", max: "64", grade: "D", remarks: "Pass" },
    { min: "65", max: "74", grade: "C", remarks: "Good" },
    { min: "75", max: "84", grade: "B", remarks: "Very Good" },
    { min: "85", max: "100", grade: "A", remarks: "Excellent" },
  ]);

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
    remarks: "Excellent",
  },
];

  const handleAddGrade = () => {
    setGrades([...grades, { min: "", max: "", grade: "", remarks: "" }]);
  };

  return (
    <div className="">
      {/* Warning Banner */}
      <div className="bg-[#F4A300] text-white p-3 rounded mb-6 text-sm text-center">
        Kindly remove any grade not applicable using the close button or modify
        to get your grading.
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5">
        <h2 className="text-lg  text-gray-900 mb-2 font-inter">
          Grading Setup
        </h2>

        {/* Grading Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
              <tr>
                <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
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
                <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200"></th>
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
                    <div className="border border-gray-300 p-3 mx-auto w-30">
                      {grade.grades}
                    </div>
                  </td>
                  <td className="py-3 text-center text-sm text-gray-600 border-r border-gray-200">
                    <div className="border border-gray-300 p-3 mx-auto w-30">
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

        <div className="flex justify-end mt-5">
          <button
            onClick={handleAddGrade}
            className="bg-gray-200 text-[#545454] px-4 py-2 rounded-md border border-gray-300 text-sm font-medium"
          >
            Add Another Grade
          </button>
        </div>

        {/* Select Applicable Classes */}
        <div className="mb-3">
          <label className="text-sm font-semibold text-gray-900">
            Select Applicable Classes
            <span className="text-red-500 text-xl">*</span>
          </label>
          <p className="text-xs text-[#FCA52B] mb-4">
            Displayed below are school category selected during school setup
          </p>
          <div className="grid grid-cols-2 gap-y-2">
            {["Jss1", "Jss2", "Jss3", "sss1", "sss2", "sss3"].map(
              (className) => (
                <div key={className} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`class-${className}`}
                    className="custom-checkbox select-all-checkbox"
                  />
                  <label
                    htmlFor={`class-${className}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {className}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        {/* Select Campus */}
        <div className="mb-8 w-full max-w-sm">
          <label
            htmlFor="setup-campus"
            className="block text-lg text-gray-900 mb-1 font-inter"
          >
            Select Campus<span className="text-red-500 text-xl">*</span>
          </label>
          <div className="relative">
            <select
              id="setup-campus"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
            ></select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          {" "}
          <button className="w-full max-w-lg bg-[#4B0082] text-white px-6 py-3 rounded-md text-base font-medium transition-colors">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
