"use client";
import { Button, Checkbox, Label } from "@/components/ui";
import { childrenProps } from "@/types";
import { useTranslations } from "next-intl";
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



interface sortBoxProps extends childrenProps {
  handleSubmit: (filters: string) => void;
}

export function SortBox({ children, handleSubmit }: sortBoxProps) {
  const t = useTranslations("user.explore");
  const [selectedFilters, setSelectedFilters] = useState("");

  const filterOptions = [
    { id: "recommendation", label: t("recommendation") },
    { id: "olistami", label: t("olistami") },
    { id: "ascPrice", label: t("asc_price") },
    { id: "descPrice", label: t("desc_price") },
    { id: "seller", label: t("seller") },
    { id: "reviews", label: t("reviews") },
    { id: "date", label: t("date") },
    { id: "last_spots", label: t("last_spots") },
  ];


  return (
    <>
      <h3 className="font-bold text-xl text-figma-black">{t("sort_by")}</h3>
      <p className="text-primary">{t("select_for_sort_events")}</p>
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
          {t("search")}
        </Button>
        {children}
      </div>
    </>
  );
}
