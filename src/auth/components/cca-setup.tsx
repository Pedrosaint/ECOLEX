/* eslint-disable @typescript-eslint/no-explicit-any */
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
    navigate("/auth/customize-school-name", {replace: true});
  };
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