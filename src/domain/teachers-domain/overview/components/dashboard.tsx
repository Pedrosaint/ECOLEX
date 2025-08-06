import { useEffect, useState } from "react";
import { StatsCardSkeleton } from "../../../../general/ui/skeleton-loader.ui";
import { motion } from "framer-motion";
import StatsCard from "../../../../general/common/stat-card";

interface StatsCardProps {
  title: string;
  value: string;
  isPrimary?: boolean;
  flipLayout?: boolean;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userRole] = useState("student"); // This would come from auth context
  
  // Card configurations
  const adminCards: Array<StatsCardProps> = [
    { title: "Total Students", value: "1,200", isPrimary: true },
    { title: "Staff", value: "60" },
    { title: "Campuses", value: "100", isPrimary: true },
    { title: "Revenue", value: "N5,000,000" },
  ];


  const studentCards: Array<StatsCardProps> = [
    {
      title: "Students Assigned to you",
      value: "N6,000",
      isPrimary: true,
      flipLayout: true,
    },
    { title: "Classes assigned to you", value: "1", flipLayout: true },
    {
      title: "Subjects Assigned to you",
      value: "12",
      isPrimary: true,
      flipLayout: true,
    },
    {
      title: "Assignments in progress",
      value: "0",
      flipLayout: true,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const cardsToShow = userRole === "admin" ? adminCards : studentCards;

  return (
    <div className="">
      <div className="">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <StatsCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {cardsToShow.map((card, index) => (
              <motion.div
                key={`${card.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <StatsCard {...card} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}