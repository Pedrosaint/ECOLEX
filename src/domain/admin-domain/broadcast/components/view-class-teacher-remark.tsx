import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ViewClassTeacherRemarkTab() {
  const [grades, setGrades] = useState([
    {
      id: 1,
      min: "0",
      max: "39",
      remarks: "What is your remark for this grade",
    },
    {
      id: 2,
      min: "55",
      max: "64",
      remarks: "What is your remark for this grade",
    },
    {
      id: 3,
      min: "65",
      max: "74",
      remarks: "What is your remark for this grade",
    },
    {
      id: 4,
      min: "75",
      max: "84",
      remarks: "What is your remark for this grade",
    },
    {
      id: 5,
      min: "85",
      max: "100",
      remarks: "What is your remark for this grade",
    },
  ]);

  const handleAddGrade = () => {
    const newId =
      grades.length > 0 ? Math.max(...grades.map((g) => g.id)) + 1 : 1;
    setGrades([
      ...grades,
      {
        id: newId,
        min: "",
        max: "",
        remarks: "",
      },
    ]);
  };

  const handleRemoveGrade = (id: number) => {
    setGrades(grades.filter((grade) => grade.id !== id));
  };

  const handleGradeChange = (id: number, field: string, value: string) => {
    setGrades(
      grades.map((grade) =>
        grade.id === id ? { ...grade, [field]: value } : grade
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
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
              <tr>
                <th className="text-center py-6 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                  Minimum Score
                </th>
                <th className="text-center py-6 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                  Maximum Score
                </th>
                <th className="text-center py-6 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                  Teachers Remarks
                </th>
                <th className="text-center py-6 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {grades.map((grade) => (
                <tr key={grade.id} className="hover:bg-gray-50">
                  <td className="py-3 text-center text-sm text-gray-600 border-r border-gray-200">
                    <input
                      type="text"
                      value={grade.min}
                      onChange={(e) =>
                        handleGradeChange(grade.id, "min", e.target.value)
                      }
                      className="border border-gray-300 p-3 mx-auto w-30 text-center"
                      placeholder="Min score"
                    />
                  </td>
                  <td className="py-3 text-center text-sm text-gray-600 border-r border-gray-200">
                    <input
                      type="text"
                      value={grade.max}
                      onChange={(e) =>
                        handleGradeChange(grade.id, "max", e.target.value)
                      }
                      className="border border-gray-300 p-3 mx-auto w-30 text-center"
                      placeholder="Max score"
                    />
                  </td>
                  <td className="py-3 text-center text-sm text-gray-600 border-r border-gray-200">
                    <input
                      type="text"
                      value={grade.remarks}
                      onChange={(e) =>
                        handleGradeChange(grade.id, "remarks", e.target.value)
                      }
                      className="border border-gray-300 p-3 mx-auto md:w-70 w-65 text-center"
                      placeholder="Enter remarks"
                    />
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600 border-r border-gray-200">
                    <button
                      onClick={() => handleRemoveGrade(grade.id)}
                      className="border border-gray-300 p-1 flex justify-center bg-gray-200 cursor-pointer mx-auto w-10 hover:bg-gray-300"
                    >
                      <RxCross2 className="text-red-700" size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-5">
          <button className="w-full max-w-lg bg-[#4B0082] text-white px-6 py-2 rounded-lg text-base font-medium transition-colors hover:bg-[#3a0068]">
            Add Teacher's Remark
          </button>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button
          onClick={handleAddGrade}
          className="bg-[#E8EDF5] text-[#545454] px-4 py-2 rounded-md border border-gray-300 text-sm font-medium cursor-pointer shadow-md hover:bg-[#D8DEE8]"
        >
          Add Another Grade
        </button>
      </div>
    </motion.div>
  );
}
