import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BsChevronExpand } from "react-icons/bs";
import { useAppDispatch } from "../../hooks/typed.hooks";
import { setSchoolStages } from "../../auth/redux/school-slice";

const EearlyEducationDropdown = [
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
];

const PrimaryDropdown = [
    "Basic (Basic 1-6)",
    "Primary (Primary 1-6)",
    "Elementary (Grade 1-6)",
    "Lower Primary / Upper Primary",
    "Key Stage 1 & 2",
    "Grade School",
];

const JuniorSecondaryDropdown = [
    "Junior Secondary",
    "Junior High",
    "Middle School (Grades 6-8)",
    "College 1-3",
    "Basic 7-9",
];

const SeniorSecondaryDropdown = [
    "SS (SS 1-3)",
    "SSS",
    "SHS (Senior High School)",
    "College 4-6",
    "Grade 10-12",
    "High School",
];


export default function CustomizeSchoolName() {
    const navigate = useNavigate();
    const [isEarlyEducationActive, setIsEarlyEducationActive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedEarlyName, setSelectedEarlyName] = useState<string | null>(null);

    const [isPrimaryActive, setIsPrimaryActive] = useState(false);
    const [isPrimaryDropdownOpen, setIsPrimaryDropdownOpen] = useState(false);
    const [selectedPrimayName, setSelectedPrimayName] = useState<string | null>(null);

    const [isJuniorSecondaryActive, setIsJuniorSecondaryActive] = useState(false);
    const [isJuniorSecondaryDropdownOpen, setIsJuniorSecondaryDropdownOpen] = useState(false);
    const [selectedJuniorSecondaryName, setSelectedJuniorSecondaryName] = useState<string | null>(null);
 

    const [isSeniorSecondaryActive, setIsSeniorSecondaryActive] = useState(false);
    const [isSeniorSecondaryDropdownOpen, setIsSeniorSecondaryDropdownOpen] = useState(false);
    const [selectedSeniorSecondaryName, setSelectedSeniorSecondaryName] = useState<string | null>(null);

  const handleBackToCampus = () => {
    navigate("/auth/input-campus");
    };
    
    const dispatch = useAppDispatch();

    const handleNextToCCA = () => {
      const activatedStages = [];

      if (isEarlyEducationActive && selectedEarlyName) {
        activatedStages.push({
          type: "early" as const,
          name: selectedEarlyName,
        });
      }

      if (isPrimaryActive && selectedPrimayName) {
        activatedStages.push({
          type: "primary" as const,
          name: selectedPrimayName,
        });
      }

      if (isJuniorSecondaryActive && selectedJuniorSecondaryName) {
        activatedStages.push({
          type: "junior" as const,
          name: selectedJuniorSecondaryName,
        });
      }

      if (isSeniorSecondaryActive && selectedSeniorSecondaryName) {
        activatedStages.push({
          type: "senior" as const,
          name: selectedSeniorSecondaryName,
        });
      }

      dispatch(setSchoolStages(activatedStages));
      navigate("/auth/cca-setup");
    };

  return (
    <div className="min-h-screen bg-gray-50 px-15 py-10">
      <div className="">
        {/* Back to campus link */}
        <button
          onClick={handleBackToCampus}
          className="flex items-center text-gray-600 cursor-pointer mb-3"
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
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
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
                      selectedEarlyName ? "text-gray-700" : "text-gray-500"
                    }
                  >
                    {selectedEarlyName || "Select naming style"}
                  </span>
                  <BsChevronExpand size={20} className="text-gray-400" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                      {EearlyEducationDropdown.map((option) => (
                        <button
                          key={option}
                          className="w-full flex justify-between items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            setSelectedEarlyName(option);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {option}

                          {/* Selection indicator */}
                          <div
                            className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                              selectedEarlyName === option
                                ? "border-[#8000BD] bg-[#8000BD]"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedEarlyName === option && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
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

        {/* Primary Section */}
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Primary</h2>

          {/* Activate Early Education Toggle */}
          <div className="flex items-center justify-between mb-6 bg-[#FAF7FC]">
            <span className="text-sm text-gray-700">Activate Primary</span>
            <button
              onClick={() => setIsPrimaryActive(!isPrimaryActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                isPrimaryActive ? "bg-[#8000BD]" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isPrimaryActive ? "translate-x-6" : "translate-x-1"
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
                  onClick={() =>
                    setIsPrimaryDropdownOpen(!isPrimaryDropdownOpen)
                  }
                  className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md focus:outline-none flex items-center justify-between"
                >
                  <span
                    className={
                      selectedPrimayName ? "text-gray-700" : "text-gray-500"
                    }
                  >
                    {selectedPrimayName || "Select naming style"}
                  </span>
                  <BsChevronExpand size={20} className="text-gray-400" />
                </button>
                {isPrimaryDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                      {PrimaryDropdown.map((option) => (
                        <button
                          key={option}
                          className="w-full flex justify-between items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            setSelectedPrimayName(option);
                            setIsPrimaryDropdownOpen(false);
                          }}
                        >
                          {option}

                          {/* Selection indicator */}
                          <div
                            className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                              selectedPrimayName === option
                                ? "border-[#8000BD] bg-[#8000BD]"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedPrimayName === option && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
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

        {/* Junior Secondary Section */}
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Junior Secondary
          </h2>

          {/* Activate Early Education Toggle */}
          <div className="flex items-center justify-between mb-6 bg-[#FAF7FC]">
            <span className="text-sm text-gray-700">
              Activate Junior Secondary
            </span>
            <button
              onClick={() =>
                setIsJuniorSecondaryActive(!isJuniorSecondaryActive)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                isJuniorSecondaryActive ? "bg-[#8000BD]" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isJuniorSecondaryActive ? "translate-x-6" : "translate-x-1"
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
                  onClick={() =>
                    setIsJuniorSecondaryDropdownOpen(
                      !isJuniorSecondaryDropdownOpen
                    )
                  }
                  className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md focus:outline-none flex items-center justify-between"
                >
                  <span
                    className={
                      selectedJuniorSecondaryName
                        ? "text-gray-700"
                        : "text-gray-500"
                    }
                  >
                    {selectedJuniorSecondaryName || "Select naming style"}
                  </span>
                  <BsChevronExpand size={20} className="text-gray-400" />
                </button>
                {isJuniorSecondaryDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                      {JuniorSecondaryDropdown.map((option) => (
                        <button
                          key={option}
                          className="w-full flex justify-between items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            setSelectedJuniorSecondaryName(option);
                            setIsJuniorSecondaryDropdownOpen(false);
                          }}
                        >
                          {option}

                          {/* Selection indicator */}
                          <div
                            className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                              selectedJuniorSecondaryName === option
                                ? "border-[#8000BD] bg-[#8000BD]"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedJuniorSecondaryName === option && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
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

        {/* Senior Secondary Section */}
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Senior Secondary
          </h2>

          {/* Activate Early Education Toggle */}
          <div className="flex items-center justify-between mb-6 bg-[#FAF7FC]">
            <span className="text-sm text-gray-700">
              Activate Senior Secondary
            </span>
            <button
              onClick={() =>
                setIsSeniorSecondaryActive(!isSeniorSecondaryActive)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                isSeniorSecondaryActive ? "bg-[#8000BD]" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isSeniorSecondaryActive ? "translate-x-6" : "translate-x-1"
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
                  onClick={() =>
                    setIsSeniorSecondaryDropdownOpen(
                      !isSeniorSecondaryDropdownOpen
                    )
                  }
                  className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md focus:outline-none flex items-center justify-between"
                >
                  <span
                    className={
                      selectedSeniorSecondaryName
                        ? "text-gray-700"
                        : "text-gray-500"
                    }
                  >
                    {selectedSeniorSecondaryName || "Select naming style"}
                  </span>
                  <BsChevronExpand size={20} className="text-gray-400" />
                </button>
                {isSeniorSecondaryDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                      {SeniorSecondaryDropdown.map((option) => (
                        <button
                          key={option}
                          className="w-full flex justify-between items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setSelectedSeniorSecondaryName(option);
                            setIsSeniorSecondaryDropdownOpen(false);
                          }}
                        >
                          {option}

                          {/* Selection indicator */}
                          <div
                            className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                              selectedSeniorSecondaryName === option
                                ? "border-[#8000BD] bg-[#8000BD]"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedSeniorSecondaryName === option && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
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

        <div className="mt-5 text-[#120D1C]">
          <p className="font-semibold">Preview</p>
          <p className="text-sm">
            Creche 1, Creche 2, Basic 1, Basic 2, Basic 3, Basic 4, Basic 5,
            Basic 6, JSS 1, JSS 2, JSS 3, SS 1, SS 2, SS 3
          </p>
        </div>

        <div
          onClick={handleNextToCCA}
          className="flex justify-center mt-10"
        >
          <button className="w-1/3 py-3.5 bg-[#8000BD] text-white font-medium rounded-sm text-base transition-colors cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
