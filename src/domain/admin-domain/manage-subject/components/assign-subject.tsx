/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, AlertTriangle, CheckSquare, Square } from "lucide-react";
import { toast } from "sonner";
import { useGetClassesQuery } from "../../classes/api/class-api";
import { useGetAllSubjectQuery, useAssignSubjectToClassMutation } from "../api/subject.api";

export default function AssignSubject() {
  const [classId, setClassId] = useState<number | null>(null);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<number[]>([]);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
  const [caError, setCaError] = useState(false);
  const [result, setResult] = useState<{
    assigned: number;
    skipped: number;
    casCreated: number;
    examsCreated: number;
  } | null>(null);

  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data: subjectsData, isLoading: subjectsLoading } = useGetAllSubjectQuery();
  const [assignSubject, { isLoading }] = useAssignSubjectToClassMutation();

  const selectedClass = classesData?.classes.find((c) => c.id === classId);

  const toggleSubject = (id: number) => {
    setSelectedSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedSubjectNames = subjectsData?.subjects
    .filter((s) => selectedSubjectIds.includes(s.id))
    .map((s) => s.name)
    .join(", ");

  const handleSubmit = async () => {
    if (!classId) { toast.error("Please select a class"); return; }
    if (selectedSubjectIds.length === 0) { toast.error("Please select at least one subject"); return; }

    setCaError(false);
    setResult(null);

    try {
      const res = await assignSubject({ classId, subjectIds: selectedSubjectIds }).unwrap();
      setResult(res.data);
      setSelectedSubjectIds([]);
      setClassId(null);
      toast.success(res.message);
    } catch (err: any) {
      const message: string = err?.data?.message || "";
      if (message.toLowerCase().includes("ca") || message.toLowerCase().includes("template")) {
        setCaError(true);
      } else {
        toast.error(message || "Failed to assign subjects");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
    >
      <h3 className="text-base font-semibold text-gray-800 mb-1">Assign Subjects to a Class</h3>
      <p className="text-sm text-gray-500 mb-6">
        Select a class and pick the subjects to assign. CA templates must be set for the class first.
      </p>

      {/* CA not set error banner */}
      {caError && (
        <div className="mb-5 flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
          <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-orange-700">CA template not set for this class</p>
            <p className="text-xs text-orange-600 mt-0.5">
              Go to{" "}
              <a href="/admin/ca-template" className="underline font-medium">
                CA Template
              </a>{" "}
              and set a template for this class before assigning subjects.
            </p>
          </div>
        </div>
      )}

      {/* Success result card */}
      {result && (
        <div className="mb-5 bg-green-50 border border-green-200 rounded-xl px-4 py-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            { label: "Assigned", value: result.assigned },
            { label: "Skipped", value: result.skipped },
            { label: "CAs Created", value: result.casCreated },
            { label: "Exams Created", value: result.examsCreated },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xl font-bold text-green-700">{item.value}</p>
              <p className="text-xs text-green-600">{item.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Dropdowns row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Class dropdown */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-[#120D1C] mb-1">
              Class <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => { setClassDropdownOpen((v) => !v); setSubjectDropdownOpen(false); }}
                disabled={classesLoading}
                className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm text-left flex items-center justify-between focus:outline-none"
              >
                <span className={selectedClass ? "text-gray-800" : "text-gray-400"}>
                  {classesLoading ? "Loading..." : selectedClass ? selectedClass.name : "Select Class"}
                </span>
                <ChevronDown size={16} className={`transition-transform ${classDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {classDropdownOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-52 overflow-y-auto">
                  {classesData?.classes.map((cls) => (
                    <div
                      key={cls.id}
                      onClick={() => { setClassId(cls.id); setClassDropdownOpen(false); setCaError(false); setResult(null); }}
                      className={`px-3 py-2 cursor-pointer text-sm hover:bg-[#6a00a1] hover:text-white ${
                        classId === cls.id ? "bg-purple-50 font-medium text-[#8000BD]" : "text-gray-700"
                      }`}
                    >
                      {cls.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Subject multi-select */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-[#120D1C] mb-1">
              Subjects <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => { setSubjectDropdownOpen((v) => !v); setClassDropdownOpen(false); }}
                disabled={subjectsLoading}
                className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm text-left flex items-center justify-between focus:outline-none"
              >
                <span className={selectedSubjectIds.length > 0 ? "text-gray-800 truncate max-w-[85%]" : "text-gray-400"}>
                  {subjectsLoading
                    ? "Loading..."
                    : selectedSubjectIds.length > 0
                    ? selectedSubjectNames
                    : "Select Subjects"}
                </span>
                <ChevronDown size={16} className={`flex-shrink-0 transition-transform ${subjectDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {subjectDropdownOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-52 overflow-y-auto">
                  {subjectsData?.subjects.length === 0 && (
                    <p className="text-sm text-gray-400 px-3 py-2">No subjects found</p>
                  )}
                  {subjectsData?.subjects.map((subject) => {
                    const checked = selectedSubjectIds.includes(subject.id);
                    return (
                      <div
                        key={subject.id}
                        onClick={() => toggleSubject(subject.id)}
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm hover:bg-purple-50 text-gray-700"
                      >
                        {checked
                          ? <CheckSquare size={16} className="text-[#8000BD] flex-shrink-0" />
                          : <Square size={16} className="text-gray-400 flex-shrink-0" />
                        }
                        {subject.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {selectedSubjectIds.length > 0 && (
              <p className="text-xs text-[#8000BD] mt-1">{selectedSubjectIds.length} subject(s) selected</p>
            )}
          </div>
        </div>

        {/* Submit — full width below */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || !classId || selectedSubjectIds.length === 0}
          className={`w-full py-4 px-4 rounded text-sm font-semibold uppercase text-white transition-colors ${
            isLoading || !classId || selectedSubjectIds.length === 0
              ? "bg-[#D9D9D9] cursor-not-allowed"
              : "bg-[#8000BD] hover:bg-[#640094] cursor-pointer"
          }`}
        >
          {isLoading ? "Assigning..." : "Assign Subjects"}
        </button>
      </div>
    </motion.div>
  );
}
