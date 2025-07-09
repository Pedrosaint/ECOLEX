// features/auth/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RegistrationState {
  registeredEmail: string;
  registeredName: string;
  generatedToken?: string;
  usedTokens: string[];
}

const initialState: RegistrationState = {
  registeredEmail: localStorage.getItem('registeredEmail') || '',
  registeredName: localStorage.getItem('registeredName') || '',
  generatedToken: localStorage.getItem('generatedToken') || '',
  usedTokens: JSON.parse(localStorage.getItem('usedTokens') || "[]"),
};

export const authRegistrationSlice = createSlice({
  name: "authRegistration",
  initialState,
  reducers: {
    setRegistrationData: (
      state,
      action: PayloadAction<{
        email: string;
        name: string;
        token?: string;
      }>
    ) => {
      state.registeredEmail = action.payload.email;
      state.registeredName = action.payload.name;
      state.generatedToken = action.payload.token;

      localStorage.setItem("registeredEmail", action.payload.email);
      localStorage.setItem("registeredName", action.payload.name);
      localStorage.setItem("generatedToken", action.payload.token || "");
    },
    markTokenAsUsed: (state, action: PayloadAction<string>) => {
      state.usedTokens.push(action.payload);
      localStorage.setItem('usedTokens', JSON.stringify(state.usedTokens));
    },
    clearRegistrationData: (state) => {
      state.registeredEmail = "";
      state.registeredName = "";
      state.generatedToken = undefined;
    },
  },
});

export const { setRegistrationData, clearRegistrationData, markTokenAsUsed } = authRegistrationSlice.actions;
export default authRegistrationSlice.reducer;
