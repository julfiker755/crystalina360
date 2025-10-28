import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const controlkey = {
  signIn: "signIn",
  forgot: "forgot",
  verify: "verify",
  newPass: "newPass",
} as const;

export type SignKey = keyof typeof controlkey;

interface AuthState {
  info: {
    email: string;
    otp: string;
  };
  activeModal: SignKey;
  isOpen: boolean;
}

const initialState: AuthState = {
  info: {
    email: "",
    otp: "",
  },
  activeModal: "signIn",
  isOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInfo: (
      state,
      action: PayloadAction<{ email: string; otp?: string }>
    ) => {
      state.info = { ...state.info, ...action.payload };
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
    clearInfoData: (state) => {
      state.info = { email: "", otp: "" };
    },
  },
});

export const { setInfo, setActiveModal, clearInfoData, toggleIsOpen } =
  authSlice.actions;
export default authSlice.reducer;
