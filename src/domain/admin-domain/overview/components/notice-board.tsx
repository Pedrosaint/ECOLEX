import { Bell, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AddNewNoticeModal from "../modal/add-new-notice.modal";

import { ClipLoader } from "react-spinners";
import ViewNoticeModal from "../modal/View-notice.modal";

export default function NoticeBoard() {
   const [isnoticesModal, setIsNoticesModal] = useState(false);
   const [isEditModal, setIsViewModal] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     const timer = setTimeout(() => {
       setIsLoading(false);
     }, 2000);
     return () => clearTimeout(timer);
   }, []);
  const notices = [
    {
      id: 1,
      title: "Sports Day Announcement",
      message:
        "The school's Annual Sports Day will be held on May 15, 2024. Mark your calendars!",
      icon: Bell,
      iconColor: "bg-[#FFED9F]",
      iconTextColor: "text-[#FCA52B]",
    },
    {
      id: 2,
      title: "Summer Break Start Date",
      message: "Summer break begins on May 25, 2024. Have a wonderful holiday!",
      icon: Bell,
      iconColor: "bg-[#D6DAFF]",
      iconTextColor: "text-[#696FC1]",
    },
    {
      id: 3,
      title: "Sports Day Announcement",
      message:
        "The school's Annual Sports Day will be held on May 15, 2024. Mark your calendars!",
      icon: Bell,
      iconColor: "bg-[#FFED9F]",
      iconTextColor: "text-[#FCA52B]",
    },
    {
      id: 4,
      title: "Summer Break Start Date",
      message: "Summer break begins on May 25, 2024. Have a wonderful holiday!",
      icon: Bell,
      iconColor: "bg-[#D6DAFF]",
      iconTextColor: "text-[#696FC1]",
    },
    {
      id: 5,
      title: "Sports Day Announcement",
      message:
        "The school's Annual Sports Day will be held on May 15, 2024. Mark your calendars!",
      icon: Bell,
      iconColor: "bg-[#FFED9F]",
      iconTextColor: "text-[#FCA52B]",
    },
    {
      id: 6,
      title: "Summer Break Start Date",
      message: "Summer break begins on May 25, 2024. Have a wonderful holiday!",
      icon: Bell,
      iconColor: "bg-[#D6DAFF]",
      iconTextColor: "text-[#696FC1]",
    },
];

  return (
    <div className="">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 py-1 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2 mt-2">
          <h2 className="text-lg font-semibold text-gray-900 font-sans">
            Notice Board
          </h2>
          <button
            onClick={() => setIsViewModal(true)}
            className="text-sm text-gray-400 font-sans transition-colors underline cursor-pointer hover:text-[#4B0082]"
          >
            view all
          </button>
        </div>

        {/* Notices */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[230px] mb-8">
            <ClipLoader color="#8B5CF6" loading={isLoading} size={50} />
            <div className="mt-4 text-gray-500">Loading chart data...</div>
          </div>
        ) : (
          <div className="space-y-3 mb-4 font-sans max-h-64 overflow-y-auto pr-2">
            {notices.map((notice) => {
              const IconComponent = notice.icon;
              return (
                <div
                  key={notice.id}
                  className={`rounded-lg p-3 flex items-center space-x-3 border border-gray-300 hover:bg-gray-50 transition-colors`}
                >
                  {/* Icon */}
                  <div
                    className={`${notice.iconColor} rounded-lg w-11 h-13 flex items-center justify-center`}
                  >
                    <IconComponent
                      className={`w-7 h-7 ${notice.iconTextColor}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {notice.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {notice.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center space-x-2 text-gray-500 font-sans ml-1 py-2">
          <button
            onClick={() => setIsNoticesModal(true)}
            className="text-sm px-2 py-1 bg-gray-100 rounded-md cursor-pointer border border-gray-300 shadow-md"
          >
            Add New
          </button>
          <button className="p-1 bg-gray-100 rounded transition-colors cursor-pointer hover:text-red-600">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isnoticesModal && (
        <AddNewNoticeModal onClose={() => setIsNoticesModal(false)} />
      )}

      {isEditModal && <ViewNoticeModal 
      onClose={() => setIsViewModal(false)} 
      openAddModal={() => setIsNoticesModal(true)}  
      />}
    </div>
  );
}
