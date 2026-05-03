import { PiTagSimpleLight } from "react-icons/pi";
import { useDashboard } from "../hooks";

const academicData = [
  { key: "session", academictitle: "Current Academic Session" },
  { key: "term", academictitle: "Current Academic Term" },
] as const;

type AcademicKey = typeof academicData[number]["key"];

const StaffInfo = () => {
  const { isLoading, activeTermData, isActiveTermLoading } = useDashboard();

  if (isLoading || isActiveTermLoading) {
    return (
      <div className="w-full">
        <div className="bg-[#D9D9D9] p-5">
          <div className="h-7 w-36 bg-gray-300 rounded animate-pulse mb-3" />
          {[0, 1].map((i) => (
            <div key={i} className="mt-2 flex justify-between bg-white border-b border-[#D1D1D1] p-2 animate-pulse">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded" />
                <div className="h-4 w-44 bg-gray-200 rounded" />
              </div>
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getAcademicValue = (key: AcademicKey): string => {
    if (key === "session") return activeTermData?.data?.activeSession?.name ?? "—";
    if (key === "term") return activeTermData?.data?.activeTerm?.name ?? "—";
    return "—";
  };

  return (
    <div className="w-full">
      <div className="bg-[#D9D9D9] p-5">
        <h1 className="text-2xl font-medium text-gray-900">
          Academic info
        </h1>

        {academicData.map((item, index) => (
          <div
            key={index}
            className="mt-2 flex justify-between bg-white border-b border-[#D1D1D1] p-2"
          >
            <div className="flex items-center gap-2">
              <PiTagSimpleLight size={25} />
              <p className="text-sm md:text-lg font-medium text-gray-700">
                {item.academictitle}
              </p>
            </div>

            <div className="text-sm md:text-lg">
              {getAcademicValue(item.key)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffInfo;