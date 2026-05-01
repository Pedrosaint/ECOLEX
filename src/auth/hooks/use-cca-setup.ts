/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typed.hooks";
import { setSchoolStages } from "../redux/school-slice";
import { toast } from "sonner";
import { useCcaMutation } from "../api/auth-api";
import type { RootState } from "../../redux/store";
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

export function useCcaSetup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
  const [ccaAssessments, setCcaAssessments] = useState<Record<string, Assessment[]>>({});

  const activatedStages = useAppSelector((state) => state.school.stages);
  const schoolIdFromRedux = useAppSelector((state: RootState) => state.schoolSetup.schoolId);
  const [ccaSetup] = useCcaMutation();

  const schoolId = schoolIdFromRedux || Number(localStorage.getItem("schoolId")) || null;

  const getClassDataFromAPI = (): ClassData[] => {
    if (!classesResponse?.classes) return [];
    return classesResponse.classes.map((classItem: any) => ({
      id: classItem.id,
      name: classItem.name,
    }));
  };

  useEffect(() => {
    const savedCcaData = getCcaData();
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

  useEffect(() => {
    const saveCcaData = () => {
      const ccaData = {
        selectedClasses,
        examMaxScore,
        weightScore,
        examName,
        ccaAssessments,
        currentClasses: getClassDataFromAPI(),
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
  }, [selectedClasses, examMaxScore, weightScore, examName, ccaAssessments, currentClasses, showModal, classesResponse]);

  const getClassData = (): ClassData[] => getClassDataFromAPI();

  const handleSubmit = async () => {
    if (!examName || !examMaxScore) {
      toast.error("Please fill all exam fields");
      return;
    }
    if (selectedClasses.length === 0) {
      toast.error("Please select at least one class");
      return;
    }
    if (!schoolId) {
      toast.error("School information not found. Please restart the setup process.");
      return;
    }

    setLoading(true);
    try {
      const allClassData = getClassData();
      const allAssessments: any[] = [];

      selectedClasses.forEach((classItem) => {
        const assessments = ccaAssessments[classItem.name] || [];
        assessments.forEach((assessment) => {
          allAssessments.push({
            school_id: schoolId,
            class_id: classItem.id,
            name: assessment.title,
            max_score: Number(assessment.maxScore),
          });
        });
      });

      const examData = {
        school_id: schoolId,
        class_id: selectedClasses.map((c) => c.id),
        name: examName,
        weightage: Number(weightScore),
        max_score: Number(examMaxScore),
      };

      const payload = { assessments: allAssessments, exam: examData };
      const token = localStorage.getItem("token");
      await ccaSetup({ credentials: payload, token: token || "" }).unwrap();
      clearStepProgressOnCompletion();
      toast.success("CCA setup completed");
      navigate("/auth/congratulation");
    } catch (error) {
      const errorMessage = (error as any)?.data?.message || "Failed to setup CCA";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedStages = localStorage.getItem("schoolStages");
    if (savedStages) {
      try {
        const stages = JSON.parse(savedStages);
        dispatch(setSchoolStages(stages));
      } catch (error) {
        console.error("Error parsing schoolStages:", error);
      }
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
    const sectionClasses = allClasses.filter((c) => c.name.startsWith(stage.name));
    const allSelected = sectionClasses.every((sc) => selectedClasses.some((c) => c.id === sc.id));
    if (allSelected) {
      setSelectedClasses((prev) => prev.filter((c) => !sectionClasses.some((sc) => sc.id === c.id)));
    } else {
      setSelectedClasses((prev) => [...new Set([...prev, ...sectionClasses])]);
    }
  };

  const handleAddAll = (stage: SchoolStage) => {
    const allClasses = getClassData();
    const sectionClasses = allClasses.filter((c) => c.name.startsWith(stage.name));
    setSelectedClasses((prev) => [...new Set([...prev, ...sectionClasses])]);
    setCurrentClasses(sectionClasses);
    setShowModal(true);
  };

  const isAllSelected = (stage: SchoolStage) => {
    const allClasses = getClassData();
    const sectionClasses = allClasses.filter((c) => c.name.startsWith(stage.name));
    return (
      sectionClasses.length > 0 &&
      sectionClasses.every((sc) => selectedClasses.some((c) => c.id === sc.id))
    );
  };

  const reconstructStagesFromClasses = (classes: ClassData[]): SchoolStage[] => {
    if (!classes || classes.length === 0) return [];
    const stageMap = new Map();
    classes.forEach((classItem) => {
      const stageName = classItem.name.split(" ")[0];
      if (!stageMap.has(stageName)) {
        let type: "early" | "primary" | "junior" | "senior" = "primary";
        if (stageName.toLowerCase().includes("early") || stageName.toLowerCase().includes("creche") || stageName.toLowerCase().includes("nursery")) {
          type = "early";
        } else if (stageName.toLowerCase().includes("junior")) {
          type = "junior";
        } else if (stageName.toLowerCase().includes("senior")) {
          type = "senior";
        }
        stageMap.set(stageName, { type, name: stageName, startLevel: "1", endLevel: type === "primary" ? "6" : "3" });
      }
    });
    return Array.from(stageMap.values());
  };

  useEffect(() => {
    if (classesResponse?.classes && classesResponse.classes.length > 0 && activatedStages.length === 0) {
      const reconstructedStages = reconstructStagesFromClasses(getClassDataFromAPI());
      if (reconstructedStages.length > 0) {
        dispatch(setSchoolStages(reconstructedStages));
        localStorage.setItem("schoolStages", JSON.stringify(reconstructedStages));
      }
    }
  }, [classesResponse, activatedStages.length, dispatch]);

  const getStageDisplayName = (type: string) => {
    switch (type) {
      case "early": return "Early Education";
      case "primary": return "Primary";
      case "junior": return "Junior Secondary";
      case "senior": return "Senior Secondary";
      default: return "";
    }
  };

  const handleAssessmentSubmit = (assessments: Assessment[]) => {
    currentClasses.forEach((classItem) => {
      setCcaAssessments((prev) => ({ ...prev, [classItem.name]: assessments }));
    });
    setShowModal(false);
  };

  return {
    classesLoading,
    classesError,
    activatedStages,
    selectedClasses,
    currentClasses,
    examMaxScore,
    setExamMaxScore,
    weightScore,
    examName,
    setExamName,
    showModal,
    setShowModal,
    loading,
    ccaAssessments,
    getClassData,
    handleSubmit,
    handleClassToggle,
    handleSelectAll,
    handleAddAll,
    isAllSelected,
    getStageDisplayName,
    handleAssessmentSubmit,
  };
}
