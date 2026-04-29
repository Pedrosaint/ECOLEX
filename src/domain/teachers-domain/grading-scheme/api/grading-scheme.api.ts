import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
import type {
  CreateGradingSchemeRequest,
  AddClassesToSchemeRequest,
} from "../request/grading-scheme.request";
import type {
  CreateGradingSchemeResponse,
  AddClassesToSchemeResponse,
} from "../response/grading-scheme.response";

export const gradingSchemeApi = createApi({
  reducerPath: "gradingSchemeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createGradingScheme: builder.mutation<
      CreateGradingSchemeResponse,
      CreateGradingSchemeRequest
    >({
      query: (body) => ({
        url: "teacher/grading/create",
        method: "POST",
        body,
      }),
    }),

    addClassesToScheme: builder.mutation<
      AddClassesToSchemeResponse,
      { schemeId: number } & AddClassesToSchemeRequest
    >({
      query: ({ schemeId, classIds }) => ({
        url: `teacher/grading/${schemeId}/classes`,
        method: "POST",
        body: { classIds },
      }),
    }),
  }),
});

export const {
  useCreateGradingSchemeMutation,
  useAddClassesToSchemeMutation,
} = gradingSchemeApi;
