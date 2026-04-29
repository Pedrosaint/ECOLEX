import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";

export interface GradeItem {
  min: number;
  max: number;
  grade: string;
  remark: string;
}

export interface CreateGradingRequest {
  name: string;
  usePosition: boolean;
  classIds: number[];
  campusId: number;
  grades: GradeItem[];
}

export interface CreateGradingResponse {
  success: boolean;
  message: string;
  data: {
    scheme: {
      id: number;
      schoolId: number;
      name: string;
      usePosition: boolean;
      createdAt: string;
      campusId: number;
    };
    classIds: number[];
    grades: number;
  };
}

export interface AcademicSession {
  id: number;
  name: string;
  isActive: boolean;
}

export interface GetAcademicSessionsResponse {
  success: boolean;
  sessions: AcademicSession[];
}

export interface SubjectScore {
  caTotal: number;
  examTotal: number;
  subjectTotal: number;
  grade: string;
  remark: string;
}

export interface BroadsheetRow {
  studentId: number;
  studentName: string;
  registrationNumber: string;
  scores: Record<string, SubjectScore>;
  grandTotal: number;
  position: number | null;
}

export interface BroadsheetParams {
  classId: number;
  classGroupId: number;
}

export interface BroadsheetResponse {
  success: boolean;
  data: {
    classId: number;
    academicSessionId: number;
    subjects: string[];
    usePosition: boolean;
    rows: BroadsheetRow[];
    className: string;
    classTeacher: string | null;
    sessionName: string;
  };
}

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
      query: ({ classId, classGroupId }) => ({
        url: `admin/broadsheet?classId=${classId}&classGroupId=${classGroupId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateGradingMutation,
  useGetAcademicSessionsQuery,
  useGetBroadsheetQuery,
} = gradingApi;
