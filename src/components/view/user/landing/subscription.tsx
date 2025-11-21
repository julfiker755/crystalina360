import { Button } from "@/components/ui";
import basic from "@/assets/user/basic.png";
import standard from "@/assets/user/standard.png";
import premium from "@/assets/user/premium.png";
import Image from "next/image";

const plans = [
  {
    id: 1,
    name: "Basic Plan",
    price: 5643.0,
    period: "monthly",
    icon: basic,
    features: [
      "Up to 5 PC bookings per day.",
      "Listing in the Nexus app.",
      "Email support.",
    ],
    buttonLabel: "Manage Plan",
    bgColor: "#F6FCFF",
  },
  {
    id: 2,
    name: "Standard Plan",
    price: 5643.0,
    period: "monthly",
    icon: standard,
    features: [
      "Up to 50 PC bookings per day.",
      "Listing in the Nexus app.",
      "Higher placement in search.",
      "Email support.",
    ],
    buttonLabel: "Manage Plan",
    bgColor: "#FFFCF2",
  },
  {
    id: 3,
    name: "Premium Plan",
    price: 5643.0,
    period: "monthly",
    icon: premium,
    features: [
      "Unlimited bookings.",
      "Priority placement.",
      "Featured venue badges.",
      "Priority support.",
      "First access to beta features.",
    ],
    buttonLabel: "Manage Plan",
    bgColor: "#FBF8FF",
  },
];

export default function Subscription() {
  return (
    <div className="pt-16 container">
      <h1 className="mb-10">Subscription</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 2xl:gap-20">
        {plans.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: item.bgColor,
            }}
            className="p-6 rounded-md flex flex-col justify-between"
          >
            <div className="mx-auto mb-7">
              <div className="flex justify-center mb-4 text-3xl">
                <Image src={item.icon} alt={item.name} width={50} height={50} />
              </div>
              <h2 className="text-2xl font-bold text-figma-black text-center">
                {item.name}
              </h2>
              <p className="text-lg font-semibold text-center text-figma-black ">
                {item.price}
                <span className="text-base">/{item.period}</span>
              </p>
            </div>

            {/* Features */}
            <ul className="text-gray-500 text-sm mb-6 space-y-2">
              {item.features.map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>
            <Button className="bg-[#FFF] w-full text-primary">
              {" "}
              Manage Plan
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
