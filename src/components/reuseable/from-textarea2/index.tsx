"use client";
import { CircleAlert } from "lucide-react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type ControllerRenderProps,
  type ControllerFieldState,
} from "react-hook-form";
import { Label, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";

interface formInputProps {
  stylelabel?: string;
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  [key: string]: any;
}

export function FromTextarea2({
  name,
  type = "text",
  label,
  placeholder,
  stylelabel,
  className,
  ...rest
}: formInputProps) {
  const { control } = useFormContext();

  const inputId = `input-${name}`;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field,
        fieldState: { error },
      }: {
        field: ControllerRenderProps<FieldValues>;
        fieldState: ControllerFieldState;
      }) => (
        <div>
          <div className="relative">
            <Textarea
              id={inputId}
              className={cn(
                "w-full rounded-md py-3 text-blacks text-sm",
                className
              )}
              placeholder={placeholder}
              {...field}
              {...rest}
            />

            <Label
              htmlFor={inputId}
              className={cn(
                "text-blacks text-base font-medium bg-background absolute -top-3 left-5  px-3",
                stylelabel
              )}
            >
              {label}
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
