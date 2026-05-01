import { useEffect, useState } from "react";
import {
  EearlyEducationDropdown,
  JuniorSecondaryDropdown,
  PrimaryDropdown,
  SeniorSecondaryDropdown,
} from "../../../../auth/dropdown-data";
import { useEditClassMutation } from "../api/class-api";

const allCategories = [
  ...EearlyEducationDropdown,
  ...PrimaryDropdown,
  ...JuniorSecondaryDropdown,
  ...SeniorSecondaryDropdown,
].sort((a, b) => b.length - a.length);

interface UseEditClassProps {
  onClose: () => void;
  classId: number;
  initialName?: string;
  initialCustomName?: string;
}

export function useEditClass({
  onClose,
  classId,
  initialName,
  initialCustomName,
}: UseEditClassProps) {
  let initialCategory = "Select Category";
  let initialClassNamePart = "";

  if (initialName) {
    const foundCategory = allCategories.find((cat) =>
      initialName.startsWith(cat)
    );
    if (foundCategory) {
      initialCategory = foundCategory;
      initialClassNamePart = initialName.slice(foundCategory.length).trim();
    } else {
      initialClassNamePart = initialName;
    }
  }

  const [category, setCategory] = useState(initialCategory);
  const [className, setClassName] = useState(initialClassNamePart);
  const [customName, setCustomName] = useState(initialCustomName || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [editClass, { isLoading, isSuccess, isError }] = useEditClassMutation();

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await editClass({
        id: classId,
        payload: {
          name: `${category} ${className}`.trim(),
          customName,
        },
      }).unwrap();
    } catch (err) {
      console.error("Failed to update class:", err);
    }
  };

  return {
    category,
    setCategory,
    className,
    setClassName,
    customName,
    setCustomName,
    isDropdownOpen,
    setIsDropdownOpen,
    showSuccess,
    isLoading,
    isError,
    handleCategorySelect,
    handleSubmit,
  };
}
