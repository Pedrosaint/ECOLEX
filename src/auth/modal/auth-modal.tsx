import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Mark from "../../assets/image/mark.png";


interface AuthModalProps {
  token: string;
  onClose: () => void;
}

const AuthModal = ({ token, onClose }: AuthModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm bg-opacity-30 flex items-center justify-center">
      <div className="bg-[#F5F1FF] rounded-xl p-8 w-[90%] max-w-lg text-center shadow-lg relative">
        {/* Close Icon (Optional) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer " 
        >
          <IoMdClose size={20} />
        </button>

        {/* Checkmark Badge */}
        <div className="flex justify-center mb-6">
          <img src={Mark} alt="success badge" className="" loading="lazy" />
        </div>

        <h2 className="text-xl font-bold text-[#141414]">
          Token successfully created
        </h2>
        <p className="text-[12px] text-gray-600 mb-6">
          A generated token is shown below
        </p>

        {/* Token Box */}
        <div className="bg-white border border-gray-300 rounded-md px-4 py-3 mb-6 flex items-center justify-between gap-3">
          <span className="font-medium text-sm text-gray-800 break-all text-left">
            {token}
          </span>
          <button
            onClick={handleCopy}
            className="text-[#8000BD] font-medium text-sm cursor-pointer whitespace-nowrap flex-shrink-0"
          >
            {copied ? "Copied!" : "Copy token"}
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="bg-[#8000BD] text-white font-semibold py-3 px-20 rounded-md hover:bg-[#6e00a3] transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
