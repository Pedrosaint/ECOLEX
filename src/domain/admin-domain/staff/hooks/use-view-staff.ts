import { useGetStaffQuery } from "../api/staff-api";

interface UseViewStaffProps {
  staffId: number;
}

export function useViewStaff({ staffId }: UseViewStaffProps) {
  const { data, isLoading, error, refetch } = useGetStaffQuery({ id: staffId });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
