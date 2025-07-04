import { Navigate, type RouteObject } from "react-router-dom";
import AuthLayout from "../auth/layout/auth-layout";
import GenerateToken from "../auth/components/generate-token";
import CreateAccount from "../auth/components/create-account";

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
            path: "create-account",
            element: <CreateAccount />,
          },
        //   {
        //     path: "otp",
        //     element: <Otp />,
        //   },
        //   {
        //     path: "reset-password",
        //     element: <ResetPassword />,
        //   },
        ],
    },
    ]
}
