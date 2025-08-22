import { X } from "lucide-react";
import { useState } from "react";

const EditClass = ({ onClose }: { onClose: () => void }) => {
  const [showSuccess] = useState(true);
  const [category, setCategory] = useState("Junior Secondary");
  const [className, setClassName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ["Junior Secondary", "Senior Secondary", "Primary"];

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">EDIT CLASS</h2>
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
              <label className="text-sm font-medium text-gray-900">
                Select Category
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-3 py-2 border border-gray-300 text-left flex justify-between items-center focus:outline-none"
                >
                  {category}
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-200">
                    {categories.map((cat, index) => (
                      <div
                        key={index}
                        onClick={() => handleCategorySelect(cat)}
                        className={`px-4 py-2 cursor-pointer ${
                          category === cat ? "bg-[#8000BD] text-white" : ""
                        }`}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="className"
                className="text-sm font-medium text-gray-900"
              >
                Class Name
              </label>
              <div className="flex">
                <div className="bg-[#222222] text-white w-full flex items-center justify-center px-4 py-2 truncate">
                  {category}
                </div>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
                  placeholder="E.g., 1"
                />
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-[#67D424] text-white px-4 py-3 text-center text-sm font-medium">
              Class was updated successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditClass;
