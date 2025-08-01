import { useState, useEffect } from "react";
import { Printer, ChevronDown } from "lucide-react";

const Print = ({ onClose }: { onClose: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-30 flex items-center justify-end p-4 z-50">
      <div
        className={`bg-white w-120 h-full max-h-screen overflow-y-auto transform transition-transform duration-500 ease-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ boxShadow: "-2px 0 10px rgba(0,0,0,0.1)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-normal text-gray-900">Print</h2>
          <span className="text-sm text-gray-500 font-semibold">
            1 sheet of paper
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Destination */}
          <div className="flex items-center justify-between gap-3">
            <label className="block text-sm text-gray-600">Destination</label>
            <div className="relative w-70">
              <div className="flex items-center px-3 py-3 border border-gray-200 rounded bg-white">
                <Printer size={20} className=" text-gray-400 mr-3" />
                <span className="flex-1 text-sm text-gray-900">
                  Microsoft Print to PDF
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Pages */}
          <div className="flex items-center justify-between gap-3">
            <label className="block text-sm text-gray-600">Pages</label>
            <div className="relative w-70">
              <div className="flex items-center justify-between w-full px-3 py-3 border border-gray-200 rounded bg-white">
                <span className="text-sm text-gray-900">All</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Layout */}
          <div className="flex items-center justify-between gap-3">
            <label className="block text-sm text-gray-600">Layout</label>
            <div className="relative w-70">
              <div className="flex items-center justify-between w-full px-3 py-3 border border-gray-200 rounded bg-white">
                <span className="text-sm text-gray-900">Portrait</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Color */}
          <div className="flex items-center justify-between gap-3">
            <label className="block text-sm text-gray-600">Color</label>
            <div className="relative w-70">
              <div className="flex items-center justify-between w-full px-3 py-3 border border-gray-200 rounded bg-white">
                <span className="text-sm text-gray-900">Color</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* More settings */}
          <div className="pt-4">
            <div className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-600">More settings</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="p-6 flex items-center justify-end space-x-3 mt-70">
          <button className="px-8 py-2 bg-[#8000BD] text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer">
            Print
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 text-[#8000bd] bg-white border border-[#8000bd] rounded-full text-sm font-medium hover:bg-purple-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Print;
