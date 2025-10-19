import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../redux/apiConfig";
import type { CreateClassesResponse } from "../response/classes.response";
import type { CreateClassesRequest } from "../request/classes.request";
import type { GetClassesResponse } from "../response/get-class.response";
import type { EditClassRequest } from "../request/edit-class.request";
import type { EditClassResponse } from "../response/edit-class.response";
import type { AddDroupRequest } from "../request/add-group.request";
import type { AddGroupResponse } from "../response/add-group.response";
import type { GetClassGroupsResponse } from "../response/get-group.response";
import type { EditGroupRequest } from "../request/edit-group.request";
import type { EditGroupResponse } from "../response/edit-group.response";



export const classesApi = createApi({
  reducerPath: "classesApi",
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
  tagTypes: ["Classes"],
  endpoints: (builder) => ({
    addClass: builder.mutation<CreateClassesResponse, CreateClassesRequest>({
      query: (credentials) => ({
        url: "admin/classes/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Classes"],
    }),

    getClasses: builder.query<GetClassesResponse, void>({
      query: () => ({
        url: `admin/classes`,
        method: "GET",
      }),
      providesTags: ["Classes"],
    }),

    editClass: builder.mutation<
      EditClassResponse,
      { id: number; payload: EditClassRequest }
    >({
      query: ({ id, payload }) => ({
        url: `admin/class/update/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Classes"],
    }),

    addGroup: builder.mutation<AddGroupResponse, AddDroupRequest>({
      query: (payload) => ({
        url: `admin/class-groups/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Classes"],
    }),

    // addGroup: builder.mutation<Group, AddDroupRequest>({
    //   query: (payload) => ({
    //     url: `admin/class-groups/create`,
    //     method: "POST",
    //     body: payload,
    //   }),
    //   invalidatesTags: ["Classes"],
    //   transformResponse: (response: { group: Group }) => {
    //     return response.group;
    //   },
    // }),

    getClassGroups: builder.query<
      GetClassGroupsResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 7 }) => ({
        url: `admin/class-groups?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Classes"],
    }),

    editGroup: builder.mutation<
      EditGroupResponse,
      { id: number; payload: EditGroupRequest }
    >({
      query: ({ id, payload }) => ({
        url: `admin/class-group/update/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Classes"],
    }),
    
  }),
});

export const {
  useAddClassMutation,
  useGetClassesQuery,
  useEditClassMutation,
  useAddGroupMutation,
  useGetClassGroupsQuery,
  useEditGroupMutation,
} = classesApi;
