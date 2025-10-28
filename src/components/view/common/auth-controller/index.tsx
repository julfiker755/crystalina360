"use client";
import Auth from "./auth";
import { controlkey } from "@/redux/features/authSlice";
import ForgetPassword from "./forget";
import { useAppSelector } from "@/redux/hooks";
import VarifyOtp from "./varify-otp";
import NewPassword from "./new-password";

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
    default:
      return null;
  }
}
