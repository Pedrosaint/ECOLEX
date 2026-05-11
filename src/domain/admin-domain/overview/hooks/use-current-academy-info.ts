/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import {
  useGetSessionsQuery,
  useCreateSessionMutation,
  useCreateTermMutation,
  useUpdateTermMutation,
  useActivateTermMutation,
} from "./index";

export function useCurrentAcademyInfo() {
  const [newSessionName, setNewSessionName] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState<number | "">("");
  const [newTermName, setNewTermName] = useState("");
  const [resumptionDate, setResumptionDate] = useState("");
  const [expandedSessions, setExpandedSessions] = useState<number[]>([]);
  const [editingTermId, setEditingTermId] = useState<number | null>(null);
  const [editTermName, setEditTermName] = useState("");
  const [editResumptionDate, setEditResumptionDate] = useState("");

  const { data: sessionsData, isLoading } = useGetSessionsQuery();
  const [createSession, { isLoading: creatingSession }] = useCreateSessionMutation();
  const [createTerm, { isLoading: creatingTerm }] = useCreateTermMutation();
  const [updateTerm, { isLoading: updatingTerm }] = useUpdateTermMutation();
  const [activateTerm, { isLoading: activatingId }] = useActivateTermMutation();

  const sessions = sessionsData?.data ?? [];
  const activeSession = sessions.find((s) => s.isActive);
  const activeTerm = activeSession?.terms.find((t) => t.isActive);

  const toggleSession = (id: number) => {
    setExpandedSessions((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleCreateSession = async () => {
    if (!newSessionName.trim()) return;
    try {
      const res = await createSession({ name: newSessionName.trim() }).unwrap();
      toast.success(res.message || "Session created");
      setNewSessionName("");
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to create session");
    }
  };

  const handleCreateTerm = async () => {
    if (!selectedSessionId || !newTermName.trim()) return;
    try {
      const res = await createTerm({
        sessionId: Number(selectedSessionId),
        name: newTermName.trim(),
        ...(resumptionDate ? { resumptionDate } : {}),
      }).unwrap();
      toast.success(res.message || "Term created");
      setNewTermName("");
      setResumptionDate("");
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to create term");
    }
  };

  const startEditTerm = (term: { id: number; name: string; resumptionDate?: string | null }) => {
    setEditingTermId(term.id);
    setEditTermName(term.name);
    setEditResumptionDate(term.resumptionDate ? term.resumptionDate.slice(0, 10) : "");
  };

  const cancelEditTerm = () => {
    setEditingTermId(null);
    setEditTermName("");
    setEditResumptionDate("");
  };

  const handleUpdateTerm = async (termId: number) => {
    if (!editTermName.trim()) return;
    try {
      const res = await updateTerm({
        id: termId,
        name: editTermName.trim(),
        ...(editResumptionDate ? { resumptionDate: editResumptionDate } : {}),
      }).unwrap();
      toast.success(res.message || "Term updated");
      cancelEditTerm();
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to update term");
    }
  };

  const handleActivateTerm = async (termId: number) => {
    try {
      const res = await activateTerm({ id: termId }).unwrap();
      toast.success(res.message || "Term activated");
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to activate term");
    }
  };

  return {
    newSessionName,
    setNewSessionName,
    selectedSessionId,
    setSelectedSessionId,
    newTermName,
    setNewTermName,
    resumptionDate,
    setResumptionDate,
    expandedSessions,
    sessions,
    activeSession,
    activeTerm,
    isLoading,
    creatingSession,
    creatingTerm,
    updatingTerm,
    activatingId,
    editingTermId,
    editTermName,
    setEditTermName,
    editResumptionDate,
    setEditResumptionDate,
    startEditTerm,
    cancelEditTerm,
    handleUpdateTerm,
    toggleSession,
    handleCreateSession,
    handleCreateTerm,
    handleActivateTerm,
  };
}
