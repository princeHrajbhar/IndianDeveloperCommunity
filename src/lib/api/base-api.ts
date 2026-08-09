import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./base-query-with-reauth";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "Session",
    "Job",
    "JobStatistics",
    "JobApplication",
    "Profile",
    "ProfileStats",
    "Lead",
    "LeadStatistics",
    "User",
    "Queue",
    "File",
    "DocumentTemplate",
    "DocumentIssue",
    "Blog",
    "BlogCategory",
    "Course",
    "CourseCategory",
    "Video",
    "ServicePage",
    "Role",
    "Security",
    "EmailTemplate",
    "EmailCampaign",
    "EmailSuppression",
  ],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
