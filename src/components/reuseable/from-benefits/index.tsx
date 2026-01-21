"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui";
import { cn } from "@/lib";
import { DeleteBtn } from "../btn";
import { useAllBenefitsQuery } from "@/redux/api/admin/addonApi";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Benefit = {
  id: number;
  title: string;
};

export default function FormBenefits({
  onChange,
  scroll = true,
  className,
  label,
}: {
  onChange: (ids: number[]) => void;
  scroll?: boolean;
  className?: string;
  label: string;
}) {
  const { data } = useAllBenefitsQuery({});
  const options: Benefit[] = data?.data || [];

  const [selectedBenefits, setSelectedBenefits] = useState<number[]>([]);

  // ✅ MAIN LOGIC
  const handleSelect = (value: string) => {
    const id = Number(value);

    setSelectedBenefits((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      onChange(updated); // ✅ correct value
      return updated;
    });
  };

  const handleDelete = (id: number) => {
    const updated = selectedBenefits.filter((item) => item !== id);
    setSelectedBenefits(updated);
    onChange(updated);
  };

  return (
    <div className={className}>
      <div className="relative mb-2">
        <span className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium">
          {label}
        </span>
      </div>

      {/* ✅ Select MUST */}
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-full rounded-xl py-5">
          <SelectValue placeholder="Select benefits" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {options.map((benefit) => (
              <SelectItem
                key={benefit.id}
                value={String(benefit.id)}
                className={cn(
                  "cursor-pointer",
                  selectedBenefits.includes(benefit.id) &&
                  "bg-muted font-medium"
                )}
              >
                {benefit.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* ✅ Selected Output */}
      <ScrollArea
        className={scroll && selectedBenefits.length > 2 ? "h-[120px] mt-3" : ""}
      >
        {selectedBenefits.length > 0 && (
          <div className="mt-4 space-y-2">
            {selectedBenefits.map((id) => {
              const item = options.find((o) => o.id === id);
              if (!item) return null;

              return (
                <div
                  key={id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span>{item.title}</span>
                  <DeleteBtn onClick={() => handleDelete(id)} />
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
