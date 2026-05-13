import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
export * from "../types";
import type {
  GetStudentResultsResponse,
  GetStudentResultsParams,
  GetStudentSessionsResponse,
} from "../types";

export const studentResultApi = createApi({
  reducerPath: "studentResultApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStudentSessions: builder.query<GetStudentSessionsResponse, void>({
      query: () => ({ url: "dashboard/student/sessions", method: "GET" }),
    }),

    getStudentResults: builder.query<GetStudentResultsResponse, GetStudentResultsParams>({
      query: ({ academicSessionId }) => ({
        url: `dashboard/student/results?academicSessionId=${academicSessionId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStudentSessionsQuery, useGetStudentResultsQuery } = studentResultApi;
