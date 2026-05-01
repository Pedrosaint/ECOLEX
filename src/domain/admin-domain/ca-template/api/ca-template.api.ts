import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
import type { SetDefaultCATemplateRequest, SetClassCATemplateRequest } from "../request/ca-template.request";
import type { SetCATemplateResponse, GetCATemplateResponse } from "../response/ca-template.response";

export const caTemplateApi = createApi({
  reducerPath: "caTemplateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["CATemplate"],
  endpoints: (builder) => ({
    getCATemplate: builder.query<GetCATemplateResponse, { classId?: number }>({
      query: ({ classId } = {}) => ({
        url: "admin/ca-template",
        method: "GET",
        params: classId ? { classId } : undefined,
      }),
      providesTags: ["CATemplate"],
    }),

    setDefaultCATemplate: builder.mutation<SetCATemplateResponse, SetDefaultCATemplateRequest>({
      query: (body) => ({
        url: "admin/ca-template",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CATemplate"],
    }),

    setClassCATemplate: builder.mutation<SetCATemplateResponse, SetClassCATemplateRequest>({
      query: (body) => ({
        url: "admin/ca-template",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CATemplate"],
    }),
  }),
});

export const {
  useGetCATemplateQuery,
  useSetDefaultCATemplateMutation,
  useSetClassCATemplateMutation,
} = caTemplateApi;

export * from '../types';
