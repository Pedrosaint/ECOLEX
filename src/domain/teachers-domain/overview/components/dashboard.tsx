import { StatsCardSkeleton } from "../../../../general/ui/skeleton-loader.ui";
import { motion } from "framer-motion";
import StatsCard from "../../../../general/common/stat-card";
import { useDashboard } from "../hooks";

export default function Dashboard() {
  const { isLoading, cards } = useDashboard();

  return (
    <div className="space-y-6">
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
    </div>
  );
}
