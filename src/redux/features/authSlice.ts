import { authKey, helpers } from "@/lib";
import { AuthState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { AppDispatch } from "../store";

export const controlkey = {
  signIn: "signIn",
  forgot: "forgot",
  verify: "verify",
  newPass: "newPass",
  emailVafi: "emailVafi",
} as const;

export type SignKey = keyof typeof controlkey;

const token = helpers.getAuthCookie(authKey);

const initialState: AuthState = {
  user: { name: "", email: "", avatar: "", role: "", token: token || "" },
  otpInfo: { email: "", otp: "" },
  signupRole: "",
  activeModal: "signIn",
  isOpen: false,
  isLogged: !!token,
  isProfileLoading: false,
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
      action: PayloadAction<{ email: string; otp?: string }>,
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
      state.user = initialState.user;
      state.isOpen = false;
      state.isLogged = false;
      state.isProfileLoading = false;
    },
    setSignupRole: (state, action: PayloadAction<string>) => {
      state.signupRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.getProfile.matchPending, (state) => {
        state.isProfileLoading = true;
      })
      .addMatcher(
        authApi.endpoints.getProfile.matchFulfilled,
        (state, { payload }) => {
          state.user = {
            ...state.user,
            name: payload?.data?.user?.name || "",
            email: payload?.data?.user?.email || "",
            role: payload?.data?.user?.role || "",
            avatar: payload?.data?.user?.img || "",
          };
          state.isLogged = !!state.user.token;
          state.isProfileLoading = false;
        },
      )
      .addMatcher(authApi.endpoints.getProfile.matchRejected, (state) => {
        state.isLogged = false;
        state.isProfileLoading = false;
      });
  },
});

export const {
  setOtpInfo,
  setSignupRole,
  setActiveModal,
  setUser,
  clearOtpInfo,
  toggleIsOpen,
  clearAuth,
} = authSlice.actions;
export default authSlice.reducer;

// smart client-side init for App Router
export const initAuth = (
  dispatch: AppDispatch,
  getState: () => { auth: AuthState },
) => {
  const { auth } = getState();
  if (auth.user.token && !auth.user.name && !auth.user.email) {
    dispatch(authApi.endpoints.getProfile.initiate({}));
  }
};
