import { useState, useEffect } from "react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function LogoutModal({ isOpen, onClose, onConfirm, isLoading = false }: LogoutModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
        style={{ boxShadow: "0 25px 50px -12px rgba(106, 0, 161, 0.25)" }}
      >
        {/* Header */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#6a00a1" }}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Confirm Logout
          </h2>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            Are you sure you want to log out? You'll need to sign in again to
            access your account.
          </p>
        </div>

        {/* Actions */}
        <div className="px-8 pb-8 flex gap-3">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          {/* Logout Button */}
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-6 py-3 text-white font-medium rounded-xl transition-all duration-200 
             disabled:opacity-50 disabled:cursor-not-allowed 
             flex items-center justify-center gap-2 
             bg-[#6a00a1] hover:bg-[#5a008a] hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Logging out...
              </>
            ) : (
              "Yes, Logout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
