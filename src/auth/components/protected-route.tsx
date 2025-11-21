// components/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  shouldRedirectToSavedProgressFromBackend,
  getCurrentStepFromBackend,
} from "../../utils/step-manager";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkSetupCompletion = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/auth/auth-layout/super-admin", { replace: true });
        return;
      }

      // Check backend for incomplete setup - PASS THE TOKEN
      const hasIncompleteSetup = await shouldRedirectToSavedProgressFromBackend(
        token
      );
      const currentStep = await getCurrentStepFromBackend(token);

      console.log("ProtectedRoute - Backend setup check:", {
        hasIncompleteSetup,
        currentStep,
      });

      if (hasIncompleteSetup) {
        // Redirect to the appropriate setup step
        switch (currentStep) {
          case 1:
            navigate("/auth/auth-layout/school-setup", { replace: true });
            break;
          case 2:
            navigate("/auth/input-campus", { replace: true });
            break;
          case 3:
            navigate("/auth/customize-school-name", { replace: true });
            break;
          case 4:
            navigate("/auth/cca-setup", { replace: true });
            break;
          default:
            navigate("/auth/input-campus", { replace: true });
        }
      } else {
        // Setup complete, allow access to dashboard
        setIsChecking(false);
      }
    };

    checkSetupCompletion();
  }, [navigate]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Checking setup status...</div>
      </div>
    );
  }

  return <>{children}</>;
};



