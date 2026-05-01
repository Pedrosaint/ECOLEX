import { useEffect, useState } from "react";
import { useEditSubjectMutation } from "../api/subject.api";
import { useGetCampusQuery } from "../../campus/api/campus.api";

interface UseEditSubjectProps {
  onClose: () => void;
  subjectId: number;
  initialName: string;
  initialCampusId?: number;
  initialCode?: string;
}

export function useEditSubject({
  onClose,
  subjectId,
  initialName,
  initialCampusId,
  initialCode,
}: UseEditSubjectProps) {
  const [subjectName, setSubjectName] = useState(initialName || "");
  const [campusId, setCampusId] = useState(
    initialCampusId ? String(initialCampusId) : ""
  );
  const [code, setCode] = useState(initialCode || "");
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { data: campusData, isLoading: campusLoading } = useGetCampusQuery();
  const [editSubject, { isLoading, isSuccess }] = useEditSubjectMutation();

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timeout = setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, onClose]);

  const handleSave = async () => {
    if (!subjectName.trim()) return;
    try {
      await editSubject({
        id: subjectId,
        payload: {
          name: subjectName,
          campusId: campusId ? Number(campusId) : undefined,
          code: code || undefined,
        },
      });
    } catch (err) {
      console.error("Error updating subject:", err);
    }
  };

  return {
    subjectName,
    setSubjectName,
    campusId,
    setCampusId,
    code,
    setCode,
    isCampusOpen,
    setIsCampusOpen,
    showSuccess,
    campusData,
    campusLoading,
    isLoading,
    handleSave,
  };
}
