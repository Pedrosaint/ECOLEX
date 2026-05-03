import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
import type {
  CreateGradingRequest,
  CreateGradingResponse,
  GetAcademicSessionsResponse,
  BroadsheetResponse,
  BroadsheetParams,
  GetStudentResultResponse,
  GetStudentResultParams,
  PublishResultsResponse,
  PublishResultsRequest,
  GetTeacherResultResponse,
  GetTeacherResultParams,
} from '../types';

export * from '../types';

export const gradingApi = createApi({
  reducerPath: "gradingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Results"],
  endpoints: (builder) => ({
    createGrading: builder.mutation<CreateGradingResponse, CreateGradingRequest>({
      query: (body) => ({
        url: "admin/grading/create",
        method: "POST",
        body,
      }),
    }),

    getAcademicSessions: builder.query<GetAcademicSessionsResponse, void>({
      query: () => ({ url: "admin/academic-sessions", method: "GET" }),
    }),

    getBroadsheet: builder.query<BroadsheetResponse, BroadsheetParams>({
      query: ({ classId, classGroupId, campusId, sessionId, termId }) => ({
        url: `admin/broadsheet?classId=${classId}&classGroupId=${classGroupId}&campusId=${campusId}&sessionId=${sessionId}&termId=${termId}`,
        method: "GET",
      }),
    }),

    getStudentResult: builder.query<GetStudentResultResponse, GetStudentResultParams>({
      query: ({ studentId, classId, academicSessionId, termId }) => ({
        url: `admin/result/student?studentId=${studentId}&classId=${classId}&academicSessionId=${academicSessionId}&termId=${termId}`,
        method: "GET",
      }),
    }),

    publishResults: builder.mutation<PublishResultsResponse, PublishResultsRequest>({
      query: (body) => ({
        url: "admin/results/publish",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Results"],
    }),

    getTeacherResult: builder.query<GetTeacherResultResponse, GetTeacherResultParams>({
      query: ({ staffId, classId, subjectId, academicSessionId, termId, campusId, page = 1 }) => ({
        url: `admin/result/teacher?staffId=${staffId}&classId=${classId}&subjectId=${subjectId}&academicSessionId=${academicSessionId}&termId=${termId}&campusId=${campusId}&page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateGradingMutation,
  useGetAcademicSessionsQuery,
  useGetBroadsheetQuery,
  useGetStudentResultQuery,
  usePublishResultsMutation,
  useGetTeacherResultQuery,
} = gradingApi;
