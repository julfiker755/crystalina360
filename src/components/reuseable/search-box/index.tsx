"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui";
import { cn } from "@/lib";
import { Search } from "lucide-react";

interface SearchBoxProps {
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBox({
  onChange,
  placeholder = "Search hare",
  className,
}: SearchBoxProps) {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    onChange(text);
  };
  return (
    <div
      className={cn(
        "relative w-11/12 lg:max-w-md 2xl:max-w-xl rounded-full py-1",
        className
      )}
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
      <Input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="pl-10 pr-4 h-11 w-full bg-figma-delete border-none rounded-full placeholder:text-primary"
      />
    </div>
  );
}
