import { useState } from "react";
import { Search, Bell, Menu, Eye, EyeOff } from "lucide-react";
import { useLocation } from "react-router-dom";
import Profile from "../../assets/image/profile.png";
import { useGetStaffQuery } from "../../domain/admin-domain/staff/api/staff-api";

interface HeaderProps {
  userRole: string;
  toggleSidebar: () => void;
  showSensitiveData: boolean;
  setShowSensitiveData: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ toggleSidebar, userRole}: HeaderProps) {

  const location = useLocation();
  const [showRegNo, setShowRegNo] = useState(false);

  // Get current module name from URL path
  const getModuleName = () => {
    const path = location.pathname.split("/")[2];
    if (!path || path === "dashboard") return null;
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const moduleName = getModuleName();
  const isOverview = !moduleName && userRole === "admin"

  // Fetch teacher details
  const teacherIdStr = localStorage.getItem("teacherId");
  const teacherId = teacherIdStr ? parseInt(teacherIdStr, 10) : 0;
  const { data: staffData } = useGetStaffQuery({ id: teacherId }, { skip: userRole !== "staff" || !teacherId });

  const teacherName = staffData?.staff?.name || "Teacher's name";
  const teacherRegNo = staffData?.staff?.registrationNumber || "";

  const maskRegNo = (regNo: string) => {
    if (!regNo) return "";
    const half = Math.floor(regNo.length / 2);
    return regNo.substring(0, regNo.length - half) + "*".repeat(half);
  };

  return (
    <header className="py-3 px-3 flex items-center justify-between flex-wrap gap-y-3 sm:flex-nowrap sm:gap-0 bg-">
      {/* Left Section */}
      <div className="flex items-center justify-between  w-full md:w-auto">
        {/* Hamburger Menu - Visible only on mobile */}
        <button
          className="bg-white shadow-2xl border-2 border-[#f8f5f5] rounded-xl p-2 lg:hidden mr-2"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5 text-gray-600 cursor-pointer" />
        </button>
        <div className="flex flex-col">
          <div className="md:hidden flex items-center space-x-3 cursor-pointer">
            {" "}
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <img src={Profile} alt="" />
            </div>
            {/* Admin Name */}
            <div className="flex items-center space-x-1 cursor-pointer">
              {userRole === "student" ? (
                <span className="text-sm text-gray-700 font-sans">
                  Student name
                </span>
              ) : userRole === "admin" ? (
                <span className="text-sm text-gray-700 font-sans">
                  Admin name
                </span>
              ) : (
                <span className="text-sm text-gray-700 font-sans truncate max-w-[150px]">
                  {teacherName}
                </span>
              )}
              {/* <ChevronDown className="w-4 h-4 text-gray-600" /> */}
            </div>
            {/* Notification Bell */}
            <Bell
              size={30}
              className="text-gray-600 cursor-pointer bg-gray-200 p-2 rounded-full"
            />
          </div>
          <div className="md:hidden">
            {userRole === "student" && (
              <div className="flex justify-end mt-3">
                <h1 className="border border-gray-100 px-3 py-1 bg-white">
                  ECO345 JSS 2
                </h1>
              </div>
            )}
          </div>
          <div className="md:hidden">
            {userRole === "staff" && (
              <div className="flex justify-end mt-3">
                <h1 className="border border-gray-100 px-3 py-1 bg-white flex items-center gap-2">
                  <span>Role: Teacher</span>
                  {teacherRegNo && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-600 text-sm">
                        {showRegNo ? teacherRegNo : maskRegNo(teacherRegNo)}
                      </span>
                      <button type="button" onClick={() => setShowRegNo(!showRegNo)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        {showRegNo ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </>
                  )}
                </h1>
              </div>
            )}
          </div>
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
              <img src={Profile} alt="" />
            </div>
            {/* Admin Name */}
            <div className="flex items-center space-x-1 cursor-pointer">
              {userRole === "student" ? (
                <span className="text-sm text-gray-700 font-sans">
                  Student name
                </span>
              ) : userRole === "admin" ? (
                <span className="text-sm text-gray-700 font-sans">
                  Admin name
                </span>
              ) : (
                <span className="text-sm text-gray-700 font-sans">
                  {teacherName}
                </span>
              )}
              {/* <ChevronDown className="w-4 h-4 text-gray-600" /> */}
            </div>
            {/* Notification Bell */}
            <Bell
              size={30}
              className="text-gray-600 cursor-pointer bg-gray-200 p-2 rounded-full"
            />
          </div>
          <div className="hidden md:block">
            {userRole === "student" && (
              <div className="flex justify-end mt-3">
                <h1 className="border border-gray-100 px-3 py-1 bg-white">
                  ECO345 JSS 2
                </h1>
              </div>
            )}
          </div>
          <div className="hidden md:block">
            {userRole === "staff" && (
              <div className="flex justify-end mt-3">
                <h1 className="border border-gray-100 px-3 py-1 bg-white flex items-center gap-2">
                  <span>Role: Teacher</span>
                  {teacherRegNo && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-600 text-sm">
                        {showRegNo ? teacherRegNo : maskRegNo(teacherRegNo)}
                      </span>
                      <button type="button" onClick={() => setShowRegNo(!showRegNo)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        {showRegNo ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </>
                  )}
                </h1>
              </div>
            )}
          </div>
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