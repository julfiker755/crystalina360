import { cn } from "@/lib";
import { CircleAlert } from "lucide-react";

interface AppAlertProps {
  className?: string;
}

export function AppAlert({ className }: AppAlertProps) {
  return (
    <div
      className={cn(
        "bg-[#000000]/5 p-6 flex space-x-2 mt-10 rounded-lg",
        className
      )}
    >
      <CircleAlert className="text-primary rotate-180" />
      <p className="text-figma-black">
        {" "}
        Olistami is a self-service platform where each user independently
        publishes content and services, assuming full legal responsibility.
        Holistic practices are complementary to official medicine and do not
        replace it.”
      </p>
    </div>
  );
}
