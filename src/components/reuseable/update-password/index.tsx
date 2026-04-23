import Form from "@/components/reuseable/from";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { FromInput } from "../form-input";
import { change_Pass } from "@/schema";
import { cn, helpers, roleKey } from "@/lib";
import { useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { FromInput2 } from "../form-input2";
import { useUpdatePassMutation } from "@/redux/api/authApi";
import React from "react";
import { ErrorText } from "../error";
import sonner from "../sonner";
import { useTranslations } from "next-intl";

export default function UpdatePassword({
  btnStyle,
  btnStyle2,
  className,
  inputStyle,
}: any) {
  const t = useTranslations("user.auth.change_password");
  const { user } = useAppSelector((state: AppState) => state.auth);
  const [updatePass, { isLoading }] = useUpdatePassMutation();
  const [error, setError] = React.useState("");
  const from2 = useForm({
    resolver: zodResolver(change_Pass),
    defaultValues: {
      current_password: "",
      new_password: "",
      c_password: "",
    },
  });

  const handlePasswordSubmit = async (values: FieldValues) => {
    setError("");
    try {
      const data = helpers.fromData({
        current_password: values.current_password,
        password: values.new_password,
        password_confirmation: values.c_password,
      });
      const res = await updatePass(data).unwrap();
      if (res.status) {
        sonner.success(
          t("password_updated"),
          t("password_updated_description"),
        );
        from2.reset();
      }
    } catch (err: any) {
      setError(err?.data?.message);
    }
  };
  return (
    <Form from={from2} onSubmit={handlePasswordSubmit}>
      <div className={cn("space-y-6", className)}>
        {user.role === roleKey.user ? (
          <>
            <FromInput
              label={t("current_password")}
              name="current_password"
              placeholder={t("enter_current_password")}
              className="h-10"
              icon={
                <FavIcon name="password" className="size-5" color="#777777" />
              }
              eye={true}
            />
            <FromInput
              label={t("new_password")}
              name="new_password"
              placeholder={t("enter_new_password")}
              className="h-10"
              icon={
                <FavIcon name="password" className="size-5" color="#777777" />
              }
              eye={true}
            />
            <FromInput
              label={t("retype_new_password")}
              name="c_password"
              placeholder={t("enter_retype_new_password")}
              className="h-10"
              icon={
                <FavIcon name="password" className="size-5" color="#777777" />
              }
              eye={true}
            />
          </>
        ) : (
          <>
            <FromInput2
              label={t("current_password")}
              name="current_password"
              placeholder={t("enter_current_password")}
              className={cn("h-10", inputStyle)}
              eye={true}
            />
            <FromInput2
              label={t("new_password")}
              name="new_password"
              placeholder={t("enter_new_password")}
              className={cn("h-10", inputStyle)}
              eye={true}
            />
            <FromInput2
              label={t("retype_new_password")}
              name="c_password"
              placeholder={t("enter_retype_new_password")}
              className={cn("h-10", inputStyle)}
              eye={true}
            />
          </>
        )}

        <div className={btnStyle2}>
          <ErrorText error={error} className="mb-3" />
          <Button disabled={isLoading} className={cn("w-full", btnStyle)}>
            {t("save_changes")}
          </Button>
        </div>
      </div>
    </Form>
  );
}
