import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";

export interface TeacherOverviewResponse {
  success: boolean;
  data: {
    totalStudents: number;
    totalClasses: number;
    totalSubjects: number;
    assignmentsInProgress: number;
  };
}

export const teacherOverviewApi = createApi({
  reducerPath: "teacherOverviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTeacherOverview: builder.query<TeacherOverviewResponse, void>({
      query: () => "teacher/overview",
    }),
  }),
});

export const { useGetTeacherOverviewQuery } = teacherOverviewApi;
