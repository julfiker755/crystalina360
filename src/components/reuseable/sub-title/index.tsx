import { cn } from "@/lib";

interface SubTitleProps {
  className?: string;
  text: string;
}
export function SubTitle({ className, text }: SubTitleProps) {
  return (
    <div className={cn("text-2xl font-bold text-figma-black", className)}>
      {text}
    </div>
  );
}
