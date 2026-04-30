"use client";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const useLangSwitch = () => {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === "en" ? "it" : "en";

    startTransition(async () => {
      const res = await fetch("/api/set-locale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locale: next }),
      });

      if (res.ok) {
        router.refresh(); // important
      }
    });
  };

  return { locale, toggle, isPending };
};

// ===== user =====
export const LanguageSwitcher = () => {
  const { toggle, isPending } = useLangSwitch();

  return (
    <Button variant="none" onClick={toggle} className="cursor-pointer">
      <FavIcon className="size-7" name="language" />
    </Button>
  );
};

// ===== operator =====
export const LanguageSwitcher2 = () => {
  const { toggle, isPending } = useLangSwitch();

  return (
    <Button
      onClick={toggle}
      size="lg"
      className="hidden md:block border has-[>svg]:px-2.5 bg-white text-figma-black"
    >
      <FavIcon className="size-7" name="language" />
    </Button>
  );
};
