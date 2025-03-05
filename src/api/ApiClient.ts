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
      getSubjects: build.query({
          query(){
             return {
                url:"/api/v1/course/subject-select"
             } 
          }
      }),
      getTeachers: build.query({
        query(){
           return {
              url:"/api/v1/employee/select-list"
           } 
        }
    }),
    getTimes: build.query({
        query(){
           return {
              url:"/api/v1/group/start-times"
           } 
        }
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
      getInfoLead: build.query({
        query(id) {
          return {
            url: `/api/v1/lead/${id}/`,
          };
        }}),
        editLead: build.mutation({
          query(body) {
            return {
              url: `/api/v1/lead/${body?.id}/`,
              method: "PUT",
              body: body,
            };
          },
        }),
  }),
});
export const {
    useGetProfileQuery,
    useGetLeadsQuery,
  useSetLoginMutation,
  useSetEditProfileMutation,
  useSetLogOutMutation,
  useGetSubjectsQuery,
  useGetTeachersQuery,
  useGetTimesQuery,
  useSetNewLeadMutation,
  useGetInfoLeadQuery,
  useEditLeadMutation
} = apiClient;
