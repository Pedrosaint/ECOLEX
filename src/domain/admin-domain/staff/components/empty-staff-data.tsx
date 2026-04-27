import { Users } from "lucide-react";
import { useState } from "react";


const EmptyStaffData = ({ onAddStaffClick }: { onAddStaffClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/40 rounded-3xl shadow border border-purple-100/50 p-5 xl:p-12 text-center mt-6 backdrop-blur-sm">
      {/* Content */}
      <div className="relative z-10 space-y-8">
        {/* Icon container with advanced animations */}
        <div className="relative mx-auto w-24 h-24">
          {/* Outer glow ring */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 rounded-full blur-xl animate-pulse"></div>

          {/* Icon container */}
          <div
            className="relative bg-gradient-to-br from-white to-purple-50/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-purple-200/50 shadow transition-all duration-500 hover:scale-110 group cursor-pointer w-24 h-24"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onAddStaffClick}
          >
            <Users
              className={`h-12 w-12 text-purple-500 transition-all duration-500 ${isHovered ? "scale-110 text-purple-600" : ""
                }`}
            />

            {/* Rotating ring */}
            <div
              className="absolute inset-0 border-2 border-transparent border-t-purple-300/50 rounded-full animate-spin"
              style={{ animationDuration: "3s" }}
            ></div>
          </div>
        </div>

        {/* Text content with glassmorphism */}
        <div className="">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#8000BD] to-[#8f5da7] bg-clip-text text-transparent mb-3">
            No Staff Members Found
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Your team is waiting to be built! No staff members match your
            current search criteria. Try adjusting your filters or add your
            first team member to get started.
          </p>

          <button
            onClick={onAddStaffClick}
            className="bg-[#8000BD] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#6a00a1] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            Add Staff Member
          </button>
        </div>

        {/* Helper text */}
        <div className="bg-gradient-to-r from-purple-100/50 to-indigo-100/50 backdrop-blur-sm rounded-full px-6 py-2 xl:py-3 border border-purple-200/30 inline-block">
          <p className="text-purple-700 text-sm font-medium">
            Tip: Use the filter above to find specific staff
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmptyStaffData
