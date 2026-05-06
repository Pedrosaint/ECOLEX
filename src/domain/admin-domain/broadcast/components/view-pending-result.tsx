import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { usePendingResults } from "../../result/hooks";

export default function ViewPendingResult() {
  const {
    sessionId, setSessionId,
    termId, setTermId,
    classId, setClassId,
    subjectId, setSubjectId,
    campusId, setCampusId,
    sessions, sessionsLoading,
    terms,
    classes, classesLoading,
    subjects, subjectsLoading,
    campuses, campusesLoading,
    hasLoaded, submissions, isLoading,
    canLoad, actioningId, handleLoad, handleClear, handleApprove, handleReject,
  } = usePendingResults();

  return (
    <>
      <h1 className="font-semibold mb-2 text-gray-500">
        Filter Pending Result to view and Approve
      </h1>

      <motion.div
        className="bg-white p-6 rounded-md shadow-sm border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-2">
          {/* Campus */}
          <div>
            <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Campus</label>
            <div className="relative">
              <select
                value={campusId}
                onChange={(e) => setCampusId(e.target.value)}
                disabled={campusesLoading}
                className={`w-full px-4 py-4 border border-gray-300 rounded text-sm appearance-none focus:outline-none pr-10 ${campusId ? "text-gray-900" : "text-gray-400"}`}
              >
                <option value="">{campusesLoading ? "Loading..." : "Select Campus"}</option>
                {campuses.map((c) => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          {/* Academic Session */}
          <div>
            <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Session</label>
            <div className="relative">
              <select
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                disabled={sessionsLoading}
                className={`w-full px-4 py-4 border border-gray-300 rounded text-sm appearance-none focus:outline-none pr-10 ${sessionId ? "text-gray-900" : "text-gray-400"}`}
              >
                <option value="">{sessionsLoading ? "Loading..." : "Select Session"}</option>
                {sessions.map((s) => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          {/* Term */}
          <div>
            <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Term</label>
            <div className="relative">
              <select
                value={termId}
                onChange={(e) => setTermId(e.target.value)}
                disabled={!sessionId || terms.length === 0}
                className={`w-full px-4 py-4 border border-gray-300 rounded text-sm appearance-none focus:outline-none pr-10 ${!sessionId ? "text-gray-400 bg-gray-50 cursor-not-allowed" : termId ? "text-gray-900" : "text-gray-400"}`}
              >
                <option value="">{!sessionId ? "Select session first" : terms.length === 0 ? "No terms" : "Select Term"}</option>
                {terms.map((t) => <option key={t.id} value={String(t.id)}>{t.name}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Class</label>
            <div className="relative">
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                disabled={classesLoading}
                className={`w-full px-4 py-4 border border-gray-300 rounded text-sm appearance-none focus:outline-none pr-10 ${classId ? "text-gray-900" : "text-gray-400"}`}
              >
                <option value="">{classesLoading ? "Loading..." : "Select Class"}</option>
                {classes.map((c) => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">Select Subject</label>
            <div className="relative">
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                disabled={!classId || subjectsLoading}
                className={`w-full px-4 py-4 border border-gray-300 rounded text-sm appearance-none focus:outline-none pr-10 ${!classId ? "text-gray-400 bg-gray-50 cursor-not-allowed" : subjectId ? "text-gray-900" : "text-gray-400"}`}
              >
                <option value="">{!classId ? "Select class first" : subjectsLoading ? "Loading..." : subjects.length === 0 ? "No subjects" : "Select Subject"}</option>
                {subjects.map((s) => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-3 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleLoad}
            disabled={!canLoad || isLoading}
            className="flex-1 flex items-center justify-center gap-2 bg-[#8000BD] hover:bg-[#6a009e] px-6 py-3 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Search className="w-5 h-5" />
            {isLoading ? "LOADING..." : "DISPLAY PENDING RESULT"}
          </button>
        </div>
      </motion.div>

      {/* Results */}
      {!hasLoaded ? (
        <div className="bg-white border border-gray-200 rounded-md mt-10 py-16 flex flex-col items-center justify-center text-center">
          <p className="text-gray-500 font-medium text-sm">No submissions loaded</p>
          <p className="text-gray-400 text-xs mt-1">Apply filters above and click Display Pending Result.</p>
        </div>
      ) : isLoading ? (
        <div className="bg-white border border-gray-200 rounded-md mt-10 p-8 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      ) : submissions.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-md mt-10 py-16 flex flex-col items-center justify-center text-center">
          <p className="text-gray-500 font-medium text-sm">No pending submissions found</p>
          <p className="text-gray-400 text-xs mt-1">Try adjusting the filters.</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white border border-gray-200 overflow-hidden mt-10"
        >
          <div className="bg-white border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                  <tr>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">S/N</th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">Teacher</th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">Class</th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">Subject</th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">Session / Term</th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">Status</th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">Submitted At</th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {submissions.map((sub, index) => (
                    <tr key={sub.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900 border-r border-gray-200 text-center">{index + 1}</td>
                      <td className="py-3 px-2 text-sm border-r border-gray-200 text-center">{sub.staff?.name ?? "—"}</td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">{sub.class?.name ?? "—"}</td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">{sub.subject?.name ?? "—"}</td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">{sub.academicSession?.name ?? "—"} — {sub.term?.name ?? "—"}</td>
                      <td className="py-3 px-2 text-sm border-r border-gray-200 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          sub.status === "PENDING" ? "bg-amber-100 text-amber-700"
                          : sub.status === "APPROVED" || sub.status === "PUBLISHED" ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-xs text-gray-500 border-r border-gray-200 text-center">
                        {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : "—"}
                      </td>
                      <td className="py-3 px-2 border-r border-gray-200">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleApprove(sub)}
                            disabled={actioningId === sub.id || sub.status !== "PENDING"}
                            className="px-3 py-1.5 bg-[#4B0082] hover:bg-[#3a0063] text-white text-xs font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {actioningId === sub.id ? "..." : "Approve"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReject(sub)}
                            disabled={actioningId === sub.id}
                            className="px-3 py-1.5 bg-[#EBE5F5] hover:bg-[#d8cff0] text-gray-700 text-xs font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {actioningId === sub.id ? "..." : "Reject"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-2 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {submissions.length} of {submissions.length}
                </div>
                <div className="flex items-center space-x-2">
                  <button disabled className="p-2 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronLeft size={20} />
                  </button>
                  <span className="w-8 h-8 rounded bg-[#8000BD] text-white flex items-center justify-center text-sm font-semibold">1</span>
                  <button disabled className="p-2 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
