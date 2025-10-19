import { navLinks, studentNavLinks, staffNavLinks } from "../../utils/sidebar-link";
import Sidebar from "../admin-layout/sidebar";
import Header from "../admin-layout/header";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "../../domain/admin-domain/logout/modal/logout.modal";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { classesApi } from "../../domain/admin-domain/classes/api/class-api";


export default function DashboardLayout() {
   const [isLogoutOpen, setIsLogoutOpen] = useState(false);
   const [isLoggingOut, setIsLoggingOut] = useState(false);
   const navigate = useNavigate(); 
   const dispatch = useDispatch();
 

 const handleConfirmLogout = async () => {
   try {
     setIsLoggingOut(true);
     localStorage.clear();
     sessionStorage.clear();
     dispatch(classesApi.util.resetApiState());
     toast.success("Logged out successfully!");

     // optional: if you want to call backend logout API
     // await api.post("/logout");

     // redirect to login page
     navigate("/auth/auth-layout/admin-login");
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

// Temporary dummy role
  const userRole = "admin"; // change to "student" to test student sidebar

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
        <Sidebar navLinks={linksToShow} onClick={() => setSidebarOpen(false)} onLogoutClick={() => setIsLogoutOpen(true)} />
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
  