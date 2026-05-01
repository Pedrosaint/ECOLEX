import { useState } from "react";
import { toast } from "sonner";
import { useFormik } from "formik";
import { registerSchema } from "../auth-schema";
import { useGenerateTokenMutation } from "../api/auth-api";

export function useGenerateToken() {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [generateToken] = useGenerateTokenMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      schoolName: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await generateToken(values).unwrap();
        setToken(response.token);
        toast.success(response.message || "Token generated successfully!");
      } catch (error) {
        toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to generate token");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleCloseModal = () => {
    setToken(null);
  };

  return {
    isLoading,
    token,
    formik,
    handleCloseModal,
  };
}
