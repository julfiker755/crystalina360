import FavIcon from "@/icon/favIcon";
import privacyImg from "@/assets/user/privacy-center.png";
import Image from "next/image";

const privacyItem = [
  {
    id: 1,
    title: "Data Collection",
    description:
      "We collect information you provide when creating and managing events, such as event details, attendee information, and account credentials. This data is used only to deliver and improve our services.",
    icon: "collection",
  },
  {
    id: 2,
    title: "Data usage",
    description:
      "The data you manage is used solely for event organization, communication with attendees, and ensuring the smooth operation of your events. We do not sell or share your information with unauthorized third parties.",
    icon: "event",
  },
  {
    id: 3,
    title: "Data Protection",
    description:
      "We use industry-standard security measures to protect your information from unauthorized access, loss, or misuse. Only authorized personnel have access to your account and event data.",
    icon: "producation",
  },
  {
    id: 4,
    title: "Your Responsibilities",
    description:
      "As an operator, you are responsible for maintaining the confidentiality of your login details and ensuring that attendee data is handled responsibly and in compliance with applicable laws.",
    icon: "respon",
  },
];

export default function PrivacyPolicy() {
  return (
    <div id="privacy-Policy" className="py-10 container">
      <h1 className="mb-10">Privacy Policy</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 ">
        <div className="space-y-10 mb-10 md:mb-0">
          {privacyItem.slice(0, 2).map((card) => (
            <div key={card.id} className="flex-1">
              <PrivacyPolicyCard card={card} />
            </div>
          ))}
        </div>
        <div className="hidden md:block relative h-[300px] self-center">
          <Image
            alt="title"
            fill
            loading="eager"
            // className="object-cover z-0"
            src={privacyImg}
            quality={100}
          />
        </div>
        <div className="space-y-10">
          {privacyItem.slice(-2).map((card) => (
            <div key={card.id} className="flex-1">
              <PrivacyPolicyCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PrivacyPolicyCard({ card }: any) {
  return (
    <div
      className={`rounded-lg p-6 bg-[#EDEDED] transition-transform  h-full flex flex-col`}
    >
      <div className="mb-3">
        <div
          className={`w-12 h-12 p-2 bg-primary rounded-full   flex items-center justify-center mb-2 `}
        >
          <FavIcon color="#fff" name={card.icon} />
        </div>

        <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
      </div>
      <p className="text-gray-600 leading-relaxed text-sm">
        {card.description}
      </p>
    </div>
  );
}
