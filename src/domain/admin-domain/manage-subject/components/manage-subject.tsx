import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import ViewSubject from "./view-subject";
import AddSubject from "./add-subject";
import AssignSubject from "./assign-subject";
import ViewClassSubjects from "./view-class-subjects";

const tabs = ["Add Subject", "View Subject", "Assign to Class", "View Class Subjects"] as const;
type Tab = (typeof tabs)[number];

export default function ManageSubject() {
  const [activeTab, setActiveTab] = useState<Tab>("Add Subject");
  const [showDropdown, setShowDropdown] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Add Subject":        return <AddSubject />;
      case "View Subject":       return <ViewSubject />;
      case "Assign to Class":    return <AssignSubject />;
      case "View Class Subjects": return <ViewClassSubjects />;
      default:                   return null;
    }
  };

  return (
    <div>
      {/* Mobile dropdown */}
      <div className="lg:hidden mb-4 relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-between w-full bg-[#8000BD] text-white px-4 py-2 rounded-md"
        >
          {activeTab}
          <SlArrowDown size={18} />
        </button>

        {showDropdown && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-md shadow z-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setShowDropdown(false); }}
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
      <div className="hidden lg:flex flex-wrap items-center gap-8 border-b border-gray-200 relative mb-6 mt-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-2 text-sm sm:text-base font-medium transition-colors duration-200 cursor-pointer ${
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

      {renderTabContent()}
    </div>
  );
}
