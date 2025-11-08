import React from "react";
import register from "@/assets/oprator/register.jpg";
import event from "@/assets/oprator/event.png";
import monitor from "@/assets/oprator/monitor.png";
import { ImgBox } from "@/components/reuseable/Img-box";
import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Register",
    description:
      "Register your operator account into this system. After that you can able to manage your events.",
    image: register,
  },
  {
    id: 2,
    title: "Create event",
    description:
      "Create event by proving all necessary files, documents, information's and schedule them.",
    image: event,
    w: 180,
  },
  {
    id: 3,
    title: "Monitor and manage",
    description:
      "Monitor your created events, the sold of tickets and manage them through this system easily.",
    image: monitor,
  },
];

export default function FlowStep() {
  return (
    <div className="container grid grid-cols-1 gap-10 lg:grid-cols-3 py-16">
      {steps.map((step) => (
        <div key={step.id} className="space-x-4">
          {/* <ImgBox className="h-fit" alt="img" src={step.image} /> */}
          <Image
            src={step.image}
            alt="img"
            style={{
              height: "190px",
            }}
            width={step.w || 250}
            height={100}
          />
          <div className="mt-4">
            <h3 className="font-semibold text-2xl">{step.title}</h3>
            <p className="text-sm text-figma-black">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
