"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function EventAll() {
  const { id } = useParams();
  return <div>EventAll</div>;
}
