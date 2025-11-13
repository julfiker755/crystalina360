"use client";
import TextEditor from "@/components/reuseable/text-editor";
import { Button } from "@/components/ui";
import React, { useState } from "react";

export default function TermsConditions() {
  const [content, setContent] = useState<string>("");
  return (
    <div>
      {/* {termsLoading ? (
        <div className="mx-auto min-h-[280px] flex items-center justify-center">
          <Loader className="animate-spin text-reds" />
        </div>
      ) : (
        <TextEditor value={content} onChange={setContent} />
      )} */}
      <TextEditor value={content} onChange={setContent} />
      <div className="flex justify-end pt-8">
        <Button size="lg" className="rounded-2xl">
          Save changes
        </Button>
      </div>
    </div>
  );
}
