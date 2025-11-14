import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentStep,
  getModalState,
  getSchoolCustomization,
  getCcaData,
  loadStepProgress,
} from "../utils/step-manager";

const SetupProgressManager = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const determineRedirect = () => {
      const progress = loadStepProgress();

      // If no progress exists, start from beginning
      if (!progress) {
        navigate("/auth/auth-layout/super-admin", { replace: true });
        return;
      }

      const currentStep = getCurrentStep();
      const modalState = getModalState();
      const schoolCustomization = getSchoolCustomization();
      const ccaData = getCcaData();

      console.log("Progress check:", {
        currentStep,
        modalState,
        hasSchoolCustomization: !!schoolCustomization,
        hasCcaData: !!ccaData,
      });

      // Step 1: Input Campus (check if modal was open)
      if (currentStep === 1) {
        if (modalState?.isOpen) {
          // User was in the middle of filling campus modal
          navigate("/auth/input-campus", { replace: true });
        } else if (progress.formData?.campuses?.length > 0) {
          // User had filled campus data but didn't submit
          navigate("/auth/input-campus", { replace: true });
        } else {
          // User was on the initial campus input page
          navigate("/auth/input-campus", { replace: true });
        }
        return;
      }

      // Step 2: Customize School Name
      if (currentStep === 2) {
        navigate("/auth/customize-school-name", { replace: true });
        return;
      }

      // Step 3: CCA Setup
      if (currentStep === 3) {
        navigate("/auth/cca-setup", { replace: true });
        return;
      }

      // If step is beyond setup process or invalid, start from beginning
      navigate("/auth/auth-layout/super-admin", { replace: true });
    };

    determineRedirect();
  }, [navigate]);

  return null;
};

export default SetupProgressManager;
