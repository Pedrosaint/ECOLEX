import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BsChevronExpand } from "react-icons/bs";

export default function CustomizeSchoolName() {
  const navigate = useNavigate();
  const [isEarlyEducationActive, setIsEarlyEducationActive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedNamingStyle, setSelectedNamingStyle] = useState<
      string | null
    >(null);

  const handleBackToCampus = () => {
    navigate("/auth/input-campus");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="">
        {/* Back to campus link */}
        <button
          onClick={handleBackToCampus}
          className="flex items-center text-gray-600 cursor-pointer mb-8"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="text-sm">Back to campus</span>
        </button>

        {/* Main heading */}
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold text-gray-900">
            Customize your school's class naming system
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            Please configure how your school names and structures its class
            levels. You can customize each section to match your school's naming
            pattern
          </p>
        </div>

        {/* Early Education Section */}
        <div className="">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Early Education
          </h2>

          {/* Activate Early Education Toggle */}
          <div className="flex items-center justify-between mb-6 bg-[#FAF7FC]">
            <span className="text-sm text-gray-700">
              Activate Early Education
            </span>
            <button
              onClick={() => setIsEarlyEducationActive(!isEarlyEducationActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isEarlyEducationActive ? "bg-[#8000BD]" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isEarlyEducationActive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Naming Style Dropdown */}
          <div className="w-full max-w-md">
            <div className="mb-6">
              <label className="block text-sm text-gray-700 mb-2">
                Naming Style
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md focus:outline-none flex items-center justify-between"
                >
                  <span
                    className={
                      selectedNamingStyle ? "text-gray-700" : "text-gray-500"
                    }
                  >
                    {selectedNamingStyle || "Select naming style"}
                  </span>
                  <BsChevronExpand size={20} className="text-gray-400" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                      {[
                        "Creche",
                        "Daycare",
                        "Nursery",
                        "Kindergarten",
                        "Montessori",
                        "Pre-K",
                        "KG (KG1, KG2)",
                        "Early Years",
                        "Foundation Stage",
                        "Reception",
                      ].map((option) => (
                        <button
                          key={option}
                          className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            setSelectedNamingStyle(option);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Start and End Class Level Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Start Class Level
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  End Class Level
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
