"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    id: "basic",
    name: "Basic Plan",
    price: 0,
    description: "Benefits you will get",
    benefits: [
      "Benefit 1 goes here",
      "Benefit 2 goes here",
      "Benefit 3 goes here",
      "Benefit 4 goes here",
      "Benefit 5 goes here",
      "Benefit 6 goes here",
    ],
    featured: false,
    bg: "#EDEDED",
    color: "#303030",
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: 100,
    description: "Benefits you will get",
    benefits: [
      "Benefit 1 goes here",
      "Benefit 2 goes here",
      "Benefit 3 goes here",
      "Benefit 4 goes here",
      "Benefit 5 goes here",
      "Benefit 6 goes here",
    ],
    featured: true,
    bg: "#303030",
    color: "#FFF",
  },
];

export default function Pricing() {
  const [isTab, setIsTab] = useState("monthly");

  return (
    <div className="container pb-16">
      <div className="text-center mb-12">
        <h1>Pricing</h1>

        {/* Toggle Buttons */}
        <div className="flex justify-center mt-5 mx-auto space-x-3 bg-figma-gray1 w-fit rounded-full">
          <button
            onClick={() => setIsTab("monthly")}
            className={`py-2 px-7 ${
              isTab == "monthly" && "bg-figma-primary  text-white!"
            } rounded-full text-figma-black cursor-pointer`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsTab("annual")}
            className={`py-2 px-7 ${
              isTab === "annual" && "bg-figma-primary  text-white!"
            } rounded-full text-figma-black cursor-pointer`}
          >
            Annual
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            style={{
              backgroundColor: plan.bg,
              color: plan.color,
            }}
            className={`rounded-2xl p-8 flex flex-col relative`}
          >
            <h2
              style={{
                color: plan.color,
              }}
              className="text-2xl font-bold mb-6 text-center"
            >
              {plan.name}
            </h2>
            <div className="text-center mb-8">
              <span className="text-3xl lg:text-4xl font-bold">
                ${plan.price.toFixed(2)}
              </span>
            </div>
            <div>
              <p
                style={{
                  color: plan.color,
                }}
                className={`text-xl mb-2 font-semibold`}
              >
                {plan.description}
              </p>
              <ul className="space-y-2 mb-7">
                {plan.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span>•</span>
                    <span className={`text-sm`}>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
              <Button
                variant="primary"
                className="w-fit px-10! border-5 pricingShadow border-white py-6! rounded-full"
              >
                Purchase plan
              </Button>
            </div>
          </div>
        ))}
      </div>

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
