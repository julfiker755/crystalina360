import { SignKey } from "@/redux/features/authSlice";

export interface childrenProps {
  children: React.ReactNode;
}

export type IdParams = {
  params: Promise<{ id: string }>;
};

export type SlugParams = {
  params: Promise<{ slug: string }>;
};

export interface Args {
  id?: any;
  arg?: Record<string, any>;
}

export interface AuthState {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: string;
    token: string;
  };
  otpInfo: { email: string; otp: string };
  signupRole: string;
  activeModal: SignKey;
  isOpen: boolean;
  isLogged: boolean;
  isProfileLoading: boolean;
}
