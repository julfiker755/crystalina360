"use client";
import React, { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Form from "@/components/reuseable/from";
import { helpers } from "@/lib";
import ImgUpload from "@/components/reuseable/img-upload";
import { Upload } from "lucide-react";
import Image from "next/image";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { FromTextarea2 } from "@/components/reuseable/from-textarea2";
import { FromTagInput } from "@/components/reuseable/from-tag";
import {
  useAddCompanyMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/authApi";
import sonner from "@/components/reuseable/sonner";
import {
  genderOptions,
} from "@/components/dummy-data";
import { BackBtn } from "@/components/reuseable/back-btn";
import { Switch } from "@/components/ui/switch";
import { FormProfileDropdown } from "@/components/reuseable/from-select@1/profile-input";
import { LocationDroupDownOprator } from "@/components/view/oparator/reuse/location-oprator";
import { useTranslations } from "next-intl";

const intAva = {
  file: null,
  preview: "",
};

export default function ProfileEdit2() {
  const t = useTranslations("oprator.profile.edit_profile");
  const [avatar, setAvatar] = React.useState<any>(intAva);
  const { data: profile } = useGetProfileQuery({});
  const [addCompany] = useAddCompanyMutation();
  const {
    img,
    name,
    email,
    bio,
    skills,
    residence_city,
    residence_province,
    residence_region,
    residence_country,
    marketing_consent,
    gender,
    sdi_code,
    code_fiscal,
    province_code,
    vat_number,
    company,
  } = profile?.data?.user || {};
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const form = useForm({
    defaultValues: {
      img: null,
      name: "",
      email: "",
      bio: "",
      skills: [],
      gender: "",
      residence_city: "Italy",
      residence_province: "",
      residence_region: "",
      residence_country: "",
      marketing_consent: null,
      sdi_code: "",
      code_fiscal: "",
      province_code: "",
      vat_number: "",
      company_name: "",
      company_address: "",
      company_postal_code: "",
      company_city: "",
      company_province_code: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        name: name || "",
        email: email || "",
        bio: bio || "",
        skills: skills || "",
        residence_city: residence_city || "Italy",
        residence_province: residence_province || "",
        residence_region: residence_region || "",
        residence_country: residence_country || "",
        marketing_consent: marketing_consent || "",
        gender: gender || "",
        sdi_code: sdi_code || "",
        code_fiscal: code_fiscal || "",
        province_code: province_code || "",
        vat_number: vat_number || "",
        company_name: company?.company_name || "",
        company_address: company?.company_address || "",
        company_postal_code: company?.company_postal_code || "",
        company_city: company?.company_city || "",
        company_province_code: company?.company_province_code || "",
      });
    }
  }, [profile]);

  const handleSubmit = async (values: FieldValues) => {
    const {
      company_name,
      company_address,
      company_postal_code,
      company_city,
      company_province_code,
      ...rest
    } = values;

    const data = helpers.fromData({
      ...rest,
      ...(avatar?.file && { img: avatar?.file }),
    });

    const companydata = helpers.fromData({
      company_name,
      company_address,
      company_postal_code,
      company_city,
      company_province_code,
    });


    try {
      const res = await updateProfile(data).unwrap();
      if (res.status) {
        form.reset();
        await addCompany(companydata).unwrap();
        sonner.success(
          t("succcess_title"),
          t("success_text"),
          "bottom-right",
        );
      }
    } catch (err: any) {
      sonner.error(
        "Update profile error",
        err?.data?.error || "Update profile error",
        "bottom-right",
      );
    }
  };

  return (
    <Form from={form} onSubmit={handleSubmit}>
      <div className="my-5">
        <ul className="flex items-center justify-between">
          <li className="flex items-center space-x-1">
            <BackBtn
              iconStyle="w-5"
              className="bg-figma-delete size-10 2xl:size-10 rounded-md"
            />
            <h2 className="font-bold text-2xl text-center">{t("title")}</h2>
          </li>
          <li>
            {" "}
            <Button disabled={isUpdating} className="w-fit">
              {t("save_changes")}
            </Button>
          </li>
        </ul>
      </div>
      <div className="space-y-4">
        <div className="relative mx-auto size-28 rounded-md">
          <Image
            src={avatar.preview || img || "/blur.png"}
            alt={"title"}
            fill
            className={"object-cover rounded-full"}
          />
          <ImgUpload
            className="grid place-items-center shadow-md  rounded-full absolute bottom-2 -right-1 cursor-pointer"
            onFileSelect={(file: File) => {
              setAvatar({
                ...avatar,
                file,
                preview: URL.createObjectURL(file),
              });
            }}
          >
            <div className="size-7 grid place-items-center bg-primary text-white  rounded-full">
              <Upload className="size-4" />
            </div>
          </ImgUpload>
        </div>
        <div className="space-y-5 mt-6">
          <div className="lg:grid lg:grid-cols-2 gap-6 space-y-6 lg:space-y-0">
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
              readOnly={true}
            />
            <LocationDroupDownOprator />
            <FormProfileDropdown
              label={t("gender")}
              name="gender"
              options={genderOptions}
            />
            <FromInput2
              className="h-10"
              name="sdi_code"
              label={t("sdi_code")}
              placeholder={t("sdi_code_placeholder")}
            />
            <FromInput2
              className="h-10"
              name="code_fiscal"
              label={t("code_fiscal")}
              placeholder={t("code_fiscal_placeholder")}
            />
            <FromInput2
              className="h-10"
              name="province_code"
              label={t("province_code")}
              placeholder={t("province_code_placeholder")}
            />
            <FromInput2
              className="h-10"
              name="vat_number"
              label={t("vat_number")}
              placeholder={t("vat_number_placeholder")}
            />
            {form?.watch("vat_number")?.length > 3 && (
              <>
                <FromInput2
                  className="h-10"
                  name="company_name"
                  label={t("company_name")}
                  placeholder={t("company_name_placeholder")}
                />
                <FromInput2
                  className="h-10"
                  name="company_address"
                  label={t("company_address")}
                  placeholder={t("company_address_placeholder")}
                />
                <FromInput2
                  className="h-10"
                  name="company_postal_code"
                  label={t("company_postal_code")}
                  placeholder={t("company_postal_code_placeholder")}
                />
                <FromInput2
                  className="h-10"
                  name="company_city"
                  label={t("company_city")}
                  placeholder={t("company_city_placeholder")}
                />
                <FromInput2
                  className="h-10"
                  name="company_province_code"
                  label={t("company_province_code")}
                  placeholder={t("company_province_code_placeholder")}
                />
              </>
            )}
            <div className="lg:col-span-2">
              <FromTextarea2
                name="bio"
                label={t("description")}
                placeholder={t("description_placeholder")}
                className="field-sizing-content min-h-[100px]"
              />
            </div>
            <div className="lg:col-span-2">
              <FromTagInput label={t("skills")} name="skills" />
            </div>
            <div className="bg-gray-50/50 col-span-2 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="marketing"
                    className="font-bold text-figma-black"
                  >
                    {t("marketing_consent")}
                  </label>
                  <p className="text-sm text-gray-500">
                    {t("marketing_consent_text")}
                  </p>
                </div>
                <Switch
                  id="airplane-mode"
                  checked={form.watch("marketing_consent") as any}
                  onCheckedChange={(v: any) => {
                    form.setValue("marketing_consent", v);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
