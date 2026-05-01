import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
export * from "../types";
import type {
  TeacherOverviewResponse,
  SubmitCaScoresRequest,
  SubmitExamScoresRequest,
  SubmitResultsRequest,
  ScoreSubmitResponse,
} from "../types";

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
  tagTypes: ["TeacherResults"],
  endpoints: (builder) => ({
    getTeacherOverview: builder.query<TeacherOverviewResponse, void>({
      query: () => "teacher/overview",
    }),

    submitCaScores: builder.mutation<ScoreSubmitResponse, SubmitCaScoresRequest>({
      query: (body) => ({
        url: "teacher/scores/ca",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TeacherResults"],
    }),

    submitExamScores: builder.mutation<ScoreSubmitResponse, SubmitExamScoresRequest>({
      query: (body) => ({
        url: "teacher/scores/exam",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TeacherResults"],
    }),

    submitResults: builder.mutation<ScoreSubmitResponse, SubmitResultsRequest>({
      query: (body) => ({
        url: "teacher/results/submit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TeacherResults"],
    }),
  }),
});

export const {
  useGetTeacherOverviewQuery,
  useSubmitCaScoresMutation,
  useSubmitExamScoresMutation,
  useSubmitResultsMutation,
} = teacherOverviewApi;
