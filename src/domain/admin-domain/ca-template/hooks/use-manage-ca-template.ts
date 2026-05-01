import { useState } from "react";

const TABS = ["Default Template", "Per Class Template"] as const;
export type Tab = (typeof TABS)[number];

export function useManageCATemplate() {
  const [activeTab, setActiveTab] = useState<Tab>("Default Template");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((v) => !v);

  const selectTab = (tab: Tab) => {
    setActiveTab(tab);
    setShowDropdown(false);
  };

  return {
    TABS,
    activeTab,
    showDropdown,
    toggleDropdown,
    selectTab,
    setActiveTab,
  };
}
