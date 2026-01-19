"use client";
import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormContext, Controller } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectGridProps {
  label: string;
  options: Option[];
  className?: string;
  name: string;
}

export function MultiSelectGrid2({
  label,
  options,
  name,
  className,
}: MultiSelectGridProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { value = [], onChange }, fieldState: { error } }) => {
        const selected: string[] = value;

        const toggle = (val: string) => {
          onChange(
            selected.includes(val)
              ? selected.filter((v) => v !== val)
              : [...selected, val],
          );
        };

        const remove = (val: string) => {
          onChange(selected.filter((v) => v !== val));
        };

        return (
          <div className={cn("flex flex-col", className)}>
            <Label className="mb-2 text-base font-medium">{label}</Label>

            {/* Input */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="h-10 px-3 w-full bg-[#F4F4F4] rounded-md cursor-pointer flex justify-between items-center"
            >
              <div className="flex gap-2 overflow-hidden">
                {selected.length === 0 ? (
                  <span className="text-muted-foreground">Select</span>
                ) : (
                  selected.map((val) => {
                    const opt = options.find((o) => o.value === val);
                    return (
                      <Badge
                        key={val}
                        className="bg-white px-2 py-px text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {opt?.label}
                        <button onClick={() => remove(val)}>
                          <X className="ml-1 h-4 w-4" />
                        </button>
                      </Badge>
                    );
                  })
                )}
              </div>

              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </div>

            {/* Dropdown */}
            {isOpen && (
              <div className="mt-4 rounded-lg border bg-card p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Checkbox
                        id={opt.value}
                        checked={selected.includes(opt.value)}
                        onCheckedChange={() => toggle(opt.value)}
                      />
                      <label
                        htmlFor={opt.value}
                        className="text-sm cursor-pointer"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <p className="text-sm text-red-500 mt-1">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
