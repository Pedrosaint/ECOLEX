import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useStudentLoginMutation } from "../api/auth-api";
import { toast } from "sonner";

const studentLoginSchema = Yup.object().shape({
  registrationNumber: Yup.string().required("Registration number is required"),
});

interface StudentLoginForm {
  registrationNumber: string;
}

export function useStudentLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [studentLogin] = useStudentLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentLoginForm>({
    mode: "onChange",
    resolver: yupResolver(studentLoginSchema),
  });

  const onSubmit = async (data: StudentLoginForm) => {
    setIsLoading(true);
    try {
      const response = await studentLogin(data).unwrap();
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("studentId", String(response.data.student.id));
      localStorage.setItem("schoolId", String(response.data.student.school.id));
      localStorage.setItem("campusId", String(response.data.student.campus.id));
      localStorage.setItem("classId", String(response.data.student.class.id));
      toast.success("Login successful");
      navigate("/student/dashboard", { replace: true });
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
