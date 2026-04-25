"use client";
import { FromInput } from "@/components/reuseable/form-input";
import Form from "@/components/reuseable/from";
import { Button } from "@/components/ui";
import { usePathname } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRegisterMutation } from "@/redux/api/authApi";
import {
  controlkey,
  setActiveModal,
  setOtpInfo,
} from "@/redux/features/authSlice";
import { helpers, routeName } from "@/lib";
import { sign_Up } from "@/schema";
import FavIcon from "@/icon/favIcon";
import { useState } from "react";
import sonner from "@/components/reuseable/sonner";
import { useTranslations } from "next-intl";

export default function SignUp() {
  const t = useTranslations("user.auth.sign_up");
  const pathname = usePathname();
  const dynamicRole = useAppSelector((state) => state.auth.signupRole);
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setIsError] = useState("");
  const dispatch = useAppDispatch();
  const from = useForm({
    resolver: zodResolver(sign_Up),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      c_password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    setIsError("");
    const { c_password, ...rest } = values;
    const data = {
      ...rest,
      password_confirmation: c_password,
      role: dynamicRole,
    };

    try {
      const value = helpers.fromData(data);
      const res = await register(value).unwrap();
      if (res.status) {
        sonner.success(
          t("alert_success.sign_up_successful"),
          t("alert_success.please_check_your_email_for_otp_verify"),
        );
        dispatch(setActiveModal(controlkey.emailVafi));
        dispatch(
          setOtpInfo({
            email: res?.data?.email,
            otp: "",
          }),
        );
        from.reset();
      }
    } catch (err: any) {
      setIsError(err?.data?.error);
    }
  };

  return (
    <div>
      <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
        {pathname?.includes(routeName) ? (
          // == oprator ==
          <div className="space-y-7">
            <FromInput2
              className="h-10"
              name="name"
              label={t("full_name")}
              placeholder={t("full_name_placeholder")}
            />
            <FromInput2
              className="h-10"
              name="email"
              label={t("email")}
              placeholder={t("email_placeholder")}
            />

            <FromInput2
              className="h-10"
              name="password"
              label={t("password")}
              placeholder={t("password_placeholder")}
              eye={true}
            />
            <FromInput2
              className="h-10"
              name="c_password"
              label={t("confirm_password")}
              placeholder={t("confirm_your_password")}
              eye={true}
            />
          </div>
        ) : (
          // == user ==
          <>
            <FromInput
              className="h-10"
              name="name"
              label={t("full_name")}
              placeholder={t("full_name_placeholder")}
              icon={<FavIcon name="user" className="size-4" color="#777777" />}
            />
            <FromInput
              className="h-10"
              name="email"
              label={t("email")}
              placeholder={t("email_placeholder")}
              icon={<FavIcon name="mail" className="size-4" color="#777777" />}
            />

            <FromInput
              className="h-10"
              name="password"
              label={t("password")}
              placeholder={t("password_placeholder")}
              eye={true}
              icon={
                <FavIcon name="password" className="size-5" color="#777777" />
              }
            />
            <FromInput
              className="h-10"
              name="c_password"
              label={t("confirm_password")}
              placeholder={t("confirm_your_password")}
              eye={true}
              icon={
                <FavIcon name="password" className="size-5" color="#777777" />
              }
            />
          </>
        )}

        <div>
          {error && (
            <h5 className="text-red-500 flex justify-center mb-3 text-sm">
              {error}
            </h5>
          )}
          <Button disabled={isLoading} className="w-full">
            {t("sign_up")}
          </Button>
        </div>
      </Form>
    </div>
  );
}
