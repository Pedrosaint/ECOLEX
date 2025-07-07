import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "../auth/redux/school-slice";
import { authApi } from "../auth/redux/auth-api";

export const store = configureStore({
  reducer: {
    school: schoolReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
