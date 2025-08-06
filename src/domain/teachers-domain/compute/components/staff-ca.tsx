const StaffCa = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <p className="text-gray-700 text-sm">
            Add continuous assessment and examination scores for each student
            respectively.
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <span>✕</span>
            CANCEL
          </button>
        </div>
        <p className="text-red-500 text-sm font-medium">
          Do not add any score for a student who don't offer your subject.
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
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
                Total <span className="text-xs text-gray-500">(100 Marks)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Student 1 */}
            <tr className="border-b border-gray-200">
              <td className="border-r border-gray-300 px-4 py-6 text-sm text-gray-700 text-center">
                1
              </td>
              <td className="border-r border-gray-300 px-4 py-6 text-sm text-gray-700">
                FIS07854
              </td>
              <td className="border-r border-gray-300 px-4 py-6 text-sm text-gray-700">
                Ani Victor Tochukwu
              </td>
              <td className="border-r border-gray-300 px-4 py-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Canceled</span>
                  </div>
                  <input
                    type="number"
                    value="10"
                    className="w-16 h-8 text-center border border-gray-300 rounded text-sm"
                    readOnly
                  />
                </div>
              </td>
              <td className="border-r border-gray-300 px-4 py-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Canceled</span>
                  </div>
                  <input
                    type="number"
                    value="0"
                    className="w-16 h-8 text-center border border-gray-300 rounded text-sm"
                    readOnly
                  />
                </div>
              </td>
              <td className="border-r border-gray-300 px-4 py-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Canceled</span>
                  </div>
                  <input
                    type="number"
                    value="19"
                    className="w-16 h-8 text-center border border-gray-300 rounded text-sm"
                    readOnly
                  />
                </div>
              </td>
              <td className="border-r border-gray-300 px-4 py-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Canceled</span>
                  </div>
                  <input
                    type="number"
                    value="22"
                    className="w-16 h-8 text-center border border-gray-300 rounded text-sm"
                    readOnly
                  />
                </div>
              </td>
              <td className="px-4 py-6 text-center">
                <div className="bg-gray-100 rounded px-3 py-2 text-sm font-medium text-gray-700">
                  51
                </div>
              </td>
            </tr>

            {/* Student 2 */}
            <tr className="border-b border-gray-200">
              <td className="border-r border-gray-300 px-4 py-6 text-sm text-gray-700 text-center">
                2
              </td>
              <td className="border-r border-gray-300 px-4 py-6 text-sm text-gray-700">
                FIS10180
              </td>
              <td className="border-r border-gray-300 px-4 py-6 text-sm text-gray-700">
                Biola Reachel
              </td>
              <td className="border-r border-gray-300 px-4 py-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Canceled</span>
                  </div>
                  <input
                    type="number"
                    value="10"
                    className="w-16 h-8 text-center border border-gray-300 rounded text-sm"
                    readOnly
                  />
                </div>
              </td>
              <td className="border-r border-gray-300 px-4 py-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Canceled</span>
                  </div>
                  <input
                    type="number"
                    value="8"
                    className="w-16 h-8 text-center border border-gray-300 rounded text-sm"
                    readOnly
                  />
                </div>
              </td>
              <td className="border-r border-gray-300 px-4 py-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Canceled</span>
                  </div>
                  <input
                    type="number"
                    value="20"
                    className="w-16 h-8 text-center border border-gray-300 rounded text-sm"
                    readOnly
                  />
                </div>
              </td>
              <td className="border-r border-gray-300 px-4 py-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <input type="checkbox" className="w-3 h-3" />
                    <span>Canceled</span>
                  </div>
                  <input
                    type="number"
                    value="27"
                    className="w-16 h-8 text-center border border-gray-300 rounded text-sm"
                    readOnly
                  />
                </div>
              </td>
              <td className="px-4 py-6 text-center">
                <div className="bg-gray-100 rounded px-3 py-2 text-sm font-medium text-gray-700">
                  65
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium text-sm">
          Submit to Compute
        </button>
      </div>
    </div>
  );
};

export default StaffCa;
