"use client";
import { Button, Checkbox, Label } from "@/components/ui";
import { childrenProps } from "@/types";
import { useState } from "react";

type FilterOption =
  | "recommendation"
  | "olistami"
  | "ascPrice"
  | "descPrice"
  | "seller"
  | "reviews"
  | "date"
  | "last_spots";

const filterOptions = [
  { id: "recommendation", label: "Recommendation" },
  { id: "olistami", label: "Olistami" },
  { id: "ascPrice", label: "Asc Price" },
  { id: "descPrice", label: "Desc Price" },
  { id: "seller", label: "Seller" },
  { id: "reviews", label: "Reviews" },
  { id: "date", label: "Date" },
  { id: "last_spots", label: "Last spots" },
];

interface sortBoxProps extends childrenProps {
  handleSubmit: (filters: string) => void;
}

export function SortBox({ children, handleSubmit }: sortBoxProps) {
  const [selectedFilters, setSelectedFilters] = useState("");

  return (
    <>
      <h3 className="font-bold text-xl text-figma-black">Sort by</h3>
      <p className="text-primary">Select for sort events</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 my-6">
        {filterOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={selectedFilters.includes(option.id as FilterOption)}
              onCheckedChange={() => setSelectedFilters(option.id)}
            />
            <Label htmlFor={option.id} className="cursor-pointer font-normal">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <Button
          className="w-full"
          onClick={() => handleSubmit(selectedFilters)}
        >
          Search
        </Button>
        {children}
      </div>
    </>
  );
}
