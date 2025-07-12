import { Navigate, type RouteObject } from "react-router-dom";
import AuthLayout from "../auth/layout/auth-layout";
import GenerateToken from "../auth/components/generate-token";
import SharedLayout from "../auth/components/auth-layout";
import { SuperAdminForm } from "../auth/components/super-admin-form";
import SchoolSetup from "../auth/components/school-setup";
import InputCampus from "../auth/components/input-campus";
import CustomizeSchoolName from "../auth/components/customize-school-name";
import CCASetup from "../auth/components/cca-setup";
import UsersLogin from "../auth/components/users-login";
import { AdminLogin } from "../auth/components/admin-login";
import { TeachersLogin } from "../auth/components/teachers-login";
import { StudentLogin } from "../auth/components/student-login";
import AdminLayout from "../layouts/admin-layout/admin-layout";
import Overview from "../domain/admin-domain/overview/view/overview";
import StudentView from "../domain/admin-domain/students/view/student.view";
import Congratulation from "../auth/components/congratulation";

export default function appRouter(): RouteObject[] {
  return [
    // {
    //     path: "",
    //     // element: <Navigate to="/auth/generate-token" replace />,
    //     element: <Navigate to="/" replace />,
    // },
    {
      path: "/",
      element: <UsersLogin />,
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          path: "generate-token",
          element: <GenerateToken />,
        },
        {
          path: "auth-layout",
          element: <SharedLayout />,
          children: [
            {
              path: "super-admin",
              element: <SuperAdminForm />,
            },
            {
              path: "school-setup",
              element: <SchoolSetup />,
            },
            {
              path: "admin-login",
              element: <AdminLogin />,
            },
            {
              path: "teachers-login",
              element: <TeachersLogin />,
            },
            {
              path: "student-login",
              element: <StudentLogin />,
            },
          ],
        },
        {
          path: "input-campus",
          element: <InputCampus />,
        },
        {
          path: "customize-school-name",
          element: <CustomizeSchoolName />,
        },
        {
          path: "cca-setup",
          element: <CCASetup />,
        },
        {
          path: "congratulation",
          element: <Congratulation />,
        },
      ],
    },

    // Super_admin portal++++++++++++++++++++++++++++++
    {
      path: "admin",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          element: <Overview />,
        },
        {
          path: "students",
          element: <StudentView />,
        },
      ],
    },
  ];
}
