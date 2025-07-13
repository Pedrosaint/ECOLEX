import {
  Plus,
  Printer,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Edit,
  Search,
} from "lucide-react";
import { FaSearchPlus } from "react-icons/fa";
import { useState } from "react";

export default function ListOfClasses() {
  const [currentPage, setCurrentPage] = useState(1);

  // Sample student data matching the image
  const students = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    no: index + 1,
    campusName: "Class A",
    address: "N0 5 adama street, fct.",
    principal : "Mrs Uzoechi",
    number: "09044523114",
    email: "admin@gmail.com",
    noOfStudent: "23",
    noOfStaff: "23",
  }));

  const totalStudents = 223;
  const studentsPerPage = 9;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Orange Header */}
      <div className="bg-[#F4A300] px-6 py-3">
        <div className="flex items-center justify-center text-white font-semibold">
          <Search className="w-5 h-5 mr-2" />
          DISPLAY STUDENTS
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <button className="bg-[#4B0082] text-white px-2 py-2 rounded-sm flex items-center space-x-2 text-sm font-semibold transition-colors">
          <Printer size={20} />
          <span>PRINT RECORD</span>
        </button>
      </div>

      <div className="mt-9">
        {/* Top Section */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-4xl font-meduim text-gray-900 mb-1 font-inter">
              Campuses
            </h1>
          </div>
          <div className="flex items-center">
            <div className=" text-[#000000] px-2 py-2 rounded-lg text-lg font-medium font-inter transition-colors">
              <span>Add New Campus</span>
            </div>
            <div className="bg-white shadow-2xl p-2 rounded-lg flex items-center justify-center cursor-pointer">
              <Plus size={20} />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5 mt-">
          <h1 className="text-xl text-gray-900 mb-2 font-inter">
            All Campuses List
          </h1>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                  <tr>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      No
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Campus Name
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Address
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Principal
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Number
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Email
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      No of Students
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      No of Staff
                    </th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-center text-sm text-gray-900 border-r border-gray-200">
                        {student.no}
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                        {student.campusName}
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                        {student.address}
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                        {student.principal}
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                        {student.number}
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                        {student.email}
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                        {student.noOfStudent}
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-gray-600 border-r border-gray-200">
                        {student.noOfStaff}
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center justify-center space-x-1">
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <FaSearchPlus size={20} className="text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <Edit size={20} className="text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <Trash2
                              size={20}
                              className="text-gray-400 hover:text-red-600"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-2 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing 1-9 of {totalStudents}
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
          </div>
        </div>
      </div>
    </div>
  );
}
