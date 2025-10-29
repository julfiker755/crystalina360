"use client";
import { Input } from "@/components/ui";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { FromInput } from "../form-input";

export default function SearchBox({
  onSearch,
  placeholder = "Search hare",
}: any) {
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    onSearch?.(text);
  };
  return (
    <div className="relative w-full  bg-white rounded-full py-1">
      <Search className="absolute left-3 text-figma-black top-1/2 -translate-y-1/2 h-5 w-5 text-grays" />
      <Input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="pl-10 pr-4 h-10 bg-figma-input rounded-sm py-2 border-none w-full placeholder:text-grays"
      />
    </div>
  );
}
