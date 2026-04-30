import { featuresData } from "@/components/dummy-data";
import { BackBtn2 } from "@/components/reuseable/back-btn";
import { AppAlert } from "@/components/view/user/reuse";
import FeatureCard from "@/components/view/user/reuse/feature-card";
import { useTranslations } from "next-intl";

export default function Features() {
  const t = useTranslations("user.home.key_features");
  return (
    <div className="container">
      <BackBtn2 className="mt-10 mb-2" />
      <div className="space-y-10 pb-10">
        {featuresData.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            bgColor={feature.bgColor}
            shadow={feature.shadow}
            title={t(`features.${feature.key}.title`)}
            description={t(`features.${feature.key}.description`)}
            isText={false}
          />
        ))}
        <AppAlert />
      </div>
    </div>
  );
}
