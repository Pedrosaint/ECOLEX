import {
  Users,
  UserCheck,
  BookOpen,
  Building,
  FileText,
  Settings,
} from "lucide-react";
import { GoHomeFill } from "react-icons/go";

interface NavLink {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export const navLinks: NavLink[] = [
  { path: "/dashboard", icon: GoHomeFill , label: "Overview" },
  { path: "/dashboard/students", icon: Users, label: "Students" },
  { path: "/dashboard/staff", icon: UserCheck, label: "Staff" },
  { path: "/dashboard/classes", icon: BookOpen, label: "Classes" },
  { path: "/dashboard/campuses", icon: Building, label: "Campuses" },
  { path: "/dashboard/reports", icon: FileText, label: "View Report" },
  { path: "/dashboard/subjects", icon: BookOpen, label: "Manage Subject" },
  { path: "/dashboard/broadsheet", icon: FileText, label: "Broadsheet" },
  { path: "/dashboard/settings", icon: Settings, label: "Settings" },
];
