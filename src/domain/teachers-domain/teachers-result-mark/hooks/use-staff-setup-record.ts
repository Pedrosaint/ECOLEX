import { useState } from "react";
import { toast } from "sonner";
import { useCreateGradingSchemeMutation } from "../../grading-scheme/api/grading-scheme.api";
import { useGetTeacherClassesQuery } from "../../overview/hooks";

interface GradeRow {
  min: string;
  max: string;
  grade: string;
  remark: string;
}

const DEFAULT_GRADES: GradeRow[] = [
  { min: "0", max: "39", grade: "F", remark: "Fail" },
  { min: "40", max: "54", grade: "D", remark: "Pass" },
  { min: "55", max: "64", grade: "C", remark: "Good" },
  { min: "65", max: "74", grade: "B", remark: "Very Good" },
  { min: "75", max: "100", grade: "A", remark: "Excellent" },
];

export function useStaffSetupRecord() {
  const [schemeName, setSchemeName] = useState("");
  const [usePosition, setUsePosition] = useState(false);
  const [grades, setGrades] = useState<GradeRow[]>(DEFAULT_GRADES);
  const [selectedClassIds, setSelectedClassIds] = useState<number[]>([]);

  const { data: classesData, isLoading: classesLoading } = useGetTeacherClassesQuery();
  const [createGradingScheme, { isLoading }] = useCreateGradingSchemeMutation();

  const handleAddGrade = () => {
    setGrades([...grades, { min: "", max: "", grade: "", remark: "" }]);
  };

  const handleRemoveGrade = (indexToRemove: number) => {
    setGrades(grades.filter((_, index) => index !== indexToRemove));
  };

  const updateGrade = (index: number, field: keyof GradeRow, value: string) => {
    const updated = [...grades];
    updated[index] = { ...updated[index], [field]: value };
    setGrades(updated);
  };

  const toggleClass = (id: number) => {
    setSelectedClassIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!schemeName.trim()) { toast.error("Scheme name is required"); return; }
    if (selectedClassIds.length === 0) { toast.error("Select at least one class"); return; }

    const invalid = grades.some(
      (g) => !g.grade.trim() || !g.remark.trim() || g.min === "" || g.max === "" || Number(g.min) > Number(g.max)
    );
    if (invalid) { toast.error("All grade rows must be complete and valid (min ≤ max)"); return; }

    try {
      await createGradingScheme({
        name: schemeName,
        usePosition,
        classIds: selectedClassIds,
        grades: grades.map((g) => ({
          min: Number(g.min),
          max: Number(g.max),
          grade: g.grade,
          remark: g.remark,
        })),
      }).unwrap();
      toast.success("Grading scheme saved successfully");
      setSchemeName("");
      setUsePosition(false);
      setGrades(DEFAULT_GRADES);
      setSelectedClassIds([]);
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to save grading scheme");
    }
  };

  return {
    schemeName,
    setSchemeName,
    usePosition,
    setUsePosition,
    grades,
    selectedClassIds,
    classesData,
    classesLoading,
    isLoading,
    handleAddGrade,
    handleRemoveGrade,
    updateGrade,
    toggleClass,
    handleSubmit,
  };
}
