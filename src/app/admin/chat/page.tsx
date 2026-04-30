"use client";
import NavTitle from "@/components/reuseable/nav-title";
import MessagingApp from "@/components/view/common/messaging-box";
import React from "react";

export default function ChatBox() {
  return (
    <div>
      <NavTitle
        title="Chat"
        subTitle="Communicate with users and manage all conversations from this section"
      />
      <MessagingApp className="h-[calc(100vh-180px)]" />
    </div>
  );
}
