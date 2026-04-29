import { CalendarClock } from "lucide-react";

const UpcomingExams = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Upcoming Exams
      </h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        {/* Table Header */}
        <div className="grid grid-cols-3 gap-4 p-4 border-b border-[#FAF7FC] bg-[#FAF7FC] px-4 rounded-t-2xl">
          <div className="text-sm font-medium text-gray-900">Exam Name</div>
          <div className="text-sm font-medium text-gray-900">Date</div>
          <div className="text-sm font-medium text-gray-900 text-right">Class</div>
        </div>

        {/* Coming Soon State */}
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
          <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mb-3">
            <CalendarClock className="w-7 h-7 text-[#8000BD]" />
          </div>
          <p className="text-sm font-semibold text-gray-700">Coming Soon</p>
          <p className="text-xs text-gray-400 mt-1">Exam schedules will appear here once available.</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingExams;

// ============================================================
// ORIGINAL IMPLEMENTATION — uncomment when backend is ready
// ============================================================

// import { useState, useEffect } from "react";
// import UpcomingExamsModal from "../modal/upcoming-exam.modal";
// import UpcomingExamsSkeleton from "../../../../general/ui/upcoming-exam-skeleton-loader.ui";

// interface Exam {
//   id: number;
//   name: string;
//   date: string;
//   class: string;
// }

// const exams: Exam[] = [
//   { id: 1, name: "Midterm Exam",  date: "2024-05-15", class: "jss1-jss3" },
//   { id: 2, name: "Final Exam",    date: "2024-06-20", class: "jss1-ss3"  },
//   { id: 3, name: "Special Exam",  date: "2024-07-10", class: "ss3"       },
//   { id: 4, name: "Special Exam",  date: "2024-07-10", class: "ss3"       },
// ];

// const UpcomingExams = () => {
//   const [isExamOpen, setIsExamOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       {isLoading ? (
//         <UpcomingExamsSkeleton />
//       ) : (
//         <div className="relative">
//           <h2 className="text-lg font-semibold text-gray-900 mb-2">
//             Upcoming Exams
//           </h2>
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
//             <div className="grid grid-cols-3 gap-4 p-4 border-b border-[#FAF7FC] bg-[#FAF7FC] px-4 rounded-t-2xl">
//               <div className="text-sm font-medium text-gray-900">Exam Name</div>
//               <div className="text-sm font-medium text-gray-900">Date</div>
//               <div className="text-sm font-medium text-gray-900 text-right">Class</div>
//             </div>
//             <div className="divide-y divide-gray-200 px-4">
//               {exams.map((exam) => (
//                 <div key={exam.id} className="grid grid-cols-3 gap-4 py-4">
//                   <div className="text-sm text-gray-900">{exam.name}</div>
//                   <div className="text-sm text-gray-600">{exam.date}</div>
//                   <div className="text-sm text-gray-600 text-right">{exam.class}</div>
//                 </div>
//               ))}
//             </div>
//             <div className="py-2 px-3">
//               <button
//                 onClick={() => setIsExamOpen(true)}
//                 className="text-[#777777] text-sm p-2 rounded-md bg-gray-100 shadow-md cursor-pointer hover:bg-gray-200 transition-colors"
//               >
//                 Add New
//               </button>
//             </div>
//           </div>
//           {isExamOpen && (
//             <div className="">
//               <UpcomingExamsModal onClose={() => setIsExamOpen(false)} />
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default UpcomingExams;
