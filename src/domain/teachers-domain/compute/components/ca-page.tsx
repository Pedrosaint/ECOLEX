import { CgDanger } from "react-icons/cg";
import { motion } from "framer-motion";
import { useCaPage } from "../hooks";

const chevron = (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </div>
);

const selectBase =
  "w-full px-4 py-4 border border-gray-300 rounded text-sm appearance-none focus:outline-none pr-10";

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white border border-gray-200 mt-5 py-16 px-8 flex flex-col items-center justify-center text-center"
    >
      <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </div>
      <h3 className="text-gray-700 font-semibold text-base mb-1">No CA records to display</h3>
      <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
        Select a <span className="font-medium text-gray-500">class</span> and{" "}
        <span className="font-medium text-gray-500">group</span> above, then click{" "}
        <span className="font-medium text-purple-600">Filter Record</span> to load CA data.
      </p>
    </motion.div>
  );
}

export default function CaPage() {
  const {
    classId, setClassId, classGroupId, setClassGroupId,
    isFiltered, classes, classesLoading, filteredGroups, classGroupsLoading,
    caColumns, subjectRows, caLoading,
    handleFilter, handleCancel, handleClearFilters,
    hasActiveFilters, canFilter,
    setScore, getScore, handleSubmit, isSubmitting,
  } = useCaPage();

  return (
    <div>
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="flex gap-2 text-sm md:text-lg items-center border-b border-gray-200 px-4 py-3">
          <CgDanger size={25} />
          <h1>You can only compute result for classes and subjects assigned to you</h1>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Class */}
            <div>
              <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
                Select Class
              </label>
              <div className="relative">
                <select
                  className={`${selectBase} ${classId ? "text-gray-900" : "text-gray-400"}`}
                  disabled={classesLoading}
                  value={classId ?? ""}
                  onChange={(e) => setClassId(e.target.value ? Number(e.target.value) : null)}
                >
                  <option value="">{classesLoading ? "Loading..." : "Select Class"}</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.class?.name ?? c.name}
                    </option>
                  ))}
                </select>
                {chevron}
              </div>
            </div>

            {/* Group */}
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
                  onChange={(e) =>
                    setClassGroupId(e.target.value ? Number(e.target.value) : null)
                  }
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
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
                {chevron}
              </div>
            </div>
          </div>

          {/* Actions row */}
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-4 py-3 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            )}
            <button
              type="button"
              disabled={!canFilter}
              onClick={handleFilter}
              className="flex-1 bg-[#8000BD] px-6 py-3 text-white font-semibold text-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed rounded-sm"
            >
              FILTER RECORD
            </button>
          </div>
        </div>
      </div>

      {!isFiltered && <EmptyState />}

      {isFiltered && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="p-6 bg-white border border-gray-200 mt-5"
        >
          <div className="bg-gray-100 p-4 shadow-sm flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-700 text-sm">
                Add continuous assessment scores for each subject.
              </p>
              <p className="text-red-500 text-xs font-inter font-medium mt-1">
                Do not add any score for a student who doesn't offer your subject.
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1 shrink-0 ml-4 cursor-pointer"
            >
              ✕ Cancel
            </button>
          </div>

          {caLoading ? (
            <div className="text-center py-12 text-gray-400 text-sm">Loading CA data...</div>
          ) : subjectRows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 font-medium text-sm">No CA templates found</p>
              <p className="text-gray-400 text-xs mt-1">No CA has been configured for this class.</p>
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
                    {caColumns.map((col) => (
                      <th
                        key={col.name}
                        className="border-r border-gray-300 px-4 py-3 text-center font-medium text-gray-700"
                      >
                        {col.name}{" "}
                        <span className="text-xs text-gray-400 font-normal">(/{col.maxScore})</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subjectRows.map(({ key, registrationNumber, studentName, subjectName, templates }, idx) => (
                    <tr key={key} className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                      <td className="border-r border-gray-300 px-4 py-4 text-center text-gray-500 text-xs">
                        {idx + 1}
                      </td>
                      <td className="border-r border-gray-300 px-4 py-4 font-mono text-xs text-gray-700">
                        {registrationNumber}
                      </td>
                      <td className="border-r border-gray-300 px-4 py-4 text-gray-800 font-medium text-sm">
                        {studentName}
                      </td>
                      <td className="border-r border-gray-300 px-4 py-4 text-gray-700 text-sm">
                        {subjectName}
                      </td>
                      {caColumns.map((col) => {
                        const template = templates.find((t) => t.name === col.name);
                        return (
                          <td key={col.name} className="border-r border-gray-300 px-4 py-4">
                            <div className="flex flex-col items-center gap-2">
                              <label className="flex items-center gap-1 cursor-pointer text-xs text-gray-500">
                                <input type="checkbox" className="w-3 h-3" />
                                Absent
                              </label>
                              <input
                                type="number"
                                min={0}
                                max={template?.maxScore ?? col.maxScore}
                                value={getScore(key, col.name)}
                                onChange={(e) =>
                                  setScore(key, col.name, e.target.value)
                                }
                                className="w-16 h-8 text-center border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                                placeholder="0"
                              />
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {subjectRows.length > 0 && !caLoading && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#4B0082] hover:bg-[#3a0063] text-white px-8 py-3 rounded-sm font-medium text-sm w-full max-w-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit CA Scores"}
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
