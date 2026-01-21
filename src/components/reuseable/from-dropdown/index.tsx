"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui";
import { cn } from "@/lib";
import { DeleteBtn } from "../btn";

export default function FromDropdown({
  options = [],
  onChange,
  scroll = true,
  className,
  label,
}: {
  options: string[];
  onChange: (newService: string[]) => void;
  scroll?: boolean;
  className?: string;
  label: string;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleAddOptions = () => {
    const value = inputValue.trim();
    if (!value) return;

    // prevent duplicates
    if (options.includes(value)) return;

    onChange([...options, value]);
    setInputValue("");
  };

  const handleDeleteOptions = (index: number) => {
    const updated = options.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div>
      <div className="flex space-x-2 relative">
        <Input
          placeholder="Type service"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddOptions();
            }
          }}
          className="rounded-xl h-10"
        />
        <Button
          type="button"
          className="rounded-xl size-10"
          onClick={handleAddOptions}
        >
          <Plus className="w-4 h-4" />
        </Button>
        <div className="text-blacks text-base font-medium bg-background absolute -top-3 left-5  px-3">
          {label}
        </div>
      </div>

      <ScrollArea
        className={scroll && options.length > 2 ? "h-[100px] mt-3" : ""}
      >
        <div
          className={`mt-3 ${scroll && options.length > 2 ? "space-y-2 mr-4" : "space-y-2"
            }`}
        >
          {options.map((item, index) => (
            <div
              key={index}
              className={cn("flex items-start gap-3", className)}
            >
              <span className="text-foreground leading-relaxed truncate">
                {item}
              </span>
              <div className="ml-auto">
                <DeleteBtn onClick={() => handleDeleteOptions(index)} />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
