import {
  Search,
  ChevronDown,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ListOfStudents() {
  // Sample student data - repeated to match the image
  const students = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    no: "01",
    name: "Sophia Wilson",
    rollNum: "522bcd009",
    class: "12 - A",
    accomType: "Hosteller",
    transport: "No",
    location: "Singamulur",
    contact: "82486 69086",
    additionalInfo: "28980",// Some rows have this additional field
    avatar: "bg-red-400", // Using colored background for avatar
  }));

  return (
    <div className="">
      <div className="">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">
                All Students List
              </h1>
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by Name or roll..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {/* Classes Dropdown */}
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>All Classes</option>
                    <option>12 - A</option>
                    <option>12 - B</option>
                    <option>11 - A</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    No
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Students
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Roll num
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Class
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Accom_Type
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Transport
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Contact
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Additional info
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student, index) => (
                  <tr
                    key={student.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {student.no}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 ${student.avatar} rounded-full flex-shrink-0`}
                        ></div>
                        <span className="text-sm font-medium text-gray-900">
                          {student.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {student.rollNum}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {student.class}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {student.accomType}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {student.transport}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {student.location}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {student.contact}
                    </td>
                    <td className="py-3 px-4">
                        {student.additionalInfo}
                    </td>
                    <td className="py-3 px-4">
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <Edit className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-sm text-gray-600">Page 1 of 15</span>

              <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
