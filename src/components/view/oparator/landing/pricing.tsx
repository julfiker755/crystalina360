"use client";
import { AppState } from "@/redux/store";
import PricingBox from "../simple/pricing-box";
import { Button } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal2 from "@/components/reuseable/modal2";
import AuthModalController from "@/components/view/common/auth-controller";
import { toggleIsOpen } from "@/redux/features/authSlice";
import { useTranslations } from "next-intl";

export default function Pricing() {
  const dispatch = useAppDispatch();
  const { isOpen, user } = useAppSelector((state: AppState) => state.auth);
  const t = useTranslations("oprator.home.navber");

  return (
    <div id="pricing" className="pt-20">
      <PricingBox />
      <div className="text-center space-y-3 pt-5">
        <p>
          {t("pricing_box.description")}

        </p>
        {user.email ? null : (
          <Button
            onClick={() => dispatch(toggleIsOpen())}
            size="lg"
            className="text-white rounded-full"
          >
            {" "}
            {t("sign_as_operator")}
          </Button>
        )}
      </div>

      <Modal2
        open={isOpen}
        setIsOpen={(v) => dispatch(toggleIsOpen(v))}
        mainStyle="!p-0"
        className="sm:max-w-xl"
      >
        <AuthModalController title={t("sign_up_as_operator")} />
      </Modal2>
    </div>
  );
}
