import { navLinks, studentNavLinks, staffNavLinks } from "../../utils/sidebar-link";
import Sidebar from "../admin-layout/sidebar";
import Header from "../admin-layout/header";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { getSchoolBranding } from "../../utils/school-branding";
import { useState } from "react";
import LogoutModal from "../../domain/admin-domain/logout/modal/logout.modal";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { classesApi } from "../../domain/admin-domain/classes/api/class-api";
import { staffApi } from "../../domain/admin-domain/staff/api/staff-api";
import { studentApi } from "../../domain/admin-domain/students/api/student.api";
import { campusApi } from "../../domain/admin-domain/campus/api/campus.api";
import { subjectApi } from "../../domain/admin-domain/manage-subject/api/subject.api";
import { caTemplateApi } from "../../domain/admin-domain/ca-template/api/ca-template.api";
import { gradingSchemeApi } from "../../domain/teachers-domain/grading-scheme/api/grading-scheme.api";
import { gradingApi } from "../../domain/admin-domain/result/api/grading.api";
import { teacherOverviewApi } from "../../domain/teachers-domain/overview/api/teacher-overview.api";
import { adminOverviewApi } from "../../domain/admin-domain/overview/api/admin-overview.api";
import { studentResultApi } from "../../domain/student-domain/check-result/api/student-result.api";
import { studentDashboardApi } from "../../domain/student-domain/dashboard/api/student-dashboard.api";
import { authApi } from "../../auth/api/auth-api";


export default function DashboardLayout() {
   const [isLogoutOpen, setIsLogoutOpen] = useState(false);
   const [isLoggingOut, setIsLoggingOut] = useState(false);
   const navigate = useNavigate(); 
   const dispatch = useDispatch();
 

 const handleConfirmLogout = async () => {
   try {
     setIsLoggingOut(true);
     localStorage.clear();
     // Preserve school branding so the login page still shows the school's identity after logout
     const brandName   = sessionStorage.getItem("schoolBrandingName");
     const brandLogo   = sessionStorage.getItem("schoolBrandingLogo");
     const brandColors = sessionStorage.getItem("schoolBrandingColors");
     sessionStorage.clear();
     if (brandName)   sessionStorage.setItem("schoolBrandingName",   brandName);
     if (brandLogo)   sessionStorage.setItem("schoolBrandingLogo",   brandLogo);
     if (brandColors) sessionStorage.setItem("schoolBrandingColors", brandColors);

     // Reset ALL API caches so the next user never sees stale data
     dispatch(authApi.util.resetApiState());
     dispatch(classesApi.util.resetApiState());
     dispatch(staffApi.util.resetApiState());
     dispatch(studentApi.util.resetApiState());
     dispatch(campusApi.util.resetApiState());
     dispatch(subjectApi.util.resetApiState());
     dispatch(caTemplateApi.util.resetApiState());
     dispatch(gradingSchemeApi.util.resetApiState());
     dispatch(gradingApi.util.resetApiState());
     dispatch(teacherOverviewApi.util.resetApiState());
     dispatch(adminOverviewApi.util.resetApiState());
     dispatch(studentResultApi.util.resetApiState());
     dispatch(studentDashboardApi.util.resetApiState());

     toast.success("Logged out successfully!");
     navigate("/");
   } catch (error) {
    toast.error("Failed to logout!");
     console.error("Logout failed:", error);
   } finally {
     setIsLoggingOut(false);
     setIsLogoutOpen(false);
   }
 };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  const { pathname } = useLocation();
  const { schoolName, schoolLogo } = getSchoolBranding();
  const userRole = pathname.startsWith("/admin")
    ? "admin"
    : pathname.startsWith("/student")
    ? "student"
    : "staff";

  const linksToShow =
    userRole === "admin"
      ? navLinks
      : userRole === "student"
      ? studentNavLinks
      : staffNavLinks;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - now with mobile controls */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar
            navLinks={linksToShow}
            onClick={() => setSidebarOpen(false)}
            onLogoutClick={() => setIsLogoutOpen(true)}
            schoolName={schoolName ?? undefined}
            schoolLogo={schoolLogo ?? undefined}
          />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 lg:hidden"
          onClick={() => {
            setSidebarOpen(false);
          }}
        />
      )}

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          userRole={userRole}
          showSensitiveData={showSensitiveData}
          setShowSensitiveData={setShowSensitiveData}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />

          <LogoutModal
            isOpen={isLogoutOpen}
            onClose={() => setIsLogoutOpen(false)}
            onConfirm={handleConfirmLogout}
            isLoading={isLoggingOut}
          />
        </main>
      </div>
    </div>
  );
}
  