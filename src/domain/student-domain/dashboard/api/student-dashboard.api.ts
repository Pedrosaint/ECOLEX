import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
import type { StudentMetricsResponse } from "../types";

export const studentDashboardApi = createApi({
  reducerPath: "studentDashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["StudentMetrics"],
  endpoints: (builder) => ({
    getStudentMetrics: builder.query<StudentMetricsResponse, void>({
      query: () => "dashboard/student/metrics",
      providesTags: ["StudentMetrics"],
    }),
  }),
});

export const { useGetStudentMetricsQuery } = studentDashboardApi;
