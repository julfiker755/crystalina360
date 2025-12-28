"use client";
import Auth from "./auth";
import { controlkey } from "@/redux/features/authSlice";
import ForgetPassword from "./forget";
import { useAppSelector } from "@/redux/hooks";
import VarifyOtp from "./varify-otp";
import NewPassword from "./new-password";
import EmailVarifyOtp from "./emailVafi";

export default function AuthModalController({ title }: any) {
  const { activeModal } = useAppSelector((state: any) => state.auth);

  switch (activeModal) {
    case controlkey.signIn:
      return <Auth title={title} />;
    case controlkey.forgot:
      return <ForgetPassword />;
    case controlkey.verify:
      return <VarifyOtp />;
    case controlkey.newPass:
      return <NewPassword />;
    case controlkey.emailVafi:
      return <EmailVarifyOtp />;
    default:
      return null;
  }
}
