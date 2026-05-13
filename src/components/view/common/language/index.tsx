"use client";
import { ImgBox } from "@/components/reuseable/Img-box";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const languages = [
  { code: "en", label: "English", flag: "/english.png" },
  { code: "it", label: "Italian", flag: "/italy.jpg" },
] as const;

type LangCode = (typeof languages)[number]["code"];

const useLangSwitch = () => {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: LangCode) => {
    if (next === locale) return;

    startTransition(async () => {
      const res = await fetch("/api/set-locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });

      if (res.ok) {
        router.refresh();
      }
    });
  };

  return { locale, switchTo, isPending };
};

// ===== user navbar variant =====
export const LanguageSwitcher = () => {
  const { locale, switchTo, isPending } = useLangSwitch();
  const selected = languages?.find((lang) => lang.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="none"
          disabled={isPending}
          className="cursor-pointer disabled:opacity-90 flex border border-primary/20  rounded-full items-center gap-1.5"
        >
          <span className="text-base leading-none">
            <ImgBox className="w-[20px] h-[16px] rounded-xs" imgStyle="rounded-xs" src={selected?.flag} alt={selected?.label as string} />

          </span>
          <span className="flex gap-px items-center text-figma-black">{selected?.label} <ChevronDown className="mt-px" /></span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-30 shadow-none border-none bg-[#ffffffef]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchTo(lang.code)}
            className={`flex items-center gap-2 cursor-pointer ${locale === lang.code ? "font-medium bg-muted" : ""
              }`}
          >
            <span className="text-base leading-none">
              <ImgBox className="w-[20px] h-[16px] rounded-xs" imgStyle="rounded-xs" src={lang.flag} alt={lang.label} />
            </span>
            <span>{lang.label}</span>
            {locale === lang.code && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ===== operator navbar variant =====
export const LanguageSwitcher2 = () => {
  const { locale, switchTo, isPending } = useLangSwitch();

  const selected = languages?.find((lang) => lang.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="none"
          disabled={isPending}
          className="cursor-pointer disabled:opacity-90 flex border border-primary/20  rounded-full items-center gap-1.5"
        >
          <span className="text-base leading-none">
            <ImgBox className="w-[20px] h-[16px] rounded-xs" imgStyle="rounded-xs" src={selected?.flag} alt={selected?.label as string} />

          </span>
          <span className="flex gap-px items-center text-figma-black">{selected?.label} <ChevronDown className="mt-px" /></span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-30 shadow-none border-none bg-[#ffffffef]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchTo(lang.code)}
            className={`flex items-center gap-2 cursor-pointer ${locale === lang.code ? "font-medium bg-muted" : ""
              }`}
          >
            <span className="text-base leading-none">
              <ImgBox className="w-[20px] h-[16px] rounded-xs" imgStyle="rounded-xs" src={lang.flag} alt={lang.label} />
            </span>
            <span>{lang.label}</span>
            {locale === lang.code && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};