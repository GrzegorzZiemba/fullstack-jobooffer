// slices/userApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        url: '/createuser',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
        body: {
          token: localStorage.getItem('token'),
        },
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation } = userApiSlice;
