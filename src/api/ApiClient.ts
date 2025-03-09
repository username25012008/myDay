import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiClient = createApi({
  reducerPath: "apiClient",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.api.mydays.uz",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => "/api/v1/user/me/",
    }),
    getLeads: build.query({
      query: () => "/api/v1/lead/list/",
    }),
    getSubjects: build.query({
      query: () => "/api/v1/course/subject-select",
    }),
    getTeachers: build.query({
      query: () => "/api/v1/employee/select-list",
    }),
    getTimes: build.query({
      query: () => "/api/v1/group/start-times",
    }),
    getStudents: build.query({
      query: (page = 1) => `/api/v1/student/list/?page=${page}`,
    }),
    getInfoLead: build.query({
      query: (id) => `/api/v1/lead/${id}/`,
    }),
    getCourseLvl: build.query({
      query: (id) => `/api/v1/course/${id}/level`,
    }),
    getCourses: build.query({
      query: () => "/api/v1/group/group-select",
    }),
    setLogin: build.mutation({
      query(body) {
        return {
          url: "/api/v1/auth/login/",
          method: "POST",
          body: body,
        };
      },
    }),
    setEditProfile: build.mutation({
      query(body) {
        return {
          url: "/api/v1/user/me/",
          method: "PUT",
          body: body,
        };
      },
    }),
    setLogOut: build.mutation({
      query(body) {
        return {
          url: "/api/v1/auth/logout/",
          method: "POST",
          body: body,
        };
      },
    }),
    setNewLead: build.mutation({
      query(body) {
        return {
          url: "/api/v1/lead/create/",
          method: "POST",
          body: body,
        };
      },
    }),
    editLead: build.mutation({
      query(body) {
        return {
          url: `/api/v1/lead/${body?.id}/`,
          method: "PUT",
          body: body,
        };
      },
    }),
    setStudent: build.mutation({
      query(body) {
        return {
          url: `/api/v1/student/create/`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});
export const {
  useGetProfileQuery,
  useGetLeadsQuery,
  useGetInfoLeadQuery,
  useGetTimesQuery,
  useGetSubjectsQuery,
  useGetStudentsQuery,
  useGetTeachersQuery,
  useGetCourseLvlQuery,
  useGetCoursesQuery,
  useSetLoginMutation,
  useSetLogOutMutation,
  useSetNewLeadMutation,
  useSetEditProfileMutation,
  useEditLeadMutation,
  useSetStudentMutation,
} = apiClient;
