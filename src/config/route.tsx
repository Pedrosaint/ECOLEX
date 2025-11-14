import { type RouteObject } from "react-router-dom";
import AuthLayout from "../auth/layout/auth-layout";
import GenerateToken from "../auth/components/generate-token";
import SharedLayout from "../auth/components/auth-layout";
import { SuperAdminForm } from "../auth/components/super-admin-form";
import SchoolSetup from "../auth/components/school-setup";
import InputCampus from "../auth/components/input-campus";
import CustomizeSchoolName from "../auth/components/customize-school-name";
import CCASetup from "../auth/components/cca-setup";
// import UsersLogin from "../auth/components/users-login";
import { AdminLogin } from "../auth/components/admin-login";
import { TeachersLogin } from "../auth/components/teachers-login";
import { StudentLogin } from "../auth/components/student-login";
import AdminLayout from "../layouts/admin-layout/admin-layout";
import Overview from "../domain/admin-domain/overview/view/overview";
import StudentView from "../domain/admin-domain/students/view/student.view";
import Congratulation from "../auth/components/congratulation";
import Staffs from "../domain/admin-domain/staff/view/staffs";
import ClassesView from "../domain/admin-domain/classes/view/classes.view";
import CampusView from "../domain/admin-domain/campus/view/campus.view";
import ManageSubjectView from "../domain/admin-domain/manage-subject/view/manage-subject.view";
import ResultView from "../domain/admin-domain/result/view/result.view";
import BroadsheetView from "../domain/admin-domain/broadcast/view/broadsheet.view";
import StudentResultView from "../domain/student-domain/check-result/view/student-result.view";
import PaymentView from "../domain/student-domain/pay-school-fee/view/payment.view";
import StudentDashbaordView from "../domain/student-domain/dashboard/view/student-dashbaord.view";
import StaffDashboardView from "../domain/teachers-domain/overview/view/staff-dashboard.view";
import ComputeResultView from "../domain/teachers-domain/compute/view/compute-result.view";
import StaffSetupRecordView from "../domain/teachers-domain/teachers-result-mark/view/staff-setup-record-view";
import StaffViewResultView from "../domain/teachers-domain/view-class-result/view/staff-view-result.view";
import RouteErrorBoundary from "../helper/route-error";
import SetupProgressManager from "../utils/set-progress-manager";

export default function appRouter(): RouteObject[] {
  return [
    {
      path: "/",
      element: <SetupProgressManager />,
      // element: <Navigate to="/auth/auth-layout/super-admin" replace />,
    },
    // {
    //   path: "/",
    //   element: <UsersLogin />,
    // },
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
          path: "student's",
          element: <StudentView />,
        },
        {
          path: "staff",
          element: <Staffs />,
          errorElement: <RouteErrorBoundary />,
        },
        {
          path: "classes",
          element: <ClassesView />,
        },
        {
          path: "campuses",
          element: <CampusView />,
        },
        {
          path: "result",
          element: <ResultView />,
          // element: <ReportsView />,
        },
        {
          path: "subjects",
          element: <ManageSubjectView />,
        },
        {
          path: "generate-result",
          element: <BroadsheetView />,
        },
      ],
    },

    // Student portal++++++++++++++++++++++++++++++
    {
      path: "student",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          element: <StudentDashbaordView />,
        },
        {
          path: "check-result",
          element: <StudentResultView />,
        },
        {
          path: "pay-school-fee",
          element: <PaymentView />,
        },
      ],
    },

    // Staff portal++++++++++++++++++++++++++++++
    {
      path: "staff",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          element: <StaffDashboardView />,
        },
        {
          path: "compute-result",
          element: <ComputeResultView />,
        },
        {
          path: "result-mark",
          element: <StaffSetupRecordView />,
        },
        {
          path: "view-class-results",
          element: <StaffViewResultView />,
        },
      ],
    },
  ];
}
