import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "../auth/redux/school-slice";
import { authApi } from "../auth/api/auth-api";
import authRegistrationReducer from "../auth/redux/auth-slice";
import { staffApi } from "../domain/admin-domain/staff/api/staff-api";

export const store = configureStore({
  reducer: {
    school: schoolReducer,
    authRegistration: authRegistrationReducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(staffApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
