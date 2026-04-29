import { useState, useEffect } from "react";
import { Trash2, Plus, ChevronDown, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useGetCATemplateQuery, useSetClassCATemplateMutation } from "../api/ca-template.api";
import { useGetClassesQuery } from "../../classes/api/class-api";
import type { CATemplateItem } from "../request/ca-template.request";
import { skipToken } from "@reduxjs/toolkit/query";
import ConfirmCancelModal from "../../../../general/common/confirm-cancel.modal";

const EMPTY_ROW: CATemplateItem = { name: "", maxScore: 10, isExam: false };

export default function ClassTemplate() {
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [rows, setRows] = useState<CATemplateItem[]>([{ ...EMPTY_ROW }]);
  const [savedRows, setSavedRows] = useState<CATemplateItem[] | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data: templateData, isLoading: isLoadingTemplate } = useGetCATemplateQuery(
    selectedClassId ? { classId: selectedClassId } : skipToken
  );
  const [setClassCATemplate, { isLoading }] = useSetClassCATemplateMutation();

  const selectedClass = classesData?.classes.find((c) => c.id === selectedClassId);

  useEffect(() => {
    if (!templateData) return;
    const { classSpecific } = templateData.data;

    if (classSpecific && classSpecific.templates.length > 0) {
      const loaded: CATemplateItem[] = classSpecific.templates.map((t) => ({
        name: t.name,
        maxScore: t.maxScore,
        isExam: t.isExam,
      }));
      setSavedRows(loaded);
      setRows(loaded);
      setIsEditing(false);
    } else {
      setSavedRows(null);
      setRows([{ ...EMPTY_ROW }]);
      setIsEditing(true);
    }
  }, [templateData]);

  const handleSelectClass = (id: number) => {
    setSelectedClassId(id);
    setClassDropdownOpen(false);
    setRows([{ ...EMPTY_ROW }]);
    setSavedRows(null);
    setIsEditing(true);
  };

  const updateRow = (index: number, field: keyof CATemplateItem, value: string | number | boolean) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const toggleExam = (index: number) => {
    setRows((prev) => prev.map((row, i) => ({ ...row, isExam: i === index ? !row.isExam : false })));
  };

  const addRow = () => setRows((prev) => [...prev, { ...EMPTY_ROW }]);

  const removeRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedClassId) { toast.error("Please select a class first"); return; }
    const invalid = rows.some((r) => !r.name.trim() || r.maxScore <= 0);
    if (invalid) { toast.error("All rows must have a name and a score greater than 0"); return; }
    try {
      await setClassCATemplate({ classId: selectedClassId, templates: rows }).unwrap();
      toast.success(savedRows ? "Class CA template updated" : "Class CA template set successfully");
      setSavedRows(rows);
      setIsEditing(false);
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to save class CA template");
    }
  };

  const handleConfirmedCancel = () => {
    setRows(savedRows ?? [{ ...EMPTY_ROW }]);
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
            <h3 className="text-base font-semibold text-gray-800">Per-Class CA Template</h3>
            <p className="text-sm text-gray-500 mt-1">Override the default template for a specific class.</p>
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

        {/* Class selector */}
        <div className="mb-6 max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setClassDropdownOpen((v) => !v)}
              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#8000BD] cursor-pointer"
            >
              <span className={selectedClass ? "text-gray-800" : "text-gray-400"}>
                {classesLoading ? "Loading..." : selectedClass ? selectedClass.name : "Choose a class"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {classDropdownOpen && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-52 overflow-y-auto">
                {classesData?.classes.length === 0 && (
                  <p className="text-sm text-gray-400 px-3 py-2">No classes found</p>
                )}
                {classesData?.classes.map((cls) => (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => handleSelectClass(cls.id)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-purple-50 transition-colors cursor-pointer ${
                      cls.id === selectedClassId ? "text-[#8000BD] font-medium bg-purple-50" : "text-gray-700"
                    }`}
                  >
                    {cls.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedClassId && isLoadingTemplate && (
          <div className="overflow-hidden rounded-xl border border-gray-100 mt-2">
            <div className="grid grid-cols-3 bg-gray-50 px-4 py-3 gap-4">
              {[1, 2, 3].map((i) => <div key={i} className="h-3 bg-gray-200 rounded animate-pulse" />)}
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-3 px-4 py-4 gap-4 border-t border-gray-100">
                <div className="h-3 bg-gray-100 rounded animate-pulse" />
                <div className="h-3 w-12 mx-auto bg-gray-100 rounded animate-pulse" />
                <div className="h-5 w-10 mx-auto bg-gray-100 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {!selectedClassId && (
          <div className="flex flex-col items-center justify-center py-14 px-4">
            <div className="relative mb-5">
              <div className="w-20 h-20 rounded-2xl bg-purple-50 border-2 border-dashed border-purple-200 flex items-center justify-center">
                <svg className="w-9 h-9 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="9" y1="9" x2="15" y2="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#8000BD]/10 border border-[#8000BD]/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-[#8000BD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>
            </div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">No class selected</h4>
            <p className="text-xs text-gray-400 text-center max-w-[210px] leading-relaxed">
              Choose a class from the dropdown above to set up its CA template
            </p>
          </div>
        )}

        {/* Read-only summary after save */}
        {selectedClassId && !isLoadingTemplate && savedRows && !isEditing && (
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
        {selectedClassId && !isLoadingTemplate && isEditing && (
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
                    placeholder="e.g. 20"
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
                onClick={handleSubmit}
                disabled={isLoading}
                className={`flex-1 py-3 rounded-xl text-white text-sm font-semibold bg-[#8000BD] hover:bg-[#6a00a1] transition-colors ${isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {isLoading ? "Saving..." : savedRows ? "Update Template" : "Set Class Template"}
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
