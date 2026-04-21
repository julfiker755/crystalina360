"use client";
import sonner from "@/components/reuseable/sonner";
import TextEditor from "@/components/reuseable/text-editor";
import { Button } from "@/components/ui";
import { helpers } from "@/lib";
import {
  useGetTermsQuery,
  useStoreTermsMutation,
} from "@/redux/api/admin/termsApi";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function TermsConditions() {
  const [content, setContent] = useState<any>("");
  const { data: terms, isLoading: termsLoading } = useGetTermsQuery({});
  const [storeTerms, { isLoading }] = useStoreTermsMutation();

  useEffect(() => {
    if (terms?.data?.terms_condition) {
      setContent(terms?.data?.terms_condition);
    }
  }, [terms]);

  const handleSubmit = async () => {
    const data = helpers.fromData({
      terms_condition: content,
    });
    const res = await storeTerms(data);
    if (res?.data?.status) {
      sonner.success(
        "Terms & Conditions",
        "Terms & Conditions updated successfully",
        "bottom-right",
      );
    }
  };

  return (
    <div>
      {termsLoading ? (
        <div className="mx-auto min-h-[280px] flex items-center justify-center">
          <Loader className="animate-spin text-reds" />
        </div>
      ) : (
        <TextEditor value={content} onChange={setContent} />
      )}
      <div className="flex justify-end pt-8">
        <Button
          onClick={() => handleSubmit()}
          disabled={isLoading}
          size="lg"
          className="rounded-2xl"
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
