import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { motion } from "framer-motion";

export default function StaffSetupRecord() {
  const [grades, setGrades] = useState([
    { min: "0", max: "39", remarks: "Fail" },
    { min: "55", max: "64", remarks: "Pass" },
    { min: "65", max: "74", remarks: "Good" },
    { min: "75", max: "84", remarks: "Very Good" },
    { min: "85", max: "100", remarks: "Excellent" },
  ]);

  const handleAddGrade = () => {
    setGrades([...grades, { min: "", max: "", remarks: "" }]);
  };

  const handleRemoveGrade = (indexToRemove: number) => {
    setGrades(grades.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="">
      <h2 className="text-sm md:text-lg text-gray-900 mb-2 font-inter bg-[#D9D9D9] p-3">
        Setup Grade
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5"
      >
        {/* Warning Banner */}
        <div className="bg-[#F4A300] text-white p-3 rounded mb-6 text-sm text-center md:text-lg">
          Kindly remove any grade not applicable using the close button or
          modify to get your grading.
        </div>

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
                  Remarks
                </th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {grades.map((grade, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 text-center text-sm border-r border-gray-200">
                    <input
                      type="text"
                      value={grade.min}
                      onChange={(e) => {
                        const updated = [...grades];
                        updated[index].min = e.target.value;
                        setGrades(updated);
                      }}
                      className="w-20 p-2 border border-gray-300 rounded text-center"
                    />
                  </td>
                  <td className="py-3 text-center text-sm border-r border-gray-200">
                    <input
                      type="text"
                      value={grade.max}
                      onChange={(e) => {
                        const updated = [...grades];
                        updated[index].max = e.target.value;
                        setGrades(updated);
                      }}
                      className="w-20 p-2 border border-gray-300 rounded text-center"
                    />
                  </td>
                  <td className="py-3 text-center text-sm border-r border-gray-200">
                    <input
                      type="text"
                      value={grade.remarks}
                      onChange={(e) => {
                        const updated = [...grades];
                        updated[index].remarks = e.target.value;
                        setGrades(updated);
                      }}
                      className="w-30 p-2 border border-gray-300 rounded text-center"
                    />
                  </td>
                  <td className="py-3 w-15 text-center text-sm">
                    <button
                      onClick={() => handleRemoveGrade(index)}
                      className="p-1 bg-gray-100 border border-gray-300 rounded hover:bg-red-100 cursor-pointer"
                    >
                      <RxCross2 className="text-red-700" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={handleAddGrade}
            className="bg-[#E8EDF5] text-[#545454] px-4 py-2 cursor-pointer shadow-md rounded-md border border-gray-300 text-sm font-medium"
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
            Select Applicable Classes ( Only select Class that you are
            authorized to give a remark )
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

        {/* Submit Button */}
        <div className="flex justify-center">
          {" "}
          <button className="w-full max-w-lg bg-[#4B0082] text-white px-6 py-3 rounded-md text-base font-medium transition-colors">
            Add Teachers Remark
          </button>
        </div>
      </motion.div>
    </div>
  );
}
