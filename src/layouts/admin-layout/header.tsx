import { useState } from "react";
import { Search, Menu, Eye, EyeOff } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useGetTeacherProfileQuery } from "../../domain/teachers-domain/overview/api/teacher-overview.api";
import { useGetStudentMetricsQuery } from "../../domain/student-domain/dashboard/api/student-dashboard.api";

interface HeaderProps {
  userRole: string;
  toggleSidebar: () => void;
  showSensitiveData: boolean;
  setShowSensitiveData: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ toggleSidebar, userRole }: HeaderProps) {
  const location = useLocation();
  const [showRegNo, setShowRegNo] = useState(false);

  // Get current module name from URL path
  const getModuleName = () => {
    const path = location.pathname.split("/")[2];
    if (!path || path === "dashboard") return null;
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const moduleName = getModuleName();
  const isOverview = !moduleName && userRole === "admin";

  // Fetch teacher profile from teacher/profile (no ID needed)
  const { data: teacherProfileData } = useGetTeacherProfileQuery(undefined, {
    skip: userRole !== "staff",
  });

  const teacherName = teacherProfileData?.data?.name || "—";
  const teacherDuty = teacherProfileData?.data?.duty || "Staff";
  const teacherRegNo = teacherProfileData?.data?.registrationNumber || "";

  // Fetch student metrics for student role
  const { data: studentMetricsData } = useGetStudentMetricsQuery(undefined, {
    skip: userRole !== "student",
  });

  const studentName = studentMetricsData?.data?.student?.name || "—";
  const studentClass = studentMetricsData?.data?.student?.class || "";
  const studentRegNo = studentMetricsData?.data?.student?.registrationNumber || "";

  const maskRegNo = (regNo: string) => {
    if (!regNo) return "";
    const half = Math.floor(regNo.length / 2);
    return regNo.substring(0, regNo.length - half) + "*".repeat(half);
  };

  return (
    <header className="py-3 px-4 flex items-center justify-between flex-wrap gap-y-3 sm:flex-nowrap sm:gap-0">
      {/* Left Section */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Hamburger Menu - mobile only */}
        <button
          className="bg-white shadow border border-gray-200 rounded-xl p-2 lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5 text-gray-600 cursor-pointer" />
        </button>

        {/* Search Bar - Only shown in Overview */}
        {isOverview && (
          <div className="md:flex items-center hidden gap-2 bg-[#EBEAEF] rounded-3xl px-3 py-2 w-60">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none text-sm"
            />
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 justify-end w-full sm:w-auto">
        {/* Teacher info card */}
        {userRole === "staff" && (
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
            {/* Name + Role */}
            <div className="flex flex-col leading-tight gap-0.5">
              <span className="text-xs text-gray-500">
                Name: <span className="font-semibold text-gray-800">{teacherName}</span>
              </span>
              <span className="text-xs text-gray-500">
                Role: <span className="font-semibold text-[#8000BD]">{teacherDuty}</span>
              </span>
            </div>

            {/* Divider */}
            {teacherRegNo && (
              <>
                <span className="text-gray-300 text-lg">|</span>
                {/* Reg Number with toggle */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-700 font-mono tracking-wide">
                    {showRegNo ? teacherRegNo : maskRegNo(teacherRegNo)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowRegNo(!showRegNo)}
                    className="text-gray-600 hover:text-gray-700 focus:outline-none"
                  >
                    {showRegNo ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Student info card */}
        {userRole === "student" && (
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
            {/* Name + Class */}
            <div className="flex flex-col leading-tight gap-0.5">
              <span className="text-xs text-gray-500">
                Name: <span className="font-semibold text-gray-800">{studentName}</span>
              </span>
              <span className="text-xs text-gray-500">
                Class: <span className="font-semibold text-[#8000BD]">{studentClass}</span>
              </span>
            </div>

            {/* Divider + Reg Number */}
            {studentRegNo && (
              <>
                <span className="text-gray-300 text-lg">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-700 font-mono tracking-wide">
                    {showRegNo ? studentRegNo : maskRegNo(studentRegNo)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowRegNo(!showRegNo)}
                    className="text-gray-600 hover:text-gray-700 focus:outline-none"
                  >
                    {showRegNo ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Mobile Search - Only shown in Overview */}
        {isOverview && (
          <div className="flex items-center flex-1 md:hidden gap-2 bg-[#EBEAEF] rounded-3xl px-3 py-2">
            <Search className="w-4 h-4 text-gray-400" />
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