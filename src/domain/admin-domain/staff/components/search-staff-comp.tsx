import { useState } from "react";


export default function SearchStaffComp() {
  const [campus, setCampus] = useState("Campus 1");
  const [searchSubject, setSearchSubject] = useState("");
  const [duty, setDuty] = useState("");
  const [searchClass, setSearchClass] = useState("");


  return (
    <div className="w-full">
      <div className="grid grid-cols-1:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
        {/* Campus Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Campus
          </label>
          <select
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          ></select>
        </div>

        {/* Search By Name Input */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Search By Name
          </label>
          <input
            type="text"
            placeholder="e.g Emeka"
            value={searchSubject}
            onChange={(e) => setSearchSubject(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Search By Gender Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Search By Duty
          </label>
          <select
            value={duty}
            onChange={(e) => setDuty(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm text-gray-400 focus:outline-none"
          ></select>
        </div>

        {/* Search By Class Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Search By Class
          </label>
          <select
            value={searchClass}
            onChange={(e) => setSearchClass(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm text-gray-400 focus:outline-none"
          ></select>
        </div>

        {/* Select Group Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Select Subject
          </label>
          <input
            type="text"
            placeholder="e.g Mathemactics"
            value={searchSubject}
            onChange={(e) => setSearchSubject(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
