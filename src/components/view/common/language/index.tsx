"use client";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { useEffect, useState, useCallback, useRef } from "react";

export type Language = "en" | "it";

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: () => void;
    }
}

function useGoogleTranslate(containerId: string) {
    const [currentLang, setCurrentLang] = useState<Language>("en");
    const [isTranslating, setIsTranslating] = useState(false);

    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return; // ✅ prevent re-init on re-render
        initialized.current = true;

        const SCRIPT_ID = "google-translate-script-global";

        window.googleTranslateElementInit = () => {
            if (window.google?.translate) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages: "en,it",
                        layout: 0,
                        autoDisplay: false,
                    },
                    containerId
                );
            }
        };

        if (!document.getElementById(SCRIPT_ID)) {
            const script = document.createElement("script");
            script.id = SCRIPT_ID;
            script.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        } else {
            window.googleTranslateElementInit?.();
        }
    }, [containerId]);

    const toggleLanguage = useCallback(() => {
        const select = document.querySelector(
            `#${containerId} .goog-te-combo`
        ) as HTMLSelectElement | null;

        if (!select || isTranslating) return;

        setIsTranslating(true);

        const nextLang = select.value === "en" ? "it" : "en";

        // ✅ prevent accidental re-trigger loops
        requestAnimationFrame(() => {
            select.value = nextLang;
            select.dispatchEvent(new Event("change"));
        });

        setTimeout(() => {
            setCurrentLang(nextLang);
            setIsTranslating(false);
        }, 600);
    }, [containerId, isTranslating]);

    return { currentLang, toggleLanguage, isTranslating };
}

// ===== user =====
export const LanguageSwitcher = () => {
    const { toggleLanguage, isTranslating } =
        useGoogleTranslate("google_translate_user");

    return (
        <Button
            variant="none"
            disabled={isTranslating}
            onClick={(e) => {
                e.stopPropagation(); // ✅ prevents parent click/delete triggers
                toggleLanguage();
            }}
            className="cursor-pointer"
        >
            <FavIcon className="size-7" name="language" />
        </Button>
    );
};

// ===== operator =====
export const LanguageSwitcher2 = () => {
    const { toggleLanguage, isTranslating } =
        useGoogleTranslate("google_translate_operator");

    return (
        <Button
            onClick={(e) => {
                e.stopPropagation(); // ✅ important fix
                toggleLanguage();
            }}
            size="lg"
            disabled={isTranslating}
            className="hidden md:block border has-[>svg]:px-2.5 bg-white text-figma-black"
        >
            <FavIcon className="size-7" name="language" />
        </Button>
    );
};