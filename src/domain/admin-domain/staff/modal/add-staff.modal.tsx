/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { X, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCreateStaffMutation } from "../../staff/api/staff-api";
import { toast } from "sonner";
import { useGetCampusQuery } from "../../campus/api/campus.api";

export default function AddStaffFormModal({
  onClose,
}: {
  onClose: () => void;
}) {
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
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 p-3 overflow-y-auto"
    >
      <div className="flex justify-center items-center min-h-full">
        <div className="relative w-full max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 my-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
            <h2 className="text-2xl font-medium text-gray-900">
              Register New Staff
            </h2>
            <button className="p-2 cursor-pointer" onClick={onClose}>
              <X
                size={25}
                className="text-gray-500 border border-gray-300 rounded-full p-1 shadow-md"
              />
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#4B0082] text-white h-9 px-4 py-2 disabled:opacity-50 cursor-pointer"
            >
              <Check className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Staff Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium mb-1">
                Staff's Name
              </label>
              <input
                id="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="h-10 w-full rounded-md border-2 px-3 py-2 text-sm outline-none border-gray-200"
              />
            </div>

            {/* Campus Dropdown */}
            <div className="flex flex-col relative">
              <label htmlFor="campusId" className="text-sm font-medium mb-1">
                Campus
              </label>
              <button
                id="campusId"
                type="button"
                onClick={() => setCampusDropdown((prev) => !prev)}
                className="h-10 w-full rounded-md border-2 px-3 py-2 text-sm text-left outline-none border-gray-200 flex justify-between items-center"
              >
                {formData.campusId
                  ? campuses.find((c) => c.id === Number(formData.campusId))
                      ?.name
                  : "Select a campus"}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    campusDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {campusDropdown && (
                <div className="absolute z-10 mt-17 w-full bg-white border-2 border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <input
                      id="campusSearch"
                      type="text"
                      placeholder="Search campus..."
                      value={campusSearch}
                      onChange={(e) => setCampusSearch(e.target.value)}
                      className="w-full px-2 py-1 border-2 border-gray-200 outline-none rounded text-sm"
                    />
                  </div>
                  <ul>
                    {filteredCampuses.length > 0 ? (
                      filteredCampuses.map((campus) => (
                        <li
                          key={campus.id}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              campusId: String(campus.id),
                            }));
                            setCampusDropdown(false);
                            setCampusSearch("");
                          }}
                          className="px-3 py-2 hover:bg-[#6a00a1] cursor-pointer hover:text-white"
                        >
                          {campus.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-gray-500 italic">
                        No campus found
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Date Employed */}
            <div className="flex flex-col">
              <label
                htmlFor="dateEmployed"
                className="text-sm font-medium mb-1"
              >
                Date Employed
              </label>
              <input
                id="dateEmployed"
                value={formData.dateEmployed}
                onChange={handleChange}
                type="date"
                className="h-10 w-full rounded-md border-2 px-3 py-2 text-sm outline-none border-gray-200"
              />
            </div>

            {/* Payroll */}
            <div className="flex flex-col">
              <label htmlFor="payroll" className="text-sm font-medium mb-1">
                Payroll
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
                  ₦
                </span>
                <input
                  id="payroll"
                  value={formData.payroll}
                  onChange={handleChange}
                  type="text"
                  className="h-10 w-full rounded-md border-2 pl-7 px-3 py-2 text-sm outline-none border-gray-200"
                />
              </div>
            </div>

            {/* Duty */}
            <div className="flex flex-col">
              <label htmlFor="duty" className="text-sm font-medium mb-1">
                Duty
              </label>
              <input
                id="duty"
                value={formData.duty}
                onChange={handleChange}
                type="text"
                className="h-10 w-full rounded-md border-2 px-3 py-2 text-sm outline-none border-gray-200"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="h-10 w-full rounded-md border-2 px-3 py-2 text-sm outline-none border-gray-200"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label htmlFor="address" className="text-sm font-medium mb-1">
                Address
              </label>
              <input
                id="address"
                value={formData.address}
                onChange={handleChange}
                type="text"
                className="h-10 w-full rounded-md border-2 px-3 py-2 text-sm outline-none border-gray-200"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value.replace(/\D/g, "").slice(0, 11),
                  }))
                }
                type="text"
                className="h-10 w-full rounded-md border-2 px-3 py-2 text-sm outline-none border-gray-200"
              />
            </div>

            {/* Next of Kin */}
            <div className="flex flex-col">
              <label htmlFor="nextOfKin" className="text-sm font-medium mb-1">
                Next of Kin
              </label>
              <input
                id="nextOfKin"
                value={formData.nextOfKin}
                onChange={handleChange}
                type="text"
                className="h-10 w-full rounded-md border-2 px-3 py-2 text-sm outline-none border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
