import { Button } from "@/components/ui";
import Link from "next/link";
import FeatureCard from "../reuse/feature-card";
import { roleKey } from "@/lib";
import { featuresData } from "@/components/dummy-data";
import { useTranslations } from "next-intl";

export default function KeyFeature({ role }: any) {
  const t = useTranslations("user.home.key_features");

  return (
    <div className="pt-16  container">
      <h1 className="mb-10">{t("title")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuresData.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            bgColor={feature.bgColor}
            shadow={feature.shadow}
            title={t(`features.${feature.key}.title`)}
            text={t(`features.${feature.key}.text`)}
            description={t(`features.${feature.key}.description`)}
          />
        ))}
      </div>
      {role == roleKey.user && (
        <div className="flex justify-center">
          <Link href="/feature">
            <Button size="lg" className="mt-10">
              {t("btn_learn")}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
