"use client";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { InputHTMLAttributes } from "react";
import { Input } from "@/components/ui";

interface TimeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  stylelabel?: string;
}

export function InputTime({
  name,
  label,
  placeholder,
  className,
  stylelabel,
  ...rest
}: TimeInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          {label && (
            <h5
              className={cn(
                "text-blacks text-base font-medium mb-1",
                stylelabel,
              )}
            >
              {label}
            </h5>
          )}
          <div className="relative">
            <Input
              className={cn("block h-10 w-full", className)}
              {...field}
              {...rest}
              placeholder={placeholder}
              type="time"
              id={`time-${name}`}
            />
          </div>
          {error?.message && (
            <p className="text-sm pt-1 text-red-400 flex gap-1 items-center justify-end">
              {error.message}
              <CircleAlert size={14} />
            </p>
          )}
        </div>
      )}
    />
  );
}
