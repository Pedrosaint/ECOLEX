import { PiTagSimpleLight } from "react-icons/pi";

const academicData = [
  {
    academictitle: "Current Academic Session",
    academicSession: "2024/2025",
  },
  {
    academictitle: "Current Academic Term",
    academicSession: "First Term",
  },
];

const StaffInfo = () => {
  return (
    <div className="w-full">
      <div className="bg-[#D9D9D9] p-5">
        <h1 className="text-2xl font-medium text-gray-900">Academic info</h1>

        {academicData.map((academic, index) => (
        <div 
        key={index}
        className="mt-2 flex justify-between bg-white border-b border-[#D1D1D1] p-2">
          <div className="flex items-center">
            <div className="flex gap-2 items-center">
              <div className="">
                <PiTagSimpleLight size={25} />
              </div>
              <div className="">
                <p className="text-sm md:text-lg font-medium text-gray-700">
                 {academic.academictitle}
                </p>
              </div>
            </div>
          </div>
          <div className="text-sm md:text-lg">{academic.academicSession}</div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default StaffInfo;
