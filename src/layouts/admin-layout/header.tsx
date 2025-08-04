import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  userRole: string;
  toggleSidebar: () => void;
  showSensitiveData: boolean;
  setShowSensitiveData: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ toggleSidebar, userRole}: HeaderProps) {

  const location = useLocation();

  // Get current module name from URL path
  const getModuleName = () => {
    const path = location.pathname.split("/")[2];
    if (!path || path === "dashboard") return null;
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const moduleName = getModuleName();
  const isOverview = !moduleName

  return (
    <header className="py-3 px-3 flex items-center justify-between flex-wrap gap-y-3 sm:flex-nowrap sm:gap-0 bg-">
      {/* Left Section */}
      <div className="flex items-center justify-between space-x-2 w-full sm:w-auto">
        {/* Hamburger Menu - Visible only on mobile */}
        <button
          className="bg-white shadow-2xl border-2 border-[#f8f5f5] rounded-xl p-2 sm:hidden mr-2"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5 text-gray-600 cursor-pointer" />
        </button>

        <div className="md:hidden flex items-center space-x-3 cursor-pointer">
          {" "}
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <img
              src="https://www.google.com/s2/favicons?domain=google.com"
              alt="google logo"
            />
          </div>
          {/* Admin Name */}
          <div className="flex items-center space-x-1 cursor-pointer">
            {userRole === "student" ? (
              <span className="text-sm text-gray-700 font-sans">
                Student name
              </span>
            ) : (
              <span className="text-sm text-gray-700 font-sans">
                Admin name
              </span>
            )}
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
          {/* Notification Bell */}
          <Bell
            size={30}
            className="text-gray-600 cursor-pointer bg-gray-200 p-2 rounded-full"
          />
        </div>

        {/* Search Bar - Only shown in Overview */}
        {isOverview && (
          <div className="md:flex items-center flex-1 hidden gap-2 bg-[#EBEAEF] rounded-3xl p-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none text-sm"
            />
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 justify-end w-full sm:w-auto">
        {/* Avatar */}
        <div className="">
          <div className="hidden md:flex items-center space-x-3 cursor-pointer ">
            {" "}
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <img
                src="https://www.google.com/s2/favicons?domain=google.com"
                alt="google logo"
              />
            </div>
            {/* Admin Name */}
            <div className="flex items-center space-x-1 cursor-pointer">
              {userRole === "student" ? (
                <span className="text-sm text-gray-700 font-sans">
                  Student name
                </span>
              ) : (
                <span className="text-sm text-gray-700 font-sans">
                  Admin name
                </span>
              )}
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
            {/* Notification Bell */}
            <Bell
              size={30}
              className="text-gray-600 cursor-pointer bg-gray-200 p-2 rounded-full"
            />
          </div>
          {userRole === "student" && (
            <div className="flex justify-end mt-3">
              <h1 className="border border-gray-100 px-3 py-1 bg-white shadow-md">
                ECO345 JSS 2
              </h1>
            </div>
          )}
        </div>

        {/* Mobile Search - Only shown in Overview */}
        {isOverview && (
          <div className="flex items-center flex-1 md:hidden gap-2 bg-[#EBEAEF] rounded-3xl p-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none text-sm"
            />
          </div>
        )}
      </div>
    </header>
  );
}