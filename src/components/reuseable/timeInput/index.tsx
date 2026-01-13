"use client";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { TextareaHTMLAttributes } from "react";
import { Input } from "@/components/ui";

// Props interface
interface FromTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
}: FromTextAreaProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field,
        fieldState: { error },
      }: {
        field: any;
        fieldState: any;
      }) => (
        <div>
          {label && (
            <h5
              className={cn(
                "text-blacks text-base font-medium mb-1",
                stylelabel
              )}
            >
              {label}
            </h5>
          )}
          <div className="relative">
            <Label htmlFor="time123">
              <Input
                className={cn("block h-10 w-full", className)} // Make input visible
                {...field}
                {...rest}
                placeholder={placeholder}
                type="time"
                id="time123"
              />
            </Label>
          </div>
          {error?.message && (
            <h3 className="text-sm pt-px text-end text-red-400 flex gap-1 items-center justify-end">
              {error.message}
              <CircleAlert size={14} />
            </h3>
          )}
        </div>
      )}
    />
  );
}
