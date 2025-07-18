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





















// import { ChevronLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../hooks/typed.hooks";
// import ContinuousAssessmentModal from "../modal/continous-access.modal";
// import { setSchoolStages } from "../redux/school-slice";

// interface SchoolStage {
//   type: "early" | "primary" | "junior" | "senior";
//   name: string;
//   startLevel?: string;
//   endLevel?: string;
// }

// const CCASetup = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
//   const [examMaxScore, setExamMaxScore] = useState("");
//   const [examName, setExamName] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [currentClasses, setCurrentClasses] = useState<string[]>([]); // Track classes being configured
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

//   const handleSubmit = () => {
//     console.log("Submitting...");
//     navigate("/auth/congratulation");
//   };

//   useEffect(() => {
//     const savedStages = localStorage.getItem("schoolStages");
//     if (savedStages) {
//       dispatch(setSchoolStages(JSON.parse(savedStages)));
//     }
//   }, [dispatch]);
  
//   const handleClassToggle = (className: string) => {
//     const wasSelected = selectedClasses.includes(className);
//     const newSelection = wasSelected
//       ? selectedClasses.filter((c) => c !== className)
//       : [...selectedClasses, className];

//     setSelectedClasses(newSelection);

//     // Show modal only when selecting (not deselecting)
//     if (!wasSelected) {
//       setCurrentClasses([className]);
//       setShowModal(true);
//     }
//   };

//   const handleSelectAll = (stage: SchoolStage) => {
//     const sectionClasses = getClassesForStage(stage);
//     const allSelected = sectionClasses.every((cls) =>
//       selectedClasses.includes(cls)
//     );

//     if (allSelected) {
//       // Deselect all - completely remove these classes
//       setSelectedClasses((prev) =>
//         prev.filter((cls) => !sectionClasses.includes(cls))
//       );
//     } else {
//       // Select all but don't show modal yet
//       setSelectedClasses((prev) => [...new Set([...prev, ...sectionClasses])]);
//     }
//   };

//   const handleAddAll = (stage: SchoolStage) => {
//     const sectionClasses = getClassesForStage(stage);
//     // First select all classes
//     setSelectedClasses((prev) => [...new Set([...prev, ...sectionClasses])]);
//     // Then show modal with all classes
//     setCurrentClasses(sectionClasses);
//     setShowModal(true);
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
//             {/* ... existing empty state UI ... */}
//           </div>
//         ) : (
//           activatedStages.map((stage) => {
//             const classNames = getClassesForStage(stage);
//             const allSelected = isAllSelected(stage);

//             return (
//               <div key={stage.type} className="mb-6">
//                 <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
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
//                 <div className="flex justify-end mt-2">
//                   <button
//                     onClick={() => handleAddAll(stage)}
//                     disabled={allSelected}
//                     className={`bg-[#8000BD] text-white font-medium py-1 px-3 rounded-sm transition ${
//                       allSelected
//                         ? "opacity-50 cursor-not-allowed"
//                         : "cursor-pointer hover:bg-[#6a00a3]"
//                     }`}
//                   >
//                     Add All
//                   </button>
//                 </div>
//               </div>
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
//                 value={examName}
//                 onChange={(e) => setExamName(e.target.value)}
//                 placeholder="e.g., final exam"
//                 className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
//               />
//               <input
//                 type="text"
//                 value={examMaxScore}
//                 onChange={(e) => setExamMaxScore(e.target.value)}
//                 placeholder="e.g., 100"
//                 className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none mt-4"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center mt-10">
//             <button 
//             onClick={handleSubmit}
//             className="md:w-1/3 w-1/2 py-2 bg-[#8000BD] text-white font-medium rounded-sm text-base transition-colors cursor-pointer">
//               Submit
//             </button>
//           </div>
//         </>
//       )}

//       {/* Render the modal */}
//       {showModal && (
//         <ContinuousAssessmentModal
//           selectedClasses={currentClasses}
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
import { toast } from "sonner";
import { useCcaMutation } from "../api/auth-api";

interface SchoolStage {
  type: "early" | "primary" | "junior" | "senior";
  name: string;
  startLevel?: string;
  endLevel?: string;
}

interface ClassData {
  name: string;
  id: number;
}

interface Assessment {
  title: string;
  weightage: string;
  maxScore: string;
}

const CCASetup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedClasses, setSelectedClasses] = useState<ClassData[]>([]);
  const [examMaxScore, setExamMaxScore] = useState<string>("100");
  const [weightScore, setWeightScore] = useState<string>("70");
  const [examName, setExamName] = useState<string>("Final Exam");
  const [showModal, setShowModal] = useState(false);
  const [currentClasses, setCurrentClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(false);
  const [ccaAssessments, setCcaAssessments] = useState<
    Record<string, Assessment[]>
  >({});
  const activatedStages = useAppSelector((state) => state.school.stages);
  const [ccaSetup] = useCcaMutation();
  const token = localStorage.getItem("token") || "";

  // Get class data from localStorage
  const getClassData = (): ClassData[] => {
    const savedClasses = localStorage.getItem("class_ids");
    const schoolStages = localStorage.getItem("schoolStages");

    if (!savedClasses || !schoolStages) return [];

    const classIds: number[] = JSON.parse(savedClasses);
    const stages: SchoolStage[] = JSON.parse(schoolStages);

    const classes: ClassData[] = [];
    let idIndex = 0;

    stages.forEach((stage) => {
      const numClasses = stage.type === "primary" ? 6 : 3;

       for (let i = 1; i <= numClasses; i++) {
         if (idIndex < classIds.length) {
           classes.push({
             name: `${stage.name} ${i}`,
             id: classIds[idIndex], 
           });
           idIndex++;
         }
       }
    });

    return classes;
  };

  const handleBackToCampus = () => {
    navigate("/auth/customize-school-name");
  };
  //   if (!examName || !examMaxScore) {
  //     toast.error("Please fill all exam fields");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const allClassData = getClassData();
  //     const allAssessments: any[] = [];

  //     // Prepare CA data for all selected classes
  //     selectedClasses.forEach((classItem) => {
  //       const classId = classItem.id;
  //       const assessments = ccaAssessments[classItem.name] || [];

  //       assessments.forEach((assessment) => {
  //         allAssessments.push({
  //           class_id: classId,
  //           name: assessment.title,
  //           weightage: Number(assessment.weightage),
  //           max_score: Number(assessment.maxScore),
  //         });
  //       });
  //     });

  //     // Prepare exam data (using first selected class)
  //     if (selectedClasses.length > 0) {
  //       const examData = {
  //         class_id: selectedClasses[0].id,
  //         name: examName,
  //         weightage: Number(weightScore),
  //         max_score: Number(examMaxScore),
  //       };

  //       const response = await ccaSetup({
  //         credentials: {
  //           assessments: allAssessments,
  //           exam: examData,
  //         },
  //         token,
  //       }).unwrap();

  //       console.log("CCA setup successful:", response);
  //       toast.success("CCA setup completed");
  //       navigate("/auth/congratulation");
  //     } else {
  //       toast.error("No classes selected");
  //     }
  //   } catch (error) {
  //     console.error("Failed to setup CCA:", error);
  //     toast.error("Failed to setup CCA");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
    if (!examName || !examMaxScore) {
      toast.error("Please fill all exam fields");
      return;
    }

    setLoading(true);
    try {
      // Debug: Check localStorage data first
      console.log("=== LOCALSTORAGE DATA ===");
      console.log("class_ids:", localStorage.getItem("class_ids"));
      console.log("schoolStages:", localStorage.getItem("schoolStages"));

      const allClassData = getClassData();
      console.log("=== ALL CLASS DATA ===", allClassData);

      const allAssessments: any[] = [];

      // Debug selected classes
      console.log("=== SELECTED CLASSES ===", selectedClasses);

      // Prepare CA data for all selected classes
      selectedClasses.forEach((classItem) => {
        console.log(`=== PROCESSING CLASS ${classItem.name} ===`);
        console.log("Class ID:", classItem.id);

        const assessments = ccaAssessments[classItem.name] || [];
        console.log("Assessments for this class:", assessments);

        assessments.forEach((assessment) => {
          const assessmentPayload = {
            class_id: classItem.id,
            name: assessment.title,
            weightage: Number(assessment.weightage),
            max_score: Number(assessment.maxScore),
          };
          console.log("Adding assessment:", assessmentPayload);
          allAssessments.push(assessmentPayload);
        });
      });

      console.log("=== FINAL ASSESSMENTS ARRAY ===", allAssessments);

      // Prepare exam data (using first selected class)
      if (selectedClasses.length > 0) {
        const examData = {
          class_id: selectedClasses[0].id,
          name: examName,
          weightage: Number(weightScore),
          max_score: Number(examMaxScore),
        };
        console.log("=== EXAM DATA ===", examData);

        console.log("=== FINAL PAYLOAD TO BE SUBMITTED ===", {
          assessments: allAssessments,
          exam: examData,
        });

        const response = await ccaSetup({
          credentials: {
            assessments: allAssessments,
            exam: examData,
          },
          token,
        }).unwrap();

        console.log("=== API RESPONSE ===", response);
        toast.success("CCA setup completed");
        navigate("/auth/congratulation");
      } else {
        toast.error("No classes selected");
      }
    } catch (error) {
      console.error("=== FULL ERROR OBJECT ===", error);
      console.error("Error data:", (error as any)?.data);
      console.error("Error status:", (error as any)?.status);

      const errorMessage =
        (error as any)?.data?.message || "Failed to setup CCA";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedStages = localStorage.getItem("schoolStages");
    if (savedStages) {
      dispatch(setSchoolStages(JSON.parse(savedStages)));
    }
  }, [dispatch]);

  const handleClassToggle = (className: string) => {
    const allClasses = getClassData();
    const classItem = allClasses.find((c) => c.name === className);
    if (!classItem) return;

    const wasSelected = selectedClasses.some((c) => c.name === className);
    const newSelection = wasSelected
      ? selectedClasses.filter((c) => c.name !== className)
      : [...selectedClasses, classItem];

    setSelectedClasses(newSelection);

    if (!wasSelected) {
      setCurrentClasses([classItem]);
      setShowModal(true);
    }
  };

  const handleSelectAll = (stage: SchoolStage) => {
    const allClasses = getClassData();
    const sectionClasses = allClasses.filter((c) =>
      c.name.startsWith(stage.name)
    );

    const allSelected = sectionClasses.every((sc) =>
      selectedClasses.some((c) => c.name === sc.name)
    );

    if (allSelected) {
      setSelectedClasses((prev) =>
        prev.filter((c) => !sectionClasses.some((sc) => sc.name === c.name))
      );
    } else {
      setSelectedClasses((prev) => [...new Set([...prev, ...sectionClasses])]);
    }
  };

  const handleAddAll = (stage: SchoolStage) => {
    const allClasses = getClassData();
    const sectionClasses = allClasses.filter((c) =>
      c.name.startsWith(stage.name)
    );

    setSelectedClasses((prev) => [...new Set([...prev, ...sectionClasses])]);
    setCurrentClasses(sectionClasses);
    setShowModal(true);
  };

  const isAllSelected = (stage: SchoolStage) => {
    const allClasses = getClassData();
    const sectionClasses = allClasses.filter((c) =>
      c.name.startsWith(stage.name)
    );

    return (
      sectionClasses.length > 0 &&
      sectionClasses.every((sc) =>
        selectedClasses.some((c) => c.name === sc.name)
      )
    );
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

  const handleAssessmentSubmit = (assessments: Assessment[]) => {
    currentClasses.forEach((classItem) => {
      setCcaAssessments((prev) => ({
        ...prev,
        [classItem.name]: assessments,
      }));
    });
    setShowModal(false);
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
            No classes available. Please set up your school stages first.
          </div>
        ) : (
          activatedStages.map((stage) => {
            const allClasses = getClassData();
            const sectionClasses = allClasses.filter((c) =>
              c.name.startsWith(stage.name)
            );
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
                    {sectionClasses.map((classItem) => (
                      <div
                        key={classItem.name}
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                      >
                        <span className="text-gray-700">{classItem.name}</span>
                        <input
                          type="checkbox"
                          checked={selectedClasses.some(
                            (c) => c.name === classItem.name
                          )}
                          onChange={() => handleClassToggle(classItem.name)}
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
                Exam Name
              </label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="e.g., Final Exam"
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                Weight Age
              </label>
              <input
                type="text"
                value={weightScore}
                onChange={(e) => setWeightScore(e.target.value)}
                placeholder="e.g., 70"
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
              />

              <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                Exam Max Score
              </label>
              <input
                type="text"
                value={examMaxScore}
                onChange={(e) => setExamMaxScore(e.target.value)}
                placeholder="e.g., 70"
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none mt-3"
              />
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`md:w-1/3 w-1/2 py-2 bg-[#8000BD] text-white font-medium rounded-sm text-base transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </>
      )}

      {/* Render the modal */}
      {showModal && (
        <ContinuousAssessmentModal
          selectedClasses={currentClasses.map((c) => c.name)}
          onClose={() => setShowModal(false)}
          onSubmit={handleAssessmentSubmit}
        />
      )}
    </div>
  );
};

export default CCASetup;