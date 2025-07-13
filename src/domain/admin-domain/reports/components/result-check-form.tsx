
import { ChevronDown, ChevronUp } from "lucide-react"; // Using Lucide icons for the group dropdown arrows

export default function ResultCheckForm() {
  return (
    <>
      <div className="w-full max-w-xl">
        {/* Check Class Result Section */}
        <div className="">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Check Class Result
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="class-campus"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Campus
              </label>
              <input
                type="text"
                id="class-campus"
                placeholder="Select Campus"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="class-term"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Term
              </label>
              <input
                type="text"
                id="class-term"
                placeholder="Select Term"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="class-year"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Year
              </label>
              <input
                type="text"
                id="class-year"
                placeholder="Select Year"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="class-class"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Class
              </label>
              <input
                type="text"
                id="class-class"
                placeholder="Select Class"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="class-group"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Group
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="class-group"
                  placeholder="Select Group"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent pr-10"
                />
                <div className="absolute right-3 top-1/3 transform -translate-y-1/3 flex flex-col space-y-0.5">
                  <ChevronUp className="w-3 h-3 text-gray-400" />
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <button className="mt-8 bg-[#4B0082] text-white px-6 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer">
            Display Result
          </button>
        </div>

        {/* Check Individual Student Result Section */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Check Individual Student Result
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="student-campus"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Campus
              </label>
              <input
                type="text"
                id="student-campus"
                placeholder="Enter Campus"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="student-class"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Class
              </label>
              <input
                type="text"
                id="student-class"
                placeholder="Enter Class"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="student-name"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Student Name
              </label>
              <input
                type="text"
                id="student-name"
                placeholder="Enter Student Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="student-id"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                ID
              </label>
              <input
                type="text"
                id="student-id"
                placeholder="Enter ID Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="mt-8 bg-[#4B0082] text-white px-6 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer">
            Display Result
          </button>
        </div>

        {/* Teacher's Submitted Result Section */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Teacher's Submitted Result
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="teacher-campus"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Campus
              </label>
              <input
                type="text"
                id="teacher-campus"
                placeholder="Enter Campus"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="teacher-name"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Teachers Name
              </label>
              <input
                type="text"
                id="teacher-name"
                placeholder="Enter Teachers Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="teacher-class"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Class
              </label>
              <input
                type="text"
                id="teacher-class"
                placeholder="Enter Class"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="teacher-subject"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Subject
              </label>
              <input
                type="text"
                id="teacher-subject"
                placeholder="Enter Subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="teacher-term"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Term
              </label>
              <input
                type="text"
                id="teacher-term"
                placeholder="Enter Term"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="teacher-year"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Year
              </label>
              <input
                type="text"
                id="teacher-year"
                placeholder="Enter Year"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="mt-8 bg-[#4B0082] text-white px-6 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer">
            Display Result
          </button>
        </div>
      </div>
    </>
  );
}
