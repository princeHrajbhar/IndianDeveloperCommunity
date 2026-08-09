import { baseApi } from "@/src/lib/api/base-api";
import type { ApiEnvelope, MessageEnvelope } from "@/src/lib/api/api-types";
import type { QueueJob, QueueJobState, QueueSummary } from "./system-types";

interface QueueJobsEnvelope extends ApiEnvelope<QueueJob[]> {
  pagination: { page: number; limit: number; total?: number };
}

export const systemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQueues: builder.query<ApiEnvelope<QueueSummary[]>, void>({
      query: () => "/queues",
      providesTags: (result) => [
        { type: "Queue", id: "LIST" },
        ...(result?.data.map((queue) => ({ type: "Queue" as const, id: queue.name })) ?? []),
      ],
    }),
    getQueueStatus: builder.query<ApiEnvelope<QueueSummary>, string>({
      query: (queueName) => `/queues/${encodeURIComponent(queueName)}`,
      providesTags: (_result, _error, queueName) => [{ type: "Queue", id: queueName }],
    }),
    getQueueJobs: builder.query<QueueJobsEnvelope, { queueName: string; state?: QueueJobState; page?: number; limit?: number }>({
      query: ({ queueName, ...params }) => ({
        url: `/queues/${encodeURIComponent(queueName)}/jobs`,
        params,
      }),
      providesTags: (_result, _error, { queueName }) => [{ type: "Queue", id: queueName }],
    }),
    pauseQueue: builder.mutation<MessageEnvelope, string>({
      query: (queueName) => ({ url: `/queues/${encodeURIComponent(queueName)}/pause`, method: "POST" }),
      invalidatesTags: (_result, _error, queueName) => [{ type: "Queue", id: queueName }, { type: "Queue", id: "LIST" }],
    }),
    resumeQueue: builder.mutation<MessageEnvelope, string>({
      query: (queueName) => ({ url: `/queues/${encodeURIComponent(queueName)}/resume`, method: "POST" }),
      invalidatesTags: (_result, _error, queueName) => [{ type: "Queue", id: queueName }, { type: "Queue", id: "LIST" }],
    }),
    retryQueueJob: builder.mutation<MessageEnvelope, { queueName: string; id: string }>({
      query: ({ queueName, id }) => ({
        url: `/queues/${encodeURIComponent(queueName)}/jobs/${encodeURIComponent(id)}/retry`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { queueName }) => [{ type: "Queue", id: queueName }],
    }),
    removeQueueJob: builder.mutation<MessageEnvelope, { queueName: string; id: string }>({
      query: ({ queueName, id }) => ({
        url: `/queues/${encodeURIComponent(queueName)}/jobs/${encodeURIComponent(id)}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { queueName }) => [{ type: "Queue", id: queueName }],
    }),
    cleanQueue: builder.mutation<MessageEnvelope, { queueName: string; state: QueueJobState; graceMs?: number; limit?: number }>({
      query: ({ queueName, ...body }) => ({
        url: `/queues/${encodeURIComponent(queueName)}/clean`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { queueName }) => [{ type: "Queue", id: queueName }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetQueuesQuery,
  useGetQueueStatusQuery,
  useGetQueueJobsQuery,
  usePauseQueueMutation,
  useResumeQueueMutation,
  useRetryQueueJobMutation,
  useRemoveQueueJobMutation,
  useCleanQueueMutation,
} = systemApi;
