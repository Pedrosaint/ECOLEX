import { useGetTeacherOverviewQuery } from "../api/teacher-overview.api";

export function useDashboard() {
  const { data, isLoading, isError } = useGetTeacherOverviewQuery();

  const cards = [
    {
      title: "Total Students",
      value: isError ? "—" : String(data?.data.totalStudents ?? 0),
      isPrimary: true,
      flipLayout: true,
    },
    {
      title: "Classes Assigned to You",
      value: isError ? "—" : String(data?.data.totalClasses ?? 0),
      flipLayout: true,
    },
    {
      title: "Subjects Assigned to You",
      value: isError ? "—" : String(data?.data.totalSubjects ?? 0),
      isPrimary: true,
      flipLayout: true,
    },
    {
      title: "Assignments in Progress",
      value: isError ? "—" : String(data?.data.assignmentsInProgress ?? 0),
      flipLayout: true,
    },
  ];

  return { data, isLoading, isError, cards };
}
