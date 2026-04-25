import PrivacyPolicyBox from "../simple/privacy-policy-box";
import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const t = useTranslations("oprator.home.privacy_policy");
  return (
    <div id="privacy-Policy" className="pt-20 container">
      <h1 className="mb-10">{t("title")}</h1>

      <PrivacyPolicyBox />
    </div>
  );
}
