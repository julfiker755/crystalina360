"use client";
import { cn } from "@/lib";
import { Files } from "lucide-react";
import React, { useState } from "react";
import { Link as LinkIcon } from "lucide-react";

interface CopyProps {
  value: string;
  className?: string;
  iconStyle?: string;
  valueStyle?: string;
  linkStyle?: string;
  icon?: boolean;
}

export default function CopyBox({
  value,
  className,
  iconStyle,
  linkStyle,
  valueStyle,
  icon = true,
}: CopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(`flex space-x-2 items-center`, className)}>
      <LinkIcon className={cn("size-5", linkStyle)} />
      <span className={cn("w-[100px] truncate text-sm", valueStyle)}>
        {value}
      </span>
      {icon && (
        <Files
          onClick={(e) => handleCopy(e)}
          className={cn(
            `text-[#828282b8] ${copied && "text-primary"} cursor-pointer ml-3 size-4 transition`,
            iconStyle,
          )}
        />
      )}
    </div>
  );
}
