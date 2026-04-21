"use client";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const useLangSwitch = () => {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const toggle = () => {
        const next = locale === "en" ? "it" : "en";
        const stripped = pathname.replace(`/${locale}`, "") || "/";
        router.push(`/${next}${stripped}`);
    };

    return { locale, toggle };
};

// ===== user =====
export const LanguageSwitcher = () => {
    const { locale, toggle } = useLangSwitch();
    return (
        <Button
            variant="none"
            className="cursor-pointer"
            onClick={toggle}
        >
            <FavIcon className="size-7" name="language" />
            {/* <span className="text-sm font-medium">
                {locale === "en" ? "IT" : "EN"}
            </span> */}
        </Button>
    );
};

// ===== operator =====
export const LanguageSwitcher2 = () => {
    const { toggle } = useLangSwitch();
    return (
        <Button
            size="lg"
            className="hidden md:block border has-[>svg]:px-2.5 bg-white text-figma-black"
            onClick={toggle}
        >
            <FavIcon className="size-7" name="language" />
        </Button>
    );
};