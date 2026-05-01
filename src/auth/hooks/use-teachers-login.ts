import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTeacherLoginMutation } from "../api/auth-api";
import { toast } from "sonner";

const teacherLoginSchema = Yup.object().shape({
  registrationNumber: Yup.string().required("Registration number is required"),
});

interface TeacherLoginForm {
  registrationNumber: string;
}

export function useTeachersLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [teacherLogin] = useTeacherLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherLoginForm>({
    mode: "onChange",
    resolver: yupResolver(teacherLoginSchema),
  });

  const onSubmit = async (data: TeacherLoginForm) => {
    setIsLoading(true);
    try {
      const response = await teacherLogin(data).unwrap();
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("teacherId", String(response.data.teacher.id));
      localStorage.setItem("schoolId", String(response.data.teacher.school.id));
      if (response.data.teacher.campus) {
        localStorage.setItem("campusId", String(response.data.teacher.campus.id));
      }
      toast.success("Login successful");
      navigate("/staff/dashboard", { replace: true });
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
