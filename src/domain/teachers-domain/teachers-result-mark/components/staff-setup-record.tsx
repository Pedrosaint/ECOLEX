import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useCreateGradingSchemeMutation } from "../../grading-scheme/api/grading-scheme.api";
import { useGetClassesQuery } from "../../../admin-domain/classes/api/class-api";

interface GradeRow {
  min: string;
  max: string;
  grade: string;
  remark: string;
}

const DEFAULT_GRADES: GradeRow[] = [
  { min: "0", max: "39", grade: "F", remark: "Fail" },
  { min: "40", max: "54", grade: "D", remark: "Pass" },
  { min: "55", max: "64", grade: "C", remark: "Good" },
  { min: "65", max: "74", grade: "B", remark: "Very Good" },
  { min: "75", max: "100", grade: "A", remark: "Excellent" },
];

export default function StaffSetupRecord() {
  const [schemeName, setSchemeName] = useState("");
  const [usePosition, setUsePosition] = useState(false);
  const [grades, setGrades] = useState<GradeRow[]>(DEFAULT_GRADES);
  const [selectedClassIds, setSelectedClassIds] = useState<number[]>([]);

  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const [createGradingScheme, { isLoading }] = useCreateGradingSchemeMutation();

  const handleAddGrade = () => {
    setGrades([...grades, { min: "", max: "", grade: "", remark: "" }]);
  };

  const handleRemoveGrade = (indexToRemove: number) => {
    setGrades(grades.filter((_, index) => index !== indexToRemove));
  };

  const updateGrade = (index: number, field: keyof GradeRow, value: string) => {
    const updated = [...grades];
    updated[index] = { ...updated[index], [field]: value };
    setGrades(updated);
  };

  const toggleClass = (id: number) => {
    setSelectedClassIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!schemeName.trim()) { toast.error("Scheme name is required"); return; }
    if (selectedClassIds.length === 0) { toast.error("Select at least one class"); return; }

    const invalid = grades.some(
      (g) => !g.grade.trim() || !g.remark.trim() || g.min === "" || g.max === "" || Number(g.min) > Number(g.max)
    );
    if (invalid) { toast.error("All grade rows must be complete and valid (min ≤ max)"); return; }

    try {
      await createGradingScheme({
        name: schemeName,
        usePosition,
        classIds: selectedClassIds,
        grades: grades.map((g) => ({
          min: Number(g.min),
          max: Number(g.max),
          grade: g.grade,
          remark: g.remark,
        })),
      }).unwrap();
      toast.success("Grading scheme saved successfully");
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to save grading scheme");
    }
  };

  return (
    <div className="">
      <h2 className="text-sm md:text-lg text-gray-900 mb-2 font-inter bg-[#D9D9D9] p-2">
        Setup Grade
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden p-5"
      >
        {/* Warning Banner */}
        <div className="bg-[#F4A300] text-white p-2 rounded mb-6 text-sm text-center md:text-lg">
          Kindly remove any grade not applicable using the close button or modify
          to get your grading.
        </div>

        {/* Scheme Name + Use Position */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-1">
              Scheme Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={schemeName}
              onChange={(e) => setSchemeName(e.target.value)}
              placeholder="e.g. Primary Remark Setup"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#4B0082]"
            />
          </div>

          <div className="flex items-end pb-1">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div
                onClick={() => setUsePosition((v) => !v)}
                className={`w-11 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 cursor-pointer ${
                  usePosition ? "bg-[#4B0082]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                    usePosition ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                Use Position{" "}
                <span className="font-normal text-gray-500">
                  (rank students by position)
                </span>
              </span>
            </label>
          </div>
        </div>

        {/* Grading Table */}
        <div className="bg-white shadow-sm border border-gray-200 overflow-x-auto mb-5">
          <table className="w-full border-collapse min-w-[640px]">
            <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
              <tr>
                {["Minimum Score", "Maximum Score", "Grade", "Remarks", ""].map((h) => (
                  <th
                    key={h}
                    className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r last:border-r-0 border-gray-200"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {grades.map((grade, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 text-center text-sm border-r border-gray-200">
                    <input
                      type="number"
                      value={grade.min}
                      onChange={(e) => updateGrade(index, "min", e.target.value)}
                      className="w-20 p-2 border border-gray-300 rounded text-center text-sm"
                    />
                  </td>
                  <td className="py-3 text-center text-sm border-r border-gray-200">
                    <input
                      type="number"
                      value={grade.max}
                      onChange={(e) => updateGrade(index, "max", e.target.value)}
                      className="w-20 p-2 border border-gray-300 rounded text-center text-sm"
                    />
                  </td>
                  <td className="py-3 text-center text-sm border-r border-gray-200">
                    <input
                      type="text"
                      value={grade.grade}
                      onChange={(e) => updateGrade(index, "grade", e.target.value)}
                      placeholder="A"
                      className="w-16 p-2 border border-gray-300 rounded text-center text-sm"
                    />
                  </td>
                  <td className="py-3 text-center text-sm border-r border-gray-200">
                    <input
                      type="text"
                      value={grade.remark}
                      onChange={(e) => updateGrade(index, "remark", e.target.value)}
                      placeholder="Excellent"
                      className="w-36 p-2 border border-gray-300 rounded text-center text-sm"
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

        <div className="flex justify-end mb-6">
          <button
            onClick={handleAddGrade}
            className="bg-[#E8EDF5] text-[#545454] px-4 py-2 cursor-pointer shadow-md rounded-md border border-gray-300 text-sm font-medium"
          >
            Add Another Grade
          </button>
        </div>

        {/* Select Applicable Classes */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-900">
            Select Applicable Classes
            <span className="text-red-500 text-xl">*</span>
          </label>
          <p className="text-xs text-[#FCA52B] mb-4">
            Only select classes that you are authorized to give a remark.
          </p>

          {classesLoading ? (
            <p className="text-sm text-gray-400">Loading classes...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
              {classesData?.classes.map((cls) => (
                <div key={cls.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`class-${cls.id}`}
                    checked={selectedClassIds.includes(cls.id)}
                    onChange={() => toggleClass(cls.id)}
                    className="custom-checkbox"
                  />
                  <label
                    htmlFor={`class-${cls.id}`}
                    className="ml-2 text-sm text-gray-700 cursor-pointer"
                  >
                    {cls.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full max-w-lg bg-[#4B0082] text-white px-6 py-3 rounded-md text-base font-medium transition-colors ${
              isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:bg-[#3a0066]"
            }`}
          >
            {isLoading ? "Saving..." : "Add Teachers Remark"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
