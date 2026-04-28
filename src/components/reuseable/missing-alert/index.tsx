"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui";
import { InfoIcon, X } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { useTranslations } from "next-intl";

export default function MissingInfo({ path }: any) {
  const t = useTranslations("user.profile.missing");
  const router = useRouter();
  const { user } = useAppSelector((state: AppState) => state.auth);


  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (!user) return;

    if (user?.is_profile_complete === false) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [user]);

  const handleClose = () => {
    setIsShow(false);

    setTimeout(() => {
      if (!user) return;

      // 2 min later, show alert again if still incomplete
      if (user?.is_profile_complete === false) {
        setIsShow(true);
        if (path) {
          router.push(path);
        }
      }
    }, 2 * 60 * 1000);
  };

  if (!isShow) return null;

  return (
    <Alert className="relative rounded-none border-none bg-[#99796F]/50">
      <InfoIcon className="text-red-500" />

      <AlertTitle className="text-black">
        {t("title")}
      </AlertTitle>

      <AlertDescription className="flex items-center gap-1 text-black/70">
        {t("description")}

        <Link
          href={path || ""}
          className="text-sm font-medium text-black hover:underline"
        >
          {t("click_here")}
        </Link>
      </AlertDescription>

      <X
        onClick={handleClose}
        size={17}
        className="absolute top-2 right-3 cursor-pointer text-black"
      />
    </Alert>
  );
}