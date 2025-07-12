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
  { path: "/admin/dashboard", icon: GoHomeFill , label: "Overview" },
  { path: "/admin/students", icon: Users, label: "Students" },
  { path: "/admin/staff", icon: UserCheck, label: "Staff" },
  { path: "/admin/classes", icon: BookOpen, label: "Classes" },
  { path: "/admin/campuses", icon: Building, label: "Campuses" },
  { path: "/admin/reports", icon: FileText, label: "View Report" },
  { path: "/admin/subjects", icon: BookOpen, label: "Manage Subject" },
  { path: "/admin/broadsheet", icon: FileText, label: "Broadsheet" },
  { path: "/admin/settings", icon: Settings, label: "Settings" },
];
