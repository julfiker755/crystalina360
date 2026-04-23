"use client";
import { FromInput } from "@/components/reuseable/form-input";
import Form from "@/components/reuseable/from";
import { FromTextArea } from "@/components/reuseable/from-textarea";
import { Button } from "@/components/ui";
import { useSendContactMutation } from "@/redux/api/user/contactApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import sonner from "@/components/reuseable/sonner";
import FavIcon from "@/icon/favIcon";
import { cn, helpers } from "@/lib";
import { contact_us } from "@/schema";
import { useTranslations } from "next-intl";

interface ContactUsProps {
  title?: string;
  className?: string;
}

export default function ContactUs({
  title,
  className,
}: ContactUsProps) {
  const t = useTranslations("user.contact_us");
  const from = useForm({
    resolver: zodResolver(contact_us),
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
  });

  const [sendContact, { isLoading }] = useSendContactMutation();

  const handleSubmit = async (values: FieldValues) => {
    try {
      const data = helpers.fromData({
        name: values.name,
        email: values.email,
        msg: values.description,
      });
      const res = await sendContact(data).unwrap();
      if (res.status) {
        from.reset();
        sonner.success("Success!", "Message sent successfully", "bottom-right");
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <div id="contact-us" className={cn("pt-16 container", className)}>
      <h1 className="mb-10">{title || t("title")}</h1>
      <div className="bg-figma-gray rounded-md p-3 md:p-15">
        <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
          <FromInput
            className="h-10"
            name="name"
            label={t("name_label")}
            placeholder={t("name_placeholder")}
            icon={<FavIcon name="user" className="size-4" color="#777777" />}
          />
          <FromInput
            className="h-10"
            name="email"
            label={t("email_label")}
            placeholder={t("email_placeholder")}
            icon={<FavIcon name="mail" className="size-4" color="#777777" />}
          />
          <FromTextArea
            label={t("description_label")}
            name="description"
            placeholder={t("description_placeholder")}
            className="min-h-44 rounded-3xl"
          />

          <Button disabled={isLoading} className="w-full">
            {isLoading ? t("btn_sending") : t("btn_send")}
          </Button>
        </Form>
      </div>
    </div>
  );
}
