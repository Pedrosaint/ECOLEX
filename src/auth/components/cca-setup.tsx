// import { ChevronLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useAppSelector } from "../../hooks/typed.hooks";
// import ContinuousAssessmentModal from "../modal/continous-access.modal";

// interface SchoolStage {
//   type: "early" | "primary" | "junior" | "senior";
//   name: string;
//   startLevel?: string;
//   endLevel?: string;
// }

// const CCASetup = () => {
//   const navigate = useNavigate();
//   const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
//   const [examMaxScore, setExamMaxScore] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const activatedStages = useAppSelector((state) => state.school.stages);

//   const handleBackToCampus = () => {
//     navigate("/auth/customize-school-name");
//   };

//   const getClassesForStage = (stage: SchoolStage) => {
//     let classNames = [];
//     const numClasses = stage.type === "primary" ? 6 : 3;

//     for (let i = 1; i <= numClasses; i++) {
//       classNames.push(`${stage.name} ${i}`);
//     }

//     return classNames;
//   };

//   const handleClassToggle = (className: string) => {
//     const wasSelected = selectedClasses.includes(className);
//     setSelectedClasses(
//       (prev) =>
//         wasSelected
//           ? prev.filter((c) => c !== className) // Unselecting - don't show modal
//           : [...prev, className] // Selecting - show modal
//     );

//     // Only show modal when selecting (adding) a class
//     if (!wasSelected) {
//       setShowModal(true);
//     }
//   };

//   const handleSelectAll = (stage: SchoolStage) => {
//     const sectionClasses = getClassesForStage(stage);
//     const allSelected = sectionClasses.every((cls) =>
//       selectedClasses.includes(cls)
//     );

//     if (allSelected) {
//       // Unselecting all - don't show modal
//       setSelectedClasses((prev) =>
//         prev.filter((cls) => !sectionClasses.includes(cls))
//       );
//     } else {
//       // Selecting all - show modal
//       setSelectedClasses((prev) => [...new Set([...prev, ...sectionClasses])]);
//       // setShowModal(true);
//     }
//   };

//   const isAllSelected = (stage: SchoolStage) => {
//     const sectionClasses = getClassesForStage(stage);
//     return sectionClasses.every((cls) => selectedClasses.includes(cls));
//   };

//   const getStageDisplayName = (type: string) => {
//     switch (type) {
//       case "early":
//         return "Early Education";
//       case "primary":
//         return "Primary";
//       case "junior":
//         return "Junior Secondary";
//       case "senior":
//         return "Senior Secondary";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
//       {/* Back to campus link */}
//       <button
//         onClick={handleBackToCampus}
//         className="flex items-center text-gray-600 cursor-pointer mb-2"
//       >
//         <ChevronLeft className="w-4 h-4 mr-1" />
//         <span className="text-sm">Back to campus</span>
//       </button>

//       {/* Main heading */}
//       <div className="">
//         <h1 className="text-2xl font-semibold text-gray-900 mb-8">
//           Continuous Assessment Setup
//         </h1>
//       </div>

//       {/* Select Classes Section */}
//       <div className="mb-8">
//         <h2 className="text-md font-medium text-[#120D1C] mb-4">
//           Select Classes
//         </h2>

//         {activatedStages.length === 0 ? (
//           <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
//             <div className="mx-auto max-w-md">
//               <svg
//                 className="mx-auto h-12 w-12 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
//                 />
//               </svg>
//               <h3 className="mt-2 text-lg font-medium text-gray-900">
//                 No classes configured yet
//               </h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 Please set up your school's class structure first.
//               </p>
//               <div className="mt-6">
//                 <button
//                   onClick={handleBackToCampus}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#8000BD] hover:bg-[#6a00a3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8000BD]"
//                 >
//                   <ChevronLeft className="-ml-1 mr-2 h-5 w-5" />
//                   Back to Class Setup
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           activatedStages.map((stage) => {
//             const classNames = getClassesForStage(stage);
//             const allSelected = isAllSelected(stage);

//             return (
//               <>
//                 <div
//                   key={stage.type}
//                   className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden"
//                 >
//                   <div className="flex items-center bg-[#E5E8EB63] justify-between p-4 border-b border-gray-200">
//                     <h3 className="font-medium text-gray-900">
//                       {getStageDisplayName(stage.type)}
//                     </h3>
//                     <div className="flex items-center gap-3">
//                       <span className="text-sm text-[#120D1C]">
//                         {allSelected ? "Deselect All" : "Select All"}
//                       </span>
//                       <input
//                         type="checkbox"
//                         checked={allSelected}
//                         onChange={() => handleSelectAll(stage)}
//                         className="custom-checkbox select-all-checkbox"
//                       />
//                     </div>
//                   </div>
//                   <div className="divide-y divide-gray-200">
//                     {classNames.map((className) => (
//                       <div
//                         key={className}
//                         className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
//                       >
//                         <span className="text-gray-700">{className}</span>
//                         <input
//                           type="checkbox"
//                           checked={selectedClasses.includes(className)}
//                           onChange={() => handleClassToggle(className)}
//                           className="custom-checkbox select-all-checkbox"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="flex justify-end">
//                   <button
//                     onClick={() => handleClassToggle(stage.name)}
//                     className="bg-[#8000BD] text-white font-medium py-1 px-3 rounded-sm transition cursor-pointer"
//                   >
//                     Add All
//                   </button>
//                 </div>
//               </>
//             );
//           })
//         )}
//       </div>

//       {/* Exam Section - Only show if classes are configured */}
//       {activatedStages.length > 0 && (
//         <>
//           <div className="">
//             <h2 className="text-lg font-medium text-gray-900 mb-4">Exam</h2>
//             <div className="boder border-gray-50 bg-white p-4 w-full max-w-md rounded-lg">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Exam Max Score
//               </label>
//               <input
//                 type="text"
//                 value={examMaxScore}
//                 onChange={(e) => setExamMaxScore(e.target.value)}
//                 placeholder="e.g., 50"
//                 className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8000BD] focus:border-[#8000BD]"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center mt-10">
//             <button className="w-1/3 py-3.5 bg-[#8000BD] text-white font-medium rounded-sm text-base transition-colors cursor-pointer hover:bg-[#6a00a3]">
//               Submit
//             </button>
//           </div>
//         </>
//       )}

//       {/* Render the modal */}
//       {showModal && (
//         <ContinuousAssessmentModal
//           onClose={() => setShowModal(false)}
//           onSubmit={(assessments) => {
//             console.log("Assessments submitted:", assessments);
//             setShowModal(false);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default CCASetup;

import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typed.hooks";
import ContinuousAssessmentModal from "../modal/continous-access.modal";
import { setSchoolStages } from "../redux/school-slice";

interface SchoolStage {
  type: "early" | "primary" | "junior" | "senior";
  name: string;
  startLevel?: string;
  endLevel?: string;
}

const CCASetup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [examMaxScore, setExamMaxScore] = useState("");
  const [examName, setExamName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentClasses, setCurrentClasses] = useState<string[]>([]); // Track classes being configured
  const activatedStages = useAppSelector((state) => state.school.stages);

  const handleBackToCampus = () => {
    navigate("/auth/customize-school-name");
  };

  const getClassesForStage = (stage: SchoolStage) => {
    let classNames = [];
    const numClasses = stage.type === "primary" ? 6 : 3;

    for (let i = 1; i <= numClasses; i++) {
      classNames.push(`${stage.name} ${i}`);
    }

    return classNames;
  };

  const handleSubmit = () => {
    console.log("Submitting...");
    navigate("/auth/customize-school-n");
  };

  useEffect(() => {
    const savedStages = localStorage.getItem("schoolStages");
    if (savedStages) {
      dispatch(setSchoolStages(JSON.parse(savedStages)));
    }
  }, [dispatch]);
  
  const handleClassToggle = (className: string) => {
    const wasSelected = selectedClasses.includes(className);
    const newSelection = wasSelected
      ? selectedClasses.filter((c) => c !== className)
      : [...selectedClasses, className];

    setSelectedClasses(newSelection);

    // Show modal only when selecting (not deselecting)
    if (!wasSelected) {
      setCurrentClasses([className]);
      setShowModal(true);
    }
  };

  const handleSelectAll = (stage: SchoolStage) => {
    const sectionClasses = getClassesForStage(stage);
    const allSelected = sectionClasses.every((cls) =>
      selectedClasses.includes(cls)
    );

    if (allSelected) {
      // Deselect all - completely remove these classes
      setSelectedClasses((prev) =>
        prev.filter((cls) => !sectionClasses.includes(cls))
      );
    } else {
      // Select all but don't show modal yet
      setSelectedClasses((prev) => [...new Set([...prev, ...sectionClasses])]);
    }
  };

  const handleAddAll = (stage: SchoolStage) => {
    const sectionClasses = getClassesForStage(stage);
    // First select all classes
    setSelectedClasses((prev) => [...new Set([...prev, ...sectionClasses])]);
    // Then show modal with all classes
    setCurrentClasses(sectionClasses);
    setShowModal(true);
  };

  const isAllSelected = (stage: SchoolStage) => {
    const sectionClasses = getClassesForStage(stage);
    return sectionClasses.every((cls) => selectedClasses.includes(cls));
  };

  const getStageDisplayName = (type: string) => {
    switch (type) {
      case "early":
        return "Early Education";
      case "primary":
        return "Primary";
      case "junior":
        return "Junior Secondary";
      case "senior":
        return "Senior Secondary";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      {/* Back to campus link */}
      <button
        onClick={handleBackToCampus}
        className="flex items-center text-gray-600 cursor-pointer mb-2"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        <span className="text-sm">Back to campus</span>
      </button>

      {/* Main heading */}
      <div className="">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Continuous Assessment Setup
        </h1>
      </div>

      {/* Select Classes Section */}
      <div className="mb-8">
        <h2 className="text-md font-medium text-[#120D1C] mb-4">
          Select Classes
        </h2>

        {activatedStages.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            {/* ... existing empty state UI ... */}
          </div>
        ) : (
          activatedStages.map((stage) => {
            const classNames = getClassesForStage(stage);
            const allSelected = isAllSelected(stage);

            return (
              <div key={stage.type} className="mb-6">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-center bg-[#E5E8EB63] justify-between p-4 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900">
                      {getStageDisplayName(stage.type)}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#120D1C]">
                        {allSelected ? "Deselect All" : "Select All"}
                      </span>
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={() => handleSelectAll(stage)}
                        className="custom-checkbox select-all-checkbox"
                      />
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {classNames.map((className) => (
                      <div
                        key={className}
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                      >
                        <span className="text-gray-700">{className}</span>
                        <input
                          type="checkbox"
                          checked={selectedClasses.includes(className)}
                          onChange={() => handleClassToggle(className)}
                          className="custom-checkbox select-all-checkbox"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleAddAll(stage)}
                    disabled={allSelected}
                    className={`bg-[#8000BD] text-white font-medium py-1 px-3 rounded-sm transition ${
                      allSelected
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:bg-[#6a00a3]"
                    }`}
                  >
                    Add All
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Exam Section - Only show if classes are configured */}
      {activatedStages.length > 0 && (
        <>
          <div className="">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Exam</h2>
            <div className="boder border-gray-50 bg-white p-4 w-full max-w-md rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exam Max Score
              </label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="e.g., final exam"
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
              />
              <input
                type="text"
                value={examMaxScore}
                onChange={(e) => setExamMaxScore(e.target.value)}
                placeholder="e.g., 100"
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none mt-4"
              />
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button 
            onClick={handleSubmit}
            className="md:w-1/3 w-1/2 py-2 bg-[#8000BD] text-white font-medium rounded-sm text-base transition-colors cursor-pointer">
              Submit
            </button>
          </div>
        </>
      )}

      {/* Render the modal */}
      {showModal && (
        <ContinuousAssessmentModal
          selectedClasses={currentClasses}
          onClose={() => setShowModal(false)}
          onSubmit={(assessments) => {
            console.log("Assessments submitted:", assessments);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default CCASetup;