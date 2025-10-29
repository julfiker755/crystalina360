import { Button } from "@/components/ui";
import { Calendar, Lock } from "lucide-react";
import React from "react";

const addOns = [
  {
    title: "Featured event",
    price: 500,
    bio: "Add-on bio goes here",
    keyBenefits: [
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
    ],
    primaryColor: "#F28B82",
    secondaryColor: "#FDCFCF",
  },
  {
    title: "Mini PDF Course",
    price: 500,
    bio: "Add-on bio goes here",
    keyBenefits: [
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
    ],
    primaryColor: "#6C33D3",
    secondaryColor: "#DCC7F7",
  },
  {
    title: "Exclusive Post",
    price: 500,
    bio: "Add-on bio goes here",
    keyBenefits: [
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
    ],
    primaryColor: "#7DA16F",
    secondaryColor: "#D8E4D4",
  },
  {
    title: "Exclusive Video",
    price: 500,
    bio: "Add-on bio goes here",
    keyBenefits: [
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
    ],
    primaryColor: "#F9A825",
    secondaryColor: "#FFE4A0",
  },
  {
    title: "Newsletter",
    price: 500,
    bio: "Add-on bio goes here",
    keyBenefits: [
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
    ],
    primaryColor: "#5D4037",
    secondaryColor: "#E9DAD8",
  },
  {
    title: "Video Masterclass",
    price: 500,
    bio: "Add-on bio goes here",
    keyBenefits: [
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur.",
    ],
    primaryColor: "#009688",
    secondaryColor: "#B2DFDB",
  },
];

export default function AddOn() {
  return (
    <div className="py-10 container">
      <h1 className="mb-10">Add on services</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 2xl:gap-20">
        {addOns.map((item, index) => (
          <div className="rounded-3xl border-t-4 border-[#E07856] bg-white p-8 shadow-2xl">
            {/* Header with icon and price */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#FFE5E0] p-2 rounded-lg">
                  <Calendar className="w-6 h-6 text-[#E07856]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Featured event
                  </p>
                  <p className="text-lg font-bold text-[#E07856]">$500</p>
                </div>
              </div>
              <Button className="bg-[#E07856] hover:bg-[#D06A48] text-white rounded-full px-6">
                <Lock className="w-4 h-4 mr-2" />
                Buy now
              </Button>
            </div>

            {/* Subtitle */}
            <p className="text-sm text-muted-foreground mb-6">
              Add-on bio goes here
            </p>

            {/* Key benefits section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#E07856] mb-3">
                Key benefits
              </h3>
              <ul className="space-y-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-[#E07856] font-bold">•</span>
                    <span>Lorem ipsum dolor sit amet consectetur.</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* More details link */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm font-medium text-[#E07856] hover:underline"
              >
                More details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
