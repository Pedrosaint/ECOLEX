import { motion } from "framer-motion";
import {
  Printer,
  ChevronLeft,
  ChevronRight,
  Edit,
} from "lucide-react";
import { useEffect, useState } from "react"
import { TableSkeleton } from "../../../../general/ui/tables-skeleton.ui";
import Print from "../../../../general/common/print";



export default function ViewSubject() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Sample subject data matching the image
 const subject = [
   {
     subjectName: "English",
     addedBy: "Admin",
   },
   {
     subjectName: "Mathematics",
     addedBy: "Admin",
   },
   {
     subjectName: "Verbal Reasoning",
     addedBy: "Admin",
   },
 ];

  const totalStudents = 223;
  const studentsPerPage = 9;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="min-h-screen bg-gray-50">

          <div className="flex justify-end mt-5">
            <button 
            onClick={() => setIsPrintModalOpen(true)}
            className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center cursor-pointer space-x-2 text-sm font-semibold transition-colors">
              <Printer size={20} />
              <span>PRINT RECORD</span>
            </button>
          </div>

          <div className="mt-4">
            {/* Table Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5"
            >
              <h1 className="text-xl text-gray-900 mb-2 font-inter">
                All Subjects List
              </h1>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                      <tr>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          Subject Name
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                          Added By
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {subject.map((subject, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-center text-sm text-gray-900 border-r border-gray-200">
                            {subject.subjectName}
                          </td>
                          <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                            {subject.addedBy}
                          </td>
                          <td className="py-3 px-5">
                            <div className="flex items-center justify-center space-x-1">
                              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                <Edit size={20} className="text-gray-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {isPrintModalOpen && (
                  <Print onClose={() => setIsPrintModalOpen(false)} />
                )}

                {/* Pagination */}
                <div className="px-6 py-2 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Showing 1-9 of {totalStudents}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
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
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}
