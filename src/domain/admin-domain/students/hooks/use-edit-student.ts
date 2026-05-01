import { useRef, useState } from "react";
import { toast } from "sonner";
import { useEditStudentMutation } from "../api/student.api";
import { useGetCampusQuery } from "../../campus/api/campus.api";
import {
  useGetClassesQuery,
  useGetClassGroupsQuery,
} from "../../classes/api/class-api";
import { useGetSessionsQuery } from "../../overview/api/admin-overview.api";
import type { Student } from "../response/students.response";
import type { Class } from "../../classes/response/get-class.response";
import type { Group } from "../../classes/response/get-group.response";
import type { Campuse as Campus } from "../../campus/response/campuse.response";

interface DropdownOption {
  value: string;
  label: string;
}

interface UseEditStudentProps {
  studentId: number;
  initialData?: Student;
  onClose: () => void;
}

export function useEditStudent({ studentId, initialData, onClose }: UseEditStudentProps) {
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [editStudent, { isLoading }] = useEditStudentMutation();

  const campusRef = useRef<HTMLDivElement>(null);
  const classRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  const { data: campusData } = useGetCampusQuery();
  const { data: classData } = useGetClassesQuery();
  const { data: groupData } = useGetClassGroupsQuery({});
  const { data: sessionsData } = useGetSessionsQuery();
  const sessions = sessionsData?.data ?? [];

  const [form, setForm] = useState({
    name: initialData?.name || "",
    surname: initialData?.surname || "",
    otherNames: initialData?.otherNames || "",
    gender: initialData?.gender?.toLowerCase() || "",
    campusId: initialData?.campusId ? String(initialData.campusId) : "",
    classId: initialData?.classId ? String(initialData.classId) : "",
    email: initialData?.email || "",
    session: initialData?.academicSession?.name || "",
    guardianNumber: initialData?.guardianNumber || "",
    guardianName: initialData?.guardianName || "",
    dateOfBirth: initialData?.dateOfBirth ? initialData.dateOfBirth.split('T')[0] : "",
    lifestyle: initialData?.lifestyle || "",
    classGroupId: initialData?.classGroupId ? String(initialData.classGroupId) : "",
  });

  const filteredClasses = classData?.classes?.filter(
    (cls: Class) => !form.campusId || cls.campusId === Number(form.campusId)
  );

  const filteredGroups = groupData?.groups?.filter(
    (grp: Group) => !form.classId || grp.classId === Number(form.classId)
  );

  const campusOptions: DropdownOption[] = [
    { value: "", label: "Select Campus" },
    ...(campusData?.campuses?.map((c: Campus) => ({
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

  const groupOptions: DropdownOption[] = [
    { value: "", label: "Select Group" },
    ...(filteredGroups?.map((g: Group) => ({
      value: String(g.id),
      label: g.name,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (["campusId", "classId", "classGroupId"].includes(name)) {
      setForm({ ...form, [name]: value === "" ? "" : value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCustomSelect = (name: string, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [name]: ["campusId", "classId", "classGroupId"].includes(name)
        ? value === ""
          ? ""
          : String(value)
        : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("surname", form.surname);
      fd.append("otherNames", form.otherNames);
      fd.append("gender", form.gender);
      fd.append("email", form.email);
      fd.append("session", form.session);
      fd.append("guardianNumber", form.guardianNumber);
      fd.append("guardianName", form.guardianName);
      fd.append("lifestyle", form.lifestyle);
      fd.append("campusId", form.campusId);
      fd.append("classId", form.classId);
      if (form.classGroupId) fd.append("classGroupId", form.classGroupId);
      if (form.dateOfBirth) {
        fd.append("dateOfBirth", new Date(form.dateOfBirth).toISOString().split("T")[0]);
      }
      if (passportFile) fd.append("passport", passportFile);

      await editStudent({ id: studentId, payload: fd }).unwrap();
      toast.success("Student details updated successfully!");
      onClose();
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to update student.");
    }
  };

  return {
    form,
    setForm,
    isCampusOpen,
    setIsCampusOpen,
    isClassOpen,
    setIsClassOpen,
    isGroupOpen,
    setIsGroupOpen,
    passportFile,
    setPassportFile,
    passportPreview,
    setPassportPreview,
    campusRef,
    classRef,
    groupRef,
    sessions,
    campusOptions,
    classOptions,
    groupOptions,
    isLoading,
    getSelectedLabel,
    handlePassportChange,
    handleChange,
    handleCustomSelect,
    handleSubmit,
  };
}
