import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
export * from "../types";
import type {
  TeacherOverviewResponse,
  SubmitCaScoresRequest,
  SubmitExamScoresRequest,
  SubmitResultsRequest,
  SubmitResultsResponse,
  ScoreSubmitResponse,
  ActiveTermResponse,
  TeacherClassesResponse,
  TeacherCampusResponse,
  TeacherClassGroupsResponse,
  TeacherSessionResponse,
  TeacherBroadsheetParams,
  TeacherBroadsheetResponse,
  TeacherCaTemplatesResponse,
  TeacherCaTemplatesParams,
  TeacherExamTemplatesResponse,
  TeacherExamTemplatesParams,
  TeacherSubjectsResponse,
  TeacherSubjectsByGroupResponse,
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

    getTeacherCaTemplates: builder.query<TeacherCaTemplatesResponse, TeacherCaTemplatesParams>({
      query: ({ classId, classGroupId }) =>
        `teacher/ca?classId=${classId}&classGroupId=${classGroupId}`,
    }),

    getTeacherExamTemplates: builder.query<TeacherExamTemplatesResponse, TeacherExamTemplatesParams>({
      query: ({ classId, classGroupId }) =>
        `teacher/exam?classId=${classId}&classGroupId=${classGroupId}`,
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

    getTeacherSubjects: builder.query<TeacherSubjectsResponse, { classId: number }>({
      query: ({ classId }) => `teacher/subjects?classId=${classId}`,
    }),

    getTeacherSubjectsByGroup: builder.query<TeacherSubjectsByGroupResponse, { classGroupId: number; classId: number }>({
      query: ({ classGroupId, classId }) => `teacher/subjects/${classGroupId}/cas?classId=${classId}`,
    }),

    submitResults: builder.mutation<SubmitResultsResponse, SubmitResultsRequest>({
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
  useGetTeacherCaTemplatesQuery,
  useGetTeacherExamTemplatesQuery,
  useGetTeacherSubjectsQuery,
  useGetTeacherSubjectsByGroupQuery,
} = teacherOverviewApi;
