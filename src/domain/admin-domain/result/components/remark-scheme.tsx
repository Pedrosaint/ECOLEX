import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { Plus, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRemarkScheme } from "../hooks";

export default function RemarkSchemeTab() {
  const {
    schemeName,
    setSchemeName,
    rules,
    isSaving,
    schemes,
    loadingSchemes,
    updateRule,
    addRule,
    removeRule,
    handleSubmit,
  } = useRemarkScheme();

  const [expandedScheme, setExpandedScheme] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-[#F4A300] text-white p-3 rounded text-sm text-center">
        Each remark will automatically include the student's name when displayed on their result sheet.
      </div>

      {/* Existing Schemes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded shadow-sm border border-gray-200 p-5"
      >
        <h2 className="text-base font-semibold text-gray-900 mb-4">Existing Remark Schemes</h2>

        {loadingSchemes ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : schemes.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No remark schemes created yet.</p>
        ) : (
          <div className="space-y-2">
            {schemes.map((scheme) => (
              <div key={scheme.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedScheme(expandedScheme === scheme.id ? null : scheme.id)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-800">{scheme.name}</span>
                    <span className="text-xs text-gray-400">{scheme.rules.length} rule{scheme.rules.length !== 1 ? "s" : ""}</span>
                    <span className="text-xs text-gray-400">· Created {new Date(scheme.createdAt).toLocaleDateString()}</span>
                  </div>
                  {expandedScheme === scheme.id ? (
                    <ChevronDown size={15} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={15} className="text-gray-400" />
                  )}
                </button>

                {expandedScheme === scheme.id && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[500px]">
                      <thead className="bg-[#EDF9FD] border-b border-gray-200">
                        <tr>
                          {["Min Score", "Max Score", "Remark"].map((h) => (
                            <th key={h} className="py-2 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-left border-r last:border-r-0 border-gray-200">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {scheme.rules.map((rule) => (
                          <tr key={rule.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 text-sm text-gray-700 border-r border-gray-200 w-28">{rule.minScore}</td>
                            <td className="py-2 px-4 text-sm text-gray-700 border-r border-gray-200 w-28">{rule.maxScore}</td>
                            <td className="py-2 px-4 text-sm text-gray-600">{rule.remark}</td>
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
        <h2 className="text-base font-semibold text-gray-900 mb-5">Create New Remark Scheme</h2>

        {/* Scheme Name */}
        <div className="mb-6 max-w-sm">
          <label className="text-sm font-semibold text-gray-900 block mb-1">
            Scheme Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={schemeName}
            onChange={(e) => setSchemeName(e.target.value)}
            placeholder="e.g. Standard Remarks 2024"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#4B0082]"
          />
        </div>

        {/* Rules Table */}
        <div className="bg-white shadow-sm border border-gray-200 overflow-x-auto mb-5">
          <table className="w-full border-collapse min-w-[640px]">
            <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
              <tr>
                {["Min Score", "Max Score", "Remark", ""].map((h) => (
                  <th
                    key={h}
                    className="text-center py-3 px-3 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r last:border-r-0 border-gray-200"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rules.map((rule, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 text-center border-r border-gray-200 w-28">
                    <input
                      type="number"
                      value={rule.minScore}
                      onChange={(e) => updateRule(index, "minScore", e.target.value)}
                      placeholder="0"
                      className="w-20 p-2 border border-gray-300 rounded text-center text-sm"
                    />
                  </td>
                  <td className="py-3 text-center border-r border-gray-200 w-28">
                    <input
                      type="number"
                      value={rule.maxScore}
                      onChange={(e) => updateRule(index, "maxScore", e.target.value)}
                      placeholder="100"
                      className="w-20 p-2 border border-gray-300 rounded text-center text-sm"
                    />
                  </td>
                  <td className="py-3 px-3 border-r border-gray-200">
                    <input
                      type="text"
                      value={rule.remark}
                      onChange={(e) => updateRule(index, "remark", e.target.value)}
                      placeholder="demonstrates excellent performance..."
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#4B0082]"
                    />
                  </td>
                  <td className="py-3 w-12 text-center">
                    <button
                      onClick={() => removeRule(index)}
                      disabled={rules.length === 1}
                      className="p-1 bg-gray-100 border border-gray-300 rounded hover:bg-red-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <RxCross2 className="text-red-700" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Rule */}
        <div className="flex justify-end mb-8">
          <button
            onClick={addRule}
            className="flex items-center gap-1.5 bg-[#E8EDF5] text-[#545454] px-4 py-2 cursor-pointer rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <Plus size={14} />
            Add Another Rule
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className={`w-full max-w-lg bg-[#4B0082] text-white px-6 py-3 rounded-md text-base font-medium transition-colors ${
              isSaving ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:bg-[#3a0066]"
            }`}
          >
            {isSaving ? "Saving..." : "Save Remark Scheme"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
