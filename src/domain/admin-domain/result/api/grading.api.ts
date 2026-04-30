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
  campusId: number;
  sessionId: number;
  termId: number;
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

export interface CaScore {
  name: string;
  score: number;
}

export interface SubjectResult {
  subjectName: string;
  cas: CaScore[];
  caTotal: number;
  examTotal: number;
  subjectTotal: number;
  grade: string;
  remark: string;
}

export interface StudentResultPerformance {
  totalScore: number;
  averageScore: number;
  position: number | null;
  overallGrade: string;
}

export interface StudentResultData {
  student: {
    name: string;
    registrationNumber: string;
    passportUrl: string;
    class: string;
    campus: string;
    session: string;
  };
  subjects: SubjectResult[];
  performance: StudentResultPerformance;
}

export interface GetStudentResultResponse {
  success: boolean;
  data: StudentResultData;
}

export interface GetStudentResultParams {
  studentId: number;
  classId: number;
  academicSessionId: number;
}

export interface PublishResultsRequest {
  classId: number;
  subjectId: number;
  academicSessionId: number;
}

export interface PublishResultsResponse {
  success: boolean;
  message: string;
  data: {
    publicationId: number;
    classId: number;
    subjectId: number;
    academicSessionId: number;
    publishedAt: string;
    totalStudents: number;
  };
}

export interface TeacherResultRow {
  registrationNumber: string;
  studentName: string;
  caScores: { name: string; score: number }[];
  caTotal: number;
  examTotal: number;
  subjectTotal: number;
  grade: string;
  remark: string;
}

export interface TeacherResultData {
  teacher: {
    name: string;
    registrationNumber: string;
    campus: string | null;
  };
  subject: string;
  class: string;
  session: string;
  submission: {
    id: number;
    status: string;
    submittedAt: string;
  };
  rows: TeacherResultRow[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface GetTeacherResultResponse {
  success: boolean;
  data: TeacherResultData;
}

export interface GetTeacherResultParams {
  staffId: number;
  classId: number;
  subjectId: number;
  academicSessionId: number;
  page?: number;
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
      query: ({ studentId, classId, academicSessionId }) => ({
        url: `admin/result/student?studentId=${studentId}&classId=${classId}&academicSessionId=${academicSessionId}`,
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
      query: ({ staffId, classId, subjectId, academicSessionId, page = 1 }) => ({
        url: `admin/result/teacher?staffId=${staffId}&classId=${classId}&subjectId=${subjectId}&academicSessionId=${academicSessionId}&page=${page}`,
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
