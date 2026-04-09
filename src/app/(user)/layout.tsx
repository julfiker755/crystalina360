"use client";
import AIChatBox from "@/components/reuseable/ai-chatbot";
import MissingInfo from "@/components/reuseable/missing-alert";
import Footer from "@/components/view/user/shared/footer";
import Navber from "@/components/view/user/shared/navber";
import { childrenProps } from "@/types";
import { usePathname } from "next/navigation";

export default function Userlayout({ children }: childrenProps) {
  const pathname = usePathname();

  return (
    <>
      <MissingInfo path={`/profile/update`} />
      {pathname !== "/" && <Navber className="relative my-4" />}
      {children}
      <Footer />
      <AIChatBox />
      <div id="google_translate_user" className="hidden" />
    </>
  );
}
