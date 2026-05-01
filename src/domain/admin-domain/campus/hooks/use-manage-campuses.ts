import { useState } from "react";

const TABS = ["Add Campuses", "View Campuses"] as const;
export type CampusTab = (typeof TABS)[number];

export function useManageCampuses() {
  const [activeTab, setActiveTab] = useState<CampusTab>("Add Campuses");
  const [showDropdown, setShowDropdown] = useState(false);

  const tabs = [...TABS];

  const toggleDropdown = () => setShowDropdown((v) => !v);

  const selectTab = (tab: CampusTab) => {
    setActiveTab(tab);
    setShowDropdown(false);
  };

  return {
    tabs,
    activeTab,
    showDropdown,
    toggleDropdown,
    selectTab,
    setActiveTab,
  };
}
