import { useEffect, useState } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  isPrimary?: boolean;
  flipLayout?: boolean;
}

export function useStudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [userRole] = useState("student");

  const adminCards: Array<StatsCardProps> = [
    { title: "Total Students", value: "1,200", isPrimary: true },
    { title: "Staff", value: "60" },
    { title: "Campuses", value: "100", isPrimary: true },
    { title: "Revenue", value: "N5,000,000" },
  ];

  const studentCards: Array<StatsCardProps> = [
    {
      title: "Total School Fee For Current Term",
      value: "N60,000",
      isPrimary: true,
      flipLayout: true,
    },
    { title: "Total Students in Your Class", value: "60", flipLayout: true },
    {
      title: "Pending Debt For You To Pay",
      value: "12",
      isPrimary: true,
      flipLayout: true,
    },
    {
      title: "Active Assignments For Your Class",
      value: "0",
      flipLayout: true,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const cardsToShow = userRole === "admin" ? adminCards : studentCards;

  return { loading, cardsToShow };
}
