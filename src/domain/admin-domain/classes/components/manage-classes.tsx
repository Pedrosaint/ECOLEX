import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import AddClass from "./add-class";
import AddGroup from "./add-group";
import ViewClass from "./view-class";
import ViewGroup from "./view-group";


export default function ManageClasses() {
  const [activeTab, setActiveTab] = useState("Add Class");
  const [showDropdown, setShowDropdown] = useState(false);

  const tabs = [
    "Add Class",
    "View Class",
    "Add Group",
    "View Group",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Add Class":
        return <AddClass />;
        case "View Class":
        return <ViewClass />;
         case "Add Group":
        return <AddGroup />;
      case "View Group":
        return <ViewGroup />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Mobile dropdown filter */}
      <div className="lg:hidden mb-4 relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-between w-full bg-[#8000BD] text-white px-4 py-2 rounded-md"
        >
          {activeTab}
          <SlArrowDown size={18} />
        </button>

        {showDropdown && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white border  border-gray-100 rounded-md shadow z-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setShowDropdown(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  activeTab === tab
                    ? "bg-[#F3E8FF] text-[#8000BD] font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop tabs */}
      <div className="hidden lg:flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 relative mb-6 mt-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              relative pb-2 text-sm sm:text-base font-medium transition-colors duration-200
              ${
                activeTab === tab
                  ? "text-gray-900 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8000BD] rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {renderTabContent()}
    </div>
  );
}
