import { useState } from "react";
import { Trash2, Plus, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useSetDefaultCATemplateMutation } from "../api/ca-template.api";
import type { CATemplateItem } from "../request/ca-template.request";
import ConfirmCancelModal from "../../../../general/common/confirm-cancel.modal";

const DEFAULT_ROWS: CATemplateItem[] = [
  { name: "CA1", maxScore: 10, isExam: false },
  { name: "CA2", maxScore: 10, isExam: false },
  { name: "CA3", maxScore: 10, isExam: false },
  { name: "Final Exam", maxScore: 100, isExam: true },
];

export default function DefaultTemplate() {
  const [rows, setRows] = useState<CATemplateItem[]>(DEFAULT_ROWS);
  const [savedRows, setSavedRows] = useState<CATemplateItem[] | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [setDefaultCATemplate, { isLoading }] = useSetDefaultCATemplateMutation();

  const updateRow = (index: number, field: keyof CATemplateItem, value: string | number | boolean) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const addRow = () => setRows((prev) => [...prev, { name: "", maxScore: 10, isExam: false }]);

  const removeRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const invalid = rows.some((r) => !r.name.trim() || r.maxScore <= 0);
    if (invalid) { toast.error("All rows must have a name and a score greater than 0"); return; }
    try {
      await setDefaultCATemplate({ templates: rows }).unwrap();
      toast.success(savedRows ? "Default CA template updated" : "Default CA template set successfully");
      setSavedRows(rows);
      setIsEditing(false);
    } catch {
      toast.error("Failed to save default CA template");
    }
  };

  const handleConfirmedCancel = () => {
    setRows(savedRows ?? DEFAULT_ROWS);
    setIsEditing(savedRows === null);
  };

  return (
    <>
      <ConfirmCancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirmed={handleConfirmedCancel}
        warningMessage="Are you sure you want to cancel? Any unsaved changes will be lost"
        successMessage="Your changes have been discarded"
      />

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
              onClick={() => { setRows(savedRows); setIsEditing(true); }}
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
                  {["CA Name", "Max Score", "Is Exam?"].map((h) => (
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
            <div className="hidden md:grid grid-cols-[1fr_140px_120px_40px] gap-3 px-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">CA Name</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Max Score</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Is Exam?</span>
              <span />
            </div>

            <div className="space-y-3">
              {rows.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-[1fr_140px_120px_40px] gap-3 items-center bg-gray-50 rounded-xl p-3 md:p-2 md:bg-transparent"
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
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <div
                      onClick={() => updateRow(index, "isExam", !row.isExam)}
                      className={`w-11 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 ${row.isExam ? "bg-[#8000BD]" : "bg-gray-300"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${row.isExam ? "translate-x-5" : "translate-x-0"}`} />
                    </div>
                    <span className="text-sm text-gray-600">{row.isExam ? "Yes" : "No"}</span>
                  </label>
                  <button
                    onClick={() => removeRow(index)}
                    disabled={rows.length === 1}
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
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
                onClick={handleSubmit}
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
