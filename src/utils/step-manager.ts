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
  ccaData?: CcaData,
) => {
  const progress: SetupProgress = {
    step,
    formData,
    modalState,
    ccaData,
    schoolCustomization,
    timestamp: Date.now(),
  };
  localStorage.setItem("setupProgress", JSON.stringify(progress));
};

export const loadStepProgress = (): SetupProgress | null => {
  const saved = localStorage.getItem("setupProgress");
  return saved ? JSON.parse(saved) : null;
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