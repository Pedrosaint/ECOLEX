import { useState } from "react";
import { Trash2, Plus, ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";
import {
  useCreateGradingSchemeMutation,
  useAddClassesToSchemeMutation,
} from "../api/grading-scheme.api";
import { useGetClassesQuery } from "../../../admin-domain/classes/api/class-api";
import type { GradeItem } from "../request/grading-scheme.request";

const EMPTY_GRADE: GradeItem = { min: 0, max: 100, grade: "", remark: "" };

export default function GradingScheme() {
  const [name, setName] = useState("");
  const [usePosition, setUsePosition] = useState(false);
  const [selectedClassIds, setSelectedClassIds] = useState<number[]>([]);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [grades, setGrades] = useState<GradeItem[]>([{ ...EMPTY_GRADE }]);

  const [createdSchemeId, setCreatedSchemeId] = useState<number | null>(null);
  const [addClassIds, setAddClassIds] = useState<number[]>([]);
  const [addClassDropdownOpen, setAddClassDropdownOpen] = useState(false);
  const [manualSchemeId, setManualSchemeId] = useState("");

  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const [createGradingScheme, { isLoading: isCreating }] = useCreateGradingSchemeMutation();
  const [addClassesToScheme, { isLoading: isAdding }] = useAddClassesToSchemeMutation();

  const toggleClass = (id: number, list: number[], setList: (v: number[]) => void) => {
    setList(list.includes(id) ? list.filter((c) => c !== id) : [...list, id]);
  };

  const updateGrade = (
    index: number,
    field: keyof GradeItem,
    value: string | number
  ) => {
    setGrades((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const addGradeRow = () => setGrades((prev) => [...prev, { ...EMPTY_GRADE }]);

  const removeGradeRow = (index: number) =>
    setGrades((prev) => prev.filter((_, i) => i !== index));

  const handleCreate = async () => {
    if (!name.trim()) { toast.error("Scheme name is required"); return; }
    if (selectedClassIds.length === 0) { toast.error("Select at least one class"); return; }
    const invalid = grades.some(
      (g) => !g.grade.trim() || !g.remark.trim() || g.min > g.max
    );
    if (invalid) { toast.error("All grade rows must be complete and valid (min ≤ max)"); return; }

    try {
      const response = await createGradingScheme({
        name,
        usePosition,
        classIds: selectedClassIds,
        grades,
      }).unwrap();
      toast.success(response.message ?? "Grading scheme created");
      setCreatedSchemeId(response.data.scheme.id);
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to create grading scheme");
    }
  };

  const handleAddClasses = async () => {
    const schemeId = createdSchemeId ?? Number(manualSchemeId);
    if (!schemeId || isNaN(schemeId)) { toast.error("Enter a valid scheme ID"); return; }
    if (addClassIds.length === 0) { toast.error("Select at least one class to add"); return; }

    try {
      await addClassesToScheme({ schemeId, classIds: addClassIds }).unwrap();
      toast.success("Classes added to scheme");
      setAddClassIds([]);
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to add classes to scheme");
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Create Scheme ─────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-800">Create Grading Scheme</h3>
          <p className="text-sm text-gray-500 mt-1">
            Define grade boundaries and assign them to classes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Scheme Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scheme Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Primary Remark Setup"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8000BD]"
            />
          </div>

          {/* Classes Multi-select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign to Classes
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setClassDropdownOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#8000BD] cursor-pointer"
              >
                <span className={selectedClassIds.length ? "text-gray-800" : "text-gray-400"}>
                  {classesLoading
                    ? "Loading..."
                    : selectedClassIds.length
                    ? `${selectedClassIds.length} class${selectedClassIds.length > 1 ? "es" : ""} selected`
                    : "Select classes"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
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
                      onClick={() => toggleClass(cls.id, selectedClassIds, setSelectedClassIds)}
                      className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm hover:bg-purple-50 transition-colors cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                          selectedClassIds.includes(cls.id)
                            ? "bg-[#8000BD] border-[#8000BD]"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedClassIds.includes(cls.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className={selectedClassIds.includes(cls.id) ? "text-[#8000BD] font-medium" : "text-gray-700"}>
                        {cls.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Use Position Toggle */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => setUsePosition((v) => !v)}
            className={`w-11 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 ${
              usePosition ? "bg-[#8000BD]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                usePosition ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Use Position{" "}
            <span className="text-gray-400 font-normal">
              (rank students by position within the grade)
            </span>
          </span>
        </div>

        {/* Grade Rows */}
        <div className="mb-2">
          <div className="hidden md:grid grid-cols-[100px_100px_100px_1fr_40px] gap-3 px-2 mb-2">
            {["Min Score", "Max Score", "Grade", "Remark", ""].map((h) => (
              <span key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {h}
              </span>
            ))}
          </div>

          <div className="space-y-3">
            {grades.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[100px_100px_100px_1fr_40px] gap-3 items-center bg-gray-50 rounded-xl p-3 md:p-2 md:bg-transparent"
              >
                <input
                  type="number"
                  value={row.min}
                  min={0}
                  max={100}
                  onChange={(e) => updateGrade(index, "min", Number(e.target.value))}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8000BD]"
                />
                <input
                  type="number"
                  value={row.max}
                  min={0}
                  max={100}
                  onChange={(e) => updateGrade(index, "max", Number(e.target.value))}
                  placeholder="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8000BD]"
                />
                <input
                  type="text"
                  value={row.grade}
                  onChange={(e) => updateGrade(index, "grade", e.target.value)}
                  placeholder="A"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8000BD]"
                />
                <input
                  type="text"
                  value={row.remark}
                  onChange={(e) => updateGrade(index, "remark", e.target.value)}
                  placeholder="Excellent"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8000BD]"
                />
                <button
                  onClick={() => removeGradeRow(index)}
                  disabled={grades.length === 1}
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addGradeRow}
            className="mt-4 flex items-center gap-2 text-sm text-[#8000BD] hover:text-[#6a00a1] font-medium cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Grade Row
          </button>
        </div>

        <button
          onClick={handleCreate}
          disabled={isCreating}
          className={`mt-6 w-full py-3 rounded-xl text-white text-sm font-semibold bg-[#8000BD] hover:bg-[#6a00a1] transition-colors ${
            isCreating ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isCreating ? "Creating..." : "Create Grading Scheme"}
        </button>

        {createdSchemeId && (
          <p className="mt-3 text-center text-sm text-green-600 font-medium">
            Scheme created — ID: <span className="font-bold">{createdSchemeId}</span>
          </p>
        )}
      </div>

      {/* ── Add Classes to Existing Scheme ────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-800">Add Classes to Existing Scheme</h3>
          <p className="text-sm text-gray-500 mt-1">
            Assign more classes to a grading scheme that already exists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Scheme ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scheme ID
            </label>
            <input
              type="number"
              value={createdSchemeId ?? manualSchemeId}
              onChange={(e) => {
                setCreatedSchemeId(null);
                setManualSchemeId(e.target.value);
              }}
              placeholder="e.g. 5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8000BD]"
            />
            {createdSchemeId && (
              <p className="text-xs text-[#8000BD] mt-1">Auto-filled from last created scheme</p>
            )}
          </div>

          {/* Classes Multi-select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Classes to Add
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setAddClassDropdownOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#8000BD] cursor-pointer"
              >
                <span className={addClassIds.length ? "text-gray-800" : "text-gray-400"}>
                  {classesLoading
                    ? "Loading..."
                    : addClassIds.length
                    ? `${addClassIds.length} class${addClassIds.length > 1 ? "es" : ""} selected`
                    : "Select classes"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
              </button>

              {addClassDropdownOpen && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-52 overflow-y-auto">
                  {classesData?.classes.length === 0 && (
                    <p className="text-sm text-gray-400 px-3 py-2">No classes found</p>
                  )}
                  {classesData?.classes.map((cls) => (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => toggleClass(cls.id, addClassIds, setAddClassIds)}
                      className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm hover:bg-purple-50 transition-colors cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                          addClassIds.includes(cls.id)
                            ? "bg-[#8000BD] border-[#8000BD]"
                            : "border-gray-300"
                        }`}
                      >
                        {addClassIds.includes(cls.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className={addClassIds.includes(cls.id) ? "text-[#8000BD] font-medium" : "text-gray-700"}>
                        {cls.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleAddClasses}
          disabled={isAdding}
          className={`mt-6 w-full py-3 rounded-xl text-white text-sm font-semibold bg-[#8000BD] hover:bg-[#6a00a1] transition-colors ${
            isAdding ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isAdding ? "Adding..." : "Add Classes to Scheme"}
        </button>
      </div>
    </div>
  );
}
