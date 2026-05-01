/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import { useCreateStaffMutation } from "../api/staff-api";
import { useGetCampusQuery } from "../../campus/api/campus.api";

interface UseAddStaffProps {
  onClose: () => void;
}

export function useAddStaff({ onClose }: UseAddStaffProps) {
  const [campusDropdown, setCampusDropdown] = useState(false);
  const [campusSearch, setCampusSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    duty: "",
    nextOfKin: "",
    dateEmployed: "",
    payroll: "",
    campusId: "",
  });

  const [createStaff, { isLoading }] = useCreateStaffMutation();
  const { data } = useGetCampusQuery();
  const campuses = data?.campuses || [];

  const filteredCampuses = campuses.filter((c) =>
    c.name.toLowerCase().includes(campusSearch.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "payroll") {
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setFormData((prev) => ({ ...prev, [id]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        payroll: Number(formData.payroll.replace(/,/g, "")),
        campusId: Number(formData.campusId),
        dateEmployed: formData.dateEmployed
          ? formData.dateEmployed.split("T")[0]
          : "",
      };

      const response = await createStaff(payload).unwrap();
      toast.success("Staff created successfully!");
      console.log("Staff created:", response);

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        duty: "",
        nextOfKin: "",
        dateEmployed: "",
        payroll: "",
        campusId: "",
      });

      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create staff!");
      console.error("Failed to create staff:", error);
    }
  };

  return {
    campusDropdown,
    setCampusDropdown,
    campusSearch,
    setCampusSearch,
    formData,
    setFormData,
    isLoading,
    campuses,
    filteredCampuses,
    handleChange,
    handleSave,
  };
}
