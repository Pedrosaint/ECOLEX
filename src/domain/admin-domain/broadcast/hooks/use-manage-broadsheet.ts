import { useState } from "react";

export function useManageBroadsheet() {
  const [activeTab, setActiveTab] = useState("View Broadsheet");
  const [showDropdown, setShowDropdown] = useState(false);

  const tabs = [
    "View Broadsheet",
    "Pending Result",
    "Approved Result",
    "Promotion",
    "Repeat Students",
    "Customize CA Naming",
    "Class Teacher Remark Access",
  ];

  const selectTab = (tab: string) => {
    setActiveTab(tab);
    setShowDropdown(false);
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return { activeTab, showDropdown, tabs, selectTab, toggleDropdown };
}
