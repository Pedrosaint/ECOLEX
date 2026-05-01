import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
import type {
  GetOverviewResponse,
  GetSessionsResponse,
  CreateSessionResponse,
  CreateTermResponse,
  ActivateTermResponse,
} from '../types';

export * from '../types';

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
