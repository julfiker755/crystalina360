"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui";
import { cn } from "@/lib";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";

interface SearchBoxProps {
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  time?: number;
}

export default function SearchBox({
  onChange,
  placeholder = "Search hare",
  className,
  time = 1000,
}: SearchBoxProps) {
  const [value, setValue] = useState("");
  const [debounced] = useDebounce(value, time);

  useEffect(() => onChange(debounced), [debounced, onChange]);

  return (
    <div
      className={cn(
        "relative w-11/12 lg:mx-w-md 2xl:max-w-xl rounded-full py-1",
        className
      )}
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-4 h-11 w-full bg-[#EDEDED] border-none rounded-full placeholder:text-primary"
      />
    </div>
  );
}
