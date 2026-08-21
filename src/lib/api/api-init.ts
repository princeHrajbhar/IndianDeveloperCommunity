// Import every endpoint module once so all endpoints are registered on the
// shared baseApi before the store is created.
import "@/src/lib/features/auth/auth-api";
import "@/src/lib/features/jobs/job-api";
import "@/src/lib/features/job-applications/job-application-api";
import "@/src/lib/features/profiles/profile-api";
import "@/src/lib/features/leads/lead-api";
import "@/src/lib/features/users/user-api";


import "@/src/lib/features/files/file-api";

import "@/src/lib/features/documents/document-api";

import "@/src/features/blog/api/blogApi";
import "@/src/features/blogCategory/api/blogCategoryApi";
import "@/src/features/course/api/courseApi";
import "@/src/features/courseCategory/api/courseCategoryApi";

import "@/src/lib/features/email-management/email-api";
