/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/typed.hooks";
import { setSchoolStages } from "../../auth/redux/school-slice";
import { usePreviewText } from "./auth.hook";
import { toast } from "sonner";
import { useClassSetupMutation } from "../api/auth-api";
import {
  loadStepProgress,
  saveStepProgress,
  getSchoolCustomization,
  incrementStep,
} from "../../utils/step-manager";

interface Class {
  name: string;
}

export function useCustomizeSchoolName() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPrimaryDropdownOpen, setIsPrimaryDropdownOpen] = useState(false);
  const [isJuniorSecondaryDropdownOpen, setIsJuniorSecondaryDropdownOpen] = useState(false);
  const [isSeniorSecondaryDropdownOpen, setIsSeniorSecondaryDropdownOpen] = useState(false);

  const [classSetup] = useClassSetupMutation();
  const token = localStorage.getItem("token") || "";
  const school_id = Number(localStorage.getItem("schoolId")) || 0;

  const previewText = usePreviewText();
  const {
    isEarlyEducationActive, setIsEarlyEducationActive,
    selectedEarlyName, setSelectedEarlyName,
    earlyStartLevel, setEarlyStartLevel,
    earlyEndLevel, setEarlyEndLevel,
    isPrimaryActive, setIsPrimaryActive,
    selectedPrimaryName, setSelectedPrimaryName,
    primaryStartLevel, setPrimaryStartLevel,
    primaryEndLevel, setPrimaryEndLevel,
    isJuniorSecondaryActive, setIsJuniorSecondaryActive,
    selectedJuniorSecondaryName, setSelectedJuniorSecondaryName,
    juniorStartLevel, setJuniorStartLevel,
    juniorEndLevel, setJuniorEndLevel,
    isSeniorSecondaryActive, setIsSeniorSecondaryActive,
    selectedSeniorSecondaryName, setSelectedSeniorSecondaryName,
    seniorStartLevel, setSeniorStartLevel,
    seniorEndLevel, setSeniorEndLevel,
    generatePreviewText,
  } = previewText;

  useEffect(() => {
    const savedCustomization = getSchoolCustomization();
    if (savedCustomization) {
      setIsEarlyEducationActive(savedCustomization.isEarlyEducationActive);
      setSelectedEarlyName(savedCustomization.selectedEarlyName);
      setEarlyStartLevel(savedCustomization.earlyStartLevel);
      setEarlyEndLevel(savedCustomization.earlyEndLevel);
      setIsPrimaryActive(savedCustomization.isPrimaryActive);
      setSelectedPrimaryName(savedCustomization.selectedPrimaryName);
      setPrimaryStartLevel(savedCustomization.primaryStartLevel);
      setPrimaryEndLevel(savedCustomization.primaryEndLevel);
      setIsJuniorSecondaryActive(savedCustomization.isJuniorSecondaryActive);
      setSelectedJuniorSecondaryName(savedCustomization.selectedJuniorSecondaryName);
      setJuniorStartLevel(savedCustomization.juniorStartLevel);
      setJuniorEndLevel(savedCustomization.juniorEndLevel);
      setIsSeniorSecondaryActive(savedCustomization.isSeniorSecondaryActive);
      setSelectedSeniorSecondaryName(savedCustomization.selectedSeniorSecondaryName);
      setSeniorStartLevel(savedCustomization.seniorStartLevel);
      setSeniorEndLevel(savedCustomization.seniorEndLevel);
    }

    const currentProgress = loadStepProgress();
    if (currentProgress && currentProgress.step.current < 2) {
      const updatedStep = { ...currentProgress.step, current: 2, previous: currentProgress.step.current, incremented: true };
      saveStepProgress(updatedStep, currentProgress.formData, currentProgress.modalState, currentProgress.schoolCustomization);
    }
  }, []);

  useEffect(() => {
    const saveCustomizationData = () => {
      const customizationData = {
        isEarlyEducationActive,
        selectedEarlyName: selectedEarlyName ?? "",
        earlyStartLevel,
        earlyEndLevel,
        isPrimaryActive,
        selectedPrimaryName: selectedPrimaryName ?? "",
        primaryStartLevel,
        primaryEndLevel,
        isJuniorSecondaryActive,
        selectedJuniorSecondaryName: selectedJuniorSecondaryName ?? "",
        juniorStartLevel,
        juniorEndLevel,
        isSeniorSecondaryActive,
        selectedSeniorSecondaryName: selectedSeniorSecondaryName ?? "",
        seniorStartLevel,
        seniorEndLevel,
      };
      const currentProgress = loadStepProgress();
      if (currentProgress) {
        saveStepProgress(currentProgress.step, currentProgress.formData, currentProgress.modalState, customizationData);
      }
    };
    const timeoutId = setTimeout(saveCustomizationData, 500);
    return () => clearTimeout(timeoutId);
  }, [
    isEarlyEducationActive, selectedEarlyName, earlyStartLevel, earlyEndLevel,
    isPrimaryActive, selectedPrimaryName, primaryStartLevel, primaryEndLevel,
    isJuniorSecondaryActive, selectedJuniorSecondaryName, juniorStartLevel, juniorEndLevel,
    isSeniorSecondaryActive, selectedSeniorSecondaryName, seniorStartLevel, seniorEndLevel,
  ]);

  const dispatch = useAppDispatch();

  const hasValidConfiguration = () => {
    return (
      (isEarlyEducationActive && selectedEarlyName && earlyStartLevel && earlyEndLevel) ||
      (isPrimaryActive && selectedPrimaryName && primaryStartLevel && primaryEndLevel) ||
      (isJuniorSecondaryActive && selectedJuniorSecondaryName && juniorStartLevel && juniorEndLevel) ||
      (isSeniorSecondaryActive && selectedSeniorSecondaryName && seniorStartLevel && seniorEndLevel)
    );
  };

  const handleNextToCCA = async () => {
    const isEarlyValid = isEarlyEducationActive && selectedEarlyName && earlyStartLevel && earlyEndLevel;
    const isPrimaryValid = isPrimaryActive && selectedPrimaryName && primaryStartLevel && primaryEndLevel;
    const isJuniorValid = isJuniorSecondaryActive && selectedJuniorSecondaryName && juniorStartLevel && juniorEndLevel;
    const isSeniorValid = isSeniorSecondaryActive && selectedSeniorSecondaryName && seniorStartLevel && seniorEndLevel;

    if (!isEarlyValid && !isPrimaryValid && !isJuniorValid && !isSeniorValid) {
      toast.error("Please configure at least one education level");
      return;
    }
    if (isEarlyEducationActive) {
      if (!selectedEarlyName || !earlyStartLevel || !earlyEndLevel) { toast.error("Please complete Early Education configuration"); return; }
      if (Number(earlyStartLevel) > Number(earlyEndLevel)) { toast.error("Start level cannot be greater than end level"); return; }
    }
    if (isPrimaryActive) {
      if (!selectedPrimaryName || !primaryStartLevel || !primaryEndLevel) { toast.error("Please complete Primary configuration"); return; }
      if (Number(primaryStartLevel) > Number(primaryEndLevel)) { toast.error("Start level cannot be greater than end level"); return; }
    }
    if (isJuniorSecondaryActive) {
      if (!selectedJuniorSecondaryName || !juniorStartLevel || !juniorEndLevel) { toast.error("Please complete Junior Secondary configuration"); return; }
      if (Number(juniorStartLevel) > Number(juniorEndLevel)) { toast.error("Start level cannot be greater than end level"); return; }
    }
    if (isSeniorSecondaryActive) {
      if (!selectedSeniorSecondaryName || !seniorStartLevel || !seniorEndLevel) { toast.error("Please complete Senior Secondary configuration"); return; }
      if (Number(seniorStartLevel) > Number(seniorEndLevel)) { toast.error("Start level cannot be greater than end level"); return; }
    }

    const activatedStages = [];
    const classes: Class[] = [];

    if (isEarlyEducationActive && selectedEarlyName) {
      activatedStages.push({ type: "early" as const, name: selectedEarlyName, start: earlyStartLevel, end: earlyEndLevel });
      for (let i = Number(earlyStartLevel); i <= Number(earlyEndLevel); i++) { classes.push({ name: `${selectedEarlyName} ${i}` }); }
    }
    if (isPrimaryActive && selectedPrimaryName) {
      activatedStages.push({ type: "primary" as const, name: selectedPrimaryName, start: primaryStartLevel, end: primaryEndLevel });
      for (let i = Number(primaryStartLevel); i <= Number(primaryEndLevel); i++) { classes.push({ name: `${selectedPrimaryName} ${i}` }); }
    }
    if (isJuniorSecondaryActive && selectedJuniorSecondaryName) {
      activatedStages.push({ type: "junior" as const, name: selectedJuniorSecondaryName, start: juniorStartLevel, end: juniorEndLevel });
      for (let i = Number(juniorStartLevel); i <= Number(juniorEndLevel); i++) { classes.push({ name: `${selectedJuniorSecondaryName} ${i}` }); }
    }
    if (isSeniorSecondaryActive && selectedSeniorSecondaryName) {
      activatedStages.push({ type: "senior" as const, name: selectedSeniorSecondaryName, start: seniorStartLevel, end: seniorEndLevel });
      for (let i = Number(seniorStartLevel); i <= Number(seniorEndLevel); i++) { classes.push({ name: `${selectedSeniorSecondaryName} ${i}` }); }
    }

    dispatch(setSchoolStages(activatedStages));
    localStorage.setItem("schoolStages", JSON.stringify(activatedStages));
    setLoading(true);
    try {
      if (classes.length > 0) {
        const response = await classSetup({ credentials: { school_id, classes }, token }).unwrap();
        const classIds = response.data.savedClasses.map((classItem: { id: number }) => classItem.id);
        localStorage.setItem("class_ids", JSON.stringify(classIds));
        toast.success("Class setup completed");
      }
      const nextStep = incrementStep();
      const currentProgress = loadStepProgress();
      if (currentProgress) {
        saveStepProgress(nextStep, currentProgress.formData, currentProgress.modalState, currentProgress.schoolCustomization);
      }
      navigate("/auth/congratulation", { replace: true });
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to setup classes");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    isDropdownOpen, setIsDropdownOpen,
    isPrimaryDropdownOpen, setIsPrimaryDropdownOpen,
    isJuniorSecondaryDropdownOpen, setIsJuniorSecondaryDropdownOpen,
    isSeniorSecondaryDropdownOpen, setIsSeniorSecondaryDropdownOpen,
    isEarlyEducationActive, setIsEarlyEducationActive,
    selectedEarlyName, setSelectedEarlyName,
    earlyStartLevel, setEarlyStartLevel,
    earlyEndLevel, setEarlyEndLevel,
    isPrimaryActive, setIsPrimaryActive,
    selectedPrimaryName, setSelectedPrimaryName,
    primaryStartLevel, setPrimaryStartLevel,
    primaryEndLevel, setPrimaryEndLevel,
    isJuniorSecondaryActive, setIsJuniorSecondaryActive,
    selectedJuniorSecondaryName, setSelectedJuniorSecondaryName,
    juniorStartLevel, setJuniorStartLevel,
    juniorEndLevel, setJuniorEndLevel,
    isSeniorSecondaryActive, setIsSeniorSecondaryActive,
    selectedSeniorSecondaryName, setSelectedSeniorSecondaryName,
    seniorStartLevel, setSeniorStartLevel,
    seniorEndLevel, setSeniorEndLevel,
    generatePreviewText,
    hasValidConfiguration,
    handleNextToCCA,
  };
}
