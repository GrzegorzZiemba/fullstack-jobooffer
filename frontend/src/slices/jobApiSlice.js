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
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/jobs` }),
  tagTypes: ["Jobs"], // Define a tag type

  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => ({
        url: "/allposts",
        method: "GET",
      }),
      providesTags: ["Jobs"], // Tag this query
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
      invalidatesTags: ["Jobs"], // Invalidate 'Jobs' on success
    }),
    updateJob: builder.mutation({
      query: ({ jobId, ...jobData }) => ({
        url: "/updatejob",
        method: "POST",
        body: { ...jobData, jobId, userId: getUserIdFromLocalStorage() },
      }),
      invalidatesTags: ["Jobs"], // Invalidate 'Jobs' on success
    }),
    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: `/delete`,
        method: "DELETE",
        body: { jobId, userId: getUserIdFromLocalStorage() },
      }),
      invalidatesTags: ["Jobs"], // Invalidate 'Jobs' on success
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
