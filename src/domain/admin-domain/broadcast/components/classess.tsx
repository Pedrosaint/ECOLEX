import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BsChevronExpand } from "react-icons/bs";
import { useAppDispatch } from "../../../../hooks/typed.hooks";
import { setSchoolStages } from "../../../../auth/redux/school-slice";
import {
  EearlyEducationDropdown,
  PrimaryDropdown,
  JuniorSecondaryDropdown,
  SeniorSecondaryDropdown,
} from "../../../../auth/dropdown-data";
import { usePreviewText } from "../../../../auth/hooks/auth.hook";
import { toast } from "sonner";

interface Class {
  name: string;
}

export default function ClassView() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPrimaryDropdownOpen, setIsPrimaryDropdownOpen] = useState(false);
  const [isJuniorSecondaryDropdownOpen, setIsJuniorSecondaryDropdownOpen] =
    useState(false);
  const [isSeniorSecondaryDropdownOpen, setIsSeniorSecondaryDropdownOpen] =
    useState(false);


  const {
    isEarlyEducationActive,
    setIsEarlyEducationActive,
    selectedEarlyName,
    setSelectedEarlyName,
    earlyStartLevel,
    setEarlyStartLevel,
    earlyEndLevel,
    setEarlyEndLevel,

    isPrimaryActive,
    setIsPrimaryActive,
    selectedPrimaryName,
    setSelectedPrimaryName,
    primaryStartLevel,
    setPrimaryStartLevel,
    primaryEndLevel,
    setPrimaryEndLevel,

    isJuniorSecondaryActive,
    setIsJuniorSecondaryActive,
    selectedJuniorSecondaryName,
    setSelectedJuniorSecondaryName,
    juniorStartLevel,
    setJuniorStartLevel,
    juniorEndLevel,
    setJuniorEndLevel,

    isSeniorSecondaryActive,
    setIsSeniorSecondaryActive,
    selectedSeniorSecondaryName,
    setSelectedSeniorSecondaryName,
    seniorStartLevel,
    setSeniorStartLevel,
    seniorEndLevel,
    setSeniorEndLevel,

    generatePreviewText,
  } = usePreviewText();

  const handleBackToCampus = () => {
    navigate("/auth/input-campus");
  };

  const dispatch = useAppDispatch();

  const handleNextToCCA = async () => {
    const activatedStages = [];
    const classes: Class[] = [];

    if (isEarlyEducationActive && selectedEarlyName) {
      activatedStages.push({
        type: "early" as const,
        name: selectedEarlyName,
        start: earlyStartLevel,
        end: earlyEndLevel,
      });

      // Generate class names for early education
      for (let i = Number(earlyStartLevel); i <= Number(earlyEndLevel); i++) {
        classes.push({
          name: `${selectedEarlyName} ${i}`,
        });
      }
    }

    if (isPrimaryActive && selectedPrimaryName) {
      activatedStages.push({
        type: "primary" as const,
        name: selectedPrimaryName,
        start: primaryStartLevel,
        end: primaryEndLevel,
      });

      for (
        let i = Number(primaryStartLevel);
        i <= Number(primaryEndLevel);
        i++
      ) {
        classes.push({
          name: `${selectedPrimaryName} ${i}`,
        });
      }
    }

    if (isJuniorSecondaryActive && selectedJuniorSecondaryName) {
      activatedStages.push({
        type: "junior" as const,
        name: selectedJuniorSecondaryName,
        start: juniorStartLevel,
        end: juniorEndLevel,
      });

      for (let i = Number(juniorStartLevel); i <= Number(juniorEndLevel); i++) {
        classes.push({
          name: `${selectedJuniorSecondaryName} ${i}`,
        });
      }
    }

    if (isSeniorSecondaryActive && selectedSeniorSecondaryName) {
      activatedStages.push({
        type: "senior" as const,
        name: selectedSeniorSecondaryName,
        start: seniorStartLevel,
        end: seniorEndLevel,
      });

      for (let i = Number(seniorStartLevel); i <= Number(seniorEndLevel); i++) {
        classes.push({
          name: `${selectedSeniorSecondaryName} ${i}`,
        });
      }
    }

    dispatch(setSchoolStages(activatedStages));
    localStorage.setItem("schoolStages", JSON.stringify(activatedStages));
    setLoading(true);
}

  return (
    <div className="bg-gray-50 md:px-15 md:py-10 py-5 px-5">
      <div className="">
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
                  value={earlyStartLevel}
                  onChange={(e) => setEarlyStartLevel(e.target.value)}
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
                  value={earlyEndLevel}
                  onChange={(e) => setEarlyEndLevel(e.target.value)}
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
                      selectedPrimaryName ? "text-gray-700" : "text-gray-500"
                    }
                  >
                    {selectedPrimaryName || "Select naming style"}
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
                            setSelectedPrimaryName(option);
                            setIsPrimaryDropdownOpen(false);
                          }}
                        >
                          {option}

                          {/* Selection indicator */}
                          <div
                            className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                              selectedPrimaryName === option
                                ? "border-[#8000BD] bg-[#8000BD]"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedPrimaryName === option && (
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
                  value={primaryStartLevel}
                  onChange={(e) => setPrimaryStartLevel(e.target.value)}
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
                  value={primaryEndLevel}
                  onChange={(e) => setPrimaryEndLevel(e.target.value)}
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
                  value={juniorStartLevel}
                  onChange={(e) => setJuniorStartLevel(e.target.value)}
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
                  value={juniorEndLevel}
                  onChange={(e) => setJuniorEndLevel(e.target.value)}
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
                  value={seniorStartLevel}
                  onChange={(e) => setSeniorStartLevel(e.target.value)}
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
                  value={seniorEndLevel}
                  onChange={(e) => setSeniorEndLevel(e.target.value)}
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
            {/* Creche 1-2, Basic 1-6, JSS 1-3, SS 1-3 */}
            {generatePreviewText()}
          </p>
        </div>
      </div>
    </div>
  );
 }

