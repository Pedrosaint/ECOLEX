/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useAddSubjectMutation } from "../api/subject.api";
import { useGetCampusQuery } from "../../campus/api/campus.api";
import { toast } from "sonner";
import { NIGERIA_SUBJECTS } from "../data/nigeria-subjects";

export function useAddSubject() {
  const [subject, setSubject] = useState("");
  const [subjectSearch, setSubjectSearch] = useState("");
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [campusId, setCampusId] = useState("");
  const [code, setCode] = useState("");
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const subjectDropdownRef = useRef<HTMLDivElement>(null);

  const { data: campusData, isLoading: campusLoading } = useGetCampusQuery();
  const [createSubject, { isLoading: isCreating, isSuccess }] =
    useAddSubjectMutation();

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subjectDropdownRef.current &&
        !subjectDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSubjectDropdownOpen(false);
        setSubjectSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredSubjects = NIGERIA_SUBJECTS.filter((s) =>
    s.toLowerCase().includes(subjectSearch.toLowerCase())
  );

  const isFormComplete = subject.trim() !== "";

  const handleSubmit = async () => {
    try {
      const payload = {
        name: subject,
        campusId: campusId ? Number(campusId) : undefined,
        code: code || undefined,
      };
      await createSubject(payload).unwrap();
      setSubject("");
      setSubjectSearch("");
      setCampusId("");
      setCode("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add subject");
      console.error("Add subject error:", error);
    }
  };

  const toggleSubjectDropdown = () => {
    setIsSubjectDropdownOpen((v) => {
      if (v) setSubjectSearch("");
      return !v;
    });
    setIsCampusOpen(false);
  };

  const selectSubject = (subj: string) => {
    setSubject(subj);
    setIsSubjectDropdownOpen(false);
    setSubjectSearch("");
  };

  const applyCustomSubjectName = (name: string) => {
    setSubject(name);
    setIsSubjectDropdownOpen(false);
    setSubjectSearch("");
  };

  return {
    subject,
    setSubject,
    subjectSearch,
    setSubjectSearch,
    isSubjectDropdownOpen,
    setIsSubjectDropdownOpen,
    campusId,
    setCampusId,
    code,
    setCode,
    isCampusOpen,
    setIsCampusOpen,
    showSuccess,
    subjectDropdownRef,
    campusData,
    campusLoading,
    isCreating,
    filteredSubjects,
    isFormComplete,
    handleSubmit,
    toggleSubjectDropdown,
    selectSubject,
    applyCustomSubjectName,
  };
}
