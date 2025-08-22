import {
  Users,
  UserCheck,
  BookOpen,
  Building,
  FileText,
  ClipboardCheck,
  Tag,
} from "lucide-react";
import { GoHomeFill } from "react-icons/go";
import { SlPlus } from "react-icons/sl";
import { svgIcons } from "../assets/icon/svg";

interface NavLink {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

//admin navlink
export const navLinks: NavLink[] = [
  { path: "/admin/dashbaord", icon: GoHomeFill , label: "Overview" },
  { path: "/admin/student's", icon: Users, label: "Manage Students" },
  { path: "/admin/staff", icon: UserCheck, label: "Manage Staff" },
  { path: "/admin/classes", icon: BookOpen, label: "Manage Classes" },
  { path: "/admin/campuses", icon: Building, label: "Campuses" },
  { path: "/admin/result", icon: FileText, label: "Manage Result" },
  { path: "/admin/subjects", icon: BookOpen, label: "Manage Subject" },
  { path: "/admin/broadsheet", icon: FileText, label: "Broadsheet" },
];

//student navlink
export const studentNavLinks: NavLink[] = [
  { path: "/student/dashboard", icon: GoHomeFill, label: "Dashboard" },
  {
    path: "/student/check-result",
    icon: ClipboardCheck,
    label: "Check Result",
  },
  { path: "/student/pay-school-fee", icon: Tag, label: "Pay School Fee" },
];

//staff navlink
export const staffNavLinks: NavLink[] = [
  { path: "/staff/dashboard", icon: GoHomeFill, label: "Overview" },
  {
    path: "/staff/compute-result",
    icon: svgIcons.add,
    label: "Compute/Edit  Result",
  },
  {
    path: "/staff/result-mark",
    icon: SlPlus,
    label: "Teachers Result Remark",
  },
  {
    path: "/staff/view-class-results",
    icon: BookOpen,
    label: "View Class Results",
  },
];
