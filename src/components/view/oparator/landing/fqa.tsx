import { useTranslations } from "next-intl";
import FqaBox from "../simple/fqa-box";

export default function Fqa() {
  const t = useTranslations("oprator.home.navber");
  return (
    <div id="faq" className="container pt-20">
      <h1 className="text-3xl font-bold text-center mb-8">{t("faq")}</h1>
      <FqaBox />
    </div>
  );
}
