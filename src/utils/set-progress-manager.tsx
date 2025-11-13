import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCcaData, getCurrentStep, getModalState, getSchoolCustomization } from "../utils/step-manager";

const SetupProgressManager = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToCurrentStep = () => {
      const currentStep = getCurrentStep();
      const modalState = getModalState();
      const schoolCustomization = getSchoolCustomization();
      const ccaData = getCcaData();

      const routes = {
        1: "/auth/input-campus",
        2: "/auth/customize-school-name",
        3: "/cca-setup",
      };

      const targetRoute = routes[currentStep as keyof typeof routes];

      // If user was on step 1 (input-campus) and modal was open, redirect there
      if (currentStep === 1 && modalState?.isOpen) {
        navigate("/auth/input-campus", { replace: true });
      }

      // If user was on step 2 (customize-school-name), redirect there
      else if (currentStep === 2 && schoolCustomization) {
        navigate("/auth/customize-school-name", { replace: true });
      }

      // If user was on step 3 (cca-setup), redirect there
      else if (currentStep === 3 && ccaData ) {
        navigate("/auth/cca-setup", { replace: true });
      }
      
      else if (targetRoute && currentStep > 1) {
        navigate(targetRoute, { replace: true });
      }
    };

    redirectToCurrentStep();
  }, [navigate]);

  return null;
};

export default SetupProgressManager;
