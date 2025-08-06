import { navLinks, studentNavLinks, staffNavLinks } from "../../utils/sidebar-link";
import Sidebar from "../admin-layout/sidebar";
import Header from "../admin-layout/header";
import { Outlet } from "react-router-dom";
import { useState } from "react";


export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSensitiveData, setShowSensitiveData] = useState(false);

// Temporary dummy role
  const userRole = "staff"; // change to "student" to test student sidebar

  const linksToShow =
    userRole === "staff"
      ? staffNavLinks
      : userRole === "student"
      ? studentNavLinks
      : navLinks;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - now with mobile controls */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar navLinks={linksToShow} onClick={() => setSidebarOpen(false)} />
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
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
  