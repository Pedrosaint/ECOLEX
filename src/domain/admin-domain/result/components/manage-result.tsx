import { useState } from "react";
import SetupGradesTab from "../components/setup-grade";
import ViewClassResultTab from "../components/view-class-result";
import ViewStudentResultTab from "./view-student-result";
import ViewTeacherResultTab from "./view-teachers-result";
import { SlArrowDown } from "react-icons/sl";


export default function ManageResult() {
  const [activeTab, setActiveTab] = useState("Setup Grades");
  const [showDropdown, setShowDropdown] = useState(false);

  const tabs = [
    "Setup Grades",
    "View Class Result",
    "View students Result",
    "View Teacher Result",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Setup Grades":
        return <SetupGradesTab />;
      case "View Class Result":
        return <ViewClassResultTab />;
      case "View students Result":
        return <ViewStudentResultTab />;
      case "View Teacher Result":
        return <ViewTeacherResultTab />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="">

         {/* Mobile dropdown filter */}
              <div className="md:hidden mb-4 relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-between w-full bg-[#8000BD] text-white px-4 py-2 rounded-md"
                >
                  {activeTab}
                 <SlArrowDown  size={18} />
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
        

        {/* Tab Navigation */}
        <div className="md:flex items-center justify-between border-b border-gray-200 relative mb-6 hidden">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                relative pb-3 text-sm font-medium transition-colors duration-200
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

        {/* Render active tab content */}
        {renderTabContent()}
      </div>
    </div>
  );
}