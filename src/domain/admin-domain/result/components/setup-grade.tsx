import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Trash2, SquarePen, X, Plus } from "lucide-react";
import { useSetupGrade } from "../hooks";

export default function SetupGradesTab() {
  const {
    schemeName, setSchemeName,
    usePosition, setUsePosition,
    grades, selectedClassIds, campusId,
    campusData, campusLoading,
    classesLoading, filteredClasses,
    isSaving, schemePlaceholder,
    gradingSchemes, loadingGradings, handleDelete,
    updateGrade, handleAddGrade, handleRemoveGrade,
    toggleClass, handleCampusChange, handleSubmit,
    editingScheme, editName, setEditName,
    editUsePosition, setEditUsePosition,
    editCampusId, editClassIds, editFilteredClasses,
    editGrades, isUpdating,
    startEdit, closeEdit,
    handleEditCampusChange, toggleEditClass,
    updateEditGrade, addEditGrade, removeEditGrade, handleUpdate,
  } = useSetupGrade();

  const [expandedScheme, setExpandedScheme] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-[#F4A300] text-white p-3 rounded text-sm text-center">
        Kindly remove any grade not applicable using the close button or modify to get your grading.
      </div>

      {/* Existing Grading Schemes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded shadow-sm border border-gray-200 p-5"
      >
        <h2 className="text-base font-semibold text-gray-900 mb-4">Existing Grading Schemes</h2>

        {loadingGradings ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : gradingSchemes.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No grading schemes created yet.</p>
        ) : (
          <div className="space-y-2">
            {gradingSchemes.map((scheme) => (
              <div key={scheme.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <button
                    type="button"
                    onClick={() => setExpandedScheme(expandedScheme === scheme.id ? null : scheme.id)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <span className="text-sm font-semibold text-gray-800">{scheme.name}</span>
                    <span className="text-xs text-gray-400">{scheme.grades.length} grade{scheme.grades.length !== 1 ? "s" : ""}</span>
                    {scheme.usePosition && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">Position</span>
                    )}
                    <span className="text-xs text-gray-400">· Created {new Date(scheme.createdAt).toLocaleDateString()}</span>
                  </button>
                  <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); startEdit(scheme); }}
                      className="p-1.5 rounded hover:bg-purple-100 transition-colors cursor-pointer"
                      title="Edit grading scheme"
                    >
                      <SquarePen size={15} className="text-[#4B0082]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(scheme.id)}
                      className="p-1.5 rounded hover:bg-red-100 transition-colors cursor-pointer"
                      title="Delete grading scheme"
                    >
                      <Trash2 size={15} className="text-red-500" />
                    </button>
                    {expandedScheme === scheme.id
                      ? <ChevronDown size={15} className="text-gray-400" />
                      : <ChevronRight size={15} className="text-gray-400" />
                    }
                  </div>
                </div>

                {expandedScheme === scheme.id && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[500px]">
                      <thead className="bg-[#EDF9FD] border-b border-gray-200">
                        <tr>
                          {["Min Score", "Max Score", "Grade", "Remark"].map((h) => (
                            <th key={h} className="py-2 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-left border-r last:border-r-0 border-gray-200">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {scheme.grades.map((g) => (
                          <tr key={g.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 text-sm text-gray-700 border-r border-gray-200 w-28">{g.minScore}</td>
                            <td className="py-2 px-4 text-sm text-gray-700 border-r border-gray-200 w-28">{g.maxScore}</td>
                            <td className="py-2 px-4 text-sm font-medium text-gray-800 border-r border-gray-200 w-20">{g.grade}</td>
                            <td className="py-2 px-4 text-sm text-gray-600">{g.remark}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Create Form */}
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
            Select Campus
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

      {/* Edit Drawer */}
      <AnimatePresence>
        {editingScheme && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEdit}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-full z-50 w-full max-w-lg bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Edit Grading Scheme</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{editingScheme.name}</p>
                </div>
                <button
                  onClick={closeEdit}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                {/* Scheme Name */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1">
                    Scheme Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#4B0082]"
                  />
                </div>

                {/* Use Position */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setEditUsePosition((v) => !v)}
                    className={`w-11 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 cursor-pointer ${
                      editUsePosition ? "bg-[#4B0082]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                        editUsePosition ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    Use Position{" "}
                    <span className="font-normal text-gray-500">(rank students by position)</span>
                  </span>
                </label>

                {/* Grades Table */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-3">Grades</label>
                  <div className="overflow-x-auto border border-gray-200 rounded">
                    <table className="w-full border-collapse min-w-[420px]">
                      <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                        <tr>
                          {["Min", "Max", "Grade", "Remark", ""].map((h) => (
                            <th key={h} className="py-2 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r last:border-r-0 border-gray-200 text-center">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {editGrades.map((grade, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-2 px-2 text-center border-r border-gray-200">
                              <input type="number" value={grade.min} onChange={(e) => updateEditGrade(index, "min", e.target.value)} className="w-16 p-1 border border-gray-300 rounded text-center text-sm" />
                            </td>
                            <td className="py-2 px-2 text-center border-r border-gray-200">
                              <input type="number" value={grade.max} onChange={(e) => updateEditGrade(index, "max", e.target.value)} className="w-16 p-1 border border-gray-300 rounded text-center text-sm" />
                            </td>
                            <td className="py-2 px-2 text-center border-r border-gray-200">
                              <input type="text" value={grade.grade} onChange={(e) => updateEditGrade(index, "grade", e.target.value)} placeholder="A" className="w-12 p-1 border border-gray-300 rounded text-center text-sm" />
                            </td>
                            <td className="py-2 px-2 text-center border-r border-gray-200">
                              <input type="text" value={grade.remark} onChange={(e) => updateEditGrade(index, "remark", e.target.value)} placeholder="Excellent" className="w-28 p-1 border border-gray-300 rounded text-center text-sm" />
                            </td>
                            <td className="py-2 px-2 text-center">
                              <button onClick={() => removeEditGrade(index)} className="p-1 bg-gray-100 border border-gray-300 rounded hover:bg-red-100 cursor-pointer">
                                <RxCross2 className="text-red-700" size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    onClick={addEditGrade}
                    className="mt-3 flex items-center gap-1.5 text-sm text-[#4B0082] hover:text-[#3a0066] font-medium cursor-pointer"
                  >
                    <Plus size={14} /> Add Grade
                  </button>
                </div>

                {/* Campus */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1">
                    Select Campus
                  </label>
                  <select
                    value={editCampusId}
                    onChange={(e) => handleEditCampusChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#4B0082]"
                  >
                    <option value="">{campusLoading ? "Loading..." : "Select Campus"}</option>
                    {campusData?.campuses?.map((c) => (
                      <option key={c.id} value={String(c.id)}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Classes */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1">
                    Select Applicable Classes <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-[#FCA52B] mb-3">
                    {editCampusId ? "Select the classes this grading scheme applies to." : "Select a campus first to see its classes."}
                  </p>
                  {classesLoading ? (
                    <p className="text-sm text-gray-400">Loading classes...</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-y-2">
                      {editFilteredClasses.map((cls) => (
                        <div key={cls.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`edit-class-${cls.id}`}
                            checked={editClassIds.includes(cls.id)}
                            onChange={() => toggleEditClass(cls.id)}
                            className="custom-checkbox"
                          />
                          <label htmlFor={`edit-class-${cls.id}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                            {cls.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
                <button
                  onClick={closeEdit}
                  className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="flex-1 py-2.5 rounded-lg bg-[#4B0082] text-white text-sm font-medium hover:bg-[#3a0066] transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Delete Grading Scheme?</h3>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. All grades in this scheme will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => { handleDelete(confirmDeleteId); setConfirmDeleteId(null); }}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
