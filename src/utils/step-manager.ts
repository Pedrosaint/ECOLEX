import type { GetAdminSchoolsResponse, GetCampusResponse } from '../domain/admin-domain/campus/response/campuse.response';
import type { GetClassesResponse } from '../domain/admin-domain/classes/response/get-class.response';
import { BASE_URL } from '../redux/apiConfig';

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

// ========== LOCALSTORAGE FUNCTIONS (For Components) ==========

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





// =============================================================================
// ========== BACKEND FUNCTIONS (For Login Only) ================================
// =============================================================================


// NEW: Get school info from backend && check if school exits using GET endpoint
export const checkSchoolExists = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}admin/my-school`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return false;

    const data: GetAdminSchoolsResponse = await response.json();
    console.log("School check response:", data);

    // A school exists if schoolId is truthy (not 0, null, undefined)
    const hasSchool =
      !!(data?.data && data.data.schoolId && Number(data.data.schoolId) > 0);

    console.log("School exists:", hasSchool);
    return hasSchool;
  } catch (error) {
    console.error("Failed to check school:", error);
    return false;
  }
};



// NEW: Check if campuses exist using GET endpoint
export const checkCampusesExist = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}admin/campuses`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data: GetCampusResponse = await response.json();
      return data.success && data.campuses && data.campuses.length > 0;
    }
    return false;
  } catch (error) {
    console.error("Failed to check campuses:", error);
    return false;
  }
};

// NEW: Check if classes exist using GET endpoint
export const checkClassesExist = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}admin/classes`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data: GetClassesResponse = await response.json();
      return data.success && data.classes && data.classes.length > 0;
    }
    return false;
  } catch (error) {
    console.error("Failed to check classes:", error);
    return false;
  }
};

// NEW: Check if CCA exists using GET endpoint
export const checkCcaExists = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}admin/assessments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Handle different possible response structures
      if (data.success && (data.cca || data.ccas)) {
        const ccaData = data.cca || data.ccas || data.data;
        return ccaData && ccaData.length > 0;
      }
      return false;
    }
    return false;
  } catch (error) {
    console.error("Failed to check CCA:", error);
    return false;
  }
};

// NEW: Determine current step based on what data exists
export const getCurrentStepFromBackend = async (token: string): Promise<number> => {
  try {
    const hasSchools = await checkSchoolExists(token);
    const hasCampuses = await checkCampusesExist(token);
    const hasClasses = await checkClassesExist(token);
    const hasCca = await checkCcaExists(token);

    console.log("🔍 DATA EXISTENCE CHECK:", {
      hasSchools,
      hasCampuses, 
      hasClasses,
      hasCca
    });

    // Determine step based on what data exists
    if (!hasSchools) {
      console.log("➡️ Redirecting to Step 1: School Setup (no schools found)");
      return 1; // Need to setup school
    } else if (!hasCampuses) {
      console.log("➡️ Redirecting to Step 2: Campus Setup (no campuses found)");
      return 2; // Need to setup campuses
    } else if (!hasClasses) {
      console.log("➡️ Redirecting to Step 3: Class Setup (no classes found)");
      return 3; // Need to setup classes
    } else if (!hasCca) {
      console.log("➡️ Redirecting to Step 4: CCA Setup (no CCA found)");
      return 4; // Need to setup CCA
    } else {
      console.log("✅ All setup complete - proceeding to dashboard");
      return 5; // All setup complete
    }
  } catch (error) {
    console.error("Failed to get current step from backend:", error);
    return 1;
  }
};

// NEW: Backend version for login redirection
export const shouldRedirectToSavedProgressFromBackend = async (token: string): Promise<boolean> => {
  try {
    const currentStep = await getCurrentStepFromBackend(token);
    
    console.log("Backend progress check for login:", {
      currentStep,
      shouldRedirect: currentStep < 5
    });

    // If current step is less than 4 (complete), redirect to setup
    return currentStep < 5;
  } catch (error) {
    console.error("Failed to check backend progress:", error);
    return false;
  }
};
