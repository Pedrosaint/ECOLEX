import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getModalState,
  loadStepProgress,
  saveStepProgress,
  initializeStepProgress,
} from "../../utils/step-manager";

export function useInputCampus() {
  const [isModal, setIsModal] = useState(false);
  const [campusCount, setCampusCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedModalState = getModalState();
    const currentProgress = loadStepProgress();

    if (!currentProgress) {
      initializeStepProgress();
    } else if (currentProgress.step.current < 1) {
      const updatedStep = { ...currentProgress.step, current: 1, previous: 1 };
      saveStepProgress(updatedStep, currentProgress.formData, currentProgress.modalState, currentProgress.schoolCustomization);
    }

    if (savedModalState?.isOpen) {
      setIsModal(true);
      setCampusCount(savedModalState.campusCount || 0);
    } else if (currentProgress?.formData?.campuses) {
      const campuses = currentProgress.formData.campuses;
      if (Array.isArray(campuses) && campuses.length > 0) {
        setCampusCount(campuses.length);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newCount = isNaN(value) ? 0 : value;
    setCampusCount(newCount);
    const currentProgress = loadStepProgress();
    if (currentProgress) {
      saveStepProgress(
        currentProgress.step,
        currentProgress.formData,
        { isOpen: isModal, campusCount: newCount },
        currentProgress.schoolCustomization
      );
    }
  };

  const handleOpenModal = () => {
    if (campusCount > 0) {
      setIsModal(true);
      const currentProgress = loadStepProgress();
      if (currentProgress) {
        saveStepProgress(
          currentProgress.step,
          currentProgress.formData,
          { isOpen: true, campusCount },
          currentProgress.schoolCustomization
        );
      }
    }
  };

  const handleCloseModal = () => {
    setIsModal(false);
    const currentProgress = loadStepProgress();
    if (currentProgress) {
      saveStepProgress(
        currentProgress.step,
        currentProgress.formData,
        { isOpen: false, campusCount: 0 },
        currentProgress.schoolCustomization
      );
    }
  };

  const handleBackNavigation = () => {
    const currentProgress = loadStepProgress();
    if (currentProgress) {
      saveStepProgress(
        currentProgress.step,
        currentProgress.formData,
        { isOpen: false, campusCount: 0 },
        currentProgress.schoolCustomization
      );
    }
    navigate("/auth/auth-layout/school-setup");
  };

  return {
    isModal,
    campusCount,
    handleInputChange,
    handleOpenModal,
    handleCloseModal,
    handleBackNavigation,
  };
}
