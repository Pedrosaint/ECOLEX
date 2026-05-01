import { useState } from "react";

export function useStudentResultView() {
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const Result = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    no: index + 1,
    subject: "Mathematics",
    ca1: "8",
    ca2: "8",
    ca3: "20",
    exam: "35",
    total: "51",
    grade: "C",
    classAvg: "62.71",
    postion: "10th",
  }));

  return {
    isPrintModalOpen,
    setIsPrintModalOpen,
    Result,
  };
}
