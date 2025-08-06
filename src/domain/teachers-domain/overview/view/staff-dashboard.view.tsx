import { motion } from "framer-motion";
import Dashboard from "../components/dashboard"
import LatestNewFeed from "../components/latest-new-feed";
import StaffInfo from "../components/staff-info";

const StaffDashboardView = () => {
  return (
    <div>
      <Dashboard />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#FFFFFF] mt-9 flex flex-col xl:flex-row gap-5 justify-between border border-[#f3eaea] p-5 "
      >
        <StaffInfo />
        <LatestNewFeed />
      </motion.div>
    </div>
  );
}

export default StaffDashboardView
