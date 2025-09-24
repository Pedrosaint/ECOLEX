import { AlertCircle, RefreshCw, Wifi } from "lucide-react";

const NetworkError = () => {
  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 border border-red-200/50 rounded-2xl p-8 mt-6 backdrop-blur-sm">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-200/30 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-200/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-orange-200/25 rounded-full animate-pulse delay-500"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          {/* Icon container with animation */}
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-white/70 backdrop-blur-sm p-4 rounded-full border border-red-200/50 shadow-lg">
              <Wifi
                size={48}
                className="text-red-500 animate-bounce"
                style={{ animationDuration: "2s" }}
              />
            </div>
          </div>

          {/* Error message with glassmorphism */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl py-6 px-3 border border-white/20 shadow-xl max-w-md">
            <div className="flex items-start justify-center space-x-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-500 mt-0.5 animate-pulse" />
              <div className="text-left">
                <h3 className="text-red-800 font-semibold text-lg mb-1">
                  Connection Lost
                </h3>
                <p className="text-red-600 text-sm leading-relaxed">
                  We couldn't load your staff data. Please check your internet
                  connection and try again.
                </p>
              </div>
            </div>

            {/* Action button */}
            <button className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2 mx-auto">
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <RefreshCw className="h-4 w-4 group-hover:animate-spin" />
              <span className="relative">Try Again</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkError;
