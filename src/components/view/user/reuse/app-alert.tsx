import { cn } from "@/lib";
import { CircleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

interface AppAlertProps {
  className?: string;
}

export function AppAlert({ className }: AppAlertProps) {
  const t = useTranslations("user.home");
  return (
    <div
      className={cn(
        "bg-[#000000]/5 p-6 flex space-x-2 mt-10 mb-10 rounded-lg",
        className,
      )}
    >
      <CircleAlert className="text-primary rotate-180" />
      <p className="text-figma-black">
        {" "}
        {t("olistami_alert")}
      </p>
    </div>
  );
}
