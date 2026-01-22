"use client";
import { ScrollArea } from "@/components/ui";
import { cn } from "@/lib";
import { DeleteBtn } from "../btn";
import { useAllBenefitsQuery } from "@/redux/api/admin/addonApi";
import { Controller, useFormContext } from "react-hook-form";
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

interface FormBenefitsProps {
  scroll?: boolean;
  className?: string;
  label: string;
  name: string;
}

export default function FormBenefits({
  scroll = true,
  className,
  label,
  name,
}: FormBenefitsProps) {
  const { control } = useFormContext();
  const { data } = useAllBenefitsQuery({});
  const options: Benefit[] = data?.data || [];

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field }) => {
        const selectedBenefits: number[] = field.value || [];

        // ✅ select / unselect
        const handleSelect = (value: string) => {
          const id = Number(value);

          const updated = selectedBenefits.includes(id)
            ? selectedBenefits.filter((item) => item !== id)
            : [...selectedBenefits, id];

          field.onChange(updated);
        };

        // ✅ delete
        const handleDelete = (id: number) => {
          const updated = selectedBenefits.filter((item) => item !== id);
          field.onChange(updated);
        };

        return (
          <div className={className}>
            {/* Label */}
            <div className="relative mb-2">
              <span className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium">
                {label}
              </span>
            </div>

            {/* Select */}
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-full rounded-xl py-5">
                <SelectValue placeholder="Select benefits" />
              </SelectTrigger>

              <SelectContent className="h-[200px]">
                <SelectGroup>
                  {options.map((benefit) => (
                    <SelectItem
                      key={benefit.id}
                      value={String(benefit.id)}
                      className={cn(
                        "cursor-pointer",
                        selectedBenefits.includes(benefit.id) && "bg-muted",
                      )}
                    >
                      {benefit.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Selected Items */}
            <ScrollArea
              className={
                scroll && selectedBenefits.length > 2 ? "h-[120px] mt-3" : ""
              }
            >
              {selectedBenefits.length > 0 && (
                <div className="mt-4 space-y-2">
                  {selectedBenefits.map((id) => {
                    const item = options.find((o) => o.id === id);
                    if (!item) return null;

                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between border-b pb-2"
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
      }}
    />
  );
}
