/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { X, Check, ChevronDown, CameraIcon } from "lucide-react";
import { useAddStudent } from "../hooks";

interface DropdownOption {
  value: string;
  label: string;
}

export default function AddStudentFormModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const {
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
  } = useAddStudent({ onClose });

  // Reusable dropdown
  const Dropdown = ({
    label,
    isOpen,
    setIsOpen,
    options,
    selectedValue,
    onSelect,
    error,
    disabled,
    emptyMessage,
  }: {
    label: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    options: DropdownOption[];
    selectedValue: string;
    onSelect: (value: string) => void;
    error?: string;
    disabled?: boolean;
    emptyMessage?: string;
  }) => {
    const realOptions = options.filter((o) => o.value !== "");
    return (
      <div className="flex flex-col">
        <label className="text-sm font-bold text-[#120D1C] mb-2">{label}</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            disabled={disabled}
            className={`w-full px-3 py-2 border rounded bg-white text-sm text-left flex items-center justify-between ${
              error ? "border-red-500" : "border-gray-300"
            } disabled:opacity-50`}
          >
            {getSelectedLabel(selectedValue, options)}
            <ChevronDown
              size={16}
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
              {emptyMessage && realOptions.length === 0 ? (
                <div className="px-3 py-3 text-sm text-gray-400 italic">
                  {emptyMessage}
                </div>
              ) : (
                options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      onSelect(option.value);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
                      selectedValue === option.value ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {option.label}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
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
        <div className="relative w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 my-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
            <h2 className="text-2xl font-medium text-gray-900">
              Register New Student
            </h2>
            <button className="p-2" onClick={onClose}>
              <X
                size={25}
                className="text-gray-500 border border-gray-300 rounded-full p-1 shadow-md"
              />
            </button>
          </div>

          {/* Passport Upload */}
          <div className="flex justify-end mb-6">
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Passport Photo
              </label>
              <label
                htmlFor="passportUpload"
                className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-[#4B0082] transition-colors bg-gray-50 overflow-hidden"
              >
                {passportPreview ? (
                  <img
                    src={passportPreview}
                    alt="Passport"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 p-2">
                    <CameraIcon size={30} className="text-gray-400" />
                    <span className="text-xs text-gray-400 text-center">
                      Upload photo
                    </span>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="passportUpload"
                accept=".jpeg,.jpg,.png,.webp"
                className="hidden"
                onChange={handlePassportChange}
              />
              {passportPreview && (
                <button
                  type="button"
                  onClick={() => {
                    setPassportFile(null);
                    setPassportPreview(null);
                  }}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 max-h-[60vh] overflow-y-auto pr-2">
            {[
              { id: "surname", label: "Surname", type: "text" },
              { id: "name", label: "First Name", type: "text" },
              { id: "otherNames", label: "Other Names", type: "text" },
              { id: "email", label: "Email", type: "email" },
              { id: "guardianName", label: "Guardian Name", type: "text" },
            ].map(({ id, label, type }) => (
              <div key={id} className="flex flex-col">
                <label htmlFor={id} className="text-sm font-medium mb-1">
                  {label}
                </label>
                <input
                  id={id}
                  value={(formData as any)[id]}
                  onChange={handleChange}
                  type={type}
                  className={`h-10 w-full rounded-md border px-3 py-2 text-sm outline-none ${
                    errors[id] ? "border-red-500" : "border-gray-300"
                  } focus:border-[#4B0082]`}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
                {errors[id] && (
                  <p className="text-xs text-red-500 mt-1">{errors[id]}</p>
                )}
              </div>
            ))}

            {/* Guardian Number */}
            <div className="flex flex-col">
              <label htmlFor="guardianNumber" className="text-sm font-medium mb-1">
                Guardian Number
              </label>
              <input
                id="guardianNumber"
                value={formData.guardianNumber}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  if (numericValue.length <= 11) {
                    setFormData((prev) => ({
                      ...prev,
                      guardianNumber: numericValue,
                    }));
                    setErrors((prev) => ({ ...prev, guardianNumber: "" }));
                  }
                }}
                type="text"
                inputMode="numeric"
                maxLength={11}
                className={`h-10 w-full rounded-md border px-3 py-2 text-sm outline-none ${
                  errors.guardianNumber ? "border-red-500" : "border-gray-300"
                } focus:border-[#4B0082]`}
                placeholder="Enter guardian number"
              />
              {errors.guardianNumber && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.guardianNumber}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label htmlFor="gender" className="text-sm font-medium mb-1">
                Gender
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`h-10 w-full rounded-md border px-3 py-2 text-sm outline-none ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                } focus:border-[#4B0082]`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label htmlFor="dateOfBirth" className="text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                type="date"
                max={new Date().toISOString().split("T")[0]}
                className={`h-10 w-full rounded-md border px-3 py-2 text-sm outline-none ${
                  errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                } focus:border-[#4B0082]`}
              />
              {errors.dateOfBirth && (
                <p className="text-xs text-red-500 mt-1">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Campus */}
            <div ref={campusRef}>
              <Dropdown
                label="Campus"
                isOpen={isCampusOpen}
                setIsOpen={setIsCampusOpen}
                options={campusOptions}
                selectedValue={formData.campusId}
                onSelect={(value) =>
                  setFormData((prev) => ({ ...prev, campusId: value, classId: "" }))
                }
                error={errors.campusId}
              />
            </div>

            {/* Class */}
            <div ref={classRef}>
              <Dropdown
                label="Class"
                isOpen={isClassOpen}
                setIsOpen={setIsClassOpen}
                options={classOptions}
                selectedValue={formData.classId}
                onSelect={(value) =>
                  setFormData((prev) => ({ ...prev, classId: value }))
                }
                error={errors.classId}
                disabled={!formData.campusId}
              />
            </div>

            {/* Lifestyle */}
            <div className="flex flex-col">
              <label htmlFor="lifestyle" className="text-sm font-medium mb-1">
                Lifestyle
              </label>
              <select
                id="lifestyle"
                value={formData.lifestyle}
                onChange={handleChange}
                className={`h-10 w-full rounded-md border px-3 py-2 text-sm outline-none ${
                  errors.lifestyle ? "border-red-500" : "border-gray-300"
                } focus:border-[#4B0082]`}
              >
                <option value="">Select Lifestyle</option>
                <option value="day">Day Student</option>
                <option value="boarding">Boarding Student</option>
              </select>
              {errors.lifestyle && (
                <p className="text-xs text-red-500 mt-1">{errors.lifestyle}</p>
              )}
            </div>

            {/* Session */}
            <div className="flex flex-col">
              <label htmlFor="session" className="text-sm font-medium mb-1">
                Session
              </label>
              <select
                id="session"
                value={formData.session}
                onChange={handleChange}
                className={`h-10 w-full rounded-md border px-3 py-2 text-sm outline-none ${
                  errors.session ? "border-red-500" : "border-gray-300"
                } focus:border-[#4B0082]`}
              >
                <option value="">Select Session</option>
                {sessions.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              {errors.session && (
                <p className="text-xs text-red-500 mt-1">{errors.session}</p>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              disabled={isLoading || !isFormComplete}
              className="inline-flex items-center justify-center cursor-pointer rounded-md text-sm font-medium bg-[#4B0082] text-white h-10 px-6 py-2 disabled:opacity-50 hover:bg-[#3a0066] transition-colors"
            >
              <Check className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Student"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
