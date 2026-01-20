"use client";
import { cn } from "@/lib";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackBtn({ className, iconStyle }: any) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className={cn(
        `size-10 2xl:size-11 cursor-pointer bg-white/20 rounded-full grid place-items-center`,
        className,
      )}
    >
      <ArrowLeft className={iconStyle} />
    </div>
  );
}

// BackBtn2
export function BackBtn2({ className, labelStyle, label = "Back" }: any) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className={cn(
        `cursor-pointer w-fit h-10 px-2  rounded-md grid place-items-center`,
        className,
      )}
    >
      <span className="flex gap-x-1 *:text-primary items-center">
        {" "}
        <ChevronLeft />{" "}
        <span className={cn("text-lg font-medium", labelStyle)}>{label}</span>
      </span>
    </div>
  );
}
