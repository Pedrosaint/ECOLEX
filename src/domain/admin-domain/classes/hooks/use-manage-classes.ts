import { useState } from "react";

const tabs = ["Add Class", "View Class", "Add Group", "View Group"] as const;
type Tab = (typeof tabs)[number];

export function useManageClasses() {
  const [activeTab, setActiveTab] = useState<Tab>("Add Class");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setShowDropdown(false);
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return {
    activeTab,
    showDropdown,
    tabs,
    handleTabChange,
    toggleDropdown,
    setActiveTab,
  };
}
