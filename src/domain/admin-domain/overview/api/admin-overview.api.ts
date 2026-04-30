import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";

export interface TermData {
  id: number;
  name: string;
  isActive: boolean;
  createdAt?: string;
}

export interface SessionData {
  id: number;
  name: string;
  isActive: boolean;
  terms: TermData[];
}

export interface UpcomingExam {
  id: number;
  name: string;
  createdAt: string;
  class: { name: string; customName: string | null };
  subject: { name: string };
}

export interface OverviewData {
  students: { total: number; boys: number; girls: number };
  staff: { total: number };
  campuses: { total: number };
  bill: string | null;
  upcomingExams: UpcomingExam[];
  activeSession: { id: number; name: string } | null;
  activeTerm: { id: number; name: string } | null;
  noticeBoard: null;
}

export interface GetOverviewResponse {
  success: boolean;
  data: OverviewData;
}

export interface GetSessionsResponse {
  success: boolean;
  data: SessionData[];
}

export interface CreateSessionResponse {
  success: boolean;
  message: string;
  data: { id: number; name: string; isActive: boolean };
}

export interface CreateTermResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    isActive: boolean;
    session: { id: number; name: string };
  };
}

export interface ActivateTermResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    isActive: boolean;
    session: { id: number; name: string; isActive: boolean };
  };
}

export const adminOverviewApi = createApi({
  reducerPath: "adminOverviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Overview", "Sessions"],
  endpoints: (builder) => ({
    getAdminOverview: builder.query<GetOverviewResponse, void>({
      query: () => ({ url: "admin/overview", method: "GET" }),
      providesTags: ["Overview"],
    }),

    getSessions: builder.query<GetSessionsResponse, void>({
      query: () => ({ url: "admin/sessions", method: "GET" }),
      providesTags: ["Sessions"],
    }),

    createSession: builder.mutation<CreateSessionResponse, { name: string }>({
      query: (body) => ({ url: "admin/session", method: "POST", body }),
      invalidatesTags: ["Sessions", "Overview"],
    }),

    createTerm: builder.mutation<CreateTermResponse, { sessionId: number; name: string }>({
      query: (body) => ({ url: "admin/term", method: "POST", body }),
      invalidatesTags: ["Sessions", "Overview"],
    }),

    activateTerm: builder.mutation<ActivateTermResponse, { id: number }>({
      query: ({ id }) => ({ url: `admin/term/${id}/activate`, method: "PATCH" }),
      invalidatesTags: ["Sessions", "Overview"],
    }),
  }),
});

export const {
  useGetAdminOverviewQuery,
  useGetSessionsQuery,
  useCreateSessionMutation,
  useCreateTermMutation,
  useActivateTermMutation,
} = adminOverviewApi;
