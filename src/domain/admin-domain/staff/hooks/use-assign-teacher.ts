/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import { useAssignTeacherMutation, useGetStaffsQuery } from "../api/staff-api";
import { useGetClassesQuery } from "../../classes/api/class-api";
import { useGetAllSubjectQuery } from "../../manage-subject/api/subject.api";

interface AssignItem {
  id: string;
  staffId: string;
  classId: string;
  subjectId: string;
}

interface UseAssignTeacherProps {
  onClose: () => void;
}

export function useAssignTeacher({ onClose }: UseAssignTeacherProps) {
  const { data: staffData } = useGetStaffsQuery();
  const { data: classData } = useGetClassesQuery();
  const { data: subjectData } = useGetAllSubjectQuery();
  const [assignTeacher, { isLoading }] = useAssignTeacherMutation();

  const [assignments, setAssignments] = useState<AssignItem[]>([]);
  const [form, setForm] = useState({
    staffId: "",
    classId: "",
    subjectId: "",
  });

  const [selectedSubjects, setSelectedSubjects] = useState<any[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<any[]>([]);

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleAddSubject = () => {
    const selected = subjectData?.subjects?.find(
      (s: any) => String(s.id) === form.subjectId
    );
    if (selected && !selectedSubjects.find((s) => s.id === selected.id)) {
      setSelectedSubjects([...selectedSubjects, selected]);
    }
    setForm({ ...form, subjectId: "" });
  };

  const handleRemoveSubject = (id: string | number) => {
    setSelectedSubjects(selectedSubjects.filter((s) => s.id !== id));
  };

  const handleAddClass = () => {
    const selected = classData?.classes?.find(
      (c: any) => String(c.id) === form.classId
    );
    if (selected && !selectedClasses.find((c) => c.id === selected.id)) {
      setSelectedClasses([...selectedClasses, selected]);
    }
    setForm({ ...form, classId: "" });
  };

  const handleRemoveClass = (id: string | number) => {
    setSelectedClasses(selectedClasses.filter((c) => c.id !== id));
  };

  const handleSave = async () => {
    if (!form.staffId) {
      toast.warning("Please select a staff member.");
      return;
    }

    if (selectedSubjects.length === 0 || selectedClasses.length === 0) {
      toast.warning("Please add at least one subject and one class.");
      return;
    }

    try {
      for (const cls of selectedClasses) {
        for (const sub of selectedSubjects) {
          await assignTeacher({
            staffId: Number(form.staffId),
            classId: Number(cls.id),
            subjectId: Number(sub.id),
          }).unwrap();
        }
      }

      const newAssignment: AssignItem = {
        id: crypto.randomUUID(),
        ...form,
      };

      setAssignments([...assignments, newAssignment]);
      setSelectedClasses([]);
      setSelectedSubjects([]);
      setForm({ staffId: "", classId: "", subjectId: "" });
      onClose();

      toast.success("Teacher assigned successfully!");
    } catch (err) {
      console.error("Error assigning teacher:", err);
      toast.error("An error occurred while assigning teacher.");
    }
  };

  return {
    staffData,
    classData,
    subjectData,
    isLoading,
    assignments,
    form,
    selectedSubjects,
    selectedClasses,
    handleChange,
    handleAddSubject,
    handleRemoveSubject,
    handleAddClass,
    handleRemoveClass,
    handleSave,
  };
}
