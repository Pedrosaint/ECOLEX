import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
import type { ChangeStudentClassResponse, CreateStudentResponse, EditStudentResponse, GetStudentResponse } from "../response/students.response";
import type { ChangeStudentClassRequest, CreateStudentRequest, EditStudentRequest } from "../request/students.request";
import type { GetStudentsResponse } from "../response/get-student-response";


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
        classGroupId?: string;
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
          campus_id: params.campusId, // Snake case redundancy
          classId: params.classId,
          class_id: params.classId, // Snake case redundancy
          classGroupId: params.classGroupId,
          class_group_id: params.classGroupId, // Snake case redundancy
          groupId: params.classGroupId,
          group_id: params.classGroupId, // Snake case redundancy
          gender: params.gender,
          page: params.page || 1,
          pageSize: params.pageSize || 10,
          name: params.name,
          search: params.name,
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

    changeClass: builder.mutation<
      ChangeStudentClassResponse,
      ChangeStudentClassRequest
    >({
      query: (payload) => ({
        url: `admin/student/change-class`,
        method: "PATCH",
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
  useChangeClassMutation,
} = studentApi;
