import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";
import { useSetupGrade } from "../hooks";

export default function SetupGradesTab() {
  const {
    schemeName, setSchemeName,
    usePosition, setUsePosition,
    grades, selectedClassIds, campusId,
    campusData, campusLoading,
    classesLoading, filteredClasses,
    isSaving, schemePlaceholder,
    updateGrade, handleAddGrade, handleRemoveGrade,
    toggleClass, handleCampusChange, handleSubmit,
  } = useSetupGrade();

  return (
    <div>
      <div className="bg-[#F4A300] text-white p-3 rounded mb-6 text-sm text-center">
        Kindly remove any grade not applicable using the close button or modify to get your grading.
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden p-5"
      >
        <h2 className="text-lg text-gray-900 mb-5 font-inter">Grading Setup</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-1">
              Scheme Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={schemeName}
              onChange={(e) => setSchemeName(e.target.value)}
              placeholder={schemePlaceholder}
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
                <span className="font-normal text-gray-500">(rank students by position)</span>
              </span>
            </label>
          </div>
        </div>

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
                    <input type="number" value={grade.min} onChange={(e) => updateGrade(index, "min", e.target.value)} className="w-20 p-2 border border-gray-300 rounded text-center text-sm" />
                  </td>
                  <td className="py-3 text-center text-sm border-r border-gray-200">
                    <input type="number" value={grade.max} onChange={(e) => updateGrade(index, "max", e.target.value)} className="w-20 p-2 border border-gray-300 rounded text-center text-sm" />
                  </td>
                  <td className="py-3 text-center text-sm border-r border-gray-200">
                    <input type="text" value={grade.grade} onChange={(e) => updateGrade(index, "grade", e.target.value)} placeholder="A" className="w-16 p-2 border border-gray-300 rounded text-center text-sm" />
                  </td>
                  <td className="py-3 text-center text-sm border-r border-gray-200">
                    <input type="text" value={grade.remark} onChange={(e) => updateGrade(index, "remark", e.target.value)} placeholder="Excellent" className="w-36 p-2 border border-gray-300 rounded text-center text-sm" />
                  </td>
                  <td className="py-3 w-15 text-center text-sm">
                    <button onClick={() => handleRemoveGrade(index)} className="p-1 bg-gray-100 border border-gray-300 rounded hover:bg-red-100 cursor-pointer">
                      <RxCross2 className="text-red-700" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-6">
          <button onClick={handleAddGrade} className="bg-[#E8EDF5] text-[#545454] px-4 py-2 cursor-pointer rounded-md border border-gray-300 text-sm font-medium">
            Add Another Grade
          </button>
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-900 block mb-1">
            Select Campus <span className="text-red-500">*</span>
          </label>
          <select
            value={campusId}
            onChange={(e) => handleCampusChange(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#4B0082]"
          >
            <option value="">{campusLoading ? "Loading..." : "Select Campus"}</option>
            {campusData?.campuses?.map((c) => (
              <option key={c.id} value={String(c.id)}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-900">
            Select Applicable Classes <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-[#FCA52B] mb-4">
            {campusId ? "Select the classes this grading scheme applies to." : "Select a campus first to see its classes."}
          </p>
          {classesLoading ? (
            <p className="text-sm text-gray-400">Loading classes...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
              {filteredClasses.map((cls) => (
                <div key={cls.id} className="flex items-center">
                  <input type="checkbox" id={`class-${cls.id}`} checked={selectedClassIds.includes(cls.id)} onChange={() => toggleClass(cls.id)} className="custom-checkbox" />
                  <label htmlFor={`class-${cls.id}`} className="ml-2 text-sm text-gray-700 cursor-pointer">{cls.name}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className={`w-full max-w-lg bg-[#4B0082] text-white px-6 py-3 rounded-md text-base font-medium transition-colors ${
              isSaving ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:bg-[#3a0066]"
            }`}
          >
            {isSaving ? "Saving..." : "Save Grading Scheme"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
