/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAddSubjectMutation } from "../api/subject.api";
import { useGetCampusQuery } from "../../campus/api/campus.api";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

export default function AddSubject() {
  const [subject, setSubject] = useState("");
  const [campusId, setCampusId] = useState("");
  const [isCampusOpen, setIsCampusOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

  const { data: campusData, isLoading: campusLoading } = useGetCampusQuery();
  const [createSubject, { isLoading: isCreating, isSuccess }] = useAddSubjectMutation();

    useEffect(() => {
      if (isSuccess) {
        setShowSuccess(true);
        const timer = setTimeout(() => setShowSuccess(false), 3000);
        return () => clearTimeout(timer);
      }
    }, [isSuccess]);

  const isFormComplete = subject.trim() !== "" && campusId !== "";

  const handleSubmit = async () => {
    try {
      const payload = {
        name: subject,
        campusId: Number(campusId),
      };

      await createSubject(payload).unwrap();
      
      setSubject("");
      setCampusId("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add subject");
      console.error("Add subject error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full border border-gray-300 rounded-lg p-6 bg-white shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
        {/* Subject Name Input */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1 mb-1">
            <label className="text-sm font-bold text-[#120D1C] font-poppins">
              Subject Name
            </label>
            <span className="text-red-400">*</span>
          </div>
          <input
            value={subject}
            placeholder="E.g. English Language"
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          />
        </div>

        {/* Campus Dropdown */}
        <div className="flex flex-col relative">
          <div className="flex items-center gap-1 mb-1">
            <label className="text-sm font-bold text-[#120D1C] font-poppins">
              Campus
            </label>
            <span className="text-red-400">*</span>
          </div>
          <button
            type="button"
            onClick={() => setIsCampusOpen(!isCampusOpen)}
            disabled={campusLoading}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm text-left flex items-center justify-between"
          >
            {campusId
              ? campusData?.campuses?.find(
                  (c: any) => String(c.id) === campusId
                )?.name
              : "Select Campus"}
            <ChevronDown
              size={16}
              className={`transition-transform ${
                isCampusOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isCampusOpen && (
            <div className="absolute z-10 w-full mt-22 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
              {campusData?.campuses?.map((campus: any) => (
                <div
                  key={campus.id}
                  onClick={() => {
                    setCampusId(String(campus.id));
                    setIsCampusOpen(false);
                  }}
                  className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
                    campusId === String(campus.id)
                      ? "bg-gray-100 font-medium"
                      : ""
                  }`}
                >
                  {campus.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center">
          <button
            disabled={!isFormComplete || isCreating}
            onClick={handleSubmit}
            className={`text-white w-full px-4 py-3 rounded text-lg uppercase font-semibold transition-colors duration-200 ${
              !isFormComplete || isCreating
                ? "bg-[#D9D9D9] cursor-not-allowed"
                : "bg-[#8000BD] hover:bg-[#640094] cursor-pointer"
            }`}
          >
            {isCreating ? "Adding..." : "Add Subject"}
          </button>
        </div>
      </div>
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
                Subject added successfully
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
