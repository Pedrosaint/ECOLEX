import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useGetCATemplateQuery, useSetDefaultCATemplateMutation } from "../api/ca-template.api";
import type { CATemplateItem } from "../request/ca-template.request";

const DEFAULT_ROWS: CATemplateItem[] = [
  { name: "", maxScore: 10, isExam: false },
];

export function useDefaultTemplate() {
  const [rows, setRows] = useState<CATemplateItem[]>(DEFAULT_ROWS);
  const [savedRows, setSavedRows] = useState<CATemplateItem[] | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { data: templateData, isLoading: isLoadingTemplate } = useGetCATemplateQuery({});
  const [setDefaultCATemplate, { isLoading }] = useSetDefaultCATemplateMutation();

  useEffect(() => {
    const schoolWide = templateData?.data?.schoolWide;
    if (schoolWide && schoolWide.length > 0) {
      const loaded: CATemplateItem[] = schoolWide.map((t) => ({
        name: t.name,
        maxScore: t.maxScore,
        isExam: t.isExam,
      }));
      setSavedRows(loaded);
      setRows(loaded);
      setIsEditing(false);
    }
  }, [templateData]);

  const updateRow = (index: number, field: keyof CATemplateItem, value: string | number | boolean) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const toggleExam = (index: number) => {
    setRows((prev) => prev.map((row, i) => ({ ...row, isExam: i === index ? !row.isExam : false })));
  };

  const addRow = () => setRows((prev) => [...prev, { name: "", maxScore: 10, isExam: false }]);

  const removeRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const invalid = rows.some((r) => !r.name.trim() || r.maxScore <= 0);
    if (invalid) { toast.error("All rows must have a name and a score greater than 0"); return; }
    try {
      await setDefaultCATemplate({ templates: rows }).unwrap();
      toast.success(savedRows ? "Default CA template updated" : "Default CA template set successfully");
      setSavedRows(rows);
      setIsEditing(false);
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to save default CA template");
    }
  };

  const handleConfirmedCancel = () => {
    setRows(savedRows ?? DEFAULT_ROWS);
    setIsEditing(savedRows === null);
  };

  const startEditing = () => {
    setRows(savedRows!);
    setIsEditing(true);
  };

  return {
    rows,
    savedRows,
    isEditing,
    showCancelModal,
    setShowCancelModal,
    isLoadingTemplate,
    isLoading,
    updateRow,
    toggleExam,
    addRow,
    removeRow,
    handleSubmit,
    handleConfirmedCancel,
    startEditing,
  };
}
