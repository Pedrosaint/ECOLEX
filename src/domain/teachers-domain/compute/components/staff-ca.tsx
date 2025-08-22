import { motion } from "framer-motion";

const StaffCa = () => {
  // Student data array
  const students = [
    {
      id: 1,
      regNo: "FIS07854",
      name: "Ani Victor Tochukwu",
      ca1: 10,
      ca2: 0,
      ca3: 19,
      exam: 22,
      total: 51,
    },
    {
      id: 2,
      regNo: "FIS10180",
      name: "Biola Reachel",
      ca1: 10,
      ca2: 8,
      ca3: 20,
      exam: 27,
      total: 65,
    },
    // Add more students as needed
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-6 bg-white border border-gray-200 mt-5"
    >
      {/* Header Section */}
      <div className="bg-gray-100 p-5 shadow-sm">
        <div className="flex justify-between items-start">
          <p className="text-gray-700 text-sm md:text-lg">
            Add continuous assessment and examination scores for each student
            respectively.
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-2 md:px-4 py-1 md:py-2 rounded flex items-center gap-2 text-sm md:text-lg">
            <span>✕</span>
            CANCEL
          </button>
        </div>
        <p className="text-red-500 text-sm md:text-3xl font-inter font-medium">
          Do not add any score for a student who don't offer your subject.
        </p>
      </div>

      {/* Table Container with horizontal scrolling */}
      <div className="overflow-x-auto">
        <div className="bg-white overflow-hidden mb-6 border border-gray-200 min-w-[800px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300 h-20">
                <th className="border-r border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  S/N
                </th>
                <th className="border-r border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Reg. No
                </th>
                <th className="border-r border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Students Name
                </th>
                <th className="border-r border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                  CA1 <span className="text-xs text-gray-500">(10 Marks)</span>
                </th>
                <th className="border-r border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                  CA2 <span className="text-xs text-gray-500">(10 Marks)</span>
                </th>
                <th className="border-r border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                  CA3 <span className="text-xs text-gray-500">(30 Marks)</span>
                </th>
                <th className="border-r border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700">
                  EXAM <span className="text-xs text-gray-500">(50 Marks)</span>
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                  Total{" "}
                  <span className="text-xs text-gray-500">(100 Marks)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-200">
                  <td className="border-r border-gray-300 px-4 py-6 text-sm text-gray-700 text-center">
                    {student.id}
                  </td>
                  <td className="border-r border-gray-300 px-4 py-6 text-sm text-gray-700">
                    {student.regNo}
                  </td>
                  <td className="border-r border-gray-300 px-4 py-6 text-sm text-gray-700">
                    {student.name}
                  </td>
                  <td className="border-r border-gray-300 px-4 py-6">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mr-3">
                        <input type="checkbox" className="w-3 h-3" />
                        <span>Absent</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <input type="checkbox" className="w-3 h-3" />
                        <span>Canceled</span>
                      </div>
                      <input
                        type="number"
                        value={student.ca1}
                        className="w-16 h-8 text-center border border-gray-300 rounded text-sm"
                        readOnly
                      />
                    </div>
                  </td>
                  <td className="border-r border-gray-300 px-4 py-6">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mr-3">
                        <input type="checkbox" className="w-3 h-3" />
                        <span>Absent</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <input type="checkbox" className="w-3 h-3" />
                        <span>Canceled</span>
                      </div>
                      <input
                        type="number"
                        value={student.ca2}
                        className="w-16 h-8 text-center border border-gray-300 rounded text-sm"
                        readOnly
                      />
                    </div>
                  </td>
                  <td className="border-r border-gray-300 px-4 py-6">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mr-3">
                        <input type="checkbox" className="w-3 h-3" />
                        <span>Absent</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <input type="checkbox" className="w-3 h-3" />
                        <span>Canceled</span>
                      </div>
                      <input
                        type="number"
                        value={student.ca3}
                        className="w-16 h-8 text-center border border-gray-300 rounded text-sm"
                        readOnly
                      />
                    </div>
                  </td>
                  <td className="border-r border-gray-300 px-4 py-6">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mr-3">
                        <input type="checkbox" className="w-3 h-3" />
                        <span>Absent</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <input type="checkbox" className="w-3 h-3" />
                        <span>Canceled</span>
                      </div>
                      <input
                        type="number"
                        value={student.exam}
                        className="w-16 h-8 text-center border border-gray-300 rounded text-sm"
                        readOnly
                      />
                    </div>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <div className="px-3 py-2 text-sm font-medium text-gray-700">
                      {student.total}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button className="bg-[#4B0082] text-white px-8 py-3 rounded-sm font-medium text-sm w-full max-w-md">
          Submit to Compute
        </button>
      </div>
    </motion.div>
  );
};

export default StaffCa;
