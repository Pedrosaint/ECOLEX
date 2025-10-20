/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoRefreshSharp } from "react-icons/io5";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const UpdateSection = ({
  campusData,
  classData,
  groupData,
  onUpdate,
  isUpdating,
}: any) => {
  const [campusId, setCampusId] = useState("");
  const [classId, setClassId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // 🔹 derived filtered lists (based on selected parents)
  const filteredClasses = classData?.classes?.filter(
    (cls: any) => !campusId || cls.campusId === Number(campusId)
  );

  const filteredGroups = groupData?.groups?.filter(
    (grp: any) => !classId || grp.classId === Number(classId)
  );

  // 🔹 data mapping helpers
  const getOptions = (data: any, label: string) => [
    { value: "", label },
    ...(data?.map((d: any) => ({ value: String(d.id), label: d.name })) || []),
  ];

  const campusOptions = getOptions(campusData?.campuses, "Select Campus");
  const classOptions = getOptions(filteredClasses, "Select Class");
  const groupOptions = getOptions(filteredGroups, "Select Group");

  const getLabel = (id: string, options: any[]) =>
    options.find((opt) => opt.value === id)?.label || options[0].label;

  // 🔹 reusable dropdown component
  const Dropdown = ({ label, options, selectedValue, onSelect, name }: any) => (
    <div className="relative">
      <label className="text-sm font-bold text-[#120D1C] mb-2 block">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpenDropdown(openDropdown === name ? null : name)}
        className="w-full px-3 py-3 border border-gray-300 rounded text-sm flex items-center justify-between"
      >
        {getLabel(selectedValue, options)}
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {openDropdown === name && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded mt-1 max-h-40 overflow-y-auto shadow-lg">
          {options.slice(1).map((opt: any) => (
            <li
              key={opt.value}
              className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                opt.value === selectedValue ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                onSelect(opt.value);
                setOpenDropdown(null);

                // 🔹 Reset dependent fields
                if (name === "campus") {
                  setClassId("");
                  setGroupId("");
                } else if (name === "class") {
                  setGroupId("");
                }
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const handleUpdate = () => {
    if (!campusId || !classId || !groupId) return;
    onUpdate({ campusId, classId, groupId });
  };

  return (
    <div className="p-6 bg-[#EDEDED] border border-gray-200 rounded-t-xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <Dropdown
          label="Select Campus"
          options={campusOptions}
          selectedValue={campusId}
          onSelect={setCampusId}
          name="campus"
        />
        <Dropdown
          label="Select Class"
          options={classOptions}
          selectedValue={classId}
          onSelect={setClassId}
          name="class"
        />
        <Dropdown
          label="Select Group"
          options={groupOptions}
          selectedValue={groupId}
          onSelect={setGroupId}
          name="group"
        />

        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className={`w-full text-white px-6 py-3 flex items-center justify-center rounded-lg font-medium ${
            campusId && classId && groupId
              ? "bg-[#8000BD] hover:bg-[#590085]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isUpdating ? (
            <>
              <IoRefreshSharp className="animate-spin mr-2" /> Updating...
            </>
          ) : (
            <>
              <IoRefreshSharp className="mr-2" /> UPDATE
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UpdateSection;
