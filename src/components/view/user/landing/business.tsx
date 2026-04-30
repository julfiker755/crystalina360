import { Button } from "@/components/ui";
import business from "@/assets/user/businessImg.jpg";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Business() {
  const t = useTranslations("user.home.business");
  return (
    <div className="py-18 container">
      <h1 className="mb-10">{t("title")}</h1>
      <div className="container mx-auto relative rounded-xl">
        <Image
          src={business}
          alt="title"
          fill
          loading="eager"
          className="object-cover z-0 rounded-xl"
        />
        <div className="absolute inset-0 bg-black/35 rounded-xl backdrop-blur-[2px]" />
        <div className="relative py-4 md:py-16 md:px-10">
          <h1 className="text-3xl text-left md:text-5xl  font-bold text-white mb-5 leading-tight">
            {t("sub_title")}
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8">
            {t("description")}
          </p>

          {/* CTA Button */}
          <Link href="/operator">
            <Button size="lg" className="bg-[#FFF] text-primary">
              {t("join_as_operator")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
