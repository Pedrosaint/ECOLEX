/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { useCreateStudentMutation } from "../api/student.api";
import { useGetCampusQuery } from "../../campus/api/campus.api";
import { useGetClassesQuery } from "../../classes/api/class-api";
import { useGetSessionsQuery } from "../../overview/api/admin-overview.api";
import type { Class } from "../../classes/response/get-class.response";
import type { Campuse } from "../../campus/response/campuse.response";
import { studentSchema } from "../validation/student.schema";

interface DropdownOption {
  value: string;
  label: string;
}

interface UseAddStudentProps {
  onClose: () => void;
}

export function useAddStudent({ onClose }: UseAddStudentProps) {
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const campusRef = useRef<HTMLDivElement>(null);
  const classRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    otherNames: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    guardianName: "",
    guardianNumber: "",
    campusId: "",
    classId: "",
    lifestyle: "",
    session: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);

  const { data: campusData } = useGetCampusQuery();
  const { data: classData } = useGetClassesQuery();
  const { data: sessionsData } = useGetSessionsQuery();
  const [createStudent, { isLoading }] = useCreateStudentMutation({
    fixedCacheKey: "create-student",
  });
  const sessions = sessionsData?.data ?? [];

  const filteredClasses = classData?.classes?.filter(
    (cls: Class) =>
      !formData.campusId || cls.campusId === Number(formData.campusId)
  );

  const campusOptions: DropdownOption[] = [
    { value: "", label: "Select Campus" },
    ...(campusData?.campuses?.map((c: Campuse) => ({
      value: String(c.id),
      label: c.name,
    })) || []),
  ];

  const classOptions: DropdownOption[] = [
    { value: "", label: "Select Class" },
    ...(filteredClasses?.map((c: Class) => ({
      value: String(c.id),
      label: c.name,
    })) || []),
  ];

  const getSelectedLabel = (value: string, options: DropdownOption[]): string => {
    if (!options || options.length === 0) return "";
    const found = options.find((option) => option.value === value);
    return found ? found.label : options[0].label;
  };

  const handlePassportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPassportFile(file);
      setPassportPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateForm = async () => {
    try {
      await studentSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    try {
      const fd = new FormData();
      fd.append("surname", formData.surname);
      fd.append("name", formData.name);
      fd.append("otherNames", formData.otherNames);
      fd.append("gender", formData.gender);
      fd.append("dateOfBirth", formData.dateOfBirth);
      fd.append("email", formData.email);
      fd.append("guardianName", formData.guardianName);
      fd.append("guardianNumber", formData.guardianNumber);
      fd.append("campusId", formData.campusId);
      fd.append("classId", formData.classId);
      fd.append("lifestyle", formData.lifestyle);
      fd.append("session", formData.session);
      if (passportFile) fd.append("passport", passportFile);

      await createStudent(fd).unwrap();
      toast.success("Student created successfully!");
      onClose();

      setFormData({
        surname: "",
        name: "",
        otherNames: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        guardianName: "",
        guardianNumber: "",
        campusId: "",
        classId: "",
        lifestyle: "",
        session: "",
      });
      setPassportFile(null);
      setPassportPreview(null);
    } catch (err) {
      toast.error(
        (err as { data?: { message?: string } })?.data?.message ||
          "Failed to create student."
      );
      console.error("Error creating student:", err);
    }
  };

  const isFormComplete = Object.entries(formData).every(
    ([key, value]) => key === "otherNames" || value.trim() !== ""
  );

  return {
    isClassOpen,
    setIsClassOpen,
    isCampusOpen,
    setIsCampusOpen,
    campusRef,
    classRef,
    formData,
    setFormData,
    errors,
    setErrors,
    passportFile,
    setPassportFile,
    passportPreview,
    setPassportPreview,
    isLoading,
    sessions,
    campusOptions,
    classOptions,
    getSelectedLabel,
    handlePassportChange,
    handleChange,
    handleSave,
    isFormComplete,
  };
}
