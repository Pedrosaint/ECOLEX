import {
  Search,
  Plus,
  Printer,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaSearchPlus } from "react-icons/fa";
import { useState } from "react";
import CompareIcon from "../../../../assets/icon/change-icon";

export default function StudentsList() {
  const [currentPage, setCurrentPage] = useState(1);

  // Sample student data matching the image
  const students = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    no: index + 1,
    campus: "Campus 1",
    regNo: "ECO12543",
    surname: index === 1 ? "Obi" : "Amachi",
    otherName: "chinyere Victoria",
    gender: "Female",
    dob: "12/2/25",
    guardianName: "Mrs Uzoechi",
    guardianNo: "09044523114",
    lifestyle: index === 1 ? "Boarder" : "Day",
    class: index === 1 ? "ss1" : "ss2",
    passport: "🛂",
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

      <div className="mt-10">
        {/* Top Section */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-4xl font-meduim text-gray-900 mb-1 font-inter">
              Students
            </h1>
          </div>
          <div className="flex items-center">
            <div className=" text-[#000000] px-2 py-2 rounded-lg text-lg font-semibold transition-colors">
              <span>Add New Student</span>
            </div>
            <div className="bg-white shadow-2xl p-2 rounded-lg flex items-center justify-center cursor-pointer">
              <Plus size={20} />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5">
          <h1 className="text-xl text-gray-900 mb-2 font-inter">
            All Students List
          </h1>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                  <tr>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      No
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Campus
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Reg. No
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Surname
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Other name
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Gender
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      DOB
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Guardian Name
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Guardian No.
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Lifestyle
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Class
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider border-r border-gray-200">
                      Pass <br /> port
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900 border-r border-gray-200">
                        {student.no}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                        {student.campus}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                        {student.regNo}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 font-semibold border-r border-gray-200">
                        {student.surname}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                        {student.otherName}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                        {student.gender}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                        {student.dob}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                        {student.guardianName}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                        {student.guardianNo}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                        {student.lifestyle}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 border-r border-gray-200">
                        {student.class}
                      </td>
                      <td className="py-3 px-2 text-sm border-r border-gray-200">
                        <div className="">
                          <div className="rounded flex items-center justify-center">
                            <img src="images/passport.png" alt="passport" />
                          </div>
                          <p className="ml-1 text-xs text-gray-600">Passport</p>
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center space-x-1">
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <FaSearchPlus
                              size={20}
                              className="text-gray-400"
                            />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <CompareIcon size={20} className="text-gray-400" />
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
