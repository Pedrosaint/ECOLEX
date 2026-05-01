import { useState } from "react";
import { useGetSessionsQuery } from "../../../admin-domain/overview/api/admin-overview.api";

export function useSearchResult() {
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [termId, setTermId] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState("");

  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);

  const { data: sessionsData } = useGetSessionsQuery();
  const sessions = sessionsData?.data ?? [];
  const selectedSession = sessions.find((s) => s.id === selectedSessionId);
  const terms = selectedSession?.terms ?? [];
  const classes = ["Class 1", "Class 2", "Class 3"];

  const allFieldsFilled = selectedSessionId && termId && selectedClass.trim();

  return {
    selectedSessionId,
    setSelectedSessionId,
    termId,
    setTermId,
    selectedClass,
    setSelectedClass,
    isSessionOpen,
    setIsSessionOpen,
    isTermOpen,
    setIsTermOpen,
    isClassOpen,
    setIsClassOpen,
    sessions,
    selectedSession,
    terms,
    classes,
    allFieldsFilled,
  };
}
