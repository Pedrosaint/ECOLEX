import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";

export interface StudentSubjectResult {
  subject: string;
  ca1: number;
  ca2: number;
  ca3: number;
  caTotal: number;
  exam: number;
  total: number;
  grade: string;
  remark: string;
  position?: number | null;
}

export interface StudentResultData {
  studentName: string;
  registrationNumber: string;
  className: string;
  sessionName: string;
  termName: string;
  results: StudentSubjectResult[];
  grandTotal: number;
  overallPosition?: number | null;
}

export interface GetStudentResultsResponse {
  success: boolean;
  data: StudentResultData;
}

export interface GetStudentResultsParams {
  termId: number;
}

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
    getStudentResults: builder.query<GetStudentResultsResponse, GetStudentResultsParams>({
      query: ({ termId }) => ({
        url: `dashboard/student/results?termId=${termId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStudentResultsQuery } = studentResultApi;
