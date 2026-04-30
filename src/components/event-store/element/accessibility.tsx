import { accessibilityItem } from "@/components/dummy-data";
import { Checkbox } from "@/components/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface accessibilityProps {
  selAccbility: string[];
  setSelAccbility: React.Dispatch<React.SetStateAction<string[]>>;
}
export const AccessibilityBox = ({
  selAccbility,
  setSelAccbility,
}: accessibilityProps) => {
  const t = useTranslations("oprator.evStoreAll.store");
  const t1 = useTranslations("common");
  const [accessibility, setAccessibility] = useState(false);

  const handleToggle = (option: string) => {
    setSelAccbility((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-lg font-semibold">{t("accessibilities")}</label>
        <div className="flex items-center gap-3">
          <span className="text-gray-600">{t("no")}</span>
          <button
            onClick={() => setAccessibility(!accessibility)}
            className={`relative inline-flex cursor-pointer h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              accessibility ? "bg-primary" : "bg-[#79747E]"
            }`}
            type="button"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                accessibility ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-figma-black">{t("yes")}</span>
        </div>
      </div>

      {accessibility && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-100">
          <h5 className="col-span-1 lg:col-span-2 text-primary text-end mb-1 text-sm">
            {t("select_accessibilities")}
          </h5>
          <div className="overflow-hidden rounded-lg border bg-card p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {accessibilityItem.map((option, idx: any) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Checkbox
                    id={idx}
                    checked={selAccbility.includes(option.label)}
                    onCheckedChange={() => handleToggle(option.label)}
                  />
                  <label
                    htmlFor={option.label}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {t1(`accessibility.${option.value}`)}
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
