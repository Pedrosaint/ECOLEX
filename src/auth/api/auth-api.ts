import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AdminLoginResponse,
  AdminResponse,
  CampusSetupResponse,
  SchoolSetupResponse,
  TokenResponse,
} from "../redux/response";
import type {
  AdminLoginRequest,
  AdminRequest,
  CampusSetupRequest,
  TokenRequest,
} from "../redux/request";

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
    schoolSetup: builder.mutation<
      SchoolSetupResponse,
      { formData: FormData; token: string }
    >({
      query: ({ formData, token }) => ({
        url: "school/setup",
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    adminLogin: builder.mutation<AdminLoginResponse, AdminLoginRequest>({
      query: (credentials) => ({
        url: "admin/login",
        method: "POST",
        body: credentials,
      }),
    }),

    setupCampus: builder.mutation<CampusSetupResponse, { credentials: CampusSetupRequest, token: string }>({
      query: ({ credentials, token }) => ({
        url: "setup/campus",
        method: "POST",
        body: credentials,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),


  }),
});

export const {
  useGenerateTokenMutation,
  useCreateAdminMutation,
  useSchoolSetupMutation,
  useAdminLoginMutation,
  useSetupCampusMutation,
} = authApi;
