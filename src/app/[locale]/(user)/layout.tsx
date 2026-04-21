"use client";
import AIChatBox from "@/components/reuseable/ai-chatbot";
import MissingInfo from "@/components/reuseable/missing-alert";
import Footer from "@/components/view/user/shared/footer";
import Navber from "@/components/view/user/shared/navber";
import { childrenProps } from "@/types";
import { usePathname } from "next/navigation";

export default function Userlayout({ children }: childrenProps) {
  const pathname = usePathname();
  const notShowNav = pathname !== "/en" && pathname !== "/it";

  return (
    <>
      <MissingInfo path={`/profile/update`} />
      {notShowNav && <Navber className="relative my-4" />}
      {children}
      <Footer />
      <AIChatBox />
    </>
  );
}
