import { X } from "lucide-react";
import { useState } from "react";

const EditSubject = ({ onClose }: { onClose: () => void }) => {
  const [showSuccess] = useState(true);
  const [subjectName, setSubjectName] = useState("");


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">EDIT SUBJECT</h2>
          <div className="flex items-center gap-2">
            <button className="bg-[#8000BD] text-white px-4 py-2 text-sm rounded-md flex items-center">
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
              Save
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="className"
                className="text-sm font-medium text-gray-900"
              >
                Subject Name
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 text-black focus:outline-none"
                  placeholder="E.g., Mathematics"
                  autoFocus
                />
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-[#67D424] text-white px-4 py-3 text-center text-sm font-medium">
              Subjrct was updated successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditSubject;
