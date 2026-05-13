import { useGetResultsByStatusQuery } from "../../broadcast/api/broadsheet.api";
import { useGetPendingSubmissionsQuery } from "../../result/api/grading.api";

export function useResultStatusChart() {
  const { data: publishedData, isFetching: fetchingPublished } =
    useGetResultsByStatusQuery({ status: "published" });

  const { data: rejectedData, isFetching: fetchingRejected } =
    useGetResultsByStatusQuery({ status: "rejected" });

  const { data: pendingData, isFetching: fetchingPending } =
    useGetPendingSubmissionsQuery({});

  const published = publishedData?.data?.length ?? 0;
  const rejected = rejectedData?.data?.length ?? 0;
  const pending = Array.isArray(pendingData?.data) ? pendingData.data.length : 0;

  const isLoading = fetchingPublished || fetchingRejected || fetchingPending;

  return { published, rejected, pending, isLoading };
}
