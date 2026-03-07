"use client";
import AIChatBox from "@/components/reuseable/ai-chatbot";
import Footer from "@/components/view/user/shared/footer";
import Navber from "@/components/view/user/shared/navber";
import { childrenProps } from "@/types";
import { usePathname } from "next/navigation";

export default function Userlayout({ children }: childrenProps) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/" && <Navber className="relative my-4" />}
      {children}
      <Footer />
      <AIChatBox />
    </>
  );
}
