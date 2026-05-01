import { useState } from "react";

interface UseAuthModalProps {
  token: string;
  onClose: () => void;
}

export function useAuthModal({ token, onClose }: UseAuthModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return {
    copied,
    handleCopy,
    onClose,
  };
}
