import { motion } from "framer-motion";
import AllStaffImg from "../../../../assets/image/emptystate_filter.png";
import TeacherImg from "../../../../assets/image/teacher_staff.png";
import SecurityImg from "../../../../assets/image/security_staff.png";
import CleanerImg from "../../../../assets/image/cleaner_staff.png";
import HrImg from "../../../../assets/image/Hr_staff.png";

interface EmptyStaffDataProps {
  onAddStaffClick?: () => void;
  activeTab?: string;
}

const EmptyStaffData = ({ onAddStaffClick, activeTab = "All" }: EmptyStaffDataProps) => {
  const getImage = () => {
    switch (activeTab) {
      case "Teacher": return TeacherImg;
      case "Security": return SecurityImg;
      case "Cleaner": return CleanerImg;
      case "HR": return HrImg;
      case "All":
      default:
        return AllStaffImg;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case "Teacher": return "No Teachers Found";
      case "Security": return "No Security Staff Found";
      case "Cleaner": return "No Cleaners Found";
      case "HR": return "No HR Staff Found";
      case "All":
      default:
        return "No Staff Members Found";
    }
  };

  const currentImage = getImage();
  const title = getTitle();

  return (
    <div className="relative overflow-hidden">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center"
      >
        <motion.div
          className="mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img src={currentImage} alt={title} className="h-[300px]" loading="lazy" />
        </motion.div>

        {/* Text content with glassmorphism */}
        <div className="text-center">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-[#8000BD] to-[#8f5da7] bg-clip-text text-transparent mb-3">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6 max-w-md mx-auto">
            No staff members match your current search criteria. Try adjusting your filters or add your
            first team member to get started.
          </p>
          {onAddStaffClick && (
            <button
              onClick={onAddStaffClick}
              className="px-6 py-2 bg-[#8000BD] text-white rounded-lg font-medium hover:bg-[#6a00a1] transition-colors cursor-pointer"
            >
              Add New Staff
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default EmptyStaffData;
