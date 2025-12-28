import { cn } from "@/lib";

interface ErrorTextProps {
  error: string | undefined;
  className?: string;
}

export function ErrorText({ error, className }: ErrorTextProps) {
  return (
    error && (
      <h5
        className={cn(
          "text-red-500 font-medium text-sm  flex justify-center",
          className
        )}
      >
        {error}
      </h5>
    )
  );
}
