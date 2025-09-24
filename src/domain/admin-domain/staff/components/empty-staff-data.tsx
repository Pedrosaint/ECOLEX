import { Sparkles, UserPlus, Users } from "lucide-react";
import { useState } from "react";

interface EmptyStaffDataProps {
  onAddStaffClick: () => void;
}

const EmptyStaffData = ({ onAddStaffClick }: EmptyStaffDataProps) => {
    const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/40 rounded-3xl shadow-xl border border-purple-100/50 p-5 xl:p-12 text-center mt-6 backdrop-blur-sm">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-purple-300/60 rounded-full animate-bounce delay-500"></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-indigo-300/60 rounded-full animate-bounce delay-700"></div>

          {/* Floating sparkles */}
          <Sparkles className="absolute top-16 left-16 h-5 w-5 text-purple-300/50 animate-pulse delay-300" />
          <Sparkles className="absolute bottom-20 right-20 h-4 w-4 text-indigo-300/50 animate-pulse delay-1500" />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-8">
          {/* Icon container with advanced animations */}
          <div className="relative mx-auto w-24 h-24">
            {/* Outer glow ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 rounded-full blur-xl animate-pulse"></div>

            {/* Icon container */}
            <div
              className="relative bg-gradient-to-br from-white to-purple-50/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-purple-200/50 shadow-2xl transition-all duration-500 hover:scale-110 group cursor-pointer w-24 h-24"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Users
                className={`h-12 w-12 text-purple-500 transition-all duration-500 ${
                  isHovered ? "scale-110 text-purple-600" : ""
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
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl xl:max-w-lg xl:mx-auto">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-800 to-indigo-800 bg-clip-text text-transparent mb-3">
              No Staff Members Found
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Your team is waiting to be built! No staff members match your
              current search criteria. Try adjusting your filters or add your
              first team member to get started.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* Primary CTA */}
              <button
                onClick={onAddStaffClick}
                className="group relative overflow-hidden bg-gradient-to-r from-[#8000BD] to-[#8f5da7] hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <div className="relative bg-white/20 rounded-full p-1">
                  <UserPlus className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <span className="relative whitespace-nowrapa">Add First Staff Member</span>
              </button>
            </div>
          </div>

          {/* Helper text */}
          <div className="bg-gradient-to-r from-purple-100/50 to-indigo-100/50 backdrop-blur-sm rounded-full px-6 py-2 xl:py-3 border border-purple-200/30 inline-block">
            <p className="text-purple-700 text-sm font-medium">
              💡 Tip: Use the filter above to find specific staff
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyStaffData
