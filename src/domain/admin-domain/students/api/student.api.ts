import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
import type { CreateStudentResponse, EditStudentResponse, GetStudentsResponse } from "../response/students.response";
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
    }),

    // getStaff: builder.query<GetStaffResponse, { id: number }>({
    //   query: ({ id }) => ({
    //     url: `admin/staff/${id}`,
    //     method: "GET",
    //   }),
    // }),

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
    }),

    // deleteStaff: builder.mutation<DeleteStaffResponse, { id: number }>({
    //   query: ({ id }) => ({
    //     url: `admin/staff/${id}`,
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
    }),
    
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentQuery,
  useEditStudentMutation,
} = studentApi;
