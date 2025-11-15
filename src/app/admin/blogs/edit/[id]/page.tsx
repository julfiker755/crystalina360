"use client";
import NavTitle from "@/components/reuseable/nav-title";
import { useParams } from "next/navigation";
import React from "react";

export default function BlogEdit() {
  const { id } = useParams();
  return (
    <div>
      <NavTitle
        title="Blogs"
        subTitle="Manage all of your blogs from this section"
      />
    </div>
  );
}
