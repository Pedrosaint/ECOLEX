import { useNavigate } from "react-router-dom";

export function useUsersLogin() {
  const navigate = useNavigate();

  const goToStudentLogin = () => navigate("/auth/auth-layout/student-login");
  const goToTeachersLogin = () => navigate("/auth/auth-layout/teachers-login");
  const goToAdminLogin = () => navigate("/auth/auth-layout/admin-login");

  return {
    navigate,
    goToStudentLogin,
    goToTeachersLogin,
    goToAdminLogin,
  };
}
