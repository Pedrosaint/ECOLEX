// redux/school-setup-slice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SchoolSetupState {
  schoolId: number | null;
  schoolName: string | null;
  schoolEmail: string | null;
}

const initialState: SchoolSetupState = {
  schoolId: null,
  schoolName: null,
  schoolEmail: null,
};

const schoolSetupSlice = createSlice({
  name: "schoolSetup",
  initialState,
  reducers: {
    setSchoolInfo: (
      state,
      action: PayloadAction<{
        schoolId: number;
        schoolName: string;
        schoolEmail: string;
      }>
    ) => {
      state.schoolId = action.payload.schoolId;
      state.schoolName = action.payload.schoolName;
      state.schoolEmail = action.payload.schoolEmail;
    },
    clearSchoolInfo: (state) => {
      state.schoolId = null;
      state.schoolName = null;
      state.schoolEmail = null;
    },
  },
});

export const { setSchoolInfo, clearSchoolInfo } = schoolSetupSlice.actions;
export default schoolSetupSlice.reducer;
