import PrivacyPolicyBox from "@/components/view/oparator/simple/privacy-policy-box";
import privacyImg from "@/assets/user/privacy.jpg";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const t = useTranslations("oprator.dashboard");
  return (
    <div className="container py-10">
      <div className="container h-[200px] mx-auto relative mb-10  rounded-xl">
        <Image
          src={privacyImg}
          alt="title"
          fill
          loading="eager"
          className="object-cover z-0 rounded-xl"
        />
        {/* Dark Overlay */}
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)",
          }}
          className="absolute inset-0  rounded-xl"
        />
        <div className="relative h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl  md:text-5xl text-center  font-bold text-white  leading-tight">
            {t("privacy_policy")}
          </h1>
        </div>
      </div>
      <PrivacyPolicyBox />
    </div>
  );
}
