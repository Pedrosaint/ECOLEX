/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Plus, ChevronDown, ChevronRight, CheckCircle2, Circle, Zap } from "lucide-react";
import { toast } from "sonner";
import {
  useGetSessionsQuery,
  useCreateSessionMutation,
  useCreateTermMutation,
  useActivateTermMutation,
} from "../api/admin-overview.api";

export default function SessionTermSetup() {
  const [newSessionName, setNewSessionName] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState<number | "">("");
  const [newTermName, setNewTermName] = useState("");
  const [expandedSessions, setExpandedSessions] = useState<number[]>([]);

  const { data: sessionsData, isLoading } = useGetSessionsQuery();
  const [createSession, { isLoading: creatingSession }] = useCreateSessionMutation();
  const [createTerm, { isLoading: creatingTerm }] = useCreateTermMutation();
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
      }).unwrap();
      toast.success(res.message || "Term created");
      setNewTermName("");
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to create term");
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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 h-full flex flex-col">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Session & Term Setup</h2>

      {/* Active Status Banner */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 flex items-center gap-5 mb-5">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Active Session</p>
          <p className="text-sm font-bold text-[#8000BD]">{activeSession?.name ?? "—"}</p>
        </div>
        <div className="w-px h-8 bg-purple-200" />
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Active Term</p>
          <p className="text-sm font-bold text-[#8000BD]">{activeTerm?.name ?? "—"}</p>
        </div>
        <div className="ml-auto">
          {activeSession && activeTerm ? (
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Live
            </span>
          ) : (
            <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2.5 py-1 rounded-full">
              Not set
            </span>
          )}
        </div>
      </div>

      {/* Create Forms */}
      <div className="grid grid-cols-1 gap-4 mb-5">
        {/* New Session */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-800 uppercase tracking-wide mb-3">
            Create Session
          </p>
          <div className="flex gap-2">
            <input
              value={newSessionName}
              onChange={(e) => setNewSessionName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateSession()}
              placeholder="e.g. 2026/2027"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8000BD]"
            />
            <button
              onClick={handleCreateSession}
              disabled={!newSessionName.trim() || creatingSession}
              className={`px-3 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-1 transition-colors ${
                !newSessionName.trim() || creatingSession
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#8000BD] hover:bg-[#640094] cursor-pointer"
              }`}
            >
              <Plus size={14} />
              {creatingSession ? "..." : "Create"}
            </button>
          </div>
        </div>

        {/* New Term */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-800 uppercase tracking-wide mb-3">
            Add Term
          </p>
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <select
              value={selectedSessionId}
              onChange={(e) =>
                setSelectedSessionId(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full sm:w-44 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8000BD] text-gray-700"
            >
              <option value="">Select session</option>
              {sessions.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <select
              value={newTermName}
              onChange={(e) => setNewTermName(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8000BD] text-gray-700"
            >
              <option value="">Select term</option>
              <option value="First Term">First Term</option>
              <option value="Second Term">Second Term</option>
              <option value="Third Term">Third Term</option>
            </select>
            <button
              onClick={handleCreateTerm}
              disabled={!selectedSessionId || !newTermName.trim() || creatingTerm}
              className={`px-3 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-1 whitespace-nowrap transition-colors ${
                !selectedSessionId || !newTermName.trim() || creatingTerm
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#8000BD] hover:bg-[#640094] cursor-pointer"
              }`}
            >
              <Plus size={14} />
              {creatingTerm ? "..." : "Add"}
            </button>
          </div>
        </div>
      </div>

      {/* Sessions Accordion */}
      <div className="flex-1">
        <p className="text-xs font-semibold text-gray-800 uppercase tracking-wide mb-3">
          All Sessions
        </p>

        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-2">
              <Zap size={18} className="text-[#8000BD]" />
            </div>
            <p className="text-sm font-semibold text-gray-600">No sessions yet</p>
            <p className="text-xs text-gray-400 mt-0.5">Create your first session above</p>
          </div>
        ) : (
          <div className="space-y-2 overflow-y-auto max-h-60">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`rounded-xl border transition-colors ${
                  session.isActive
                    ? "border-purple-200 bg-purple-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleSession(session.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-800"
                >
                  <div className="flex items-center gap-2">
                    {session.isActive ? (
                      <CheckCircle2 size={15} className="text-[#8000BD]" />
                    ) : (
                      <Circle size={15} className="text-gray-300" />
                    )}
                    {session.name}
                    {session.isActive && (
                      <span className="text-xs bg-[#8000BD] text-white px-1.5 py-0.5 rounded-full font-medium">
                        Active
                      </span>
                    )}
                  </div>
                  {expandedSessions.includes(session.id) ? (
                    <ChevronDown size={14} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={14} className="text-gray-400" />
                  )}
                </button>

                {expandedSessions.includes(session.id) && (
                  <div className="border-t border-gray-100 px-4 pb-3 pt-2 space-y-2">
                    {session.terms.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No terms added yet.</p>
                    ) : (
                      session.terms.map((term) => (
                        <div key={term.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            {term.isActive ? (
                              <CheckCircle2 size={13} className="text-green-500" />
                            ) : (
                              <Circle size={13} className="text-gray-300" />
                            )}
                            {term.name}
                            {term.isActive && (
                              <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                                Active
                              </span>
                            )}
                          </div>
                          {!term.isActive && (
                            <button
                              onClick={() => handleActivateTerm(term.id)}
                              disabled={activatingId}
                              className="flex items-center gap-1 text-xs text-[#8000BD] border border-[#8000BD] px-2 py-1 rounded-lg hover:bg-[#8000BD] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                            >
                              <Zap size={11} />
                              Activate
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
