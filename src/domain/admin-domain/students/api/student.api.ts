import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
import type { CreateStudentResponse, EditStudentResponse, GetStudentResponse, GetStudentsResponse } from "../response/students.response";
import type { CreateStudentRequest, EditStudentRequest } from "../request/students.request";


export const studentApi = createApi({
  reducerPath: "studentApi",
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
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    createStudent: builder.mutation<
      CreateStudentResponse,
      CreateStudentRequest
    >({
      query: (credentials) => ({
        url: "admin/student/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Student"],
    }),

    getStudent: builder.query<GetStudentResponse, { id: number }>({
      query: ({ id }) => ({
        url: `admin/student/${id}`,
        method: "GET",
      }),
      providesTags: ["Student"],
    }),

    getAllStudent: builder.query<
      GetStudentsResponse,
      {
        campusId?: string;
        classId?: string;
        groupId?: string;
        gender?: string;
        page?: number;
        pageSize?: number;
        name?: string;
      }
    >({
      query: (params) => ({
        url: `admin/students`,
        method: "GET",
        params: {
          campusId: params.campusId,
          classId: params.classId,
          groupId: params.groupId,
          gender: params.gender,
          page: params.page || 1,
          pageSize: params.pageSize || 7,
          name: params.name,
        },
      }),
      providesTags: ["Student"],
    }),

    // deleteStudent: builder.mutation<DeleteStudentResponse, { id: number }>({
    //   query: ({ id }) => ({
    //     url: `admin/student/${id}`,
    //     method: "DELETE",
    //   }),
    // }),

    editStudent: builder.mutation<
      EditStudentResponse,
      { id: number; payload: EditStudentRequest }
    >({
      query: ({ id, payload }) => ({
        url: `admin/student/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Student"],
    }),
    
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentQuery,
  useEditStudentMutation,
  useGetStudentQuery,
} = studentApi;
