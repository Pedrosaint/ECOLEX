import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
import type { CreateCampusResponse, EditCampusResponse, GetCampusResponse } from "../response/campuse.response";
import type { CreateCampusRequest, EditCampusRequest } from "../request/campus.request";



export const campusApi = createApi({
  reducerPath: "campusApi",
  tagTypes: ["Campus"],
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
  endpoints: (builder) => ({
    addCampus: builder.mutation<CreateCampusResponse, CreateCampusRequest>({
      query: (credentials) => ({
        url: "admin/campus/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Campus"],
    }),

    getCampus: builder.query<
      GetCampusResponse,
      void
    >({
      query: () => ({
        url: `admin/campuses`,
        method: "GET",
      }),
      providesTags: ["Campus"],
    }),

    getCampusParams: builder.query<
      GetCampusResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: `admin/campuses?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Campus"],
    }),

    editCampus: builder.mutation<
      EditCampusResponse,
      { id: number; payload: EditCampusRequest }
    >({
      query: ({ id, payload }) => ({
        url: `admin/campus/update/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Campus"],
    }),
  }),
});

export const {
  useAddCampusMutation,
  useGetCampusQuery,
  useEditCampusMutation,
  useGetCampusParamsQuery,
} = campusApi;
