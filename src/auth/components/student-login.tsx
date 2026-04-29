import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useStudentLoginMutation } from "../api/auth-api";
import { toast } from "sonner";
import { useState } from "react";

const studentLoginSchema = Yup.object().shape({
  registrationNumber: Yup.string().required("Registration number is required"),
});

interface StudentLoginForm {
  registrationNumber: string;
}

export const StudentLogin = () => {
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
      console.error("Error:", error);
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:rounded-r-2xl backdrop-blur-md px-4 md:px-0 pb-5 lg:pb-0 pt-2 md:pt-0 rounded-xl">
      <div className="md:pt-35 pt-15">
        <h2 className="text-3xl font-bold text-gray-50">Student</h2>
        <p className="text-[12px] text-[#FFFFFF]">
          Login so you can access the student account.
        </p>
      </div>

      <div className="mt-6">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="input-group relative my-4">
            <input
              {...register("registrationNumber")}
              type="text"
              id="registrationNumber"
              required
              className={`w-full px-3 py-2 text-white border rounded-sm focus:outline-none focus:ring-1 peer ${
                errors.registrationNumber
                  ? "border-[#FF8682] focus:ring-[#FF8682]"
                  : "border-gray-300 focus:ring-gray-200"
              }`}
              placeholder=" "
            />
            <label
              htmlFor="registrationNumber"
              className="absolute left-3 top-2 text-white text-sm transition-all
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-300
                    peer-placeholder-shown:top-2
                    peer-focus:top-[-12px]
                    peer-focus:text-sm
                    peer-focus:text-gray-100
                    peer-not-placeholder-shown:top-[-11px]
                    peer-not-placeholder-shown:bg-black/100
                    peer-not-placeholder-shown:px-2
                    peer-focus:bg-black/90
                    peer-focus:px-2
                    peer-focus:backdrop-blur-4xl"
            >
              {errors.registrationNumber ? (
                <span className="text-[#FF8682]">Registration Number</span>
              ) : (
                <span className="text-gray-400">Registration Number</span>
              )}
            </label>
            {errors.registrationNumber && (
              <p className="text-[#FF8682] text-xs mt-1 flex justify-end">
                {errors.registrationNumber.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-xm shadow-sm text-sm font-medium mt-15 text-white bg-[#8000BD] ${
                isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
