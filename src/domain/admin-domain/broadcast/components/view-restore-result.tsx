import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, SearchX } from "lucide-react";
import { useGetResultsByStatusQuery, useUnpublishResultMutation } from "../api/broadsheet.api";
import type { ResultStatusItem } from "../types";

const PAGE_SIZE = 10;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

function ResultSection({
  title,
  status,
  accentColor,
}: {
  title: string;
  status: "published" | "rejected";
  accentColor: string;
}) {
  const [page, setPage] = useState(1);
  const { data, isFetching, isError, refetch } = useGetResultsByStatusQuery({ status });
  const [unpublish, { isLoading: isRestoring }] = useUnpublishResultMutation();

  const allResults: ResultStatusItem[] = data?.data ?? [];
  const totalPages = Math.max(1, Math.ceil(allResults.length / PAGE_SIZE));
  const paginated = allResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleRestore = async (id: number) => {
    try {
      await unpublish({ id }).unwrap();
      refetch();
    } catch {
      // error handled silently; could add toast here
    }
  };

  if (isFetching) {
    return (
      <div className="bg-white rounded shadow-sm border border-gray-200 p-10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-4 border-[#8000BD] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Loading {title.toLowerCase()}...</p>
        </div>
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="bg-white rounded shadow-sm border border-gray-200 p-10 flex flex-col items-center justify-center text-center">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
          <SearchX className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">Could not fetch {title.toLowerCase()}. Please try again.</p>
      </div>
    );
  }

  if (allResults.length === 0) {
    return (
      <div className="bg-white rounded shadow-sm border border-gray-200 p-10 flex flex-col items-center justify-center text-center">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
          <SearchX className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">No {title.toLowerCase()} found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${accentColor}`} />
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
        <span className="ml-auto text-xs text-gray-400">{allResults.length} record{allResults.length !== 1 ? "s" : ""}</span>
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
              <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-left">Published By</th>
              <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 text-center">Date</th>
              <th className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">Action</th>
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
                <td className="py-3 px-4 text-sm text-gray-500 border-r border-gray-200 text-center">{formatDate(item.publishedAt)}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleRestore(item.id)}
                    disabled={isRestoring}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#8000BD] rounded hover:bg-[#6a00a0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <RotateCcw size={13} />
                    Restore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, allResults.length)} of {allResults.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

const innerTabs = ["Published Result", "Rejected Result"] as const;
type InnerTab = typeof innerTabs[number];

export default function ViewRestoreResult() {
  const [activeTab, setActiveTab] = useState<InnerTab>("Published Result");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-2"
    >
      {/* Inner tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-5">
        {innerTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium transition-colors relative ${
              activeTab === tab
                ? "text-gray-900 font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8000BD] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {activeTab === "Published Result" && (
        <ResultSection title="Published Results" status="published" accentColor="bg-green-500" />
      )}
      {activeTab === "Rejected Result" && (
        <ResultSection title="Rejected Results" status="rejected" accentColor="bg-red-500" />
      )}
    </motion.div>
  );
}
