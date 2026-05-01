import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateGradingSchemeMutation,
  useAddClassesToSchemeMutation,
} from "../api/grading-scheme.api";
import { useGetClassesQuery } from "../../../admin-domain/classes/api/class-api";
import type { GradeItem } from "../request/grading-scheme.request";

const EMPTY_GRADE: GradeItem = { min: 0, max: 100, grade: "", remark: "" };

export function useGradingScheme() {
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

  const toggleSelectedClass = (id: number) =>
    toggleClass(id, selectedClassIds, setSelectedClassIds);

  const toggleAddClass = (id: number) =>
    toggleClass(id, addClassIds, setAddClassIds);

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

  return {
    name,
    setName,
    usePosition,
    setUsePosition,
    selectedClassIds,
    setSelectedClassIds,
    classDropdownOpen,
    setClassDropdownOpen,
    grades,
    createdSchemeId,
    setCreatedSchemeId,
    addClassIds,
    setAddClassIds,
    addClassDropdownOpen,
    setAddClassDropdownOpen,
    manualSchemeId,
    setManualSchemeId,
    classesData,
    classesLoading,
    isCreating,
    isAdding,
    toggleClass,
    toggleSelectedClass,
    toggleAddClass,
    updateGrade,
    addGradeRow,
    removeGradeRow,
    handleCreate,
    handleAddClasses,
  };
}
