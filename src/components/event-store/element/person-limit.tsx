import { PersionLimit } from "@/components/reuseable/porson-limit";
import { useTranslations } from "next-intl";
import React from "react";

export default function PersonLimit() {
  const t = useTranslations("oprator.evStoreAll.store.person_limit");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <PersionLimit
        name="min_person"
        type="number"
        placeholder={t("min_person_placeholder")}
        label={t("min_person_limit")}
      />
      <PersionLimit
        name="max_person"
        type="number"
        placeholder={t("max_person_placeholder")}
        label={t("max_person_limit")}
      />
    </div>
  );
}
