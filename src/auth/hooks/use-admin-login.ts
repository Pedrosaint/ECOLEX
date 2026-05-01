import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../api/auth-api";
import { superAdminLoginSchema } from "../auth-schema";
import { toast } from "sonner";
import { getCurrentStepFromBackend, shouldRedirectToSavedProgressFromBackend } from "../../utils/step-manager";
import { useAppDispatch } from "../../hooks/typed.hooks";
import { setRegistrationData } from "../redux/auth-slice";

interface SuperAdminLogin {
  email: string;
  password: string;
}

export function useAdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adminLogin] = useAdminLoginMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(superAdminLoginSchema),
  });

  const onSubmit = async (data: SuperAdminLogin) => {
    setIsLoading(true);
    try {
      const formData = { ...data };
      const response = await adminLogin(formData).unwrap();

      await new Promise((resolve) => {
        setTimeout(() => { resolve(null); }, 1000);
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      dispatch(setRegistrationData({
        email: response.data.admin.email,
        name: response.data.admin.name,
        token: token,
      }));

      localStorage.setItem(
        "schoolId",
        response.data.admin?.schoolId ? String(response.data.admin.schoolId) : ""
      );
      localStorage.setItem(
        "campusId",
        response.data.admin?.campusId ? String(response.data.admin.campusId) : ""
      );
      localStorage.setItem("hasLoggedIn", String(response.data.admin.hasLoggedIn));

      const hasIncompleteSetup = await shouldRedirectToSavedProgressFromBackend(token);
      const currentStep = await getCurrentStepFromBackend(token);

      if (hasIncompleteSetup) {
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
          default:
            navigate("/admin/dashboard", { replace: true });
        }
        toast.info("Please complete your setup to continue");
      } else {
        navigate("/admin/dashboard", { replace: true });
        toast.success("Super admin login successfully");
      }
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    showPassword,
    setShowPassword,
    isLoading,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
