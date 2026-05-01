import { SlArrowDown } from "react-icons/sl";
import DefaultTemplate from "./default-template";
import ClassTemplate from "./class-template";
import { useManageCATemplate } from "../hooks";

export default function ManageCATemplate() {
  const { TABS, activeTab, showDropdown, toggleDropdown, selectTab, setActiveTab } = useManageCATemplate();

  return (
    <div>
      {/* Mobile dropdown */}
      <div className="lg:hidden mb-4 relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between w-full bg-[#8000BD] text-white px-4 py-2 rounded-md"
        >
          {activeTab}
          <SlArrowDown size={18} />
        </button>
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => selectTab(tab)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-purple-50 cursor-pointer ${
                  activeTab === tab ? "text-[#8000BD] font-semibold" : "text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop tabs */}
      <div className="hidden lg:flex items-center gap-5 border-b border-gray-200 mb-6 mt-5">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
              activeTab === tab
                ? "text-gray-900 font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8000BD] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {activeTab === "Default Template" ? <DefaultTemplate /> : <ClassTemplate />}
    </div>
  );
}
