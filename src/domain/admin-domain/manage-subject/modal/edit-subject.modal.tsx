import { useEditSubjectMutation } from "../api/subject.api";
import { useGetCampusQuery } from "../../campus/api/campus.api";
import { ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Campuse } from "../../campus/response/campuse.response";


const EditSubject = ({
  onClose,
  subjectId,
  initialName,
  initialCampusId,
  initialCode,
}: {
  onClose: () => void;
  subjectId: number;
  initialName: string;
  initialCampusId?: number;
  initialCode?: string;
}) => {
  const [subjectName, setSubjectName] = useState(initialName || "");
  const [campusId, setCampusId] = useState(initialCampusId ? String(initialCampusId) : "");
  const [code, setCode] = useState(initialCode || "");
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { data: campusData, isLoading: campusLoading } = useGetCampusQuery();

  const [editSubject, { isLoading, isSuccess }] = useEditSubjectMutation();

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timeout = setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, onClose]);

  const handleSave = async () => {
    if (!subjectName.trim()) return;

    try {
      await editSubject({
        id: subjectId,
        payload: {
          name: subjectName,
          campusId: campusId ? Number(campusId) : undefined,
          code: code || undefined,
        },
      });
    } catch (err) {
      console.error("Error updating subject:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">EDIT SUBJECT</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`bg-[#8000BD] text-white px-4 cursor-pointer py-2 text-sm rounded-md flex items-center ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <X />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="subjectName"
              className="text-sm font-medium text-gray-900"
            >
              Subject Name
            </label>
            <input
              type="text"
              id="subjectName"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 text-black focus:outline-none"
              placeholder="E.g., Mathematics"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Campus (Optional)
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCampusOpen(!isCampusOpen)}
                disabled={campusLoading}
                className="w-full px-3 py-2 border border-gray-200 text-black text-left flex items-center justify-between focus:outline-none"
              >
                {campusId
                  ? campusData?.campuses?.find(
                    (c: Campuse) => String(c.id) === campusId
                  )?.name
                  : "All Campuses"}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isCampusOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isCampusOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 shadow-lg max-h-60 overflow-auto">
                  <div
                    onClick={() => {
                      setCampusId("");
                      setIsCampusOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${campusId === "" ? "bg-gray-100 font-medium" : ""
                      }`}
                  >
                    All Campuses
                  </div>
                  {campusData?.campuses?.map((campus: Campuse) => (
                    <div
                      key={campus.id}
                      onClick={() => {
                        setCampusId(String(campus.id));
                        setIsCampusOpen(false);
                      }}
                      className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${campusId === String(campus.id)
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
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subjectCode"
              className="text-sm font-medium text-gray-900"
            >
              Subject Code (Optional)
            </label>
            <input
              type="text"
              id="subjectCode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 text-black focus:outline-none"
              placeholder="E.g., MAT"
            />
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-[#67D424] text-white px-4 py-3 text-center text-sm font-medium">
              Subject updated successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditSubject;
