import male from "../../../../assets/image/male.png";
import female from "../../../../assets/image/female.png";

interface Props {
  total: number;
  boys: number;
  girls: number;
  isLoading?: boolean;
}

export default function StudentsChart({ total, boys, girls, isLoading }: Props) {
  // boys and girls come from the API already as percentages (e.g. 75, 25)
  const boysCount = Math.round((boys / 100) * total);
  const girlsCount = Math.round((girls / 100) * total);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const boysStrokeDasharray = `${(boys / 100) * circumference} ${circumference}`;
  const girlsStrokeDasharray = `${(girls / 100) * circumference} ${circumference}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 py-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-900">Students</h2>
        <span className="text-sm font-bold text-[#8000BD]">{total}</span>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[200px] gap-3">
          <div className="w-8 h-8 border-4 border-[#8000BD] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      ) : (
        <>
          {/* Donut Chart */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <svg width="200" height="200" className="transform -rotate-90">
                <circle cx="100" cy="100" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="16" />
                <circle cx="100" cy="100" r={radius - 25} fill="none" stroke="#f3f4f6" strokeWidth="16" />
                <circle
                  cx="100" cy="100" r={radius}
                  fill="none" stroke="#CFCEFF" strokeWidth="16"
                  strokeDasharray={boysStrokeDasharray}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-in-out"
                />
                <circle
                  cx="100" cy="100" r={radius - 25}
                  fill="none" stroke="#FFED9F" strokeWidth="16"
                  strokeDasharray={girlsStrokeDasharray}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-in-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center">
                  <img src={male} alt="Male" />
                  <img src={female} alt="Female" className="-ml-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-300 rounded-full" />
              <span className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">{boys}%</span>
                <span className="text-gray-500"> (Boys · {boysCount})</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-300 rounded-full" />
              <span className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">{girls}%</span>
                <span className="text-gray-500"> (Girls · {girlsCount})</span>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
