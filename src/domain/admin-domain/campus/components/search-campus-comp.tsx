import { useState } from "react";


export default function SearchCampusComp() {
  const [campus, setCampus] = useState("Campus 1");
  const [searchLevel, setSearchLevel] = useState("");



  return (
    <div className="w-full">
      <div className="grid grid-cols-1:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
        {/* Campus Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            state
          </label>
          <select
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          ></select>
        </div>

        {/* Search By Level Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Level
          </label>
          <select
            value={searchLevel}
            onChange={(e) => setSearchLevel(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
