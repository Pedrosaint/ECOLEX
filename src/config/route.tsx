import { Navigate, type RouteObject } from "react-router-dom";
import AuthLayout from "../auth/layout/auth-layout";
import GenerateToken from "../auth/components/generate-token";
import SharedLayout from "../auth/components/auth-layout";
import { SuperAdminForm } from "../auth/components/super-admin-form";
import SchoolSetup from "../auth/components/school-setup";
import InputCampus from "../auth/components/input-campus";
import CustomizeSchoolName from "../auth/components/customize-school-name";

export default function appRouter(): RouteObject[] {
    return [
    {
        path: "",
        element: <Navigate to="/auth/generate-token" replace />,
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "generate-token",
            element: <GenerateToken />,
          },
          {
            path: "auth-layout",
            element: <SharedLayout/>,
            children: [
              {
                path: "super-admin",
                element: <SuperAdminForm />,
              },
              {
                path: "school-setup",
                element: <SchoolSetup />,
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
          }
        ],
    },
    ]
}
