// slices/jobApiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constans";

const getUserIdFromLocalStorage = () => {
  const currentUser = localStorage.getItem("userInfo");
  console.log(currentUser);

  return currentUser ? JSON.parse(currentUser).user : undefined;
};

export const jobApiSlice = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => ({
        url: "/allposts",
        method: "GET",
      }),
    }),
    getJob: builder.query({
      query: (jobId) => ({
        url: `/posts/${jobId}`,
        method: "GET",
      }),
    }),
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
  useGetJobsQuery,
  useGetJobQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApiSlice;
