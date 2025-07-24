import StatsCard from "../../../../general/common/stat-card";
import CurrentAcademyInfo from "../components/current-academy-info";
import CustomCalendar from "../components/custom-calender";
import NoticeBoard from "../components/notice-board";
import StudentsChart from "../components/students";
import UpcomingExams from "../components/upcoming-exam";
import { motion } from "framer-motion";
import type { svgIcons } from "../../../../assets/icon/svg";
import { StatsCardSkeleton } from "../../../../general/ui/skeleton-loader.ui";
import { useEffect, useState } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  isPrimary?: boolean;
  badge?: string;
  icon?: keyof typeof svgIcons;
}

export default function Overview() {
  const [loading, setLoading] = useState(true);
  const cards: Array<StatsCardProps> = [
    {
      title: "Students",
      value: "5,909",
      icon: "user",
      isPrimary: true,
    },
    { title: "Staff", value: "60", icon: "staff" },
    {
      title: "Campuses",
      value: "100",
      icon: "campus",
      isPrimary: true,
    },
    { title: "Current bill", value: "N60,000", icon: "bill" },
  ];

   useEffect(() => {
     const timer = setTimeout(() => {
       setLoading(false);
     }, 2000);
     return () => clearTimeout(timer);
   }, []);
   
  return (
    <div className="">
      <div className="">
        {/* Stats Cards */}
        {loading ? (
          // Show 4 skeletons
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <StatsCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <StatsCard {...card} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5"
        >
          <div className="w-full">
            <StudentsChart />
          </div>

          <div className="w-full">
            <CurrentAcademyInfo />
          </div>

          <div className="w-full">
            <CustomCalendar />
          </div>
        </motion.div>

        {/* Upcoming Exams */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          <div className="lg:col-span-2">
            <UpcomingExams />
          </div>
          <NoticeBoard />
        </motion.div>
      </div>
    </div>
  );
}
