"use client";
import privacyImg from "@/assets/user/privacy-center.png";
import { Repeat } from "@/components/reuseable/repeat";
import { Skeleton } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { useGetPrivacyQuery } from "@/redux/api/admin/privacyApi";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function PrivacyPolicyBox() {
  const { data: privacy, isLoading } = useGetPrivacyQuery({});
  const t = useTranslations("oprator.home.privacy_policy");

  const privacyItem = [
    {
      id: 1,
      title: t("data_collection"),
      description: privacy?.data?.data_collection,
      icon: "collection",
    },
    {
      id: 2,
      title: t("data_usage"),
      description: privacy?.data?.data_usage,
      icon: "event",
    },
    {
      id: 3,
      title: t("data_protection"),
      description: privacy?.data?.data_protection,
      icon: "producation",
    },
    {
      id: 4,
      title: t("your_responsibilities"),
      description: privacy?.data?.your_responsibility,
      icon: "respon",
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 ">
      <div className="space-y-10 mb-10 md:mb-0">
        {privacyItem.slice(0, 2).map((card) => (
          <div key={card.id} className="flex-1">
            <PrivacyPolicyCard isLoading={isLoading} card={card} />
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
            <PrivacyPolicyCard isLoading={isLoading} card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

interface privacyProps {
  isLoading: boolean;
  card: any;
}

function PrivacyPolicyCard({ isLoading, card }: privacyProps) {
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
      {isLoading ? (
        <div className="space-y-2">
          <Repeat count={4}>
            <Skeleton className="w-full h-3 bg-gray-600/10 rounded-[3px]!" />
          </Repeat>
        </div>
      ) : (
        <p className="text-gray-600 leading-relaxed text-sm">
          {card.description}
        </p>
      )}
    </div>
  );
}
