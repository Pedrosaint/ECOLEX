
import { X } from "lucide-react";
import { useState } from "react";


const EditClass = ({ onClose }: { onClose: () => void }) => {
  const [showSuccess] = useState(true);
  const [category, setCategory] = useState("Junior Secondary");
  const [className, setClassName] = useState("Junior Sec Sch");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">EDIT CLASS</h2>
          <div className="flex items-center gap-2">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm rounded-md flex items-center">
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
            className="text-gray-400 hover:text-gray-600 p-1">
              <X />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Select Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Junior Secondary">Junior Secondary</option>
                <option value="Senior Secondary">Senior Secondary</option>
                <option value="Primary">Primary</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="className"
                className="text-sm font-medium text-gray-700"
              >
                Class Name
              </label>
              <input
                id="className"
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-500 text-white px-4 py-3 rounded-md text-center text-sm font-medium">
              Class was updated successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditClass;
