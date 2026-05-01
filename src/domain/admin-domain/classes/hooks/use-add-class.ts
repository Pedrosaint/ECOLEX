/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useGetCampusQuery } from "../../campus/api/campus.api";
import { useAddClassMutation } from "../api/class-api";

interface DropdownOption {
  value: string;
  label: string;
}

export function useAddClass() {
  const [classes, setClasses] = useState("");
  const [campusId, setCampusId] = useState("");
  const [className, setClassName] = useState("");
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { data } = useGetCampusQuery();
  const campusOptions: DropdownOption[] = [
    { value: "", label: "Select Campus" },
    ...(data?.campuses?.map((c: any) => ({
      value: String(c.id),
      label: c.name,
    })) || []),
  ];

  const [addClass, { isLoading, isSuccess, isError, error }] =
    useAddClassMutation();

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addClass({
        name: classes,
        customName: className,
        campusId: Number(campusId),
      }).unwrap();
      setClasses("");
      setCampusId("");
      setClassName("");
    } catch (err) {
      console.error("Error adding campus:", err);
    }
  };

  const isFormComplete =
    classes.trim() !== "" && campusId.trim() !== "" && className.trim() !== "";

  const getSelectedLabel = (
    value: string,
    options: DropdownOption[]
  ): string => {
    if (!options || options.length === 0) return "";
    const found = options.find((option) => option.value === value);
    return found ? found.label : options[0].label;
  };

  return {
    classes,
    setClasses,
    campusId,
    setCampusId,
    className,
    setClassName,
    isCampusOpen,
    setIsCampusOpen,
    showSuccess,
    campusOptions,
    isLoading,
    isError,
    error,
    handleSubmit,
    isFormComplete,
    getSelectedLabel,
  };
}
