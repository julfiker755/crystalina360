"use client";
import { Button, Checkbox, Label } from "@/components/ui";
import { childrenProps } from "@/types";
import { useState } from "react";

type FilterOption =
  | "recommended"
  | "ascending-price"
  | "last-spots"
  | "organized-olistami"
  | "descending-price"
  | "best-reviews"
  | "date"
  | "top-sellers";

const filterOptions = [
  { id: "recommended", label: "Recommended" },
  { id: "ascending-price", label: "Ascending Price" },
  { id: "last-spots", label: "Last spots" },
  { id: "organized-olistami", label: "Organized by Olistami" },
  { id: "descending-price", label: "Descending Price" },
  { id: "best-reviews", label: "Best reviews" },
  { id: "date", label: "Date" },
  { id: "top-sellers", label: "Top sellers" },
];

export function SortBox({ children }: childrenProps) {
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);

  const handleFilterChange = (filterId: FilterOption) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleSubmit = () => {
    console.log("[v0] Selected filters submitted:", selectedFilters);
  };

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
              onCheckedChange={() =>
                handleFilterChange(option.id as FilterOption)
              }
            />
            <Label htmlFor={option.id} className="cursor-pointer font-normal">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <Button className="w-full" onClick={handleSubmit}>
          Search
        </Button>
        {children}
      </div>
    </>
  );
}
