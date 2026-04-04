"use client";
import { useEffect, useState, useCallback, useRef } from "react";

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: () => void;
    }
}

export type Language = "en" | "it";

export function useGoogleTranslate(initialLang: Language = "en") {
    const [currentLang, setCurrentLang] = useState<Language>(initialLang);
    const isTranslating = useRef(false);

    // Load Google Script
    useEffect(() => {
        const SCRIPT_ID = "google-translate-script";

        if (!document.getElementById(SCRIPT_ID)) {
            window.googleTranslateElementInit = () => {
                if (window.google && window.google.translate) {
                    new window.google.translate.TranslateElement(
                        {
                            pageLanguage: "en",
                            includedLanguages: "en,it",
                            layout: 0,
                            autoDisplay: false,
                        },
                        "google_translate_element"
                    );
                }
            };

            const script = document.createElement("script");
            script.id = SCRIPT_ID;
            script.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    // Toggle Language (FIXED)
    const toggleLanguage = useCallback(() => {
        if (isTranslating.current) return;

        const select = document.querySelector(
            ".goog-te-combo"
        ) as HTMLSelectElement;

        if (!select) {
            console.warn("Google Translate not ready yet");
            return;
        }

        const nextLang = currentLang === "en" ? "it" : "en";

        isTranslating.current = true;

        // change language
        select.value = nextLang;
        select.dispatchEvent(new Event("change"));

        // wait for google translate to finish
        setTimeout(() => {
            setCurrentLang(nextLang);
            isTranslating.current = false;
        }, 800);
    }, [currentLang]);

    return { currentLang, toggleLanguage, isTranslating };
}