import ContactUs from "@/components/view/user/landing/contact-us";
import { AppAlert } from "@/components/view/user/reuse";
import { useTranslations } from "next-intl";

export default function ContactMe() {
  const t = useTranslations("user.contact_us");
  return (
    <div>
      <ContactUs title={t("sub_title")} className="mt-20 max-w-5xl" />
      <div className="container mb-10">
        <AppAlert />
      </div>
    </div>
  );
}
