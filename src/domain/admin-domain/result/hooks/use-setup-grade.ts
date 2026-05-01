import { useState } from "react";
import { toast } from "sonner";
import { useCreateGradingMutation } from "./index";
import { useGetClassesQuery } from "../../classes/hooks";
import { useGetCampusQuery } from "../../campus/hooks";
import type { GradeRow } from "../types";

const DEFAULT_GRADES: GradeRow[] = [
  { min: "0",  max: "39",  grade: "F", remark: "Fail" },
  { min: "40", max: "49",  grade: "D", remark: "Pass" },
  { min: "50", max: "59",  grade: "C", remark: "Good" },
  { min: "60", max: "69",  grade: "B", remark: "Very Good" },
  { min: "70", max: "100", grade: "A", remark: "Excellent" },
];

export function useSetupGrade() {
  const [schemeName, setSchemeName] = useState("");
  const [usePosition, setUsePosition] = useState(false);
  const [grades, setGrades] = useState<GradeRow[]>(DEFAULT_GRADES);
  const [selectedClassIds, setSelectedClassIds] = useState<number[]>([]);
  const [campusId, setCampusId] = useState("");

  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data: campusData, isLoading: campusLoading } = useGetCampusQuery();
  const [createGrading, { isLoading: isSaving }] = useCreateGradingMutation();

  const updateGrade = (index: number, field: keyof GradeRow, value: string) => {
    setGrades((prev) => prev.map((g, i) => (i === index ? { ...g, [field]: value } : g)));
  };

  const handleAddGrade = () => {
    setGrades((prev) => [...prev, { min: "", max: "", grade: "", remark: "" }]);
  };

  const handleRemoveGrade = (index: number) => {
    setGrades((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleClass = (id: number) => {
    setSelectedClassIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleCampusChange = (val: string) => {
    setCampusId(val);
    setSelectedClassIds([]);
  };

  const handleSubmit = async () => {
    if (!schemeName.trim()) { toast.error("Scheme name is required"); return; }
    if (!campusId) { toast.error("Please select a campus"); return; }
    if (selectedClassIds.length === 0) { toast.error("Select at least one class"); return; }

    const invalid = grades.some(
      (g) => !g.grade.trim() || !g.remark.trim() || g.min === "" || g.max === "" || Number(g.min) > Number(g.max)
    );
    if (invalid) { toast.error("All grade rows must be complete and valid (min ≤ max)"); return; }

    try {
      const res = await createGrading({
        name: schemeName,
        usePosition,
        classIds: selectedClassIds,
        campusId: Number(campusId),
        grades: grades.map((g) => ({
          min: Number(g.min),
          max: Number(g.max),
          grade: g.grade,
          remark: g.remark,
        })),
      }).unwrap();
      toast.success(res.message || "Grading scheme saved successfully");
      setSchemeName("");
      setUsePosition(false);
      setGrades(DEFAULT_GRADES);
      setSelectedClassIds([]);
      setCampusId("");
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to save grading scheme");
    }
  };

  const filteredClasses = (classesData?.classes ?? []).filter(
    (cls) => !campusId || cls.campusId === Number(campusId)
  );

  const schemePlaceholder =
    selectedClassIds.length > 0
      ? `e.g. ${(classesData?.classes ?? []).filter((c) => selectedClassIds.includes(c.id)).map((c) => c.name).join(", ")} Grading`
      : "e.g. JSS Grading Scheme";

  return {
    schemeName, setSchemeName,
    usePosition, setUsePosition,
    grades,
    selectedClassIds,
    campusId,
    classesLoading,
    campusData, campusLoading,
    isSaving,
    filteredClasses,
    schemePlaceholder,
    updateGrade,
    handleAddGrade,
    handleRemoveGrade,
    toggleClass,
    handleCampusChange,
    handleSubmit,
  };
}
