// slices/userApiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constans";
export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/users` }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/createuser",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        body: {
          token: localStorage.getItem("token"),
        },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = userApiSlice;
