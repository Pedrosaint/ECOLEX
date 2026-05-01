import { useState } from "react";

interface ExamField {
  examName: string;
  date: string;
  classId: string;
  subject: string;
}

const emptyExam = (): ExamField => ({
  examName: "",
  date: "",
  classId: "",
  subject: "",
});

export function useUpcomingExamModal(onClose: () => void) {
  const [examFields, setExamFields] = useState<ExamField[]>([emptyExam()]);

  const handleChange = (index: number, field: keyof ExamField, value: string) => {
    setExamFields((prev) =>
      prev.map((exam, i) => (i === index ? { ...exam, [field]: value } : exam))
    );
  };

  const handleAddField = () => setExamFields((prev) => [...prev, emptyExam()]);

  const handleRemoveField = (index: number) => {
    setExamFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted exams:", examFields);
    onClose();
  };

  return {
    examFields,
    handleChange,
    handleAddField,
    handleRemoveField,
    handleSubmit,
  };
}
