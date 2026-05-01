import { useState } from "react";

const tabs = ["Add Subject", "View Subject", "Assign to Class", "View Class Subjects"] as const;
type Tab = (typeof tabs)[number];

export function useManageSubject() {
  const [activeTab, setActiveTab] = useState<Tab>("Add Subject");
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
