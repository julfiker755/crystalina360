import { AuthState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const controlkey = {
  signIn: "signIn",
  forgot: "forgot",
  verify: "verify",
  newPass: "newPass",
} as const;

export type SignKey = keyof typeof controlkey;

const initialState: AuthState = {
  user: { name: "", email: "", role: "admin" },
  otpInfo: { email: "", otp: "" },
  activeModal: "signIn",
  isOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setOtpInfo: (
      state,
      action: PayloadAction<{ email: string; otp?: string }>
    ) => {
      state.otpInfo = { ...state.otpInfo, ...action.payload };
    },
    setActiveModal: (state, action: PayloadAction<SignKey>) => {
      state.activeModal = action.payload;
    },
    toggleIsOpen: (state, action: PayloadAction<boolean | undefined>) => {
      if (typeof action.payload === "boolean") {
        state.isOpen = action.payload;
      } else {
        state.isOpen = !state.isOpen;
      }
    },
    clearOtpInfo: (state) => {
      state.otpInfo = { email: "", otp: "" };
    },
    clearAuth: (state) => {
      state.user = { name: "", email: "", role: "" };
    },
  },
});

export const {
  setOtpInfo,
  setActiveModal,
  setUser,
  clearOtpInfo,
  toggleIsOpen,
  clearAuth,
} = authSlice.actions;
export default authSlice.reducer;
