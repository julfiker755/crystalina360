"use client";
import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormContext, Controller } from "react-hook-form";

interface MultiSelectGridProps {
  label: string;
  options: string[];
  className?: string;
  name: string;
}

export function MultiSelectGrid({
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
        const selected = value;

        // Toggle item
        const handleToggle = (option: string) => {
          if (selected.includes(option)) {
            onChange(selected.filter((item: any) => item !== option));
          } else {
            onChange([...selected, option]);
          }
        };

        const handleRemove = (option: string) => {
          onChange(selected.filter((item: any) => item !== option));
        };

        return (
          <div className={cn("flex flex-col", className)}>
            <div className="space-y-2">
              <Label className="text-blacks text-base font-medium">
                {label}
              </Label>

              <div
                onClick={() => setIsOpen(!isOpen)}
                className="h-10 px-3 py-[5px] w-full bg-[#F4F4F4] rounded-md  cursor-pointer flex justify-between items-center"
              >
                <div className="flex-1 overflow-hidden">
                  {selected?.length === 0 ? (
                    <span className="text-muted-foreground py-1 block">
                      Select
                    </span>
                  ) : (
                    <div className="flex overflow-hidden truncate gap-2 py-1">
                      {selected?.map((item: any) => (
                        <Badge
                          key={item}
                          className="bg-white text-sm px-2 py-px flex items-center gap-1 font-normal"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item}
                          <button
                            onClick={() => handleRemove(item)}
                            className="ml-1 rounded-full"
                          >
                            <X className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground mt-1 ml-5 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </div>
            </div>

            {/* Dropdown Grid */}
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100 mt-4"
                  : "grid-rows-[0fr] opacity-0 mt-0"
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    "rounded-lg border bg-card p-6 transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-y-0" : "-translate-y-4"
                  )}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {options.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={selected.includes(option)}
                          onCheckedChange={() => handleToggle(option)}
                        />
                        <label
                          htmlFor={option}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 mt-1">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
