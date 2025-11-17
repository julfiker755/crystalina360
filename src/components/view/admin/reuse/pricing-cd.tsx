import { childrenProps } from "@/types";

interface pricingcdProps extends childrenProps {
  planName?: string;
  monthlyPrice?: any;
  billingCycle: string;
  includedFeatures: string[];
}

export default function PricingCd({
  planName,
  monthlyPrice,
  billingCycle,
  includedFeatures,
  children,
}: pricingcdProps) {
  return (
    <div className="p-4 rounded-xl flex flex-col justify-between bg-figma-sidebar">
      <ul>
        <li className="font-semibold text-center text-2xl">{planName}</li>
        <li className="text-primary text-lg  text-center">
          {monthlyPrice}
          {billingCycle}
        </li>
        <li className="mt-8">
          <ul className="space-y-1 ml-6 list-disc">
            {includedFeatures.map((feature, index) => (
              <li key={index} className="text-figma-black">
                {feature}
              </li>
            ))}
          </ul>
        </li>
      </ul>
      {children}
    </div>
  );
}
