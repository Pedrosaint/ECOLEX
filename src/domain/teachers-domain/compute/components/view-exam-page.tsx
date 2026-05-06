import { useState } from "react";
import { CgDanger } from "react-icons/cg";
import { FiEdit2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { useExamPage } from "../hooks";

const chevron = (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </div>
);

const selectBase =
  "w-full px-4 py-4 border border-gray-300 rounded text-sm appearance-none focus:outline-none pr-10";

export default function ViewExamPage() {
  const {
    classId, setClassId, classGroupId, setClassGroupId,
    isFiltered, classes, classesLoading, filteredGroups, classGroupsLoading,
    examTemplates, examLoading,
    handleFilter, handleClearFilters,
    hasActiveFilters, canFilter,
    resetScores, setScore, getScore, handleSubmit, isSubmitting,
  } = useExamPage();

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    await handleSubmit();
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    resetScores();
    setIsEditing(false);
  };

  return (
    <div>
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="flex gap-2 text-sm md:text-lg items-center border-b border-gray-200 px-4 py-3">
          <CgDanger size={25} />
          <h1>View exam scores for your assigned classes and subjects</h1>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
                Select Class
              </label>
              <div className="relative">
                <select
                  className={`${selectBase} ${classId ? "text-gray-900" : "text-gray-400"}`}
                  disabled={classesLoading}
                  value={classId ?? ""}
                  onChange={(e) => {
                    setClassId(e.target.value ? Number(e.target.value) : null);
                    setIsEditing(false);
                  }}
                >
                  <option value="">{classesLoading ? "Loading..." : "Select Class"}</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>{c.class?.name ?? c.name}</option>
                  ))}
                </select>
                {chevron}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
                Select Group
              </label>
              <div className="relative">
                <select
                  className={`${selectBase} ${
                    !classId
                      ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                      : classGroupId
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                  disabled={!classId || classGroupsLoading}
                  value={classGroupId ?? ""}
                  onChange={(e) => {
                    setClassGroupId(e.target.value ? Number(e.target.value) : null);
                    setIsEditing(false);
                  }}
                >
                  <option value="">
                    {!classId
                      ? "Select a class first"
                      : classGroupsLoading
                      ? "Loading..."
                      : filteredGroups.length === 0
                      ? "No groups for class"
                      : "Select Group"}
                  </option>
                  {filteredGroups.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
                {chevron}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => { handleClearFilters(); setIsEditing(false); }}
                className="px-4 py-3 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            )}
            <button
              type="button"
              disabled={!canFilter}
              onClick={() => { handleFilter(); setIsEditing(false); }}
              className="flex-1 bg-[#8000BD] px-6 py-3 text-white font-semibold text-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed rounded-sm"
            >
              FILTER RECORD
            </button>
          </div>
        </div>
      </div>

      {!isFiltered && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white border border-gray-200 mt-5 py-16 px-8 flex flex-col items-center justify-center text-center"
        >
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
            <FiEdit2 className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-gray-700 font-semibold text-base mb-1">No exam records to display</h3>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
            Select a <span className="font-medium text-gray-500">class</span> and{" "}
            <span className="font-medium text-gray-500">group</span> above, then click{" "}
            <span className="font-medium text-purple-600">Filter Record</span> to view exam data.
          </p>
        </motion.div>
      )}

      {isFiltered && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="p-6 bg-white border border-gray-200 mt-5"
        >
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 text-sm">
              {isEditing
                ? "Update scores below then save."
                : "Review exam records. Click Edit to update scores."}
            </p>
            {!isEditing && examTemplates.length > 0 && !examLoading && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-[#8000BD] hover:bg-[#6a009e] text-white px-4 py-2 rounded text-sm font-medium cursor-pointer transition-colors"
              >
                <FiEdit2 size={14} />
                Edit Scores
              </button>
            )}
            {isEditing && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="bg-[#4B0082] hover:bg-[#3a0063] text-white px-4 py-2 rounded text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>

          {examLoading ? (
            <div className="text-center py-12 text-gray-400 text-sm">Loading exam data...</div>
          ) : examTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-gray-500 font-medium text-sm">No exam templates found</p>
              <p className="text-gray-400 text-xs mt-1">No exams have been configured for this class.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-300 h-12">
                    <th className="border-r border-gray-300 px-4 py-3 text-left font-medium text-gray-700">S/N</th>
                    <th className="border-r border-gray-300 px-4 py-3 text-left font-medium text-gray-700">Reg. No</th>
                    <th className="border-r border-gray-300 px-4 py-3 text-left font-medium text-gray-700">Student Name</th>
                    <th className="border-r border-gray-300 px-4 py-3 text-left font-medium text-gray-700">Subject</th>
                    <th className="border-r border-gray-300 px-4 py-3 text-center font-medium text-gray-700">
                      Score{" "}
                      <span className="text-xs text-gray-400 font-normal">
                        (/{examTemplates[0]?.maxScore ?? 100})
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {examTemplates.map((template, idx) => (
                    <tr key={template.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="border-r border-gray-300 px-4 py-4 text-center text-gray-500 text-xs">
                        {idx + 1}
                      </td>
                      <td className="border-r border-gray-300 px-4 py-4 font-mono text-xs text-gray-700">
                        {template.registrationNumber}
                      </td>
                      <td className="border-r border-gray-300 px-4 py-4 text-gray-800 font-medium text-sm">
                        {template.studentName}
                      </td>
                      <td className="border-r border-gray-300 px-4 py-4 text-gray-700 text-sm">
                        {template.subject.name}
                      </td>
                      <td className="border-r border-gray-300 px-4 py-4 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            min={0}
                            max={template.maxScore}
                            value={getScore(template.studentId, template.id)}
                            onChange={(e) => setScore(template.studentId, template.id, e.target.value)}
                            className="w-20 h-8 text-center border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                            placeholder="0"
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">
                            {getScore(template.studentId, template.id) || "-"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
