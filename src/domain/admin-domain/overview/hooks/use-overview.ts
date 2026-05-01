import { useGetAdminOverviewQuery } from "./index";
import type { svgIcons } from "../../../../assets/icon/svg";

interface StatsCardProps {
  title: string;
  value: string;
  isPrimary?: boolean;
  icon?: keyof typeof svgIcons;
}

export function useOverview() {
  const { data: overviewData, isLoading } = useGetAdminOverviewQuery();
  const stats = overviewData?.data;

  const cards: StatsCardProps[] = [
    {
      title: "Students",
      value: isLoading ? "—" : String(stats?.students.total ?? 0),
      icon: "user",
      isPrimary: true,
    },
    {
      title: "Staff",
      value: isLoading ? "—" : String(stats?.staff.total ?? 0),
      icon: "staff",
    },
    {
      title: "Campuses",
      value: isLoading ? "—" : String(stats?.campuses.total ?? 0),
      icon: "campus",
      isPrimary: true,
    },
    {
      title: "Current Bill",
      value: isLoading ? "—" : stats?.bill ? String(stats.bill) : "0",
      icon: "bill",
    },
  ];

  return {
    isLoading,
    stats,
    cards,
  };
}
