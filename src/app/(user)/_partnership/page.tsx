import { BackBtn2 } from "@/components/reuseable/back-btn";
import { Partnership } from "@/components/view/user/simple/resources-tab";
import { Seo } from "@/lib";
import { useTranslations } from "next-intl";
import React from "react";

export const metadata = Seo({
  title: "The OLISTAMI Partnership",
  description:
    "Join the OLISTAMI partnership program and grow your business with trusted collaboration opportunities. Connect with new clients, expand your professional network, and deliver high-quality wellness and service solutions together with OLISTAMI.",
  url: "/partnership",
  image: "/partnership.jpg",
});

export default function PartnershipParent() {
  const t = useTranslations("user.details");

  return (
    <div className="container">
      <BackBtn2 label={t("back")} className="my-6 mt-10" />
      <Partnership action="partnership" />
    </div>
  );
}
