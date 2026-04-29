import { StatsCardSkeleton } from "../../../../general/ui/skeleton-loader.ui";
import { motion } from "framer-motion";
import StatsCard from "../../../../general/common/stat-card";
import { useGetTeacherOverviewQuery } from "../api/teacher-overview.api";

export default function Dashboard() {
  const { data, isLoading, isError } = useGetTeacherOverviewQuery();

  const cards = [
    {
      title: "Total Students",
      value: isError ? "—" : String(data?.data.totalStudents ?? 0),
      isPrimary: true,
      flipLayout: true,
    },
    {
      title: "Classes Assigned to You",
      value: isError ? "—" : String(data?.data.totalClasses ?? 0),
      flipLayout: true,
    },
    {
      title: "Subjects Assigned to You",
      value: isError ? "—" : String(data?.data.totalSubjects ?? 0),
      isPrimary: true,
      flipLayout: true,
    },
    {
      title: "Assignments in Progress",
      value: isError ? "—" : String(data?.data.assignmentsInProgress ?? 0),
      flipLayout: true,
    },
  ];

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <StatsCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StatsCard {...card} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
