/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { X, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAssignTeacherMutation, useGetStaffsQuery } from "../api/staff-api";
import { useGetClassesQuery } from "../../classes/api/class-api";
import { useGetAllSubjectQuery } from "../../manage-subject/api/subject.api";

interface AssignItem {
  id: string;
  staffId: string;
  classId: string;
  subjectId: string;
}

export default function AssignStaffModal({ onClose }: { onClose: () => void }) {
  // 🔹 Fetch dropdown data
  const { data: staffData } = useGetStaffsQuery();
  const { data: classData } = useGetClassesQuery();
  const { data: subjectData } = useGetAllSubjectQuery();
  const [assignTeacher, { isLoading }] = useAssignTeacherMutation();

  const [assignments, setAssignments] = useState<AssignItem[]>([]);
  const [form, setForm] = useState({
    staffId: "",
    classId: "",
    subjectId: "",
  });

  const [selectedSubjects, setSelectedSubjects] = useState<any[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<any[]>([]);

  // 🔹 Handle form input
  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  // 🔹 Add subjects and classes individually
  const handleAddSubject = () => {
    const selected = subjectData?.subjects?.find(
      (s: any) => String(s.id) === form.subjectId
    );
    if (selected && !selectedSubjects.find((s) => s.id === selected.id)) {
      setSelectedSubjects([...selectedSubjects, selected]);
    }
    setForm({ ...form, subjectId: "" });
  };

  const handleRemoveSubject = (id: string | number) => {
    setSelectedSubjects(selectedSubjects.filter((s) => s.id !== id));
  };

  const handleAddClass = () => {
    const selected = classData?.classes?.find(
      (c: any) => String(c.id) === form.classId
    );
    if (selected && !selectedClasses.find((c) => c.id === selected.id)) {
      setSelectedClasses([...selectedClasses, selected]);
    }
    setForm({ ...form, classId: "" });
  };

  const handleRemoveClass = (id: string | number) => {
    setSelectedClasses(selectedClasses.filter((c) => c.id !== id));
  };

  // 🔹 Save assignment
  const handleSave = async () => {
    if (!form.staffId) {
      toast.warning("Please select a staff member.");
      return;
    }

    if (selectedSubjects.length === 0 || selectedClasses.length === 0) {
      toast.warning("Please add at least one subject and one class.");
      return;
    }

    try {
      for (const cls of selectedClasses) {
        for (const sub of selectedSubjects) {
          await assignTeacher({
            staffId: Number(form.staffId),
            classId: Number(cls.id),
            subjectId: Number(sub.id),
          }).unwrap();
        }
      }

      const newAssignment: AssignItem = {
        id: crypto.randomUUID(),
        ...form,
      };

      setAssignments([...assignments, newAssignment]);
      setSelectedClasses([]);
      setSelectedSubjects([]);
      setForm({ staffId: "", classId: "", subjectId: "" });
      onClose();

      toast.success("Teacher assigned successfully!");
    } catch (err) {
      console.error("Error assigning teacher:", err);
      toast.error("An error occurred while assigning teacher.");
    }
  };

  // 🔹 Reusable Dropdown Component
  const Dropdown = ({
    label,
    name,
    value,
    options,
  }: {
    label: string;
    name: string;
    value: string;
    options: { id: string | number; name: string }[];
  }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div
          className="flex justify-between items-center h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm cursor-pointer hover:border-[#4B0082] transition-all"
          onClick={() => {
            const el = document.getElementById(name);
            el?.classList.toggle("hidden");
          }}
        >
          <span>
            {value
              ? options.find((opt) => String(opt.id) === value)?.name
              : `Select ${label}`}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>

        <div
          id={name}
          className="hidden absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-52 overflow-y-auto"
        >
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => {
                handleChange(name, String(opt.id));
                document.getElementById(name)?.classList.add("hidden");
              }}
              className={`px-3 py-2 text-sm hover:bg-[#4B0082] hover:text-white cursor-pointer ${
                value === String(opt.id)
                  ? "bg-[#F3E8FF] text-[#4B0082] font-medium"
                  : ""
              }`}
            >
              {opt.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 p-3 overflow-y-auto"
    >
      <div className="flex justify-center items-center min-h-full">
        <div className="relative w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-10">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Assign Teacher
            </h2>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition"
              onClick={onClose}
            >
              <X size={22} className="text-gray-500" />
            </button>
          </div>

          {/* Dropdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Dropdown
              label="Staff"
              name="staffId"
              value={form.staffId}
              options={
                staffData?.staff?.map((staff: any) => ({
                  id: staff.id,
                  name: staff.name,
                })) || []
              }
            />
          </div>

          {/* Subjects */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Subjects
            </h3>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Dropdown
                  label="Subject"
                  name="subjectId"
                  value={form.subjectId}
                  options={
                    subjectData?.subjects?.map((sub: any) => ({
                      id: sub.id,
                      name: sub.name,
                    })) || []
                  }
                />
              </div>
              <button
                onClick={handleAddSubject}
                className="px-5 py-2 bg-[#4B0082] text-white rounded-md hover:bg-[#5a00a8] transition-colors h-11"
              >
                + Add
              </button>
            </div>

            {/* Selected subjects */}
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedSubjects.map((sub) => (
                <span
                  key={sub.id}
                  className="flex items-center gap-2 bg-[#F3E8FF] text-[#4B0082] px-3 py-1 rounded-full text-sm font-medium"
                >
                  {sub.name}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveSubject(sub.id)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Classes */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Classes
            </h3>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Dropdown
                  label="Select Class"
                  name="classId"
                  value={form.classId}
                  options={
                    classData?.classes?.map((cls: any) => ({
                      id: cls.id,
                      name: cls.name,
                    })) || []
                  }
                />
              </div>
              <button
                onClick={handleAddClass}
                className="px-5 py-2 bg-[#4B0082] text-white rounded-md hover:bg-[#5a00a8] transition-colors h-11"
              >
                + Add
              </button>
            </div>

            {/* Selected classes */}
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedClasses.map((cls) => (
                <span
                  key={cls.id}
                  className="flex items-center gap-2 bg-[#F3E8FF] text-[#4B0082] px-3 py-1 rounded-full text-sm font-medium"
                >
                  {cls.name}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveClass(cls.id)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Assign Button */}
          <div className="flex justify-end mt-10">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-md bg-[#4B0082] text-white font-medium text-sm px-6 py-2 h-11 hover:bg-[#5a00a8] transition-colors disabled:opacity-60"
            >
              <Check className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Assign"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}