import { useGetSessionsQuery } from "../../../admin-domain/overview/api/admin-overview.api";

export function useComputeResult() {
  const { data: sessionsData } = useGetSessionsQuery();
  const sessions = sessionsData?.data ?? [];

  return { sessions };
}
