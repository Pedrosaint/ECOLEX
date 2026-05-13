import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { useGetResultsByStatusQuery } from "../api/broadsheet.api";

const PAGE_SIZE = 10;

export default function ViewRejectedResult() {
  const [page, setPage] = useState(1);

  const { data, isFetching, isError } = useGetResultsByStatusQuery({ status: "rejected" });

  const allResults = data?.data ?? [];
  const totalPages = Math.ceil(allResults.length / PAGE_SIZE);
  const paginated = allResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {isFetching ? (
        <div className="mt-6 bg-white rounded shadow-sm border border-gray-200 p-10 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="w-8 h-8 border-4 border-[#8000BD] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm">Loading rejected results...</p>
          </div>
        </div>
      ) : isError || !data?.success ? (
        <div className="mt-6 bg-white rounded shadow-sm border border-gray-200 p-14 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <XCircle className="h-8 w-8 text-red-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">Failed to Load</h3>
          <p className="text-sm text-gray-400 max-w-xs">Could not fetch rejected results. Please try again later.</p>
        </div>
      ) : allResults.length === 0 ? (
        <div className="mt-6 bg-white rounded shadow-sm border border-gray-200 p-14 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <XCircle className="h-8 w-8 text-red-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">No Rejected Results</h3>
          <p className="text-sm text-gray-400 max-w-xs">
            There are currently no results with a rejected status.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden mt-6">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <h2 className="text-sm font-semibold text-gray-800">Rejected Results</h2>
            <span className="ml-auto text-xs text-gray-400 font-medium">{allResults.length} record{allResults.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#EDF9FD] border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-center">S/N</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-left">Campus</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-left">Session</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-left">Term</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-left">Subject</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-left">Class</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-left">Rejected By</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">Rejected At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200 text-center">
                      {(page - 1) * PAGE_SIZE + idx + 1}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200">{item.class.campus.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200">{item.academicSession.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200">{item.term?.name ?? "—"}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-800 border-r border-gray-200">{item.subject.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200">{item.class.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200">{item.admin.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-500 text-center">{formatDate(item.publishedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {allResults.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, allResults.length)} of {allResults.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded text-sm font-semibold transition-colors ${
                    page === p ? "bg-[#8000BD] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(Math.max(1, totalPages), p + 1))}
                disabled={page === Math.max(1, totalPages)}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
