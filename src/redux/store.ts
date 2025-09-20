import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "../auth/redux/school-slice";
import { authApi } from "../auth/api/auth-api";
import authRegistrationReducer from "../auth/redux/auth-slice";
import { staffApi } from "../domain/admin-domain/staff/api/staff-api";
import { studentApi } from "../domain/admin-domain/students/api/student.api";
import { classesApi } from "../domain/admin-domain/classes/api/class-api";
import { campusApi } from "../domain/admin-domain/campus/api/campus.api";

export const store = configureStore({
  reducer: {
    school: schoolReducer,
    authRegistration: authRegistrationReducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [classesApi.reducerPath]: classesApi.reducer,
    [campusApi.reducerPath]: campusApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(staffApi.middleware)
      .concat(classesApi.middleware)
      .concat(campusApi.middleware)
      .concat(studentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
