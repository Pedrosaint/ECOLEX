// import { configureStore } from "@reduxjs/toolkit";
// import schoolReducer from "../auth/redux/school-slice";
// import { authApi } from "../auth/api/auth-api";
// import authRegistrationReducer from "../auth/redux/auth-slice";
// import { staffApi } from "../domain/admin-domain/staff/api/staff-api";
// import { studentApi } from "../domain/admin-domain/students/api/student.api";
// import { classesApi } from "../domain/admin-domain/classes/api/class-api";
// import { campusApi } from "../domain/admin-domain/campus/api/campus.api";
// import { subjectApi } from "../domain/admin-domain/manage-subject/api/subject.api";

// export const store = configureStore({
//   reducer: {
//     school: schoolReducer,
//     authRegistration: authRegistrationReducer,
//     [staffApi.reducerPath]: staffApi.reducer,
//     [authApi.reducerPath]: authApi.reducer,
//     [studentApi.reducerPath]: studentApi.reducer,
//     [classesApi.reducerPath]: classesApi.reducer,
//     [campusApi.reducerPath]: campusApi.reducer,
//     [subjectApi.reducerPath]: subjectApi.reducer,
//   },

//  middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware().concat([
//     authApi.middleware,
//     staffApi.middleware,
//     classesApi.middleware,
//     campusApi.middleware,
//     subjectApi.middleware,
//     studentApi.middleware,
//   ]),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;






// redux/store.ts (Alternative - only school persistence)
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import schoolReducer from "../auth/redux/school-slice";
import schoolSetupReducer from "../auth/redux/school-setup-slice";
import { authApi } from "../auth/api/auth-api";
import authRegistrationReducer from "../auth/redux/auth-slice";
import { staffApi } from "../domain/admin-domain/staff/api/staff-api";
import { studentApi } from "../domain/admin-domain/students/api/student.api";
import { classesApi } from "../domain/admin-domain/classes/api/class-api";
import { campusApi } from "../domain/admin-domain/campus/api/campus.api";
import { subjectApi } from "../domain/admin-domain/manage-subject/api/subject.api";

// Persist config for school slice only
const schoolSetupPersistConfig = {
  key: "schoolSetup",
  storage,
  whitelist: ["schoolId", "schoolName", "schoolEmail"],
};

const persistedSchoolReducer = persistReducer(schoolSetupPersistConfig, schoolSetupReducer);

export const store = configureStore({
  reducer: {
    school: schoolReducer,
    schoolSetup: persistedSchoolReducer,
    authRegistration: authRegistrationReducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [classesApi.reducerPath]: classesApi.reducer,
    [campusApi.reducerPath]: campusApi.reducer,
    [subjectApi.reducerPath]: subjectApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }).concat([
      authApi.middleware,
      staffApi.middleware,
      classesApi.middleware,
      campusApi.middleware,
      subjectApi.middleware,
      studentApi.middleware,
    ]),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;