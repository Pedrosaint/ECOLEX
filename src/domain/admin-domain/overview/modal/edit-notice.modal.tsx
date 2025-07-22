import { X, ChevronDown, Search, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditNoticeModal({ onClose }: { onClose: () => void }) {
  // Notice data array
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

  return (
    <AnimatePresence>
      {/* Overlay with fade animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 z-50 flex items-center justify-center p-3"
      >
        {/* Modal container with spring animation */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.2,
          }}
          className="relative w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8"
        >
          {/* Header with subtle animation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6"
          >
            <h2 className="text-2xl font-medium text-gray-900 font-inter">
              Notice Board
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors border border-gray-200 shadow-md cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-500" />
            </motion.button>
          </motion.div>

          {/* Search and filter section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col md:flex-row md:items-end gap-4 mb-6"
          >
            {/* Left side: Campus & Search together */}
            <div className="flex flex-col md:flex-row md:items-end gap-4 w-full">
              {/* Campus Select */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex flex-col w-full md:w-[150px]"
              >
                <label className="text-sm font-medium text-gray-700 mb-1 font-inter">
                  Campus
                </label>
                <div className="relative w-full">
                  <motion.select
                    className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none pr-8"
                  >
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                  </motion.select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </motion.div>

              {/* Search Input */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileFocus={{ scale: 1.02 }}
                className="flex items-center w-full md:w-[250px] rounded-md border border-gray-300 bg-white"
              >
                <motion.input
                  type="text"
                  placeholder="Search noticeboard"
                  className="h-10 w-full px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none"
                />
                <Search size={30} className="text-gray-500 pr-2" />
              </motion.div>
            </div>

            {/* Right side: Add New button */}
            <div className="w-full md:w-auto flex justify-end">
              <motion.button
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "#6a1b9a",
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none border-2 border-[#8000BD] bg-[#8000BD] text-white h-9 px-4 py-2 w-full md:w-auto cursor-pointer"
              >
                Add New
              </motion.button>
            </div>
          </motion.div>

          {/* Table with staggered row animations */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            className="overflow-x-auto"
          >
            {/* Table Header */}
            <div className="grid grid-cols-[2fr_1fr_0.5fr] gap-4 py-3 px-4 bg-[#E9EEF1] rounded-t-md font-semibold text-gray-700 text-sm border-b font-inter border-gray-200 min-w-[600px]">
              <div>Event Title</div>
              <div>Event Date</div>
              <div className="">Total Participate</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-200 min-w-[600px]">
              {notices.map((notice) => (
                <motion.div
                  key={notice.id}
                  className="grid grid-cols-[2fr_1fr_0.5fr] items-center gap-4 py-4 px-4"
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      className={`flex-shrink-0 w-10 h-10 rounded-full ${notice.iconBg} flex items-center justify-center`}
                    >
                      <Bell className={`h-5 w-5 ${notice.iconColor}`} />
                    </motion.div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {notice.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {notice.description}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">{notice.date}</div>
                  <div className="text-sm text-gray-700 text-right">
                    {notice.participants}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}