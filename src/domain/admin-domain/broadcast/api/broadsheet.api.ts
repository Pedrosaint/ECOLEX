import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
import type { BroadsheetResponse, BroadsheetQueryParams, GetResultsByStatusResponse, UnpublishResultResponse } from "../types";

export const broadsheetApi = createApi({
  reducerPath: "broadsheetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBroadsheet: builder.query<BroadsheetResponse, BroadsheetQueryParams>({
      query: ({ classId, academicSessionId, termId }) => ({
        url: `admin/broadsheet?classId=${classId}&academicSessionId=${academicSessionId}&termId=${termId}`,
        method: "GET",
      }),
    }),
    getResultsByStatus: builder.query<GetResultsByStatusResponse, { status: "published" | "rejected" }>({
      query: ({ status }) => ({ url: `admin/results?status=${status}` }),
    }),
    unpublishResult: builder.mutation<UnpublishResultResponse, { id: number }>({
      query: ({ id }) => ({ url: `admin/results/published/${id}/unpublish`, method: "DELETE" }),
    }),
  }),
});

export const { useGetBroadsheetQuery, useGetResultsByStatusQuery, useUnpublishResultMutation } = broadsheetApi;
