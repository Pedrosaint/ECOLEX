// "use client";

// import { useState } from "react";
// import UpcomingExamsModal from "../modal/upcoming-exam.modal";

// interface Exam {
//   id: number;
//   name: string;
//   date: string;
//   class: string;
// }

// const UpcomingExams = () => {
//   const [isExamOpen, setIsExamOpen] = useState(false);
//   const exams: Exam[] = [
//     {
//       id: 1,
//       name: "Midterm Exam",
//       date: "2024-05-15",
//       class: "jss1-jss3",
//     },
//     {
//       id: 2,
//       name: "Final Exam",
//       date: "2024-06-20",
//       class: "jss1-ss3",
//     },
//     {
//       id: 3,
//       name: "Special Exam",
//       date: "2024-07-10",
//       class: "ss3",
//     },
//     {
//       id: 4,
//       name: "Special Exam",
//       date: "2024-07-10",
//       class: "ss3",
//     },
//     {
//       id: 5,
//       name: "Special Exam",
//       date: "2024-07-10",
//       class: "ss3",
//     },
//   ];

//   return (
//     <>
//       <h2 className="text-lg font-semibold text-gray-900 mb-2">
//         Upcoming Exams
//       </h2>
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
//         {/* Table Header */}
//         <div className="grid grid-cols-3 gap-4 p-4 border-b border-[#FAF7FC] bg-[#FAF7FC] px-4 rounded-t-2xl">
//           <div className="text-sm font-medium text-gray-900">Exam Name</div>
//           <div className="text-sm font-medium text-gray-900">Date</div>
//           <div className="text-sm font-medium text-gray-900 text-right">
//             class
//           </div>
//         </div>

//         {/* Table Rows */}
//         <div className="divide-y divide-gray-200 px-4">
//           {exams.map((exam) => (
//             <div key={exam.id} className="grid grid-cols-3 gap-4 py-4">
//               <div className="text-sm text-gray-900">{exam.name}</div>
//               <div className="text-sm text-gray-600">{exam.date}</div>
//               <div className="text-sm text-gray-600 text-right">
//                 {exam.class}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="py-2 px-3">
//           <button
//             onClick={() => setIsExamOpen(true)}
//             className="text-[#777777] text-sm p-2 rounded-md bg-gray-100 cursor-pointe shadow-md cursor-pointer"
//           >
//             Add New
//           </button>

//           {isExamOpen && (
//             <UpcomingExamsModal onClose={() => setIsExamOpen(false)} />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default UpcomingExams;



"use client";

import { useState } from "react";
import UpcomingExamsModal from "../modal/upcoming-exam.modal";

interface Exam {
  id: number;
  name: string;
  date: string;
  class: string;
}

const UpcomingExams = () => {
  const [isExamOpen, setIsExamOpen] = useState(false);
  const exams: Exam[] = [
    {
      id: 1,
      name: "Midterm Exam",
      date: "2024-05-15",
      class: "jss1-jss3",
    },
    {
      id: 2,
      name: "Final Exam",
      date: "2024-06-20",
      class: "jss1-ss3",
    },
    {
      id: 3,
      name: "Special Exam",
      date: "2024-07-10",
      class: "ss3",
    },
    {
      id: 4,
      name: "Special Exam",
      date: "2024-07-10",
      class: "ss3",
    },
    {
      id: 5,
      name: "Special Exam",
      date: "2024-07-10",
      class: "ss3",
    },
  ];

  return (
    <div className="relative">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Upcoming Exams
      </h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        {/* Table Header */}
        <div className="grid grid-cols-3 gap-4 p-4 border-b border-[#FAF7FC] bg-[#FAF7FC] px-4 rounded-t-2xl">
          <div className="text-sm font-medium text-gray-900">Exam Name</div>
          <div className="text-sm font-medium text-gray-900">Date</div>
          <div className="text-sm font-medium text-gray-900 text-right">
            Class
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-200 px-4">
          {exams.map((exam) => (
            <div key={exam.id} className="grid grid-cols-3 gap-4 py-4">
              <div className="text-sm text-gray-900">{exam.name}</div>
              <div className="text-sm text-gray-600">{exam.date}</div>
              <div className="text-sm text-gray-600 text-right">
                {exam.class}
              </div>
            </div>
          ))}
        </div>
        <div className="py-2 px-3">
          <button
            onClick={() => setIsExamOpen(true)}
            className="text-[#777777] text-sm p-2 rounded-md bg-gray-100 shadow-md cursor-pointer hover:bg-gray-200 transition-colors"
          >
            Add New
          </button>
        </div>
      </div>

      {/* Modal rendered inline */}
      {isExamOpen && (
        <div className="">
          <UpcomingExamsModal onClose={() => setIsExamOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default UpcomingExams;