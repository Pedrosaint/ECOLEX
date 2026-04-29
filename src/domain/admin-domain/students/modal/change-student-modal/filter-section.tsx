/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

// 🧩 Reusable Dropdown Component
const Dropdown = ({
  label,
  options,
  selectedValue,
  onSelect,
  disabled,
  onResetDependents,
  emptyMessage,
}: {
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (val: string) => void;
  disabled?: boolean;
  onResetDependents?: () => void;
  emptyMessage?: string;
}) => {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || label;

  const realOptions = options.slice(1);

  return (
    <div className="relative w-full">
      {/* Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm flex items-center justify-between ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {selectedLabel}
        <ChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          size={16}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <ul className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-48 overflow-auto text-sm">
          {emptyMessage && realOptions.length === 0 ? (
            <li className="px-3 py-3 text-gray-400 italic">{emptyMessage}</li>
          ) : (
            realOptions.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onSelect(opt.value);
                  setOpen(false);
                  if (onResetDependents) onResetDependents();
                }}
                className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                  opt.value === selectedValue ? "bg-gray-100 font-semibold" : ""
                }`}
              >
                {opt.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

// 🧩 Filter Section Component
const FilterSection = ({
  campusData,
  classData,
  groupData,
  isCampusLoading,
  isClassLoading,
  isGroupLoading,
  onFilter,
  isLoading,
}: any) => {
  const [campusId, setCampusId] = useState("");
  const [classId, setClassId] = useState("");
  const [groupId, setGroupId] = useState("");

  // 🔹 Filter dependent data
  const filteredClasses = classData?.classes?.filter(
    (cls: any) => !campusId || cls.campusId === Number(campusId)
  );

  const filteredGroups = groupData?.groups?.filter(
    (grp: any) => !classId || grp.classId === Number(classId)
  );

  const handleFilterClick = () => {
    if (!campusId && !classId && !groupId) return;
    onFilter({
      campusId: campusId || undefined,
      classId: classId || undefined,
      groupId: groupId || undefined,
      page: 1,
      pageSize: 9,
    });
  };

  // 🔹 Build options
  const getOptions = (data: any, label: string) => [
    { value: "", label },
    ...(data?.map((d: any) => ({ value: String(d.id), label: d.name })) || []),
  ];

  const campusOptions = getOptions(campusData?.campuses, "Select Campus");
  const classOptions = getOptions(filteredClasses, "Select Class");
  const groupOptions = getOptions(filteredGroups, "Select Group");

  return (
    <div className="p-6 border-b border-gray-200 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Campus Dropdown */}
        <Dropdown
          label="Select Campus"
          options={campusOptions}
          selectedValue={campusId}
          onSelect={setCampusId}
          onResetDependents={() => {
            setClassId("");
            setGroupId("");
          }}
          disabled={isCampusLoading}
        />

        {/* Class Dropdown */}
        <Dropdown
          label="Select Class"
          options={classOptions}
          selectedValue={classId}
          onSelect={setClassId}
          onResetDependents={() => setGroupId("")}
          disabled={isClassLoading}
          emptyMessage={campusId ? "No class created for this campus" : undefined}
        />

        {/* Group Dropdown */}
        <Dropdown
          label="Select Group"
          options={groupOptions}
          selectedValue={groupId}
          onSelect={setGroupId}
          disabled={isGroupLoading}
          emptyMessage={classId ? "No group created for this class" : undefined}
        />

        {/* Filter Button */}
        <div>
          <button
            onClick={handleFilterClick}
            disabled={!campusId && !classId && !groupId}
            className={`w-full px-6 py-3 flex items-center justify-center gap-2 rounded transition-all duration-150 ${
              !campusId && !classId && !groupId
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#8000BD] hover:bg-[#590085] text-white"
            }`}
          >
            <Search className="h-4 w-4" />
            FILTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
