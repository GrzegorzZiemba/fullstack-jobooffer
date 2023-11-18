// slices/jobApiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constans";

const getUserIdFromLocalStorage = () => {
  const currentUser = localStorage.getItem("currentUser");
  return currentUser ? JSON.parse(currentUser).userId : undefined;
};

export const jobApiSlice = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (jobData) => ({
        url: "/createjob",
        method: "POST",
        body: { ...jobData, userId: getUserIdFromLocalStorage() },
      }),
    }),
    updateJob: builder.mutation({
      query: ({ jobId, ...jobData }) => ({
        url: "/updatejob",
        method: "PUT",
        body: { ...jobData, jobId, userId: getUserIdFromLocalStorage() },
      }),
    }),
    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: "/deletejob",
        method: "DELETE",
        body: { jobId, userId: getUserIdFromLocalStorage() },
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApiSlice;
