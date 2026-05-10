"use client";
import { featuresData } from "@/components/dummy-data";
import Modal2 from "@/components/reuseable/modal2";
import AuthModalController from "@/components/view/common/auth-controller";
import { AppAlert } from "@/components/view/user/reuse";
import FeatureCard from "@/components/view/user/reuse/feature-card";
import { setSignupRole, toggleIsOpen } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Features() {
  const t = useTranslations("user.home.key_features");
  const t1 = useTranslations("user.home.navber");
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state: AppState) => state.auth);

  const handleOpenModal = () => {
    dispatch(toggleIsOpen());
    dispatch(setSignupRole("user"));
  };

  return (
    <div className="container">
      {/* <BackBtn2 className="mt-10 mb-2" /> */}
      <div className="mt-20 mb-10">
        <h2 className="text-xl lg:text-3xl  font-bold text-center text-figma-black">
          {t("slg_title")}
        </h2>
        <h3 className="text-base text-figma-a_gray text-center mt-1">
          {t("slg_text")}
        </h3>
      </div>
      <div className="space-y-10 pb-10">
        {featuresData.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            bgColor={feature.bgColor}
            shadow={feature.shadow}
            title={t(`features.${feature.key}.title`)}
            description={t.raw(`features.${feature.key}.description`)}
            subDescription={t(`features.${feature.key}.href_text`)}
            btn={feature.btn}
            href={feature.href}
            isText={false}
            btnColor={feature.btnColor}
            handleOpenModal={handleOpenModal}
          />
        ))}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ActionCard
            subtitle={t("action_watch_text")}
            buttonLabel={t("action_watch_btn")}
            variant="primary"
            herf="https://www.youtube.com/channel/UClsVfBgG270wJ13WdT-3osw"
          />
          <ActionCard
            subtitle={t("action_operator_text")}
            buttonLabel={t("action_operator_btn")}
            variant="secondary"
            herf="/operator"
          />
        </div>

        <AppAlert />
      </div>

      {/* ============  modal box========= */}
      <Modal2
        open={isOpen}
        setIsOpen={(v) => dispatch(toggleIsOpen(v))}
        mainStyle="!p-0"
        className="sm:max-w-xl"
      >
        <AuthModalController title={t1("sign_as_user")} />
      </Modal2>
    </div>
  );
}

const ActionCard = ({
  subtitle,
  buttonLabel,
  variant = "primary",
  herf,
}: {
  subtitle: string;
  buttonLabel: string;
  variant?: "primary" | "secondary";
  herf: string;
}) => (
  <div
    className={`flex items-center flex-wrap justify-between p-8 rounded-3xl  ${
      variant === "primary"
        ? "bg-rose-50/50 border-rose-100"
        : "bg-blue-50/50 border-blue-100"
    }`}
  >
    <div>
      <h4 className="font-serif text-xl font-medium text-gray-800 leading-snug max-w-xs">
        {subtitle}
      </h4>
    </div>
    {variant === "primary" ? (
      <a href={herf} target="_blank">
        <button
          className={`flex cursor-pointer mt-4 lg:mt-0 items-center px-6 py-3 rounded-full font-sans text-sm font-semibold transition-all duration-300  bg-rose-500/85 text-white  shadow-rose-200`}
        >
          <span className="mx-2">{buttonLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </a>
    ) : (
      <Link href={herf}>
        <button
          className={`flex cursor-pointer mt-4 lg:mt-0 items-center px-6 py-3 rounded-full font-sans text-sm font-semibold transition-all duration-300 bg-white text-blue-600 border border-blue-100`}
        >
          <span className="mx-2">{buttonLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </Link>
    )}
  </div>
);
