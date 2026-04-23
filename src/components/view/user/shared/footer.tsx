import AppStore from "@/components/reuseable/app-store/app-store";
import FavIcon from "@/icon/favIcon";
import assets from "@/assets";
import { useTranslations } from "next-intl";
import Link from "next/link";


export default function Footer() {
  const t = useTranslations('user.home.footer')
  const socialMedia = [
    { name: "facebook", icon: "facebook" },
    { name: "youtube", icon: "youtube" },
    { name: "instagram", icon: "instagram" },
  ];


  return (
    <div className="bg-figma-black py-10 lg:py-16 *:text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="space-y-4">
            <div>
              <picture>
                <img src={assets.logoWhite.src} alt="logo" className="w-50" />
              </picture>
            </div>
            <div>
              <h5 className="text-xl mb-2">
                {t('title')}
              </h5>
              <p>
                {t('description')}
              </p>
            </div>
          </div>
          <div className="lg:ml-5">
            <h3 className="text-xl font-semibold text-white mb-3">
              {t('quick.title')}
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/">{t('quick.home')}</Link>
              </li>
              <li>
                <Link href="/#explore">{t('quick.explore')}</Link>
              </li>
              <li>
                <Link href="/blog">{t('quick.blog')}</Link>
              </li>
              <li>
                <Link href="/podcast">{t('quick.podcast')}</Link>
              </li>
              <li>
                <Link href="/#contact-us">{t('quick.contact_us')}</Link>
              </li>

            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold  mb-3 text-white">
              {t('social.follow_us_on')}
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
