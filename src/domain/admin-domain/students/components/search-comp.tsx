import { useState } from "react";


export default function SearchInterface() {
  const [campus, setCampus] = useState("Campus 1");
  const [searchName, setSearchName] = useState("");
  const [gender, setGender] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [group, setGroup] = useState("All Groups");

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
        {/* Campus Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">Campus</label>
          <select
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          >
            <option value="Campus 1">Campus 1</option>
            <option value="Campus 4">Campus 4</option>
            <option value="Campus 3">Campus 3</option>
          </select>
        </div>

        {/* Search By Name Input */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Search By Name
          </label>
          <input
            type="text"
            placeholder="e.g Emeka"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Search By Gender Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Search By Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm text-gray-400 focus:outline-none"
          >
            <option value="" disabled>
              Choose
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
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
          >
            <option value="" disabled>
              Choose
            </option>
            <option value="Class A">Class A</option>
            <option value="Class B">Class B</option>
            <option value="Class C">Class C</option>
          </select>
        </div>

        {/* Select Group Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-4">
            Select Group
          </label>
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          >
            <option value="All Groups">All Groups</option>
            <option value="Group 1">Group 1</option>
            <option value="Group 4">Group 4</option>
            <option value="Group 3">Group 3</option>
          </select>
        </div>
      </div>
    </div>
  );
}
