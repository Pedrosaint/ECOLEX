import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
import type { CreateStaffRequest } from "../request/create-staff.request";
import type { CreateStaffResponse } from "../response/create-staff.response";
import type { GetStaffResponse } from "../response/get-staff.response";
import type { GetAllStaffResponse } from "../response/get-all-staff.response";
import type { DeleteStaffResponse } from "../response/delete-staff.response";
import type { EditStaffResponse } from "../response/edit-staff.response";
import type { EditStaffRequest } from "../request/edit-staff-request";
import type { AssignTeacherRequest } from "../request/assign-teacher.request";
import type { AssignTeacherResponse } from "../response/assign-teacher.response";
import type { GetStaffsResponse } from "../response/get-staffs.response";



export const staffApi = createApi({
  reducerPath: "staffApi",
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
  tagTypes: ["Staff"],
  endpoints: (builder) => ({
    createStaff: builder.mutation<CreateStaffResponse, CreateStaffRequest>({
      query: (credentials) => ({
        url: "admin/staff/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Staff"],
    }),

    getStaff: builder.query<GetStaffResponse, { id: number }>({
      query: ({ id }) => ({
        url: `admin/staff/${id}`,
        method: "GET",
      }),
      providesTags: ["Staff"],
    }),

    getAllStaff: builder.query<
      GetAllStaffResponse,
      {
        campusId?: string;
        duty?: string;
        classId?: string;
        subjectId?: string;
        page?: number;
        pageSize?: number;
        name?: string;
      }
    >({
      query: (params) => ({
        url: `admin/staff`,
        method: "GET",
        params: {
          // Add all query parameters here
          campusId: params.campusId,
          duty: params.duty,
          classId: params.classId,
          subjectId: params.subjectId,
          page: params.page || 1,
          pageSize: params.pageSize || 7,
          name: params.name,
        },
      }),
      providesTags: ["Staff"],
    }),

    deleteStaff: builder.mutation<DeleteStaffResponse, { id: number }>({
      query: ({ id }) => ({
        url: `admin/staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff"],
    }),

    editStaff: builder.mutation<
      EditStaffResponse,
      { id: number; payload: EditStaffRequest }
    >({
      query: ({ id, payload }) => ({
        url: `admin/staff/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Staff"],
    }),

    assignTeacher: builder.mutation<
      AssignTeacherResponse,
      AssignTeacherRequest
    >({
      query: (payload) => ({
        url: `admin/staff/assign-teacher`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Staff"],
    }),

    getStaffs: builder.query<GetStaffsResponse, void>({
      query: () => ({
        url: `admin/staff`,
        method: "GET",
      }),
      providesTags: ["Staff"],
    }),
    
  }),
});



export const {
    useCreateStaffMutation,
    useGetStaffQuery,
    useGetAllStaffQuery,
    useDeleteStaffMutation,
    useEditStaffMutation,
    useAssignTeacherMutation,
    useGetStaffsQuery,
} = staffApi;
