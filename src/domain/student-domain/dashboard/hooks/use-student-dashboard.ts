import { useEffect, useState } from "react";
import { useGetStudentMetricsQuery } from "../api/student-dashboard.api";

interface StatsCardProps {
  title: string;
  value: string;
  isPrimary?: boolean;
  flipLayout?: boolean;
}

export function useStudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [cardsToShow, setCardsToShow] = useState<Array<StatsCardProps>>([]);

  const { data: metricsData, isLoading } = useGetStudentMetricsQuery();

  useEffect(() => {
    if (!isLoading && metricsData?.data) {
      const stats = metricsData.data.stats;
      const studentCards: Array<StatsCardProps> = [
        {
          title: "Total School Fee For Current Term",
          value: `N${stats.totalSchoolFee.toLocaleString()}`,
          isPrimary: true,
          flipLayout: true,
        },
        {
          title: "Total Students in Your Class",
          value: stats.totalStudentsInClass.toString(),
          flipLayout: true,
        },
        {
          title: "Pending Debt For You To Pay",
          value: stats.pendingDebt.toString(),
          isPrimary: true,
          flipLayout: true,
        },
        {
          title: "Active Assignments For Your Class",
          value: stats.activeAssignments.toString(),
          flipLayout: true,
        },
      ];
      setCardsToShow(studentCards);
      setLoading(false);
    } else if (isLoading) {
      setLoading(true);
    }
  }, [metricsData, isLoading]);

  const currentTerm = metricsData?.data?.currentTerm ?? null;
  const student = metricsData?.data?.student ?? null;

  return { loading, cardsToShow, currentTerm, student };
}
