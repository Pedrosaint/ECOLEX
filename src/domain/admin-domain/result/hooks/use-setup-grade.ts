import { useState } from "react";
import { toast } from "sonner";
import { useCreateGradingMutation, useGetGradingQuery, useDeleteGradingMutation, useUpdateGradingMutation } from "./index";
import { useGetClassesQuery } from "../../classes/hooks";
import { useGetCampusQuery } from "../../campus/hooks";
import type { GradeRow, GradingScheme } from "../types";

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
  const { data: gradingData, isLoading: loadingGradings } = useGetGradingQuery();
  const [editingScheme, setEditingScheme] = useState<GradingScheme | null>(null);
  const [editName, setEditName] = useState("");
  const [editUsePosition, setEditUsePosition] = useState(false);
  const [editGrades, setEditGrades] = useState<GradeRow[]>([]);
  const [editCampusId, setEditCampusId] = useState("");
  const [editClassIds, setEditClassIds] = useState<number[]>([]);

  const [createGrading, { isLoading: isSaving }] = useCreateGradingMutation();
  const [deleteGrading] = useDeleteGradingMutation();
  const [updateGrading, { isLoading: isUpdating }] = useUpdateGradingMutation();

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

  const startEdit = (scheme: GradingScheme) => {
    setEditingScheme(scheme);
    setEditName(scheme.name);
    setEditUsePosition(scheme.usePosition);
    setEditCampusId(scheme.campusId ? String(scheme.campusId) : "");
    setEditClassIds(scheme.classes.map((c) => c.classId));
    setEditGrades(
      scheme.grades.map((g) => ({
        min: String(g.minScore),
        max: String(g.maxScore),
        grade: g.grade,
        remark: g.remark,
      }))
    );
  };

  const handleEditCampusChange = (val: string) => {
    setEditCampusId(val);
    setEditClassIds([]);
  };

  const toggleEditClass = (id: number) => {
    setEditClassIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const closeEdit = () => setEditingScheme(null);

  const updateEditGrade = (index: number, field: keyof GradeRow, value: string) => {
    setEditGrades((prev) => prev.map((g, i) => (i === index ? { ...g, [field]: value } : g)));
  };

  const addEditGrade = () => {
    setEditGrades((prev) => [...prev, { min: "", max: "", grade: "", remark: "" }]);
  };

  const removeEditGrade = (index: number) => {
    setEditGrades((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdate = async () => {
    if (!editingScheme) return;
    if (!editName.trim()) { toast.error("Scheme name is required"); return; }
    const invalid = editGrades.some(
      (g) => !g.grade.trim() || !g.remark.trim() || g.min === "" || g.max === "" || Number(g.min) > Number(g.max)
    );
    if (invalid) { toast.error("All grade rows must be complete and valid (min ≤ max)"); return; }
    try {
      const res = await updateGrading({
        schemeId: editingScheme.id,
        body: {
          name: editName,
          usePosition: editUsePosition,
          classIds: editClassIds,
          campusId: editCampusId ? Number(editCampusId) : null,
          grades: editGrades.map((g) => ({
            min: Number(g.min),
            max: Number(g.max),
            grade: g.grade,
            remark: g.remark,
          })),
        },
      }).unwrap();
      toast.success(res.message || "Grading scheme updated successfully");
      closeEdit();
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to update grading scheme");
    }
  };

  const handleDelete = async (schemeId: number) => {
    try {
      const res = await deleteGrading(schemeId).unwrap();
      toast.success(res.message || "Grading scheme deleted");
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to delete grading scheme");
    }
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

  const editFilteredClasses = (classesData?.classes ?? []).filter(
    (cls) => !editCampusId || cls.campusId === Number(editCampusId)
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
    gradingSchemes: gradingData?.data ?? [],
    loadingGradings,
    handleDelete,
    updateGrade,
    handleAddGrade,
    handleRemoveGrade,
    toggleClass,
    handleCampusChange,
    handleSubmit,
    editingScheme,
    editName, setEditName,
    editUsePosition, setEditUsePosition,
    editCampusId, editClassIds,
    editFilteredClasses,
    editGrades,
    isUpdating,
    startEdit,
    closeEdit,
    handleEditCampusChange,
    toggleEditClass,
    updateEditGrade,
    addEditGrade,
    removeEditGrade,
    handleUpdate,
  };
}
