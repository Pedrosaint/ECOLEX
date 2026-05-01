/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { X, Check, ChevronDown } from "lucide-react";
import { useEditStaff } from "../hooks";

export default function EditStaffModal({
  onClose,
  staffId,
  initialData,
}: {
  onClose: () => void;
  staffId: number;
  initialData?: any;
}) {
  const {
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
  } = useEditStaff({ onClose, staffId, initialData });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 z-50 p-3 overflow-y-auto"
    >
      <div className="flex justify-center items-center min-h-full">
        <div className="relative w-full max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 my-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
            <h2 className="text-2xl font-medium text-gray-900">
              Edit Staff Details
            </h2>
            <button
              className="p-2 cursor-pointer transition-colors"
              onClick={onClose}
            >
              <X
                size={25}
                className="text-gray-500 border border-gray-300 rounded-full p-1 shadow-md"
              />
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#4B0082] text-white cursor-pointer h-10 px-6 py-2 disabled:opacity-50"
            >
              <Check className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Staff's Name */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Staff's Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Date Employed */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Date Employed
              </label>
              <input
                name="dateEmployed"
                value={form.dateEmployed}
                onChange={handleChange}
                type="date"
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Payroll */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Payroll
              </label>
              <input
                name="payroll"
                value={form.payroll}
                onChange={handleChange}
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Next of Kin */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Next of Kin
              </label>
              <input
                name="nextOfKin"
                value={form.nextOfKin}
                onChange={handleChange}
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Campus ID */}
            <div className="flex flex-col relative">
              <label className="text-sm font-medium mb-1">Campus</label>

              <button
                type="button"
                onClick={() => setCampusDropdown((prev) => !prev)}
                className="h-10 w-full rounded-md border px-3 py-2 text-sm text-left outline-none border-gray-400 flex justify-between items-center"
              >
                {form.campusId
                  ? campuses.find((c) => c.id === Number(form.campusId))?.name
                  : "Select a campus"}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${campusDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {campusDropdown && (
                <div className="absolute z-10 mt-17 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search campus..."
                      value={campusSearch}
                      onChange={(e) => setCampusSearch(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 outline-none rounded text-sm"
                    />
                  </div>
                  <ul>
                    {filteredCampuses.length > 0 ? (
                      filteredCampuses.map((campus) => (
                        <li
                          key={campus.id}
                          onClick={() => {
                            setForm((prev) => ({
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

            {/* Duty */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Duty
              </label>
              <div className="relative">
                <select
                  name="duty"
                  value={form.duty}
                  onChange={handleChange}
                  className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm pr-8"
                >
                  <option value="">Select Duty</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Security">Security</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="HR">HR</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
