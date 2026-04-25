"use client";
import assets from "@/assets";
import AppStore from "@/components/reuseable/app-store/app-store";
import FavIcon from "@/icon/favIcon";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("oprator.home.footer");
  const user = useAppSelector((state) => state.auth.user);

  const socialMedia = [
    { name: "facebook", icon: "facebook" },
    { name: "youtube", icon: "youtube" },
    { name: "instagram", icon: "instagram" },
  ];

  return (
    <div className="bg-figma-black py-16 *:text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-50">
          <div className="space-y-4">
            <div>
              <picture>
                <img src={assets.logoWhite.src} alt="logo" className="w-50" />
              </picture>
            </div>
            <div>
              <h5 className="text-xl mb-2">
                {t("title")}
              </h5>
              <p>
                {t("description")}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              {t("quick.quick_links")}
            </h3>
            { }
            {user?.email ? (
              <ul className="space-y-1">
                <li>
                  <Link href={"/operator/add-ons"}>{t("quick.add_on")}</Link>
                </li>
                <li>
                  <Link href={"/operator/pricing"}>{t("quick.pricing")}</Link>
                </li>
                <li>
                  <Link href={"/operator/events"}>{t("quick.events")}</Link>
                </li>
                <li>
                  <Link href={"/operator/privacy-policy"}>{t("quick.privacy_policy")}</Link>
                </li>
                <li>
                  <Link href={"/operator/faq"}>{t("quick.faq")}</Link>
                </li>
              </ul>
            ) : (
              <ul className="space-y-1">
                <li>
                  <Link href="/operator">{t("quick.home")}</Link>
                </li>
                <li>
                  <Link href="/operator/#pricing">{t("quick.pricing")}</Link>
                </li>
                <li>
                  <Link href="/operator/#add-on">{t("quick.add_on")}</Link>
                </li>
                <li>
                  <Link href="/operator/#privacy-Policy">{t("quick.privacy_policy")}</Link>
                </li>
                <li>
                  <Link href="/operator/#faq">{t("quick.faq")}</Link>
                </li>
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {t("social.follow_us_on")}
            </h3>
            <div className="space-y-4">
              <ul className="flex items-center  space-x-3">
                {socialMedia &&
                  socialMedia.map((item) => (
                    <li
                      key={item.name}
                      className="bg-[#FFFFFF]/20 size-12 rounded-md grid place-items-center"
                    >
                      <FavIcon name={item.icon as any} className="size-6" />
                    </li>
                  ))}
              </ul>
              <AppStore />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
