import FavIcon from "@/icon/favIcon";
import privacyImg from "@/assets/user/privacy-center.png";
import Image from "next/image";
import { useGetPrivacyQuery } from "@/redux/api/admin/privacyApi";
import { Skeleton } from "@/components/ui";
import { Repeat } from "@/components/reuseable/repeat";
import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const t = useTranslations('user.home.privacy_policy')
  const { data: privacy, isLoading } = useGetPrivacyQuery({});

  const privacyItem = [
    {
      id: 1,
      title: t('data_collection'),
      description: privacy?.data?.data_collection,
      icon: "collection",
      bgColor: "#F7FAFF",
      shadow:
        "0 2px 4px 0 rgba(34, 117, 255, 0.25), 0 -2px 4px 0 rgba(34, 117, 255, 0.25), 2px 0 4px 0 rgba(34, 117, 255, 0.25), -2px 0 4px 0 rgba(34, 117, 255, 0.25)",
    },
    {
      id: 2,
      title: t('data_usage'),
      description: privacy?.data?.data_usage,
      icon: "event",
      bgColor: "#FFF5F6",
      shadow:
        "0 2px 4px 0 rgba(255, 18, 56, 0.25), 0 -2px 4px 0 rgba(255, 18, 56, 0.25), 2px 0 4px 0 rgba(255, 18, 56, 0.25), -2px 0 4px 0 rgba(255, 18, 56, 0.25)",
    },
    {
      id: 3,
      title: t('data_protection'),
      description: privacy?.data?.data_protection,
      icon: "producation",
      bgColor: "#FDF6FF",
      shadow:
        "0 2px 4px 0 rgba(204, 25, 255, 0.25), 0 -2px 4px 0 rgba(204, 25, 255, 0.25), 2px 0 4px 0 rgba(204, 25, 255, 0.25), -2px 0 4px 0 rgba(204, 25, 255, 0.25)",
    },
    {
      id: 4,
      title: t('your_responsibilities'),
      description: privacy?.data?.your_responsibility,
      icon: "respon",
      bgColor: "#FFFDF1",
      shadow:
        "0 2px 4px 0 rgba(255, 221, 14, 0.25), 0 -2px 4px 0 rgba(255, 221, 14, 0.25), 2px 0 4px 0 rgba(255, 221, 14, 0.25), -2px 0 4px 0 rgba(255, 221, 14, 0.25)",
    },
  ];



  return (
    <div id="privacy-Policy" className="pt-16 container">
      <h1 className="mb-10">{t('title')}</h1>
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
