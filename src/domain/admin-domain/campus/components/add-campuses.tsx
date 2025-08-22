import { motion } from "framer-motion";
import { useState } from "react";

export default function AddCampuses() {
  const [campus, setcampus] = useState("");
  const [address, setaddress] = useState("");
  const [number, setnumber] = useState("");
  const [email, setemail] = useState("");
  const [principal, setprincipal] = useState("");

  // Temporary dummy values
  const noOfStudent = "23";
  const noOfStaff = "50" 



  const isFormComplete =
    campus.trim() !== "" &&
    address.trim() !== "" &&
    number.trim() !== "" &&
    principal.trim() !== "" &&
    email.trim() !== "" &&
    noOfStudent.trim() !== "" &&
    noOfStaff.trim() !== "";

  return (
    <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="w-full border border-gray-300 rounded-lg p-6 bg-white shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Custom Class Name Input */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
            Campus Name
          </label>
          <input
            value={campus}
            placeholder="Mercy Model College"
            onChange={(e) => setcampus(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
            Address
          </label>
          <input
            value={address}
            placeholder="E.g.,  No 12, Ambrose Allie"
            onChange={(e) => setaddress(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          />
        </div>

        {/* Class Name Dropdown (custom controlled like Category) */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
            Principal Name
          </label>
          <input
            value={principal}
            placeholder="Mr Jude Wike"
            onChange={(e) => setprincipal(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
            Number
          </label>
          <input
            value={number}
            maxLength={11}
            placeholder="E.g 09044523114"
            onChange={(e) => setnumber(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
            Email
          </label>
          <input
            value={email}
            placeholder="E.g mercy@gmail.com"
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
          No. of Students
          </label>
          <div
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          >{noOfStudent}</div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
            No. of Staff
          </label>
          <div
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          >{noOfStaff}</div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center">
          <button
            disabled={!isFormComplete}
            className={`text-white w-full px-4 py-4 rounded text-lg font-semibold transition-colors duration-200 ${
              isFormComplete
                ? "bg-[#8000BD] cursor-pointer"
                : "bg-[#D9D9D9] cursor-not-allowed"
            }`}
          >
            Add Campus
          </button>
        </div>
      </div>

      {/* Success Message */}
      <div className="bg-[#67D424] px-6 py-3 mt-4">
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="bg-transparent text-white font-semibold outline-none placeholder-white"
          >
            Campus was added successfully
          </button>
        </div>
      </div>
    </motion.div>
  );
}
