import { svgIcons } from "../icon/svg";

interface IconProps {
  name: keyof typeof svgIcons;
  size?: number;
  color?: string;
  className?: string;
}

export default function Icon({
  name,
  size = 22,
  color = "currentColor",
  className = "",
}: IconProps) {
  const SvgContent = svgIcons[name];
  if (!SvgContent) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <SvgContent color={color} />
    </svg>
  );
}
