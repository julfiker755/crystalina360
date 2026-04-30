"use client";
import { useId, useState } from "react";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type ControllerRenderProps,
  type ControllerFieldState,
} from "react-hook-form";
import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";

interface formInputProps {
  stylelabel?: string;
  name: string;
  type?: string;
  label?: string;
  eye?: boolean;
  placeholder?: string;
  className?: string;
  matching?: boolean;
  icon?: any;
  [key: string]: any;
  err?: boolean;
}

export function PersionLimit({
  name,
  type = "text",
  eye = false,
  label,
  placeholder,
  stylelabel,
  className,
  icon,
  err = true,
  mainStyle,
  ...rest
}: formInputProps) {
  const { control } = useFormContext();
  const reactId = useId();
  const inputId = `${reactId}-${name}`;

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
          <div
            className={cn(
              "relative h-10 flex items-center justify-between px-2 border rounded-md",
              mainStyle,
            )}
          >
            <Input
              id={inputId}
              className={cn(
                `w-[100px] h-10 border-none bg-transparent  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  icon ? "pl-10" : "pl-4"
                } ${eye ? "pr-10" : "pr-3"} text-blacks`,
                className,
              )}
              {...field}
              {...rest}
              type={type}
              placeholder={placeholder}
            />
            <span>{label}</span>
          </div>
          {err && error?.message && (
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
