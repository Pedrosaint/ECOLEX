/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetClassesQuery, useAddGroupMutation } from "../api/class-api";

interface GroupForm {
  classId: string;
  groupName: string;
  isClassOpen: boolean;
  isSubmitted: boolean;
  isLoading: boolean;
  isError: boolean;
}

interface DropdownOption {
  value: string;
  label: string;
}

export default function AddGroup() {
  const [groups, setGroups] = useState<GroupForm[]>([
    { classId: "", groupName: "", isClassOpen: false, isSubmitted: false, isLoading: false, isError: false },
  ]);
 const [showSuccess, setShowSuccess] = useState(false);
      
  const { data } = useGetClassesQuery();
  const [addGroup, { error, isError, isSuccess }] = useAddGroupMutation();
    useEffect(() => {
      if (isSuccess) {
        setShowSuccess(true);
        const timer = setTimeout(() => setShowSuccess(false), 3000);
        return () => clearTimeout(timer);
      }
    }, [isSuccess]);

  const classOptions: DropdownOption[] = [
    { value: "", label: "Select Class" },
    ...(data?.classes?.map((c: any) => ({
      value: String(c.id),
      label: c.name,
    })) || []),
  ];

  const getSelectedLabel = (value: string, options: DropdownOption[]): string => {
    if (!options || options.length === 0) return "";
    const found = options.find((option) => option.value === value);
    return found ? found.label : options[0].label;
  };

  // Add new group row
  const handleAddGroupRow = () => {
    setGroups([...groups, { classId: "", groupName: "", isClassOpen: false, isSubmitted: false, isLoading: false, isError: false }]);
  };

  // Remove group row by index
  const handleRemoveGroup = (index: number) => {
    const updated = groups.filter((_, i) => i !== index);
    setGroups(updated);
  };

  // Handle updates for both string and boolean
  const handleChange = <K extends keyof GroupForm>(
    index: number,
    field: K,
    value: GroupForm[K]
  ) => {
    const updated = [...groups];
    updated[index][field] = value;
    setGroups(updated);
  };

  //  Submit group to backend
  const handleSubmitGroup = async (index: number) => {
    const group = groups[index];
    
    // Mark as loading
    handleChange(index, "isLoading", true);
    handleChange(index, "isError", false);
    
    try {
      await addGroup({
        name: group.groupName,
        classId: group.classId,
      }).unwrap();

      // Mark as submitted successfully
      handleChange(index, "isSubmitted", true);
      handleChange(index, "isLoading", false);
      console.log("Group added successfully");
    } catch (error) {
      // Mark as error
      handleChange(index, "isError", true);
      handleChange(index, "isLoading", false);
      console.error("Failed to add group", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full border border-gray-300 rounded-lg p-6 bg-white shadow-md"
    >

      {groups.map((group, index) => {
        const isFormComplete =
          group.groupName.trim() !== "" && group.classId.trim() !== "";

        const isDisabled = group.isSubmitted || group.isLoading;

        return (
          <div key={index}>
            {/* Progress indicator */}
            <div className="mb-4">
              <div className="flex space-x-2">
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${
                    group.classId
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 w-8"
                      : "bg-gray-200 w-4"
                  }`}
                ></div>
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${
                    group.groupName
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 w-8"
                      : "bg-gray-200 w-4"
                  }`}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 items-end mb-4">
              {/* Class Dropdown */}
              <div className="flex flex-col relative">
                <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
                  Select class
                </label>
                <div
                  onClick={() =>
                    !isDisabled &&
                    handleChange(index, "isClassOpen", !group.isClassOpen)
                  }
                  className={`w-full px-4 py-4 border border-gray-300 rounded flex items-center justify-between ${
                    isDisabled
                      ? "bg-gray-100 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {getSelectedLabel(group.classId, classOptions)}
                  {!isDisabled && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        group.isClassOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {group.isClassOpen && !isDisabled && (
                  <div className="absolute z-10 w-full mt-25 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
                    {classOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => {
                          handleChange(index, "classId", option.value);
                          handleChange(index, "isClassOpen", false);
                        }}
                        className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
                          group.classId === option.value
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Group Name Input */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
                  Group Name
                </label>
                <input
                  value={group.groupName}
                  placeholder="E.g A"
                  onChange={(e) =>
                    handleChange(index, "groupName", e.target.value)
                  }
                  disabled={isDisabled}
                  className={`w-full px-3 py-4 border border-gray-300 rounded text-sm focus:outline-none ${
                    isDisabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                  }`}
                />
              </div>

              {/* Add Group Button + Remove */}
              <div className="flex justify-center items-center">
                {group.isSubmitted ? (
                  <>
                    <div className="flex items-center justify-between w-full px-4 py-4 rounded text-lg font-semibold bg-green-100 text-green-700">
                      <div className="flex items-center">
                        <Check size={20} className="mr-2" />
                        Added
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveGroup(index)}
                      className="text-red-500 ml-2"
                    >
                      <X size={20} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleSubmitGroup(index)}
                    disabled={
                      !isFormComplete || group.isLoading || group.isSubmitted
                    }
                    className={`text-white w-full px-4 py-4 rounded text-lg font-semibold transition-colors duration-200 ${
                      isFormComplete && !group.isLoading
                        ? "bg-[#8000BD] cursor-pointer hover:bg-[#6a00a1]"
                        : "bg-[#D9D9D9] cursor-not-allowed"
                    }`}
                  >
                    {group.isLoading ? "Adding..." : "Add Group"}
                  </button>
                )}

                {/* Remove unsubmitted rows */}
                {groups.length > 1 && !group.isSubmitted && (
                  <button
                    type="button"
                    onClick={() => handleRemoveGroup(index)}
                    className="text-red-500 ml-2"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Individual group feedback */}
              {group.isError && (
                <div className="col-span-full bg-red-100 px-4 py-2 rounded text-red-700 text-sm mt-2">
                  Failed to add this group. Please try again.
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Add More Button */}
      <div className="border-2 border-[#8000BD] px-6 py-3 mt-4 w-45 rounded-xl">
        <div className="flex items-center justify-start">
          <button
            type="button"
            onClick={handleAddGroupRow}
            className="bg-transparent text-[#8000BD] font-bold outline-none placeholder-white cursor-pointer"
          >
            Add More Group
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-[#67D424] px-6 py-3 mt-4"
          >
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="bg-transparent text-white font-semibold outline-none placeholder-white"
              >
                Group was added successfully
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Error Message */}
      {isError && (
        <div className="bg-red-500 px-6 py-3 mt-4 rounded">
          <p className="text-white font-semibold text-center">
            {error && "data" in error
              ? (error as any).data.message
              : "Something went wrong"}
          </p>
        </div>
      )}
    </motion.div>
  );
}