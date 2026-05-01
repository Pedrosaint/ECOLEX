import { useState } from "react";
import { useGetSessionsQuery } from "../../../admin-domain/overview/api/admin-overview.api";

export function useSearchPayment() {
  const [academicSession, setAcademicSession] = useState("");
  const [term, setTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);

  const { data: sessionsData } = useGetSessionsQuery();
  const sessions = sessionsData?.data ?? [];
  const terms = ["First Term", "Second Term", "Third Term"];
  const classes = ["Class 1", "Class 2", "Class 3"];

  const allFieldsFilled =
    academicSession.trim() && term.trim() && selectedClass.trim();

  return {
    academicSession,
    setAcademicSession,
    term,
    setTerm,
    selectedClass,
    setSelectedClass,
    isSessionOpen,
    setIsSessionOpen,
    isTermOpen,
    setIsTermOpen,
    isClassOpen,
    setIsClassOpen,
    sessions,
    terms,
    classes,
    allFieldsFilled,
  };
}
