import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
import type { AssignSubjectToClassRequest, CreateSubjectRequest } from "../request";
import type {
  AssignSubjectToClassResponse,
  CreateSubjectResponse,
  GetClassSubjectsResponse,
  GetSubjectResponse,
} from "../response";


export const subjectApi = createApi({
  reducerPath: "subjectApi",
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
  tagTypes: ["Subject", "ClassSubject"],
  endpoints: (builder) => ({
    addSubject: builder.mutation<CreateSubjectResponse, CreateSubjectRequest>({
      query: (credentials) => ({
        url: "admin/subject/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Subject"],
    }),

    getAllSubject: builder.query<GetSubjectResponse, void>({
      query: () => ({
        url: "admin/subjects",
        method: "GET",
      }),
      providesTags: ["Subject"],
    }),

    editSubject: builder.mutation<
      CreateSubjectResponse,
      { id: number; payload: CreateSubjectRequest }
    >({
      query: ({ id, payload }) => ({
        url: `admin/subject/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Subject"],
    }),

    assignSubjectToClass: builder.mutation<
      AssignSubjectToClassResponse,
      AssignSubjectToClassRequest
    >({
      query: (body) => ({
        url: "admin/class-subject/assign",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ClassSubject"],
    }),

    getClassSubjects: builder.query<GetClassSubjectsResponse, number>({
      query: (classId) => ({
        url: `admin/class-subject/${classId}`,
        method: "GET",
      }),
      providesTags: ["ClassSubject"],
    }),

    deleteSubject: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `admin/subject/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subject"],
    }),
  }),
});

export const {
  useAddSubjectMutation,
  useGetAllSubjectQuery,
  useEditSubjectMutation,
  useAssignSubjectToClassMutation,
  useGetClassSubjectsQuery,
  useDeleteSubjectMutation,
} = subjectApi;
