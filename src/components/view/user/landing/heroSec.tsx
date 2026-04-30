import { buttonVariants } from "@/components/ui";
import Navber from "../shared/navber";
import { roleKey } from "@/lib";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function HeroSec({ role }: any) {
  const t = useTranslations("user.home.hero");
  return (
    <div className="flex relative h-[600px] lg:h-[calc(100vh-2rem)] m-4 rounded-xl flex-col  bg-[url('/img/bg1.png')] bg-cover bg-no-repeat bg-center items-center justify-center px-8">
      {/* =========== navber ========= */}
      <Navber />
      <h5 className="text-center text-3xl lg:text-5xl font-bold text-figma-black mb-5">
        {t("title")}
      </h5>

      <p className="text-center text-base text-article max-w-2xl mb-12  text-pretty">
        {t("description")}
      </p>
      {role == roleKey.user ? (
        <Link
          className={buttonVariants({
            className: "text-primary bg-white",
            size: "lg",
          })}
          href="/events"
        >
          {t("btn_find")}
        </Link>
      ) : (
        <Link
          className={buttonVariants({
            className: "text-primary bg-white",
            size: "lg",
          })}
          href="#explore"
        >
          {t("btn_explor")}
        </Link>
      )}
    </div>
  );
}
