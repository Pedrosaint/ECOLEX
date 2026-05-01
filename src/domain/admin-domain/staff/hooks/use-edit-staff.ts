/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import { useEditStaffMutation } from "../api/staff-api";
import { useGetCampusQuery } from "../../campus/api/campus.api";

interface UseEditStaffProps {
  onClose: () => void;
  staffId: number;
  initialData?: any;
}

export function useEditStaff({ onClose, staffId, initialData }: UseEditStaffProps) {
  const [campusDropdown, setCampusDropdown] = useState(false);
  const [campusSearch, setCampusSearch] = useState("");
  const [editStaff, { isLoading }] = useEditStaffMutation();

  const [form, setForm] = useState({
    name: initialData?.name || "",
    dateEmployed: initialData?.dateEmployed
      ? new Date(initialData.dateEmployed).toISOString().split("T")[0]
      : "",
    payroll: initialData?.payroll
      ? String(initialData.payroll).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "",
    address: initialData?.address || "",
    duty: initialData?.duty || "",
    email: initialData?.email || "",
    phoneNumber: initialData?.phoneNumber || "",
    nextOfKin: initialData?.nextOfKin || "",
    campusId: initialData?.campusId || "",
  });

  const { data } = useGetCampusQuery();
  const campuses = data?.campuses || [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "payroll") {
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setForm((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const filteredCampuses = campuses.filter((c) =>
    c.name.toLowerCase().includes(campusSearch.toLowerCase())
  );

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        dateEmployed: form.dateEmployed
          ? new Date(form.dateEmployed).toISOString()
          : null,
        payroll: Number(String(form.payroll).replace(/,/g, "")),
        campusId: Number(form.campusId),
      };

      await editStaff({ id: staffId, payload }).unwrap();
      toast.success("Staff details updated successfully!");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update staff.");
    }
  };

  return {
    campusDropdown,
    setCampusDropdown,
    campusSearch,
    setCampusSearch,
    form,
    setForm,
    isLoading,
    campuses,
    filteredCampuses,
    handleChange,
    handleSubmit,
  };
}
