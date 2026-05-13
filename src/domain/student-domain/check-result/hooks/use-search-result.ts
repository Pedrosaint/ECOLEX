import { useState } from "react";
import { useGetStudentSessionsQuery } from "../api/student-result.api";

export function useSearchResult() {
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [isSessionOpen, setIsSessionOpen] = useState(false);

  const { data: sessionsData, isLoading: sessionsLoading } = useGetStudentSessionsQuery();
  const sessions = sessionsData?.data ?? [];
  const selectedSession = sessions.find((s) => s.id === selectedSessionId);

  return {
    selectedSessionId,
    setSelectedSessionId,
    isSessionOpen,
    setIsSessionOpen,
    sessions,
    sessionsLoading,
    selectedSession,
  };
}
