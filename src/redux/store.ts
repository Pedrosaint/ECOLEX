import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "../auth/redux/school-slice";

export const store = configureStore({
  reducer: {
    school: schoolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
