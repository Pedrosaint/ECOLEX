import { motion } from "framer-motion";
import StatsCard from "../../../../general/common/stat-card";
import { StatsCardSkeleton } from "../../../../general/ui/skeleton-loader.ui";
import { useGetAdminOverviewQuery } from "../api/admin-overview.api";
import SessionTermSetup from "../components/current-academy-info";
import StudentsChart from "../components/students";
import UpcomingExams from "../components/upcoming-exam";
import NoticeBoard from "../components/notice-board";
import CustomCalendar from "../components/custom-calender";
import type { svgIcons } from "../../../../assets/icon/svg";

interface StatsCardProps {
  title: string;
  value: string;
  isPrimary?: boolean;
  icon?: keyof typeof svgIcons;
}

export default function Overview() {
  const { data: overviewData, isLoading } = useGetAdminOverviewQuery();
  const stats = overviewData?.data;

  const cards: StatsCardProps[] = [
    {
      title: "Students",
      value: isLoading ? "—" : String(stats?.students.total ?? 0),
      icon: "user",
      isPrimary: true,
    },
    {
      title: "Staff",
      value: isLoading ? "—" : String(stats?.staff.total ?? 0),
      icon: "staff",
    },
    {
      title: "Campuses",
      value: isLoading ? "—" : String(stats?.campuses.total ?? 0),
      icon: "campus",
      isPrimary: true,
    },
    {
      title: "Current Bill",
      value: isLoading ? "—" : stats?.bill ? String(stats.bill) : "0",
      icon: "bill",
    },
  ];

  return (
    <div className="space-y-5">
      {/* ── Row 1: Stat Cards ── */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <StatsCardSkeleton key={i} />)}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <StatsCard {...card} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ── Row 2: Session/Term Setup (2/3) + Students Chart (1/3) ── */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div className="lg:col-span-2">
          <SessionTermSetup />
        </div>
        <div>
          <StudentsChart
            total={stats?.students.total ?? 0}
            boys={stats?.students.boys ?? 0}
            girls={stats?.students.girls ?? 0}
            isLoading={isLoading}
          />
        </div>
      </motion.div>

      {/* ── Row 3: Notice Board + Calendar inline ── */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <NoticeBoard />
        <CustomCalendar />
      </motion.div>

      {/* ── Row 4: Upcoming Exams — full width ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <UpcomingExams
          exams={stats?.upcomingExams ?? []}
          isLoading={isLoading}
        />
      </motion.div>
    </div>
  );
}
