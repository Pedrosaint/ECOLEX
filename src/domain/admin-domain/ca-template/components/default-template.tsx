import { useState } from "react";
import { Trash2, Plus, Pencil, AlertTriangle } from "lucide-react";
import ConfirmCancelModal from "../../../../general/common/confirm-cancel.modal";
import { useDefaultTemplate } from "../hooks";

export default function DefaultTemplate() {
  const {
    rows,
    savedRows,
    isEditing,
    showCancelModal,
    setShowCancelModal,
    isLoadingTemplate,
    isLoading,
    updateRow,
    toggleExam,
    addRow,
    removeRow,
    handleSubmit,
    handleConfirmedCancel,
    startEditing,
  } = useDefaultTemplate();

  const [showExamWarning, setShowExamWarning] = useState(false);
  const [showEditWarning, setShowEditWarning] = useState(false);

  const handleSaveClick = () => {
    const hasExam = rows.some((r) => r.isExam);
    if (!hasExam) {
      setShowExamWarning(true);
      return;
    }
    handleSubmit();
  };

  if (isLoadingTemplate) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-3 w-72 bg-gray-100 rounded animate-pulse mb-6" />
        <div className="overflow-hidden rounded-xl border border-gray-100">
          <div className="grid grid-cols-3 bg-gray-50 px-4 py-3 gap-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-3 bg-gray-200 rounded animate-pulse" />)}
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="grid grid-cols-3 px-4 py-4 gap-4 border-t border-gray-100">
              <div className="h-3 bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-12 mx-auto bg-gray-100 rounded animate-pulse" />
              <div className="h-5 w-10 mx-auto bg-gray-100 rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <ConfirmCancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirmed={handleConfirmedCancel}
        warningMessage="Are you sure you want to cancel? Any unsaved changes will be lost"
        successMessage="Your changes have been discarded"
      />

      {showEditWarning && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={22} className="text-amber-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Edit Template?</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Any changes made to this template will <span className="font-semibold text-gray-700">directly affect</span> the score structure for all teachers' <span className="font-semibold text-[#8000BD]">CA</span> and <span className="font-semibold text-[#8000BD]">Exam</span> records. Proceed with caution.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditWarning(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowEditWarning(false); startEditing(); }}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#8000BD] text-white text-sm font-medium hover:bg-[#6a00a1] transition-colors cursor-pointer"
              >
                Proceed to Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {showExamWarning && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={22} className="text-amber-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Exam Required</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              You must toggle at least <span className="font-semibold text-gray-700">one entry</span> as <span className="font-semibold text-[#8000BD]"> Exam</span> before saving the template.
            </p>
            <button
              onClick={() => setShowExamWarning(false)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#8000BD] text-white text-sm font-medium hover:bg-[#6a00a1] transition-colors cursor-pointer"
            >
              Go Back & Set Exam
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-800">Default CA Template</h3>
            <p className="text-sm text-gray-500 mt-1">
              This template applies to all classes unless overridden per class.
            </p>
          </div>
          {savedRows && !isEditing && (
            <button
              onClick={() => setShowEditWarning(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#8000BD] text-[#8000BD] text-sm font-medium hover:bg-purple-50 transition-colors cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
          )}
        </div>

        {/* Read-only summary after save */}
        {savedRows && !isEditing && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                <tr>
                  {["Assessment Name", "Max Score", "Is Exam?"].map((h) => (
                    <th key={h} className="text-center py-3 px-4 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r last:border-r-0 border-gray-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {savedRows.map((t, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-center text-sm text-gray-800 border-r border-gray-200">{t.name}</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-800 border-r border-gray-200">{t.maxScore}</td>
                    <td className="py-3 px-4 text-center text-sm">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${t.isExam ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}>
                        {t.isExam ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Form */}
        {isEditing && (
          <>
            {/* Info note */}
            <div className="mb-4 flex items-start gap-2 bg-purple-50 border border-purple-100 rounded-lg px-3 py-2.5">
              <span className="text-purple-400 mt-0.5 flex-shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </span>
              <p className="text-xs text-purple-700 leading-relaxed">
                Only <span className="font-semibold">one entry</span> can be marked as <span className="font-semibold">Final Exam</span>. All other entries are treated as <span className="font-semibold">Continuous Assessment (CA)</span>. Toggling one as Final Exam will automatically disable the others.
              </p>
            </div>

            <div className="hidden md:grid grid-cols-[1fr_140px_160px_40px] gap-3 px-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Assessment Name</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Max Score</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</span>
              <span />
            </div>

            <div className="space-y-3">
              {rows.map((row, index) => {
                const examExists = rows.some((r, i) => r.isExam && i !== index);
                return (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-[1fr_140px_160px_40px] gap-3 items-center bg-gray-50 rounded-xl p-3 md:p-2 md:bg-transparent"
                >
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => updateRow(index, "name", e.target.value)}
                    placeholder="e.g. CA1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8000BD]"
                  />
                  <input
                    type="number"
                    value={row.maxScore}
                    min={1}
                    onChange={(e) => updateRow(index, "maxScore", Number(e.target.value))}
                    placeholder="e.g. 10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8000BD]"
                  />
                  <label className={`flex items-center gap-2 select-none ${examExists ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}>
                    <div
                      onClick={() => !examExists && toggleExam(index)}
                      className={`w-11 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 ${row.isExam ? "bg-[#8000BD]" : "bg-gray-300"} ${examExists ? "pointer-events-none" : ""}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${row.isExam ? "translate-x-5" : "translate-x-0"}`} />
                    </div>
                    <span className={`text-xs font-medium ${row.isExam ? "text-[#8000BD]" : "text-gray-500"}`}>
                      {row.isExam ? "Final Exam" : "Continuous Assessment"}
                    </span>
                  </label>
                  <button
                    onClick={() => removeRow(index)}
                    disabled={rows.length === 1}
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                );
              })}
            </div>

            <button
              onClick={addRow}
              className="mt-4 flex items-center gap-2 text-sm text-[#8000BD] hover:text-[#6a00a1] font-medium cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add CA Entry
            </button>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={handleSaveClick}
                disabled={isLoading}
                className={`flex-1 py-3 rounded-xl text-white text-sm font-semibold bg-[#8000BD] hover:bg-[#6a00a1] transition-colors ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {isLoading ? "Saving..." : savedRows ? "Update Template" : "Set Default Template"}
              </button>
              {savedRows && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
