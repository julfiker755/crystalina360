"use client";
import AddOnCard from "../reuse/addon-card";
import { Repeat } from "@/components/reuseable/repeat";
import { useGetAddonQuery } from "@/redux/api/admin/addonApi";
import { Skeleton } from "@/components/ui";
import { useTranslations } from "next-intl";
import { AppState } from "@/redux/store";
import { Button } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal2 from "@/components/reuseable/modal2";
import AuthModalController from "@/components/view/common/auth-controller";
import { toggleIsOpen } from "@/redux/features/authSlice";

export default function AddOn() {
  const t = useTranslations("oprator.home");
  const dispatch = useAppDispatch();
  const { data: addon, isLoading } = useGetAddonQuery({});
  const { isOpen, user } = useAppSelector((state: AppState) => state.auth);

  return (
    <div id="add-ons" className="py-16 container px-10">
      <h1 className="mb-10">{t("add_on.title")}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {isLoading ? (
          <Repeat count={3}>
            <Skeleton className="w-full h-[400px]" />
          </Repeat>
        ) : (
          addon?.data
            ?.slice(0, 3)
            .map((item: any, index: any) => (
              <AddOnCard item={item} key={index} />
            ))
        )}
      </div>
      <div className="mt-8">
        <div className="text-center space-y-3 pt-5">
          <p>{t("navber.pricing_box.description")}</p>
          {user.email ? null : (
            <Button
              onClick={() => dispatch(toggleIsOpen())}
              size="lg"
              className="text-white rounded-full"
            >
              {" "}
              {t("navber.sign_as_operator")}
            </Button>
          )}
        </div>

        <Modal2
          open={isOpen}
          setIsOpen={(v) => dispatch(toggleIsOpen(v))}
          mainStyle="!p-0"
          className="sm:max-w-xl"
        >
          <AuthModalController title={t("navber.sign_up_as_operator")} />
        </Modal2>
      </div>
    </div>
  );
}
