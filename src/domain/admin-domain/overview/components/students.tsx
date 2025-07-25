import { MoreHorizontal } from "lucide-react";
import male from "../../../../assets/image/male.png";
import female from "../../../../assets/image/female.png";

export default function StudentsChart() {
  // Chart data
  const boysPercentage = 90;
  const girlsPercentage = 60;

  // Calculate stroke-dasharray for separate circles
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  // Boys circle (purple) - larger arc
  const boysStrokeDasharray = `${
    (boysPercentage / 100) * circumference
  } ${circumference}`;

  // Girls circle (yellow) - smaller arc, positioned after boys
  const girlsStrokeDasharray = `${
    (girlsPercentage / 100) * circumference
  } ${circumference}`;


  return (
    <div className="">
      <div className="bg-white rounded-4xl shadow-sm border border-gray-200  px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-gray-900 font-sans">Students</h2>
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Donut Chart */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <svg width="200" height="200" className="transform -rotate-90">
              {/* Background circles */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="16"
              />
              <circle
                cx="100"
                cy="100"
                r={radius - 25}
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="16"
              />

              {/* Boys circle (purple) - outer ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#CFCEFF"
                strokeWidth="16"
                strokeDasharray={boysStrokeDasharray}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-in-out"
              />

              {/* Girls circle (yellow) - inner ring */}
              <circle
                cx="100"
                cy="100"
                r={radius - 25}
                fill="none"
                stroke="#FFED9F"
                strokeWidth="16"
                strokeDasharray={girlsStrokeDasharray}
                // strokeDashoffset={girlsStrokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>

            {/* Center icons */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center ">
                {/* Male icon */}
                <img src={male} alt="" />
                {/* Female icon */}
              <img src={female} alt="" className="-ml-5"/>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <span className="text-sm text-gray-700">
              <span className="font-medium text-gray-900">
                {boysPercentage}%
              </span>
              <span className="text-gray-500"> ( boys )</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-sm text-gray-700">
              <span className="font-medium text-gray-900">
                {girlsPercentage}%
              </span>
              <span className="text-gray-500"> ( Girls )</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
