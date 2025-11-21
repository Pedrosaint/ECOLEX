/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typed.hooks";
import ContinuousAssessmentModal from "../modal/continous-access.modal";
import { setSchoolStages } from "../redux/school-slice";
import { toast } from "sonner";
import { useCcaMutation } from "../api/auth-api";
import {
  loadStepProgress,
  saveStepProgress,
  getCcaData,
  clearStepProgressOnCompletion,
} from "../../utils/step-manager";
import { useGetClassesQuery } from "../../domain/admin-domain/classes/api/class-api";

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
  maxScore: string;
}

const CCASetup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Use the classes query hook
  const {
    data: classesResponse,
    isLoading: classesLoading,
    error: classesError,
  } = useGetClassesQuery();

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

  // Transform API classes to ClassData format
  const getClassDataFromAPI = (): ClassData[] => {
    if (!classesResponse?.classes) return [];

    return classesResponse.classes.map((classItem: any) => ({
      id: classItem.id,
      name: classItem.name,
    }));
  };

  // Add this debug useEffect in CCASetup component
  useEffect(() => {
    console.log("=== DEBUG INFO ===");
    console.log("activatedStages from Redux:", activatedStages);
    console.log("classesResponse from API:", classesResponse);
    console.log(
      "localStorage schoolStages:",
      localStorage.getItem("schoolStages")
    );
    console.log("localStorage class_ids:", localStorage.getItem("class_ids"));
  }, [activatedStages, classesResponse]);

  // Load saved CCA data on component mount
  useEffect(() => {
    const savedCcaData = getCcaData();
    console.log("Loading saved CCA data:", savedCcaData);

    if (savedCcaData) {
      setSelectedClasses(savedCcaData.selectedClasses || []);
      setExamMaxScore(savedCcaData.examMaxScore || "100");
      setWeightScore(savedCcaData.weightScore || "70");
      setExamName(savedCcaData.examName || "Final Exam");
      setCcaAssessments(savedCcaData.ccaAssessments || {});
      setCurrentClasses(savedCcaData.currentClasses || []);

      if (savedCcaData.showModal) {
        setShowModal(true);
      }
    }

    // Ensure step progress is properly set for this component
    const currentProgress = loadStepProgress();
    if (currentProgress && currentProgress.step.current < 3) {
      const updatedStep = {
        ...currentProgress.step,
        current: 3,
        previous: currentProgress.step.current,
        incremented: true,
      };
      saveStepProgress(
        updatedStep,
        currentProgress.formData,
        currentProgress.modalState,
        currentProgress.schoolCustomization,
        currentProgress.ccaData
      );
    }
  }, []);

  // Save CCA data whenever any field changes
  useEffect(() => {
    const saveCcaData = () => {
      const ccaData = {
        selectedClasses,
        examMaxScore,
        weightScore,
        examName,
        ccaAssessments,
        currentClasses: getClassDataFromAPI(), // Save current classes from API
        showModal,
      };

      const currentProgress = loadStepProgress();
      if (currentProgress) {
        saveStepProgress(
          currentProgress.step,
          currentProgress.formData,
          currentProgress.modalState,
          currentProgress.schoolCustomization,
          ccaData
        );
      }
    };

    const timeoutId = setTimeout(saveCcaData, 500);
    return () => clearTimeout(timeoutId);
  }, [
    selectedClasses,
    examMaxScore,
    weightScore,
    examName,
    ccaAssessments,
    currentClasses,
    showModal,
    classesResponse,
  ]);

  // Get class data from API instead of localStorage
  const getClassData = (): ClassData[] => {
    return getClassDataFromAPI();
  };

  // const handleBackToCampus = () => {
  //   navigate("/auth/customize-school-name", { replace: true });
  // };

  const handleSubmit = async () => {
    if (!examName || !examMaxScore) {
      toast.error("Please fill all exam fields");
      return;
    }

    if (selectedClasses.length === 0) {
      toast.error("Please select at least one class");
      return;
    }

    setLoading(true);
    try {
      const allClassData = getClassData();
      console.log("=== ALL CLASS DATA FROM API ===", allClassData);

      const allAssessments: any[] = [];

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
            max_score: Number(assessment.maxScore),
          };
          console.log("Adding assessment:", assessmentPayload);
          allAssessments.push(assessmentPayload);
        });
      });

      console.log("=== FINAL ASSESSMENTS ARRAY ===", allAssessments);

      // Prepare exam data
      const examData = {
        class_id: selectedClasses.map((c) => c.id),
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

      // CLEAR PROGRESS ON COMPLETION
      clearStepProgressOnCompletion();

      toast.success("CCA setup completed");
      navigate("/auth/congratulation");
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

  // Load school stages on mount
  // Replace the current useEffect that loads school stages
  useEffect(() => {
    const savedStages = localStorage.getItem("schoolStages");
    console.log("Loading school stages from localStorage:", savedStages);

    if (savedStages) {
      try {
        const stages = JSON.parse(savedStages);
        console.log("Parsed stages:", stages);
        dispatch(setSchoolStages(stages));
      } catch (error) {
        console.error("Error parsing schoolStages:", error);
      }
    } else {
      console.log("No schoolStages found in localStorage");
    }
  }, [dispatch]);

  const handleClassToggle = (classId: number, className: string) => {
    const classItem = { id: classId, name: className };
    const wasSelected = selectedClasses.some((c) => c.id === classId);
    const newSelection = wasSelected
      ? selectedClasses.filter((c) => c.id !== classId)
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
      selectedClasses.some((c) => c.id === sc.id)
    );

    if (allSelected) {
      setSelectedClasses((prev) =>
        prev.filter((c) => !sectionClasses.some((sc) => sc.id === c.id))
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
      sectionClasses.every((sc) => selectedClasses.some((c) => c.id === sc.id))
    );
  };

  // Add this function to reconstruct stages from class names
  const reconstructStagesFromClasses = (
    classes: ClassData[]
  ): SchoolStage[] => {
    if (!classes || classes.length === 0) return [];

    const stageMap = new Map();

    classes.forEach((classItem) => {
      // Extract stage name from class name (e.g., "Primary 1" -> "Primary")
      const stageName = classItem.name.split(" ")[0];

      if (!stageMap.has(stageName)) {
        // Determine stage type based on name patterns
        let type: "early" | "primary" | "junior" | "senior" = "primary";
        if (
          stageName.toLowerCase().includes("early") ||
          stageName.toLowerCase().includes("creche") ||
          stageName.toLowerCase().includes("nursery")
        ) {
          type = "early";
        } else if (stageName.toLowerCase().includes("junior")) {
          type = "junior";
        } else if (stageName.toLowerCase().includes("senior")) {
          type = "senior";
        }

        stageMap.set(stageName, {
          type,
          name: stageName,
          startLevel: "1",
          endLevel: type === "primary" ? "6" : "3",
        });
      }
    });

    return Array.from(stageMap.values());
  };

  // Update the classes loading effect
  useEffect(() => {
    if (
      classesResponse?.classes &&
      classesResponse.classes.length > 0 &&
      activatedStages.length === 0
    ) {
      console.log("Reconstructing stages from API classes");
      const reconstructedStages = reconstructStagesFromClasses(
        getClassDataFromAPI()
      );
      if (reconstructedStages.length > 0) {
        console.log("Dispatching reconstructed stages:", reconstructedStages);
        dispatch(setSchoolStages(reconstructedStages));
        // Also save to localStorage for consistency
        localStorage.setItem(
          "schoolStages",
          JSON.stringify(reconstructedStages)
        );
      }
    }
  }, [classesResponse, activatedStages.length, dispatch]);



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

  // Show loading state while fetching classes
  if (classesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8000BD] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading classes...</p>
        </div>
      </div>
    );
  }

  // Show error state if classes fail to load
  if (classesError) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load classes</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#8000BD] text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      {/* Back to campus link */}
      {/* <button
        onClick={handleBackToCampus}
        className="flex items-center text-gray-600 cursor-pointer mb-2"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        <span className="text-sm">Back to campus</span>
      </button> */}
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

        {/* Show classes even if activatedStages is empty but we have classes from API */}
        {activatedStages.length === 0 && getClassData().length > 0 ? (
          <div className="mb-6">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center bg-[#E5E8EB63] justify-between p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">All Classes</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {getClassData().map((classItem) => (
                  <div
                    key={classItem.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                  >
                    <span className="text-gray-700">{classItem.name}</span>
                    <input
                      type="checkbox"
                      checked={selectedClasses.some(
                        (c) => c.id === classItem.id
                      )}
                      onChange={() =>
                        handleClassToggle(classItem.id, classItem.name)
                      }
                      className="custom-checkbox select-all-checkbox"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activatedStages.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            No classes available. Please set up your school stages first.
          </div>
        ) : (
          // Original code for when we have activatedStages
          activatedStages.map((stage) => {
            const allClasses = getClassData();
            const sectionClasses = allClasses.filter((c) =>
              c.name.startsWith(stage.name)
            );
            const allSelected = isAllSelected(stage);

            if (sectionClasses.length === 0) {
              return (
                <div key={stage.type} className="mb-6">
                  <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                    <div className="flex items-center bg-[#E5E8EB63] justify-between p-4 border-b border-gray-300">
                      <h3 className="font-medium text-gray-900">
                        {getStageDisplayName(stage.type)}
                      </h3>
                    </div>
                    <div className="p-4 text-center text-gray-500 bg-yellow-50">
                      No classes found for {stage.name}. Classes exist but
                      naming doesn't match.
                    </div>
                    {/* Show all classes for debugging */}
                    <div className="p-4 bg-gray-50">
                      <p className="text-sm text-gray-600 mb-2">
                        Available classes:
                      </p>
                      {allClasses.map((cls) => (
                        <div key={cls.id} className="text-xs text-gray-500">
                          {cls.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

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
                        key={classItem.id}
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                      >
                        <span className="text-gray-700">{classItem.name}</span>
                        <input
                          type="checkbox"
                          checked={selectedClasses.some(
                            (c) => c.id === classItem.id
                          )}
                          onChange={() =>
                            handleClassToggle(classItem.id, classItem.name)
                          }
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
      {activatedStages.length > 0 && getClassData().length > 0 && (
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
              disabled={loading || selectedClasses.length === 0}
              className={`md:w-1/3 w-1/2 py-2 bg-[#8000BD] text-white font-medium rounded-sm text-base transition-colors ${
                loading || selectedClasses.length === 0
                  ? "opacity-70 cursor-not-allowed"
                  : "cursor-pointer hover:bg-[#6a00a3]"
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






























































// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { ChevronLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../hooks/typed.hooks";
// import ContinuousAssessmentModal from "../modal/continous-access.modal";
// import { setSchoolStages } from "../redux/school-slice";
// import { toast } from "sonner";
// import { useCcaMutation } from "../api/auth-api";
// import {
//   loadStepProgress,
//   saveStepProgress,
//   getCcaData,
//   clearStepProgressOnCompletion
// } from "../../utils/step-manager";

// interface SchoolStage {
//   type: "early" | "primary" | "junior" | "senior";
//   name: string;
//   startLevel?: string;
//   endLevel?: string;
// }

// interface ClassData {
//   name: string;
//   id: number;
// }

// interface Assessment {
//   title: string;
//   maxScore: string;
// }

// const CCASetup = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [selectedClasses, setSelectedClasses] = useState<ClassData[]>([]);
//   const [examMaxScore, setExamMaxScore] = useState<string>("100");
//   const [weightScore, setWeightScore] = useState<string>("70");
//   const [examName, setExamName] = useState<string>("Final Exam");
//   const [showModal, setShowModal] = useState(false);
//   const [currentClasses, setCurrentClasses] = useState<ClassData[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [ccaAssessments, setCcaAssessments] = useState<
//     Record<string, Assessment[]>
//   >({});
//   const activatedStages = useAppSelector((state) => state.school.stages);
//   const [ccaSetup] = useCcaMutation();
//   const token = localStorage.getItem("token") || "";

//   // Load saved CCA data on component mount
//   useEffect(() => {
//     const savedCcaData = getCcaData();
//     console.log("Loading saved CCA data:", savedCcaData);

//     if (savedCcaData) {
//       setSelectedClasses(savedCcaData.selectedClasses || []);
//       setExamMaxScore(savedCcaData.examMaxScore || "100");
//       setWeightScore(savedCcaData.weightScore || "70");
//       setExamName(savedCcaData.examName || "Final Exam");
//       setCcaAssessments(savedCcaData.ccaAssessments || {});

//       if (savedCcaData.currentClasses) {
//         setCurrentClasses(savedCcaData.currentClasses);
//       }

//       if (savedCcaData.showModal) {
//         setShowModal(true);
//       }
//     }

//     // Ensure step progress is properly set for this component
//     const currentProgress = loadStepProgress();
//     if (currentProgress && currentProgress.step.current < 3) {
//       const updatedStep = {
//         ...currentProgress.step,
//         current: 3,
//         previous: currentProgress.step.current,
//         incremented: true
//       };
//       saveStepProgress(
//         updatedStep,
//         currentProgress.formData,
//         currentProgress.modalState,
//         currentProgress.schoolCustomization,
//         currentProgress.ccaData
//       );
//     }
//   }, []);

//   // Save CCA data whenever any field changes
//   useEffect(() => {
//     const saveCcaData = () => {
//       const ccaData = {
//         selectedClasses,
//         examMaxScore,
//         weightScore,
//         examName,
//         ccaAssessments,
//         currentClasses,
//         showModal
//       };

//       const currentProgress = loadStepProgress();
//       if (currentProgress) {
//         saveStepProgress(
//           currentProgress.step,
//           currentProgress.formData,
//           currentProgress.modalState,
//           currentProgress.schoolCustomization,
//           ccaData
//         );
//       }
//     };

//     // Debounce the save to prevent too many writes
//     const timeoutId = setTimeout(saveCcaData, 500);
//     return () => clearTimeout(timeoutId);
//   }, [selectedClasses, examMaxScore, weightScore, examName, ccaAssessments, currentClasses, showModal]);

//   // Get class data from localStorage
//   const getClassData = (): ClassData[] => {
//     const savedClasses = localStorage.getItem("class_ids");
//     const schoolStages = localStorage.getItem("schoolStages");

//     if (!savedClasses || !schoolStages) return [];

//     const classIds: number[] = JSON.parse(savedClasses);
//     const stages: SchoolStage[] = JSON.parse(schoolStages);

//     const classes: ClassData[] = [];
//     let idIndex = 0;

//     stages.forEach((stage) => {
//       const numClasses = stage.type === "primary" ? 6 : 3;

//        for (let i = 1; i <= numClasses; i++) {
//          if (idIndex < classIds.length) {
//            classes.push({
//              name: `${stage.name} ${i}`,
//              id: classIds[idIndex],
//            });
//            idIndex++;
//          }
//        }
//     });

//     return classes;
//   };

//   const handleBackToCampus = () => {
//     navigate("/auth/customize-school-name", {replace: true});
//   };

//   const handleSubmit = async () => {
//     if (!examName || !examMaxScore) {
//       toast.error("Please fill all exam fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Debug: Check localStorage data first
//       console.log("=== LOCALSTORAGE DATA ===");
//       console.log("class_ids:", localStorage.getItem("class_ids"));
//       console.log("schoolStages:", localStorage.getItem("schoolStages"));

//       const allClassData = getClassData();
//       console.log("=== ALL CLASS DATA ===", allClassData);

//       const allAssessments: any[] = [];

//       // Debug selected classes
//       console.log("=== SELECTED CLASSES ===", selectedClasses);

//       // Prepare CA data for all selected classes
//       selectedClasses.forEach((classItem) => {
//         console.log(`=== PROCESSING CLASS ${classItem.name} ===`);
//         console.log("Class ID:", classItem.id);

//         const assessments = ccaAssessments[classItem.name] || [];
//         console.log("Assessments for this class:", assessments);

//         assessments.forEach((assessment) => {
//           const assessmentPayload = {
//             class_id: classItem.id,
//             name: assessment.title,
//             max_score: Number(assessment.maxScore),
//           };
//           console.log("Adding assessment:", assessmentPayload);
//           allAssessments.push(assessmentPayload);
//         });
//       });

//       console.log("=== FINAL ASSESSMENTS ARRAY ===", allAssessments);

//       // Prepare exam data (using first selected class)
//       if (selectedClasses.length > 0) {
//         const examData = {
//           class_id: selectedClasses.map((c) => c.id),
//           name: examName,
//           weightage: Number(weightScore),
//           max_score: Number(examMaxScore),
//         };
//         console.log("=== EXAM DATA ===", examData);

//         console.log("=== FINAL PAYLOAD TO BE SUBMITTED ===", {
//           assessments: allAssessments,
//           exam: examData,
//         });

//         const response = await ccaSetup({
//           credentials: {
//             assessments: allAssessments,
//             exam: examData,
//           },
//           token,
//         }).unwrap();

//         console.log("=== API RESPONSE ===", response);

//         // CLEAR PROGRESS ON COMPLETION
//         clearStepProgressOnCompletion();

//         toast.success("CCA setup completed");
//         navigate("/auth/congratulation");
//       } else {
//         toast.error("No classes selected");
//       }
//     } catch (error) {
//       console.error("=== FULL ERROR OBJECT ===", error);
//       console.error("Error data:", (error as any)?.data);
//       console.error("Error status:", (error as any)?.status);

//       const errorMessage =
//         (error as any)?.data?.message || "Failed to setup CCA";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const savedStages = localStorage.getItem("schoolStages");
//     if (savedStages) {
//       dispatch(setSchoolStages(JSON.parse(savedStages)));
//     }
//   }, [dispatch]);

//   const handleClassToggle = (className: string) => {
//     const allClasses = getClassData();
//     const classItem = allClasses.find((c) => c.name === className);
//     if (!classItem) return;

//     const wasSelected = selectedClasses.some((c) => c.name === className);
//     const newSelection = wasSelected
//       ? selectedClasses.filter((c) => c.name !== className)
//       : [...selectedClasses, classItem];

//     setSelectedClasses(newSelection);

//     if (!wasSelected) {
//       setCurrentClasses([classItem]);
//       setShowModal(true);
//     }
//   };

//   const handleSelectAll = (stage: SchoolStage) => {
//     const allClasses = getClassData();
//     const sectionClasses = allClasses.filter((c) =>
//       c.name.startsWith(stage.name)
//     );

//     const allSelected = sectionClasses.every((sc) =>
//       selectedClasses.some((c) => c.name === sc.name)
//     );

//     if (allSelected) {
//       setSelectedClasses((prev) =>
//         prev.filter((c) => !sectionClasses.some((sc) => sc.name === c.name))
//       );
//     } else {
//       setSelectedClasses((prev) => [...new Set([...prev, ...sectionClasses])]);
//     }
//   };

//   const handleAddAll = (stage: SchoolStage) => {
//     const allClasses = getClassData();
//     const sectionClasses = allClasses.filter((c) =>
//       c.name.startsWith(stage.name)
//     );

//     setSelectedClasses((prev) => [...new Set([...prev, ...sectionClasses])]);
//     setCurrentClasses(sectionClasses);
//     setShowModal(true);
//   };

//   const isAllSelected = (stage: SchoolStage) => {
//     const allClasses = getClassData();
//     const sectionClasses = allClasses.filter((c) =>
//       c.name.startsWith(stage.name)
//     );

//     return (
//       sectionClasses.length > 0 &&
//       sectionClasses.every((sc) =>
//         selectedClasses.some((c) => c.name === sc.name)
//       )
//     );
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

//   const handleAssessmentSubmit = (assessments: Assessment[]) => {
//     currentClasses.forEach((classItem) => {
//       setCcaAssessments((prev) => ({
//         ...prev,
//         [classItem.name]: assessments,
//       }));
//     });
//     setShowModal(false);
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
//             No classes available. Please set up your school stages first.
//           </div>
//         ) : (
//           activatedStages.map((stage) => {
//             const allClasses = getClassData();
//             const sectionClasses = allClasses.filter((c) =>
//               c.name.startsWith(stage.name)
//             );
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
//                     {sectionClasses.map((classItem) => (
//                       <div
//                         key={classItem.name}
//                         className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
//                       >
//                         <span className="text-gray-700">{classItem.name}</span>
//                         <input
//                           type="checkbox"
//                           checked={selectedClasses.some(
//                             (c) => c.name === classItem.name
//                           )}
//                           onChange={() => handleClassToggle(classItem.name)}
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
//                 Exam Name
//               </label>
//               <input
//                 type="text"
//                 value={examName}
//                 onChange={(e) => setExamName(e.target.value)}
//                 placeholder="e.g., Final Exam"
//                 className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
//               />
//               {/* <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
//                 Weight Age
//               </label>
//               <input
//                 type="text"
//                 value={weightScore}
//                 onChange={(e) => setWeightScore(e.target.value)}
//                 placeholder="e.g., 70"
//                 className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
//               /> */}

//               <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
//                 Exam Max Score
//               </label>
//               <input
//                 type="text"
//                 value={examMaxScore}
//                 onChange={(e) => setExamMaxScore(e.target.value)}
//                 placeholder="e.g., 70"
//                 className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none mt-3"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center mt-10">
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className={`md:w-1/3 w-1/2 py-2 bg-[#8000BD] text-white font-medium rounded-sm text-base transition-colors ${
//                 loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
//               }`}
//             >
//               {loading ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         </>
//       )}

//       {/* Render the modal */}
//       {showModal && (
//         <ContinuousAssessmentModal
//           selectedClasses={currentClasses.map((c) => c.name)}
//           onClose={() => setShowModal(false)}
//           onSubmit={handleAssessmentSubmit}
//         />
//       )}
//     </div>
//   );
// };

// export default CCASetup;
