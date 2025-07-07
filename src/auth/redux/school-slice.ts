// features/school/schoolSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SchoolStage {
  type: "early" | "primary" | "junior" | "senior";
  name: string;
  startLevel?: string;
  endLevel?: string;
}

interface SchoolState {
  stages: SchoolStage[];
}

const initialState: SchoolState = {
  stages: [],
};

export const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    setSchoolStages: (state, action: PayloadAction<SchoolStage[]>) => {
      state.stages = action.payload;
    },
    addSchoolStage: (state, action: PayloadAction<SchoolStage>) => {
      state.stages.push(action.payload);
    },
    resetSchoolStages: (state) => {
      state.stages = [];
    },
  },
});

export const { setSchoolStages, addSchoolStage, resetSchoolStages } =
  schoolSlice.actions;
export default schoolSlice.reducer;
