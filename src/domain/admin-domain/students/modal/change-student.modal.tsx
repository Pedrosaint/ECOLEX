import { useState } from "react";
import { Search, X } from "lucide-react";
import { IoRefreshSharp } from "react-icons/io5";

const ChangeStudentModal = ({onClose}: {onClose: () => void}) => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const students = [
    {
      id: "1",
      regNo: "ECO234",
      surname: "Jude",
      otherNames: "Precious",
      gender: "Female",
      currentClass: "SSS1",
    },
    // Empty rows for display
    ...Array(4)
      .fill(null)
      .map((_, index) => ({
        id: `${index + 2}`,
        regNo: "",
        surname: "",
        otherNames: "",
        gender: "",
        currentClass: "",
      })),
  ];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((student) => student.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectStudent = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white -2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-auto rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            Change Student Class
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 -lg transition-colors duration-200"
          >
            <X className="" />
          </button>
        </div>

        {/* Filter Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campus
              </label>
              <select className="w-full px-3 py-2 border border-gray-300  bg-white">
                <option>Campus 1</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Student Class
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 ">
                <option>Choose</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Group
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 ">
                <option>Choose</option>
              </select>
            </div>
            <div>
              <button className="w-full bg-[#8000BD] text-white px-6 py-2  font-medium  transition-colors duration-200 flex items-center justify-center space-x-2 cursor-pointer">
                <Search className="h-4 w-4" />
                <span>FILTER</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-5 md:px-10 py-6">
          {/* Update Section */}
          <div className="p-6 bg-[#EDEDED] border border-gray-200 rounded-t-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Student To
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 ">
                  <option>Choose</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Class
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 ">
                  <option>Choose</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Group
                </label>
                <select className="w-full px-3 py-2 border border-gray-300">
                  <option>Choose</option>
                </select>
              </div>
              <div>
                <button className="w-full bg-[#A4A9AE] text-white px-6 py-2 flex items-center justify-center space-x-2 cursor-pointer">
                  <IoRefreshSharp size={20} />
                  <span>UPDATE</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="p-6 max-h-96 bg-[#F5F4F9] border border-gray-200 rounded-b-2xl">
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full border-collapse">
                <thead className="bg-[#EDF9FD] border-b border-[#D1D1D1]">
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-medium text-gray-700 border-r border-gray-200">
                      <div className="md:flex items-center md:space-x-2 space-y-6 md:space-y-0">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="border-gray-300"
                        />
                        <span className="text-sm sm:text-base sm:rotate-0 -rotate-45 block">
                          Mark All
                        </span>
                      </div>
                    </th>
                    <th className="text-left p-5 font-medium text-gray-700 border-r border-gray-200">
                      <span className="text-sm sm:text-base sm:rotate-0 -rotate-45 block">
                        Reg. No
                      </span>
                    </th>
                    <th className="text-left p-5 font-medium text-gray-700 border-r border-gray-200">
                      <span className="text-sm sm:text-base sm:rotate-0 -rotate-45 block">
                        Surname
                      </span>
                    </th>
                    <th className="text-left p-5 font-medium text-gray-700 border-r border-gray-200">
                      <span className="text-sm sm:text-base sm:rotate-0 -rotate-45 block">
                        Other Names
                      </span>
                    </th>
                    <th className="text-left p-5 font-medium text-gray-700 border-r border-gray-200">
                      <span className="text-sm sm:text-base sm:rotate-0 -rotate-45 block">
                        Gender
                      </span>
                    </th>
                    <th className="text-left p-5 font-medium text-gray-700 border-r border-gray-200">
                      <span className="text-sm sm:text-base sm:rotate-0 -rotate-45 block">
                        Current Class
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 hover:bg-gray-50"
                    >
                      <td className="p-3 border-r border-gray-200">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleSelectStudent(student.id)}
                          className=" border-gray-300 text-purple-600 "
                        />
                      </td>
                      <td className="p-3 text-gray-900 border-r border-gray-200">
                        {student.regNo}
                      </td>
                      <td className="p-3 text-gray-900 border-r border-gray-200">
                        {student.surname}
                      </td>
                      <td className="p-3 text-gray-900 border-r border-gray-200">
                        {student.otherNames}
                      </td>
                      <td className="p-3 text-gray-900 border-r border-gray-200">
                        {student.gender}
                      </td>
                      <td className="p-3 text-gray-900 border-r border-gray-200">
                        {student.currentClass}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing 1-8 of 223</div>

            <div className="flex items-center space-x-2">
              <button className="px-2 py-1  hover:text-gray-700">{"<"}</button>

              <div className="flex items-center space-x-1">
                <button className="w-8 h-8 -lg bg-purple-600 text-white text-sm font-medium">
                  1
                </button>
                <button className="w-8 h-8 -lg border border-gray-300 hover:bg-gray-50 text-sm font-medium text-gray-700">
                  2
                </button>
                <button className="w-8 h-8 -lg border border-gray-300 hover:bg-gray-50 text-sm font-medium text-gray-700">
                  3
                </button>
                <span className="px-2 ">...</span>
                <button className="w-8 h-8 -lg border border-gray-300 hover:bg-gray-50 text-sm font-medium text-gray-700">
                  126
                </button>
              </div>

              <button className="px-2 py-1  hover:text-gray-700">{">"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeStudentModal;
