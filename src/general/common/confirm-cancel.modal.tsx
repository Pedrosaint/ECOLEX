import { useState } from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmed: () => void;
  warningTitle?: string;
  warningMessage?: string;
  successTitle?: string;
  successMessage?: string;
}

export default function ConfirmCancelModal({
  isOpen,
  onClose,
  onConfirmed,
  warningTitle = "Hold Up",
  warningMessage = "Are you sure you want to cancel? This will erase the progress you have made",
  successTitle = "Congratulations",
  successMessage = "You have successfully cancelled the process",
}: ConfirmCancelModalProps) {
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleYesCancel = () => {
    setConfirmed(true);
    onConfirmed();
  };

  const handleOkay = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {!confirmed ? (
        /* Warning step */
        <div className="w-full max-w-sm bg-[#FFF8EF] border-2 border-[#F5A623] rounded-2xl p-8 flex flex-col items-center text-center shadow-xl">
          <div className="mb-4">
            <AlertTriangle className="w-12 h-12 text-[#F5A623]" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{warningTitle}</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-8">{warningMessage}</p>
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 bg-[#1B3B2A] text-white py-3 rounded-full font-medium text-sm hover:bg-[#152e20] transition-colors cursor-pointer"
            >
              No, Continue
            </button>
            <button
              onClick={handleYesCancel}
              className="flex-1 border-2 border-[#F5A623] text-[#F5A623] py-3 rounded-full font-medium text-sm hover:bg-[#FFF0D6] transition-colors cursor-pointer"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      ) : (
        /* Success step */
        <div className="w-full max-w-sm bg-[#EEF9F4] border-2 border-[#1B3B2A] rounded-2xl p-8 flex flex-col items-center text-center shadow-xl">
          <div className="mb-4">
            <div className="w-12 h-12 rounded-lg border-2 border-gray-800 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7 text-gray-800"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{successTitle}</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-8">{successMessage}</p>
          <button
            onClick={handleOkay}
            className="w-full bg-[#1B3B2A] text-white py-3 rounded-full font-medium text-sm hover:bg-[#152e20] transition-colors cursor-pointer"
          >
            Okay
          </button>
        </div>
      )}
    </div>
  );
}
