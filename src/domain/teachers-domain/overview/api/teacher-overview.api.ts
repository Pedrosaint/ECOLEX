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

export interface StudentScoreEntry {
  studentId: number;
  ca1?: number;
  ca2?: number;
  ca3?: number;
}

export interface SubmitCaScoresRequest {
  termId: number;
  classId: number;
  subjectId: number;
  scores: StudentScoreEntry[];
}

export interface StudentExamEntry {
  studentId: number;
  exam?: number;
}

export interface SubmitExamScoresRequest {
  termId: number;
  classId: number;
  subjectId: number;
  scores: StudentExamEntry[];
}

export interface SubmitResultsRequest {
  termId: number;
  classId: number;
  subjectId: number;
}

export interface ScoreSubmitResponse {
  success: boolean;
  message: string;
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
