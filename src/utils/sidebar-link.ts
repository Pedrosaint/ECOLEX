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
  { path: "/admin/student's", icon: Users, label: "Manage Students" },
  { path: "/admin/staff", icon: UserCheck, label: "Manage Staff" },
  { path: "/admin/classes", icon: BookOpen, label: "Manage Classes" },
  { path: "/admin/campuses", icon: Building, label: "Campuses" },
  { path: "/admin/result", icon: FileText, label: "Manage Result" },
  { path: "/admin/subjects", icon: BookOpen, label: "Manage Subject" },
  { path: "/admin/broadsheet", icon: FileText, label: "Broadsheet" },
  { path: "/admin/settings", icon: Settings, label: "Settings" },
];
