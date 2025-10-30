import { BackBtn2 } from "@/components/reuseable/back-btn";
import { featuresData } from "@/components/view/user/dummy-json";
import { AppAlert } from "@/components/view/user/reuse";
import FeatureCard from "@/components/view/user/reuse/feature-card";

export default function Features() {
  return (
    <div className="container">
      <BackBtn2 className="mt-10 mb-2" />
      <div className="space-y-10 pb-10">
        {featuresData.map((feature) => (
          <FeatureCard key={feature.id} isText={false} {...feature} />
        ))}
        <AppAlert />
      </div>
    </div>
  );
}
