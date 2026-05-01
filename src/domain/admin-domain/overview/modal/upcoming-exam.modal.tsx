import { X, Check, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetClassesQuery } from "../../classes/api/class-api";
import { useGetClassSubjectsQuery } from "../../manage-subject/api/subject.api";
import { useUpcomingExamModal } from "../hooks";

interface ExamField {
  examName: string;
  date: string;
  classId: string;
  subject: string;
}

interface RowProps {
  exam: ExamField;
  index: number;
  showRemove: boolean;
  onChange: (index: number, field: keyof ExamField, value: string) => void;
  onRemove: (index: number) => void;
}

function ExamRow({ exam, index, showRemove, onChange, onRemove }: RowProps) {
  const { data: classData } = useGetClassesQuery();
  const classes = classData?.classes ?? [];

  const { data: classSubjectsData } = useGetClassSubjectsQuery(
    exam.classId ? Number(exam.classId) : skipToken
  );
  const subjects = classSubjectsData?.data?.subjects ?? [];

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="relative p-4 border border-gray-200 rounded-lg bg-gray-50"
    >
      {showRemove && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute -right-2 -top-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors cursor-pointer"
          aria-label="Remove exam"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Exam Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Exam Name</label>
          <input
            type="text"
            value={exam.examName}
            onChange={(e) => onChange(index, "examName", e.target.value)}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#8000BD]"
            placeholder="e.g. Midterm Exam"
            required
          />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={exam.date}
            onChange={(e) => onChange(index, "date", e.target.value)}
            className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#8000BD]"
            required
          />
        </div>

        {/* Class */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Class</label>
          <select
            value={exam.classId}
            onChange={(e) => {
              onChange(index, "classId", e.target.value);
              onChange(index, "subject", "");
            }}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#8000BD]"
            required
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name ?? cls.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject — disabled until class is picked */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select
            value={exam.subject}
            onChange={(e) => onChange(index, "subject", e.target.value)}
            disabled={!exam.classId}
            className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-[#8000BD] ${
              !exam.classId
                ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                : "border-gray-300 bg-white"
            }`}
            required
          >
            <option value="">
              {!exam.classId ? "Select a class first" : "Select Subject"}
            </option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
}

export default function UpcomingExamsModal({ onClose }: { onClose: () => void }) {
  const {
    examFields,
    handleChange,
    handleAddField,
    handleRemoveField,
    handleSubmit,
  } = useUpcomingExamModal(onClose);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl p-6 md:p-8 mx-auto max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add Upcoming Exams</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors border border-gray-300 cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              <AnimatePresence>
                {examFields.map((exam, index) => (
                  <ExamRow
                    key={index}
                    exam={exam}
                    index={index}
                    showRemove={examFields.length > 1}
                    onChange={handleChange}
                    onRemove={handleRemoveField}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleAddField}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add Another Exam
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-[#4B0082] text-white hover:bg-[#3a0066] rounded-md transition-colors cursor-pointer"
              >
                <Check className="h-4 w-4" />
                Save Exams
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
