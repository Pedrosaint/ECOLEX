import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useGetCATemplateQuery, useSetClassCATemplateMutation } from "../api/ca-template.api";
import { useGetClassesQuery } from "../../classes/api/class-api";
import type { CATemplateItem } from "../request/ca-template.request";
import { skipToken } from "@reduxjs/toolkit/query";

const EMPTY_ROW: CATemplateItem = { name: "", maxScore: 10, isExam: false };

export function useClassTemplate() {
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [rows, setRows] = useState<CATemplateItem[]>([{ ...EMPTY_ROW }]);
  const [savedRows, setSavedRows] = useState<CATemplateItem[] | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data: templateData, isLoading: isLoadingTemplate } = useGetCATemplateQuery(
    selectedClassId ? { classId: selectedClassId } : skipToken
  );
  const [setClassCATemplate, { isLoading }] = useSetClassCATemplateMutation();

  const selectedClass = classesData?.classes.find((c) => c.id === selectedClassId);

  useEffect(() => {
    if (!templateData) return;
    const { classSpecific } = templateData.data;

    if (classSpecific && classSpecific.templates.length > 0) {
      const loaded: CATemplateItem[] = classSpecific.templates.map((t) => ({
        name: t.name,
        maxScore: t.maxScore,
        isExam: t.isExam,
      }));
      setSavedRows(loaded);
      setRows(loaded);
      setIsEditing(false);
    } else {
      setSavedRows(null);
      setRows([{ ...EMPTY_ROW }]);
      setIsEditing(true);
    }
  }, [templateData]);

  const handleSelectClass = (id: number) => {
    setSelectedClassId(id);
    setClassDropdownOpen(false);
    setRows([{ ...EMPTY_ROW }]);
    setSavedRows(null);
    setIsEditing(true);
  };

  const updateRow = (index: number, field: keyof CATemplateItem, value: string | number | boolean) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const toggleExam = (index: number) => {
    setRows((prev) => prev.map((row, i) => ({ ...row, isExam: i === index ? !row.isExam : false })));
  };

  const addRow = () => setRows((prev) => [...prev, { ...EMPTY_ROW }]);

  const removeRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedClassId) { toast.error("Please select a class first"); return; }
    const invalid = rows.some((r) => !r.name.trim() || r.maxScore <= 0);
    if (invalid) { toast.error("All rows must have a name and a score greater than 0"); return; }
    try {
      await setClassCATemplate({ classId: selectedClassId, templates: rows }).unwrap();
      toast.success(savedRows ? "Class CA template updated" : "Class CA template set successfully");
      setSavedRows(rows);
      setIsEditing(false);
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to save class CA template");
    }
  };

  const handleConfirmedCancel = () => {
    setRows(savedRows ?? [{ ...EMPTY_ROW }]);
    setIsEditing(savedRows === null);
  };

  const startEditing = () => {
    setRows(savedRows!);
    setIsEditing(true);
  };

  return {
    selectedClassId,
    classDropdownOpen,
    setClassDropdownOpen,
    rows,
    savedRows,
    isEditing,
    showCancelModal,
    setShowCancelModal,
    classesData,
    classesLoading,
    isLoadingTemplate,
    isLoading,
    selectedClass,
    handleSelectClass,
    updateRow,
    toggleExam,
    addRow,
    removeRow,
    handleSubmit,
    handleConfirmedCancel,
    startEditing,
  };
}
