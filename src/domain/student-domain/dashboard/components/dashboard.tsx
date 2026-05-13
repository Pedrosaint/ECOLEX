import { StatsCardSkeleton } from "../../../../general/ui/skeleton-loader.ui";
import { motion } from "framer-motion";
import StatsCard from "../../../../general/common/stat-card";
import { useStudentDashboard } from "../hooks/use-student-dashboard";
import { CalendarDays, GraduationCap } from "lucide-react";

export default function Dashboard() {
  const { loading, cardsToShow, currentTerm, student } = useStudentDashboard();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="space-y-5">
      {/* Term & Resumption Banner */}
      {!loading && (currentTerm || student) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#4B0082] rounded-xl px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <GraduationCap size={20} />
            </div>
            <div>
              <p className="text-xs text-white/70 font-medium uppercase tracking-wide">Welcome back</p>
              <p className="text-base font-semibold">
                {student?.name ?? "Student"} &mdash; {student?.class ?? ""}
              </p>
            </div>
          </div>

          {currentTerm && (
            <div className="flex items-center gap-3 sm:text-right">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 sm:order-2">
                <CalendarDays size={20} />
              </div>
              <div className="sm:order-1">
                <p className="text-xs text-white/70 font-medium uppercase tracking-wide">
                  {currentTerm.name}
                </p>
                <p className="text-sm font-semibold">
                  Resumes {formatDate(currentTerm.resumptionDate)}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Stat Cards */}
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
