import "@/src/lib/api/api-init";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { baseApi } from "@/src/lib/api/base-api";
import authReducer from "@/src/lib/features/auth/auth-slice";
import blogReducer from "@/src/features/blog/slices/blogSlice";
import blogCategoryReducer from "@/src/features/blogCategory/slices/blogCategorySlice";
import courseReducer from "@/src/features/course/slices/courseSlice";
import courseCategoryReducer from "@/src/features/courseCategory/slices/courseCategorySlice";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
      blog: blogReducer,
      blogCategory: blogCategoryReducer,
      course: courseReducer,
      courseCategory: courseCategoryReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "api/executeMutation/pending",
            "api/executeMutation/fulfilled",
            "api/executeMutation/rejected",
          ],
        },
      }).concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });

  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
