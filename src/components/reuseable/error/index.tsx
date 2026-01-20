import { cn } from "@/lib";
import { CircleAlert } from "lucide-react";

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
          className,
        )}
      >
        {error}
      </h5>
    )
  );
}

//  ========= ErrorInput ==========
interface ErrorInputProps {
  error: string;
  className?: string;
}

export function ErrorInput({ error, className }: ErrorInputProps) {
  if (!error) return null;
  return (
    <>
      {error && (
        <p
          className={cn(
            "text-red-500 flex justify-end items-center text-right",
            className,
          )}
        >
          <span className="mr-1"> {error}</span> <CircleAlert size={14} />
        </p>
      )}
    </>
  );
}
