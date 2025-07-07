import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TokenResponse } from "./response";
import type { TokenRequest } from "./request";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://testecolex.com.ng/api/",
  }),
  endpoints: (builder) => ({
    generateToken: builder.mutation<
     TokenResponse,
     TokenRequest
    >({
      query: (credentials) => ({
        url: "system-admin/generate",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGenerateTokenMutation } = authApi;
