import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
export * from "../types";
import type {
  GetStudentResultsResponse,
  GetStudentResultsParams,
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
    getStudentResults: builder.query<GetStudentResultsResponse, GetStudentResultsParams>({
      query: ({ termId }) => ({
        url: `dashboard/student/results?termId=${termId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStudentResultsQuery } = studentResultApi;
