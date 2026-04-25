import { getInterval } from "@/lib/function-utils";
import { childrenProps } from "@/types";

interface pricingcdProps extends childrenProps {
  title?: string;
  price?: any;
  interval: string;
  service: string[];
}

export default function PricingCd({
  title,
  price,
  interval,
  service,
  children,
}: pricingcdProps) {
  return (
    <div className="p-4 rounded-xl flex flex-col justify-between bg-figma-sidebar">
      <ul>
        <li className="font-semibold text-center text-2xl">{title}</li>
        <li className="text-primary text-lg  text-center">
          €{price}/<sub>{getInterval[interval]}</sub>
        </li>
        <li className="mt-8">
          <ul className="space-y-1 ml-6 list-disc">
            {service?.map((feature: any, index: any) => (
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
