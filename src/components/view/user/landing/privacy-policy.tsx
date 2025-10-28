import FavIcon from "@/icon/favIcon";
import { Clipboard, Lock, Shield, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const cards = [
  {
    id: 1,
    title: "Data Collection",
    description:
      "We collect information you provide when creating and managing events, such as event details, attendee information, and account credentials. This data is used only to deliver and improve our services.",
    icon: "collection",
    bgColor: "#F7FAFF",
    shadow:
      "0 2px 4px 0 rgba(34, 117, 255, 0.25), 0 -2px 4px 0 rgba(34, 117, 255, 0.25), 2px 0 4px 0 rgba(34, 117, 255, 0.25), -2px 0 4px 0 rgba(34, 117, 255, 0.25)",
  },
  {
    id: 2,
    title: "Event Discovery",
    description:
      "The data you manage is used solely for event organization, communication with attendees, and ensuring the smooth operation of your events. We do not sell or share your information with unauthorized third parties.",
    icon: "event",
    bgColor: "#FFF5F6",
    shadow:
      "0 2px 4px 0 rgba(255, 18, 56, 0.25), 0 -2px 4px 0 rgba(255, 18, 56, 0.25), 2px 0 4px 0 rgba(255, 18, 56, 0.25), -2px 0 4px 0 rgba(255, 18, 56, 0.25)",
  },
  {
    id: 3,
    title: "Data Protection",
    description:
      "We use industry-standard security measures to protect your information from unauthorized access, loss, or misuse. Only authorized personnel have access to your account and event data.",
    icon: "producation",
    bgColor: "#FDF6FF",
    shadow:
      "0 2px 4px 0 rgba(204, 25, 255, 0.25), 0 -2px 4px 0 rgba(204, 25, 255, 0.25), 2px 0 4px 0 rgba(204, 25, 255, 0.25), -2px 0 4px 0 rgba(204, 25, 255, 0.25)",
  },
  {
    id: 4,
    title: "Your Responsibilities",
    description:
      "As an operator, you are responsible for maintaining the confidentiality of your login details and ensuring that attendee data is handled responsibly and in compliance with applicable laws.",
    icon: "respon",
    bgColor: "#FFFDF1",
    shadow:
      "0 2px 4px 0 rgba(255, 221, 14, 0.25), 0 -2px 4px 0 rgba(255, 221, 14, 0.25), 2px 0 4px 0 rgba(255, 221, 14, 0.25), -2px 0 4px 0 rgba(255, 221, 14, 0.25)",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="py-10 container">
      <h1 className="mb-10">Privacy Policy</h1>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-4">
        {cards.map((card) => (
          <div key={card.id} className="flex-1">
            <PrivacyPolicyCard card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivacyPolicyCard({ card }: any) {
  return (
    <div
      className={`rounded-lg p-6 transition-transform  h-full flex flex-col`}
      style={{
        background: card.bgColor,
      }}
    >
      <div className="mb-3">
        <div
          className={`w-12 h-12 p-2 ring-4  rounded-lg flex items-center justify-center mb-2 text-gray-700`}
          style={{
            boxShadow: card.shadow,
          }}
        >
          <FavIcon name={card.icon} />
        </div>

        <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
      </div>
      <p className="text-gray-600 leading-relaxed text-sm">
        {card.description}
      </p>
    </div>
  );
}
