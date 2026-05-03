import {
  useGetTeacherClassesQuery,
  useGetTeacherCampusQuery,
  useGetTeacherClassGroupsQuery,
  useGetTeacherSessionQuery,
  useGetActiveTermQuery,
} from "../../overview/hooks";

export function useComputeResult() {
  const { data: classesData, isLoading: classesLoading } = useGetTeacherClassesQuery();
  const { data: campusData, isLoading: campusLoading } = useGetTeacherCampusQuery();
  const { data: classGroupsData, isLoading: classGroupsLoading } = useGetTeacherClassGroupsQuery();
  const { data: sessionData, isLoading: sessionLoading } = useGetTeacherSessionQuery();
  const { data: activeTermData, isLoading: activeTermLoading } = useGetActiveTermQuery();

  const classes = classesData?.data ?? [];
  const campus = campusData?.data ?? null;
  const classGroups = classGroupsData?.data ?? [];
  const session = sessionData?.data ?? null;
  const activeTerm = activeTermData?.data ?? null;

  return {
    classes, classesLoading,
    campus, campusLoading,
    classGroups, classGroupsLoading,
    session, sessionLoading,
    activeTerm, activeTermLoading,
  };
}
