"use client";
import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { InputHTMLAttributes } from "react";
import { Input } from "@/components/ui";

interface TimeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  stylelabel?: string;
}

export function InputTime({
  name,
  label,
  className,
  stylelabel,
  ...rest
}: TimeInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {label && (
            <h5 className={cn("text-base font-medium mb-1", stylelabel)}>
              {label}
            </h5>
          )}

          <Input
            type="time"
            className={cn("h-10 w-full", className)}
            {...field}
            {...rest}
          />

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
