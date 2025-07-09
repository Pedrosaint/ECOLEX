import { ArrowLeft, Search, Bell, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <ArrowLeft className="w-5 h-5 text-gray-600 cursor-pointer" />
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="text-sm text-gray-700">Admin name</span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </div>
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
}
