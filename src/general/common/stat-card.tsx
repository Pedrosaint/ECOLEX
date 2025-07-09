import { MoreHorizontal } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  color?: string;
  isPrimary?: boolean;
  badge?: string;
}

export default function StatsCard({
  title,
  value,
  color = "",
  isPrimary = false,
}: StatsCardProps) {
  return (
    <div
      className={`rounded-3xl p-4 relative font-sans ${
        isPrimary
          ? `bg-gradient-to-r ${color} text-white`
          : "bg-[#F5F1FF] text-gray-600"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-sm ${isPrimary ? "opacity-90" : "text-gray-600"}`}
        >
          {title}
        </span>
        <MoreHorizontal
          className={`w-4 h-4 ${isPrimary ? "" : "text-gray-400"}`}
        />
      </div>
      <div className="text-2xl font-medium">{value}</div>
    </div>
  );
}
