import { BackBtn2 } from "@/components/reuseable/back-btn";
import { featuresData } from "@/components/view/user/dummy-json";
import FeatureCard from "@/components/view/user/reuse/feature-card";
import { CircleAlert } from "lucide-react";

export default function Features() {
  return (
    <div className="container">
      <BackBtn2 className="mt-10 mb-2" />
      <div className="space-y-10 pb-10">
        {featuresData.map((feature) => (
          <FeatureCard key={feature.id} isText={false} {...feature} />
        ))}
        <div className="bg-[#000000]/5 p-6 flex space-x-2 rounded-lg">
          <CircleAlert className="text-primary rotate-180" />
          <p className="text-figma-black">
            {" "}
            Olistami is a self-service platform where each user independently
            publishes content and services, assuming full legal responsibility.
            Holistic practices are complementary to official medicine and do not
            replace it.”
          </p>
        </div>
      </div>
    </div>
  );
}
