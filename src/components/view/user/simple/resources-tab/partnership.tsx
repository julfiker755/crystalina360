"use client";

import { Button, Input, Label } from "@/components/ui";
import { useState } from "react";
import { AppAlert } from "../../reuse";

export function Partnership() {
  const [isShow, setIsShow] = useState(false);
  return (
    <div>
      <div className="bg-[url('/partnership.jpg')] flex flex-col items-center  justify-center rounded-lg bg-cover bg-no-repeat bg-center h-[500px] w-full relative ">
        <div
          className="absolute inset-0"
          style={{
            borderRadius: "18px",
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%)",
          }}
        ></div>
        <div className="space-y-4 z-10">
          <h1 className="text-white text-xl lg:text-4xl text-center">
            Partner With Us. Expand Your Reach
          </h1>
          <p className="text-white text-center max-w-2xl">
            Whether you're an agritourism site, videographer, or herbalist,
            connect with us to explore collaboration opportunities tailored to
            your business.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-white m-auto text-primary rounded-md"
              onClick={() => setIsShow(!isShow)}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      {isShow && (
        <div className="space-y-3 py-10">
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <div className="flex justify-center mt-10">
            <Button className="min-w-md">Submit Answer</Button>
          </div>
        </div>
      )}
      <AppAlert />
    </div>
  );
}

const QuestionBox = () => {
  return (
    <div className="space-y-2">
      <Label className="text-lg">Question 1</Label>
      <Input
        placeholder="Enter your answer"
        className="border-none bg-[#F4F4F4]"
      />
    </div>
  );
};
