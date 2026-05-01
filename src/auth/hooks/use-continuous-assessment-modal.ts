import { useState } from "react";

interface Assessment {
  title: string;
  weightage: string;
  maxScore: string;
}

interface UseContinuousAssessmentModalProps {
  onClose: () => void;
  onSubmit: (assessments: Assessment[]) => void;
}

export function useContinuousAssessmentModal({ onClose, onSubmit }: UseContinuousAssessmentModalProps) {
  const [assessments, setAssessments] = useState<Assessment[]>([
    { title: "", weightage: "", maxScore: "" },
  ]);

  const handleInputChange = (
    index: number,
    field: keyof Assessment,
    value: string
  ) => {
    const updatedAssessments = [...assessments];
    updatedAssessments[index][field] = value;
    setAssessments(updatedAssessments);
  };

  const handleAddMore = () => {
    setAssessments([...assessments, { title: "", weightage: "", maxScore: "" }]);
  };

  const handleSubmit = () => {
    onSubmit(assessments);
  };

  return {
    assessments,
    handleInputChange,
    handleAddMore,
    handleSubmit,
    onClose,
  };
}
