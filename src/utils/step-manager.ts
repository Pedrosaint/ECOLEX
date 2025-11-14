/* eslint-disable @typescript-eslint/no-explicit-any */

export interface SchoolCustomizationData {
  isEarlyEducationActive: boolean;
  selectedEarlyName: string;
  earlyStartLevel: string;
  earlyEndLevel: string;

  isPrimaryActive: boolean;
  selectedPrimaryName: string;
  primaryStartLevel: string;
  primaryEndLevel: string;

  isJuniorSecondaryActive: boolean;
  selectedJuniorSecondaryName: string;
  juniorStartLevel: string;
  juniorEndLevel: string;

  isSeniorSecondaryActive: boolean;
  selectedSeniorSecondaryName: string;
  seniorStartLevel: string;
  seniorEndLevel: string;
}

export interface CcaAssessment {
  title: string;
  maxScore: string;
}

export interface ClassData {
  name: string;
  id: number;
}

export interface CcaData {
  selectedClasses: ClassData[];
  examMaxScore: string;
  weightScore: string;
  examName: string;
  ccaAssessments: Record<string, CcaAssessment[]>;
  currentClasses?: ClassData[];
  showModal?: boolean;
}

export interface StepState {
  previous: number;
  current: number;
  incremented: boolean;
  capped: boolean;
}

export interface SetupProgress {
  step: StepState;
  formData?: any;
  modalState?: {
    isOpen: boolean;
    campusCount: number;
  };
  timestamp: number;
  ccaData?: CcaData;
  schoolCustomization?: SchoolCustomizationData;
}

export const saveStepProgress = (
  step: StepState,
  formData?: any,
  modalState?: { isOpen: boolean; campusCount: number },
  schoolCustomization?: SchoolCustomizationData,
  ccaData?: CcaData
) => {
  try {
    const progress: SetupProgress = {
      step,
      formData,
      modalState,
      ccaData,
      schoolCustomization,
      timestamp: Date.now(),
    };
    localStorage.setItem("setupProgress", JSON.stringify(progress));
    console.log("Progress saved:", {
      step: step.current,
      modalState,
      hasFormData: !!formData,
    });
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
};

export const loadStepProgress = (): SetupProgress | null => {
  try {
    const saved = localStorage.getItem("setupProgress");
    if (!saved) return null;

    const progress = JSON.parse(saved) as SetupProgress;

    // Validate progress is not too old (24 hours max)
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    const isRecent = Date.now() - progress.timestamp < TWENTY_FOUR_HOURS;

    return isRecent ? progress : null;
  } catch (error) {
    console.error("Failed to load progress:", error);
    return null;
  }
};

export const clearStepProgress = () => {
  localStorage.removeItem("setupProgress");
};

export const getCurrentStep = (): number => {
  const progress = loadStepProgress();
  return progress?.step.current || 1;
};

export const saveModalState = (isOpen: boolean, campusCount: number) => {
  const currentProgress = loadStepProgress();
  if (currentProgress) {
    saveStepProgress(currentProgress.step, currentProgress.formData, {
      isOpen,
      campusCount,
    });
  }
};

export const getModalState = (): {
  isOpen: boolean;
  campusCount: number;
} | null => {
  const progress = loadStepProgress();
  return progress?.modalState || null;
};

export const getSchoolCustomization = (): SchoolCustomizationData | null => {
  const progress = loadStepProgress();
  return progress?.schoolCustomization || null;
};

export const getCcaData = (): CcaData | null => {
  const progress = loadStepProgress();
  return progress?.ccaData || null;
};

export const clearStepProgressOnCompletion = () => {
  localStorage.removeItem("setupProgress");
};

export const shouldRedirectToSavedProgress = (): boolean => {
  const progress = loadStepProgress();
  if (!progress) return false;

  // Consider progress valid if it's less than 24 hours old
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
  const isRecent = Date.now() - progress.timestamp < TWENTY_FOUR_HOURS;

  return isRecent && progress.step.current > 1;
};

export const initializeStepProgress = () => {
  const initialStep: StepState = {
    previous: 1,
    current: 1,
    incremented: false,
    capped: false,
  };

  saveStepProgress(initialStep);
};

export const incrementStep = (): StepState => {
  const currentProgress = loadStepProgress();
  const currentStep = currentProgress?.step.current || 1;

  const nextStep: StepState = {
    previous: currentStep,
    current: currentStep + 1,
    incremented: true,
    capped: currentStep + 1 >= 3, // Assuming 3 is the max step
  };

  if (currentProgress) {
    saveStepProgress(
      nextStep,
      currentProgress.formData,
      currentProgress.modalState,
      currentProgress.schoolCustomization,
      currentProgress.ccaData
    );
  }

  return nextStep;
};
