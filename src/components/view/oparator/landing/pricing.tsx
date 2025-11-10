import PricingBox from "../simple/pricing-box";
import { Button } from "@/components/ui";

export default function Pricing() {
  return (
    <div id="pricing">
      <PricingBox />
      <div className="text-center space-y-3 pt-6">
        <p>
          Purchase a plan and enjoy the freedom of managing events of whatever
          it's offline or online
        </p>
        <Button size="lg" className="text-white rounded-full">
          {" "}
          Sign up as operator
        </Button>
      </div>
    </div>
  );
}
