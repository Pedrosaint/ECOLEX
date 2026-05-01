/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetClassesQuery } from "../../classes/api/class-api";
import {
  useGetAllSubjectQuery,
  useAssignSubjectToClassMutation,
  useGetClassSubjectsQuery,
} from "../api/subject.api";
import { useGetCATemplateQuery } from "../../ca-template/api/ca-template.api";

export function useAssignSubject() {
  const [classId, setClassId] = useState<number | null>(null);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<number[]>([]);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
  const [subjectSearch, setSubjectSearch] = useState("");
  const [caError, setCaError] = useState(false);
  const [, setResult] = useState<{
    assigned: number;
    skipped: number;
    casCreated: number;
    examsCreated: number;
  } | null>(null);

  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data: subjectsData, isLoading: subjectsLoading } = useGetAllSubjectQuery();
  const { data: classSubjectsData } = useGetClassSubjectsQuery(classId ?? skipToken);
  const { data: caTemplateData } = useGetCATemplateQuery(
    classId ? { classId } : skipToken
  );
  const [assignSubject, { isLoading }] = useAssignSubjectToClassMutation();

  const selectedClass = classesData?.classes.find((c) => c.id === classId);

  const assignedSubjectIds = new Set(
    classSubjectsData?.data?.subjects.map((s) => s.id) ?? []
  );
  const availableSubjects = (subjectsData?.subjects ?? [])
    .filter((s) => !assignedSubjectIds.has(s.id))
    .filter((s) => s.name.toLowerCase().includes(subjectSearch.toLowerCase()));

  const toggleSubject = (id: number) => {
    setSelectedSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedSubjectNames = availableSubjects
    .filter((s) => selectedSubjectIds.includes(s.id))
    .map((s) => s.name)
    .join(", ");

  const handleSubmit = async () => {
    if (!classId) {
      toast.error("Please select a class");
      return;
    }
    if (selectedSubjectIds.length === 0) {
      toast.error("Please select at least one subject");
      return;
    }

    setCaError(false);
    setResult(null);

    try {
      const res = await assignSubject({
        classId,
        subjectIds: selectedSubjectIds,
      }).unwrap();
      setResult(res.data);
      setSelectedSubjectIds([]);
      setClassId(null);
      const hasClassTemplate = !!(
        caTemplateData?.data?.classSpecific &&
        caTemplateData.data.classSpecific.templates.length > 0
      );

      if (hasClassTemplate) {
        toast.success(res.message);
      } else {
        toast.success(
          `Subjects assigned to ${selectedClass?.name} uses the default CA template.`
        );
      }
    } catch (err: any) {
      const message: string = err?.data?.message || "";
      if (
        message.toLowerCase().includes("ca") ||
        message.toLowerCase().includes("template")
      ) {
        setCaError(true);
      } else {
        toast.error(message || "Failed to assign subjects");
      }
    }
  };

  const handleClassSelect = (id: number) => {
    setClassId(id);
    setClassDropdownOpen(false);
    setCaError(false);
    setResult(null);
    setSelectedSubjectIds([]);
    setSubjectSearch("");
  };

  const toggleClassDropdown = () => {
    setClassDropdownOpen((v) => !v);
    setSubjectDropdownOpen(false);
  };

  const toggleSubjectDropdown = () => {
    setSubjectDropdownOpen((v) => {
      if (v) setSubjectSearch("");
      return !v;
    });
    setClassDropdownOpen(false);
  };

  return {
    classId,
    selectedSubjectIds,
    classDropdownOpen,
    subjectDropdownOpen,
    subjectSearch,
    setSubjectSearch,
    caError,
    classesData,
    classesLoading,
    subjectsLoading,
    isLoading,
    selectedClass,
    availableSubjects,
    selectedSubjectNames,
    toggleSubject,
    handleSubmit,
    handleClassSelect,
    toggleClassDropdown,
    toggleSubjectDropdown,
  };
}
