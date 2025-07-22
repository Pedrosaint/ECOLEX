import Icon from "../../assets/icon/icon";
import type { svgIcons } from "../../assets/icon/svg";


interface StatsCardProps {
  title: string;
  value: string;
  isPrimary?: boolean;
  badge?: string;
  icon?: keyof typeof svgIcons;
}

export default function StatsCard({
  title,
  value,
  isPrimary = false,
  icon,
}: StatsCardProps) {
  return (
    <div
      className={`rounded-3xl py-5 px-3 relative font-sans ${
        isPrimary ? `bg-[#8000BD] text-white` : "bg-[#E2D8FC] text-gray-600"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-lg ${isPrimary ? "opacity-90" : "text-gray-600"}`}
        >
          {title}
        </span>
        {icon && <Icon name={icon} size={20} />}
      </div>
      <div className="text-2xl font-medium">{value}</div>
    </div>
  );
}
