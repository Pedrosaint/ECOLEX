import { useState } from "react";

export function useViewNotice(onClose: () => void, openAddModal: () => void) {
  const [isAddNoticeModal, setIsAddNoticeModal] = useState(false);

  const notices = [
    {
      id: 1,
      title: "Sports Day Announcement",
      description:
        "The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars!",
      date: "May 12, 2024.",
      participants: "200",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: 2,
      title: "Summer Break Start Date",
      description:
        "Summer break begins on May 25, 2024. Have a wonderful holiday!",
      date: "May 25, 2024.",
      participants: "100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const handleAddNotice = () => {
    onClose();
    openAddModal();
  };

  return {
    isAddNoticeModal,
    setIsAddNoticeModal,
    notices,
    handleAddNotice,
  };
}
