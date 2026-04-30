import { useState } from "react";
import { Plus } from "lucide-react";
import { CalendarClock } from "lucide-react";
import type { UpcomingExam } from "../api/admin-overview.api";
import UpcomingExamsModal from "../modal/upcoming-exam.modal";

interface Props {
  exams: UpcomingExam[];
  isLoading?: boolean;
}

const UpcomingExams = ({ exams, isLoading }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Exams</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white bg-[#8000BD] hover:bg-[#640094] rounded-lg transition-colors cursor-pointer"
        >
          <Plus size={15} />
          Add Exam
        </button>
      </div>
      {isModalOpen && <UpcomingExamsModal onClose={() => setIsModalOpen(false)} />}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 p-4 border-b border-[#FAF7FC] bg-[#FAF7FC] px-4 rounded-t-2xl">
          <div className="text-sm font-medium text-gray-900">Exam Name</div>
          <div className="text-sm font-medium text-gray-900">Subject</div>
          <div className="text-sm font-medium text-gray-900">Class</div>
          <div className="text-sm font-medium text-gray-900 text-right">Date</div>
        </div>

        {isLoading ? (
          <div className="divide-y divide-gray-100 px-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-4 gap-4 py-4">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-4 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            ))}
          </div>
        ) : exams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-3">
              <CalendarClock className="w-6 h-6 text-[#8000BD]" />
            </div>
            <p className="text-sm font-semibold text-gray-700">No upcoming exams</p>
            <p className="text-xs text-gray-400 mt-1">Exam schedules will appear here once available.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 px-4">
            {exams.map((exam) => (
              <div key={exam.id} className="grid grid-cols-4 gap-4 py-3 items-center">
                <div className="text-sm text-gray-900 font-medium">{exam.name}</div>
                <div className="text-sm text-gray-600">{exam.subject.name.trim()}</div>
                <div className="text-sm text-gray-600">
                  {exam.class.customName ?? exam.class.name}
                </div>
                <div className="text-sm text-gray-500 text-right">{exam.createdAt}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingExams;

// ============================================================
// ORIGINAL IMPLEMENTATION (pre-API) — kept for reference
// ============================================================
// import { useState, useEffect } from "react";
// import UpcomingExamsModal from "../modal/upcoming-exam.modal";
// import UpcomingExamsSkeleton from "../../../../general/ui/upcoming-exam-skeleton-loader.ui";
// ... (hardcoded exams array with fake loading)
