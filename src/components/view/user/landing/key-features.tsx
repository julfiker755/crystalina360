import { Button } from "@/components/ui";
import Link from "next/link";
import FeatureCard from "../reuse/feature-card";
import { featuresData } from "../dummy-json";
import { roleKey } from "@/lib";

export default function KeyFeature({ role }: any) {
  return (
    <div className="py-10 container">
      <h1 className="mb-10">Key Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuresData.map((feature) => (
          <FeatureCard key={feature.id} {...feature} />
        ))}
      </div>
      {role == roleKey.user && (
        <div className="flex justify-center">
          <Link href="/feature">
            <Button size="lg" className="mt-10">
              Learn More
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
