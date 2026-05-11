import { useState } from "react";

export const RESULT_TABS = [
  // "Setup Grades",
  "Remark Scheme",
  "View Class Result",
  "View students Result",
  "View Teacher Result",
] as const;

export type ResultTab = (typeof RESULT_TABS)[number];

export function useManageResult() {
  const [activeTab, setActiveTab] = useState<ResultTab>("Remark Scheme");
  const [showDropdown, setShowDropdown] = useState(false);

  const selectTab = (tab: ResultTab) => {
    setActiveTab(tab);
    setShowDropdown(false);
  };

  return { activeTab, showDropdown, setShowDropdown, selectTab, tabs: RESULT_TABS };
}
