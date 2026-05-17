import { motion } from "framer-motion";
import { ChevronDown, Trash2, AlertTriangle } from "lucide-react";
import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";
import { useViewClassSubjects } from "../hooks";

export default function ViewClassSubjects() {
  const {
    selectedClassId,
    dropdownOpen,
    classesData,
    classesLoading,
    isLoading,
    isError,
    selectedClass,
    subjects,
    confirmDelete,
    isDeleting,
    setConfirmDelete,
    handleClassSelect,
    toggleDropdown,
    handleDeleteConfirm,
  } = useViewClassSubjects();

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
    >
      <h3 className="text-base font-semibold text-gray-800 mb-1">Subjects by Class</h3>
      <p className="text-sm text-gray-500 mb-6">Select a class to view its assigned subjects.</p>

      {/* Class selector */}
      <div className="max-w-xs mb-6">
        <label className="block text-sm font-bold text-[#120D1C] mb-1">Select Class</label>
        <div className="relative">
          <button
            type="button"
            onClick={toggleDropdown}
            disabled={classesLoading}
            className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm text-left flex items-center justify-between focus:outline-none"
          >
            <span className={selectedClass ? "text-gray-800" : "text-gray-400"}>
              {classesLoading ? "Loading..." : selectedClass ? selectedClass.name : "Choose a class"}
            </span>
            <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-52 overflow-y-auto">
              {classesData?.classes.map((cls) => (
                <div
                  key={cls.id}
                  onClick={() => handleClassSelect(cls.id)}
                  className={`px-3 py-2 cursor-pointer text-sm hover:bg-[#6a00a1] hover:text-white ${
                    cls.id === selectedClassId ? "bg-purple-50 font-medium text-[#8000BD]" : "text-gray-700"
                  }`}
                >
                  {cls.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {!selectedClassId && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="relative mb-5">
            <div className="w-20 h-20 rounded-2xl bg-purple-50 border-2 border-dashed border-purple-200 flex items-center justify-center">
              <svg className="w-9 h-9 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <line x1="12" y1="8" x2="16" y2="8" />
                <line x1="12" y1="12" x2="16" y2="12" />
                <line x1="12" y1="16" x2="14" y2="16" />
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#8000BD]/10 border border-[#8000BD]/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-[#8000BD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
          <h4 className="text-sm font-semibold text-gray-700 mb-1">No class selected</h4>
          <p className="text-xs text-gray-400 text-center max-w-[200px] leading-relaxed">
            Pick a class from the dropdown above to view its assigned subjects
          </p>
        </div>
      )}

      {selectedClassId && isLoading && <TableSkeleton />}

      {selectedClassId && isError && (
        <div className="text-center py-8 text-red-500 text-sm">
          Failed to load subjects. Please try again.
        </div>
      )}

      {selectedClassId && !isLoading && !isError && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
              <tr>
                <th className="text-center py-3 px-3 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                  #
                </th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                  Subject Name
                </th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                  Code
                </th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <tr key={subject.id} className="hover:bg-gray-50">
                    <td className="py-3 px-3 text-center text-sm text-gray-500 border-r border-gray-200">
                      {index + 1}
                    </td>
                    <td className="py-3 px-3 text-center text-sm text-gray-900 border-r border-gray-200">
                      {subject.name}
                    </td>
                    <td className="py-3 px-3 text-center text-sm text-gray-600 border-r border-gray-200">
                      {subject.code || "—"}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => setConfirmDelete({ subjectId: subject.id, subjectName: subject.name })}
                        className="p-1.5 rounded hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove from class"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                      <div className="relative mb-5">
                        <div className="w-20 h-20 rounded-2xl bg-orange-50 border-2 border-dashed border-orange-200 flex items-center justify-center">
                          <svg className="w-9 h-9 text-orange-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            <line x1="12" y1="8" x2="16" y2="8" />
                            <line x1="12" y1="12" x2="16" y2="12" />
                            <line x1="12" y1="16" x2="14" y2="16" />
                          </svg>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center">
                          <svg className="w-3 h-3 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">No subjects yet</h4>
                      <p className="text-xs text-gray-400 text-center max-w-[220px] leading-relaxed">
                        <span className="font-medium text-gray-500">{selectedClass?.name}</span> has no subjects assigned. Go to the <span className="font-medium text-[#8000BD]">Assign to Class</span> tab to add some.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={22} className="text-red-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Remove Subject?</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Remove <span className="font-semibold text-gray-700">{confirmDelete.subjectName}</span> from <span className="font-semibold text-gray-700">{selectedClass?.name}</span>? This only unassigns it from the class.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-60"
              >
                {isDeleting ? "Removing..." : "Yes, Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
