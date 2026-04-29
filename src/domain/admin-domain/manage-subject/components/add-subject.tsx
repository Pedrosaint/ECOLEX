/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAddSubjectMutation } from "../api/subject.api";
import { useGetCampusQuery } from "../../campus/api/campus.api";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

import { NIGERIA_SUBJECTS } from "../data/nigeria-subjects";

export default function AddSubject() {
  const [subject, setSubject] = useState("");
  const [subjectSearch, setSubjectSearch] = useState("");
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [campusId, setCampusId] = useState("");
  const [code, setCode] = useState("");
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const subjectDropdownRef = useRef<HTMLDivElement>(null);

  const { data: campusData, isLoading: campusLoading } = useGetCampusQuery();
  const [createSubject, { isLoading: isCreating, isSuccess }] =
    useAddSubjectMutation();

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subjectDropdownRef.current &&
        !subjectDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSubjectDropdownOpen(false);
        setSubjectSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredSubjects = NIGERIA_SUBJECTS.filter((s) =>
    s.toLowerCase().includes(subjectSearch.toLowerCase())
  );

  const isFormComplete = subject.trim() !== "";

  const handleSubmit = async () => {
    try {
      const payload = {
        name: subject,
        campusId: campusId ? Number(campusId) : undefined,
        code: code || undefined,
      };
      await createSubject(payload).unwrap();
      setSubject("");
      setSubjectSearch("");
      setCampusId("");
      setCode("");
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-end">
        {/* Subject Dropdown */}
        <div className="flex flex-col relative" ref={subjectDropdownRef}>
          <div className="flex items-center gap-1 mb-1">
            <label className="text-sm font-bold text-[#120D1C] font-poppins">
              Subject Name
            </label>
            <span className="text-red-400">*</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSubjectDropdownOpen((v) => {
                if (v) setSubjectSearch("");
                return !v;
              });
              setIsCampusOpen(false);
            }}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm text-left flex items-center justify-between focus:outline-none"
          >
            <span className={subject ? "text-gray-800 truncate max-w-[85%]" : "text-gray-400"}>
              {subject || "Select Subject"}
            </span>
            <ChevronDown
              size={16}
              className={`flex-shrink-0 transition-transform ${isSubjectDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isSubjectDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="absolute z-20 w-full top-full mt-1 bg-white border border-gray-300 rounded shadow-lg"
              >
                {/* Search bar */}
                <div className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    value={subjectSearch}
                    onChange={(e) => setSubjectSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Search subjects..."
                    className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none"
                    autoFocus
                  />
                </div>

                <div className="max-h-60 overflow-auto">
                  {filteredSubjects.length === 0 ? (
                    subjectSearch.trim() ? (
                      <div
                        onClick={() => {
                          setSubject(subjectSearch.trim());
                          setIsSubjectDropdownOpen(false);
                          setSubjectSearch("");
                        }}
                        className="px-3 py-2 cursor-pointer text-sm text-[#8000BD] hover:bg-purple-50"
                      >
                        Use &quot;{subjectSearch.trim()}&quot; as subject name
                      </div>
                    ) : (
                      <p className="px-3 py-2 text-sm text-gray-400">No subjects found</p>
                    )
                  ) : (
                    filteredSubjects.map((subj, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSubject(subj);
                          setIsSubjectDropdownOpen(false);
                          setSubjectSearch("");
                        }}
                        className={`px-3 py-2 cursor-pointer text-sm hover:bg-[#6a00a1] hover:text-white ${
                          subject === subj ? "bg-purple-50 text-[#8000BD] font-medium" : "text-gray-700"
                        }`}
                      >
                        {subj}
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Campus Dropdown */}
        <div className="flex flex-col relative">
          <div className="flex items-center gap-1 mb-1">
            <label className="text-sm font-bold text-[#120D1C] font-poppins">
              Campus (Optional)
            </label>
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
            <div className="absolute z-10 w-full top-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
              <div
                onClick={() => {
                  setCampusId("");
                  setIsCampusOpen(false);
                }}
                className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
                  campusId === "" ? "bg-gray-100 font-medium" : ""
                }`}
              >
                All Campuses
              </div>
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

        {/* Code Input */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1 mb-1">
            <label className="text-sm font-bold text-[#120D1C] font-poppins">
              Subject Code (Optional)
            </label>
          </div>
          <input
            value={code}
            placeholder="e.g. ENG"
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          />
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
                className="bg-transparent text-white font-semibold outline-none"
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
