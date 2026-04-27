import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentStepFromBackend } from "./step-manager";
import Loader from "../page-loader";

const SetupProgressManager = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth/auth-layout/admin-login", { replace: true });
      return;
    }

    getCurrentStepFromBackend(token)
      .then((step) => {
        switch (step) {
          case 1:
            navigate("/auth/auth-layout/school-setup", { replace: true });
            break;
          case 2:
            navigate("/auth/input-campus", { replace: true });
            break;
          case 3:
            navigate("/auth/customize-school-name", { replace: true });
            break;
          default:
            navigate("/admin/dashboard", { replace: true });
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/auth/auth-layout/admin-login", { replace: true });
      })
      .finally(() => setChecking(false));
  }, [navigate]);

  if (!checking) return null;
  return <Loader />;
};

export default SetupProgressManager;
