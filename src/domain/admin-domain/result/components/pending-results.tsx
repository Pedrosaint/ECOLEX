import { usePendingResults } from "../hooks";

const inputBase =
  "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 placeholder:text-gray-400";

export default function PendingResultsTab() {
  const {
    campusId, setCampusId,
    classId, setClassId,
    termId, setTermId,
    subjectId, setSubjectId,
    hasLoaded, submissions, isLoading,
    actioningId, handleLoad, handleApprove, handleReject,
  } = usePendingResults();

  return (
    <div>
      {/* Filter panel */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Filter Submissions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Campus ID</label>
            <input
              type="number"
              placeholder="e.g. 1"
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className={inputBase}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Class ID</label>
            <input
              type="number"
              placeholder="e.g. 5"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className={inputBase}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Term ID</label>
            <input
              type="number"
              placeholder="e.g. 1"
              value={termId}
              onChange={(e) => setTermId(e.target.value)}
              className={inputBase}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Subject ID</label>
            <input
              type="number"
              placeholder="e.g. 4"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className={inputBase}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleLoad}
            disabled={isLoading}
            className="px-5 py-2 bg-[#8000BD] hover:bg-[#6a009e] text-white text-sm font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? "Loading..." : "Load Submissions"}
          </button>
        </div>
      </div>

      {/* Content */}
      {!hasLoaded ? (
        <div className="bg-white border border-gray-200 rounded-lg py-16 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mb-3">
            <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-gray-600 font-medium text-sm">No submissions loaded</p>
          <p className="text-gray-400 text-xs mt-1">Apply filters above and click <span className="text-[#8000BD] font-medium">Load Submissions</span>.</p>
        </div>
      ) : isLoading ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      ) : submissions.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg py-16 flex flex-col items-center justify-center text-center">
          <p className="text-gray-500 font-medium text-sm">No pending submissions found</p>
          <p className="text-gray-400 text-xs mt-1">Try adjusting the filters.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-medium text-gray-700">S/N</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Teacher</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Class</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Subject</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Session</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Submitted At</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, idx) => (
                  <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{sub.teacher?.name ?? "—"}</p>
                      <p className="text-xs text-gray-400">{sub.teacher?.registrationNumber ?? ""}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{sub.class ?? `Class ${sub.classId}`}</td>
                    <td className="px-4 py-3 text-gray-700">{sub.subject ?? `Subject ${sub.subjectId}`}</td>
                    <td className="px-4 py-3 text-gray-700">{sub.session ?? "—"}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        sub.status === "PENDING"
                          ? "bg-amber-100 text-amber-700"
                          : sub.status === "APPROVED" || sub.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                          sub.status === "PENDING" ? "bg-amber-500"
                          : sub.status === "APPROVED" || sub.status === "PUBLISHED" ? "bg-green-500"
                          : "bg-red-500"
                        }`} />
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleApprove(sub)}
                          disabled={actioningId === sub.id}
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
        </div>
      )}
    </div>
  );
}
