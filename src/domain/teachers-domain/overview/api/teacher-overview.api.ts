import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
export * from "../types";
import type {
  TeacherOverviewResponse,
  SubmitCaScoresRequest,
  SubmitExamScoresRequest,
  SubmitResultsRequest,
  ScoreSubmitResponse,
  ActiveTermResponse,
  TeacherClassesResponse,
  TeacherCampusResponse,
  TeacherClassGroupsResponse,
  TeacherSessionResponse,
  TeacherBroadsheetParams,
  TeacherBroadsheetResponse,
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

    getActiveTerm: builder.query<ActiveTermResponse, void>({
      query: () => "teacher/active-term",
    }),

    getTeacherClasses: builder.query<TeacherClassesResponse, void>({
      query: () => "teacher/classes",
    }),

    getTeacherCampus: builder.query<TeacherCampusResponse, void>({
      query: () => "teacher/campuses",
    }),

    getTeacherClassGroups: builder.query<TeacherClassGroupsResponse, void>({
      query: () => "teacher/class-groups",
    }),

    getTeacherSession: builder.query<TeacherSessionResponse, void>({
      query: () => "teacher/sessions",
    }),

    getTeacherBroadsheet: builder.query<TeacherBroadsheetResponse, TeacherBroadsheetParams>({
      query: ({ classId, academicSessionId, termId }) =>
        `teacher/broadsheet?classId=${classId}&academicSessionId=${academicSessionId}&termId=${termId}`,
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
  useGetActiveTermQuery,
  useGetTeacherClassesQuery,
  useGetTeacherCampusQuery,
  useGetTeacherClassGroupsQuery,
  useGetTeacherSessionQuery,
  useGetTeacherBroadsheetQuery,
} = teacherOverviewApi;
