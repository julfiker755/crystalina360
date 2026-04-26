import FavIcon from "@/icon/favIcon";
import { cn } from "@/lib";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface StarBadgeProps {
  is_subscribed: any;
  is_top_seller: any;
}

export function StarBadge({ is_subscribed, is_top_seller }: StarBadgeProps) {
  return is_subscribed && is_top_seller ? (
    <FavIcon className="size-5" name="top_seller" />
  ) : (
    <FavIcon className="size-5" name="verified" />
  );
}

export function OlistamiLabel({ className }: any) {
  const t = useTranslations('user.details');
  return (
    <div className="flex items-center">
      <Image src="/fav_logo.png" width={30} height={10} alt="img" />
      <span
        className={cn("font-bold text-xl ml-1 text-figma-black", className)}
      >
        {" "}
        {t("organized_by_olistami")}
      </span>
    </div>
  );
}
