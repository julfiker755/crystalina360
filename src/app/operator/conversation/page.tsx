"use client";
import MessagingApp from "@/components/view/common/messaging-box";
import { useEffect } from "react";

export default function Conversation() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);
  return <MessagingApp />;
}
