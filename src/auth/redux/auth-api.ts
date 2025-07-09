import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AdminLoginResponse, AdminResponse, SchoolSetupResponse, TokenResponse } from "./response";
import type { AdminLoginRequest, AdminRequest, TokenRequest } from "./request";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://testecolex.com.ng/api/",
  }),
  endpoints: (builder) => ({
    generateToken: builder.mutation<TokenResponse, TokenRequest>({
      query: (credentials) => ({
        url: "system-admin/generate",
        method: "POST",
        body: credentials,
      }),
    }),

    createAdmin: builder.mutation<AdminResponse, AdminRequest>({
      query: (credentials) => ({
        url: "admin/create",
        method: "POST",
        body: credentials,
      }),
    }),
    schoolSetup: builder.mutation<SchoolSetupResponse, FormData>({
      query: (formData) => ({
        url: "school/setup",
        method: "POST",
        body: formData,
        // headers: {
        //   Authorization: `Bearer ${getToken()}`,
        // },
      }),
    }),

    adminLogin: builder.mutation<AdminLoginResponse, AdminLoginRequest>({
      query: (credentials) => ({
        url: "admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { 
    useGenerateTokenMutation, 
    useCreateAdminMutation,
    useSchoolSetupMutation,
    useAdminLoginMutation,

} = authApi;
