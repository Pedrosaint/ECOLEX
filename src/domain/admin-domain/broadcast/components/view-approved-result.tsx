// import { motion } from "framer-motion";
// import { ChevronLeft, ChevronRight, Search } from "lucide-react";
// import { useState } from "react";

// export default function ViewApprovedResult() {
//       const [currentPage, setCurrentPage] = useState(1);
//       const totalResult = 223;
//       const resultPerPage = 9;
//       const totalPages = Math.ceil(totalResult / resultPerPage);
  
//       const Result = Array.from({ length: 9 }, (_, index) => ({
//         id: index + 1,
//         no: index + 1,
//         campus: "Campus 1",
//         session: "2024/2025",
//         term: "2nd Term",
//         subject: "Mathematics",
//         class: "JSS 1",
//         teacher: "Mr. John Doe",
//       }));
//   return (
//     <>
//       <motion.div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div>
//             <label
//               htmlFor="view-campus"
//               className="block text-sm font-semibold font-inter text-gray-700 mb-2"
//             >
//               Campus
//             </label>
//             <input
//               type="text"
//               placeholder="Campus 1"
//               className="w-full px-4 py-4 border border-gray-300 text-sm text-gray-700 appearance-none focus:outline-none"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="view-academy-year"
//               className="block text-sm font-semibold font-inter text-gray-700 mb-2"
//             >
//               Select Academy Year
//             </label>
//             <div className="relative">
//               <select
//                 id="view-academy-year"
//                 className="w-full px-4 py-4 border border-gray-300 text-sm text-gray-400 appearance-none focus:outline-none pr-10"
//               ></select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                 <svg
//                   className="fill-current h-4 w-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//           <div>
//             <label
//               htmlFor="view-class"
//               className="block text-sm font-semibold font-inter text-gray-700 mb-2"
//             >
//               Select Academic Term
//             </label>
//             <div className="relative">
//               <select
//                 id="view-class"
//                 className="w-full px-4 py-4 border border-gray-300 text-sm text-gray-400 appearance-none focus:outline-none"
//               ></select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                 <svg
//                   className="fill-current h-4 w-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="view-term"
//               className="block text-sm font-semibold font-inter text-gray-700 mb-2"
//             >
//               Select Class
//             </label>
//             <div className="relative">
//               <select
//                 id="view-term"
//                 className="w-full px-4 py-4 border border-gray-300 text-sm text-gray-400 appearance-none focus:outline-none pr-10"
//               ></select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                 <svg
//                   className="fill-current h-4 w-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-[#8000BD] px-6 py-3">
//           <div className="flex items-center justify-center">
//             <Search className="w-5 h-5 mr-2 text-white" />
//             <button
//               type="button"
//               className="bg-transparent text-white font-semibold outline-none placeholder-white"
//             >
//               FILTER RESULT
//             </button>
//           </div>
//         </div>
//       </motion.div>

//       {/* Table Container */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden py-6 px-10 mt-10"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-10 items-center">
//           <div>
//             <label
//               htmlFor="view-class"
//               className="block text-sm font-bold font-inter text-gray-700 mb-2"
//             >
//               Next term Begin
//             </label>
//             <div className="">
//               <input
//                 type="date"
//                 className="w-full px-4 py-4 border border-gray-300  text-sm text-gray-700 appearance-none focus:outline-none"
//               />
//             </div>
//           </div>
//           <div>
//             <label
//               className="block text-sm font-bold font-inter text-gray-700 mb-2"
//             >
//               Days Opened
//             </label>
//             <input
//               type="text"
//               placeholder="Enter days schhol was opeded for the term"
//               className="w-full px-4 py-4 border border-gray-300 text-sm text-gray-700 appearance-none focus:outline-none"
//             />
//           </div>
//           <div className="h-full flex items-end">
//             <button className="bg-[#8000bd] text-white w-full py-3 rounded-sm text-lg font-semibold capitalize transition-colors cursor-pointer">
//               approve this result
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1] h-13">
//                 <tr>
//                   <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                     S/N
//                   </th>
//                   <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                     Campus
//                   </th>
//                   <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                     Session
//                   </th>
//                   <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                     Term
//                   </th>
//                   <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                     Subject
//                   </th>
//                   <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                     Class
//                   </th>
//                   <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
//                     Teacher
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {Result.map((result, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="py-3 px-4 text-sm text-gray-900 border-r border-gray-200 text-center">
//                       {result.no}
//                     </td>
//                     <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
//                       {result.campus}
//                     </td>
//                     <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
//                       {result.session}
//                     </td>
//                     <td className="py-3 px-2 text-sm text-gray-600 font-semibold border-r border-gray-200 text-center">
//                       {result.term}
//                     </td>
//                     <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
//                       {result.subject}
//                     </td>
//                     <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
//                       {result.class}
//                     </td>
//                     <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
//                       {result.teacher}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="px-6 py-2 border-t border-gray-200 bg-gray-50">
//             <div className="flex items-center justify-between">
//               <div className="text-sm text-gray-600">
//                 Showing 1-9 of {totalResult}
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>

//                 <div className="flex items-center space-x-1 font-space">
//                   {[1, 2, 3].map((page) => (
//                     <button
//                       key={page}
//                       onClick={() => setCurrentPage(page)}
//                       className={`w-8 h-8 rounded text-sm font-semibold transition-colors font-space ${
//                         currentPage === page
//                           ? "bg-[#8000BD] text-white"
//                           : "text-gray-600 hover:bg-gray-100"
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                   <span className="text-gray-400 px-2">...</span>
//                   <button
//                     onClick={() => setCurrentPage(totalPages)}
//                     className="w-8 h-8 rounded text-sm font-semibold text-gray-600 hover:bg-gray-100 font-space"
//                   >
//                     {totalPages}
//                   </button>
//                 </div>

//                 <button
//                   onClick={() =>
//                     setCurrentPage(Math.min(totalPages, currentPage + 1))
//                   }
//                   disabled={currentPage === totalPages}
//                   className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// }












import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

interface ResultItem {
  id: number;
  no: number;
  campus: string;
  session: string;
  term: string;
  subject: string;
  class: string;
  teacher: string;
}

export default function ViewApprovedResult() {
  // Filter states
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  // Data states
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ResultItem[]>([]);

  // Dropdown options
  const [campuses] = useState(["Campus 1", "Campus 2", "Campus 3"]);
  const [years] = useState(["2023/2024", "2024/2025", "2025/2026"]);
  const [terms] = useState(["1st Term", "2nd Term", "3rd Term"]);
  const [classes] = useState([
    "JSS 1",
    "JSS 2",
    "JSS 3",
    "SSS 1",
    "SSS 2",
    "SSS 3",
  ]);

  const totalResult = 223;
  const resultPerPage = 9;
  const totalPages = Math.ceil(totalResult / resultPerPage);

  const dummyResults = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    no: index + 1,
    campus: selectedCampus || "Campus 1",
    session: selectedYear || "2024/2025",
    term: selectedTerm || "2nd Term",
    subject: "Mathematics",
    class: selectedClass || "JSS 1",
    teacher: "Mr. John Doe",
  }));

  const handleFilter = () => {
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setResults(dummyResults);
      setIsFiltered(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <motion.div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
              Campus
            </label>
            <div className="relative">
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 text-sm text-gray-700 appearance-none focus:outline-none pr-10"
              >
                <option value="">Select Campus</option>
                {campuses.map((campus) => (
                  <option key={campus} value={campus}>
                    {campus}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
              Select Academy Year
            </label>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 text-sm text-gray-700 appearance-none focus:outline-none pr-10"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
              Select Academic Term
            </label>
            <div className="relative">
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 text-sm text-gray-700 appearance-none focus:outline-none pr-10"
              >
                <option value="">Select Term</option>
                {terms.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
              Select Class
            </label>
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 text-sm text-gray-700 appearance-none focus:outline-none pr-10"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#8000BD] px-6 py-3">
          <div className="flex items-center justify-center">
            <Search className="w-5 h-5 mr-2 text-white" />
            <button
              type="button"
              className="bg-transparent text-white font-semibold outline-none placeholder-white"
              onClick={handleFilter}
              disabled={isLoading}
            >
              {isLoading ? "FILTERING..." : "FILTER RESULT"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Table Container - Always visible but empty initially */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden py-6 px-3 xl:px-10 mt-10"
      >
        {/* Animated fields - Only show after filtering */}
        {isFiltered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-10 items-center"
          >
            <div>
              <label className="block text-sm font-bold font-inter text-gray-700 mb-2">
                Next term Begin
              </label>
              <input
                type="date"
                className="w-full px-4 py-4 border border-gray-300 text-sm text-gray-700 appearance-none focus:outline-none"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label className="block text-sm font-bold font-inter text-gray-700 mb-2">
                Days Opened
              </label>
              <input
                type="text"
                placeholder="Enter days school was opened for the term"
                className="w-full px-4 py-4 border border-gray-300 text-sm text-gray-700 appearance-none focus:outline-none"
              />
            </motion.div>
            <div className="h-full flex items-end">
              <button className="bg-[#8000bd] text-white w-full py-3 rounded-sm text-lg font-semibold capitalize transition-colors cursor-pointer">
                approve this result
              </button>
            </div>
          </motion.div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1] h-13">
                <tr>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    S/N
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Campus
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Session
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Term
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Subject
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Class
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                    Teacher
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.length > 0 ? (
                  results.map((result, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900 border-r border-gray-200 text-center">
                        {result.no}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                        {result.campus}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                        {result.session}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 font-semibold border-r border-gray-200 text-center">
                        {result.term}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                        {result.subject}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                        {result.class}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200 text-center">
                        {result.teacher}
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    {/* Show 5 empty rows */}
                    {Array.from({ length: 6 }).map((_, index) => (
                      <tr key={`empty-${index}`}>
                        <td
                          colSpan={7}
                          className="py-4 text-center text-gray-500"
                        >
                          {index === 2
                            ? "No results found. Apply filters to view data."
                            : "\u00A0"}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination - Only show when there are results */}
          {results.length > 0 && (
            <div className="px-6 py-2 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing 1-{Math.min(results.length, resultPerPage)} of{" "}
                  {totalResult}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex items-center space-x-1 font-space">
                    {[1, 2, 3].map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded text-sm font-semibold transition-colors font-space ${
                          currentPage === page
                            ? "bg-[#8000BD] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <span className="text-gray-400 px-2">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="w-8 h-8 rounded text-sm font-semibold text-gray-600 hover:bg-gray-100 font-space"
                    >
                      {totalPages}
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}