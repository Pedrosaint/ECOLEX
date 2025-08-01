import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import ViewBroadsheet from "./view-broadsheet";
import ViewPendingResult from "./view-pending-result";
import ViewApprovedResult from "./view-approved-result";
import ViewPromotion from "./view-promotion";
import ViewRepeatStudents from "./view-repeat-students";
import CustomizeCANaming from "./customize-ca-naming";
import ViewClassTeacherRemark from "./view-class-teacher-remark";

export default function ManageBroadSheet() {
  const [activeTab, setActiveTab] = useState("View Broadsheet");
  const [showDropdown, setShowDropdown] = useState(false);

  const tabs = [
    "View Broadsheet",
    "Pending Result",
    "Approved Result",
    "Promotion",
    "Repeat Students",
    "Customize CA Naming",
    // "Update CA Setup",
    "Class Teacher Remark Access",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "View Broadsheet":
        return <ViewBroadsheet />;
      case "Pending Result":
        return <ViewPendingResult />;
      case "Approved Result":
        return <ViewApprovedResult />;
      case "Promotion":
        return <ViewPromotion />;
      case "Repeat Students":
        return <ViewRepeatStudents />;
      case "Customize CA Naming":
        return <CustomizeCANaming />;
        case "Class Teacher Remark Access":
        return <ViewClassTeacherRemark />;
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

      <h2 className="text-lg lg:text-3xl font-medium text-gray-900 mb-2 font-inter hidden lg:block">
        Broadsheet
      </h2>
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
