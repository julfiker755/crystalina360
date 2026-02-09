"use client";
import React, { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { FromInput } from "@/components/reuseable/form-input";
import { Button } from "@/components/ui/button";
import Form from "@/components/reuseable/from";
import ImgUpload from "@/components/reuseable/img-upload";
import { Upload } from "lucide-react";
import Image from "next/image";
import { childrenProps } from "@/types";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/authApi";
import sonner from "@/components/reuseable/sonner";
import { helpers } from "@/lib";
import { FormSelDropdown } from "@/components/reuseable/from-select@1";
import {
  cityOptions,
  countryOptions,
  genderOptions,
  provinceOptions,
  regionOptions,
} from "@/components/dummy-data";
import { Checkbox, Label } from "@/components/ui";

const intAva = {
  file: null,
  preview: "",
};

export default function ProfileEdit({ children }: childrenProps) {
  const [avatar, setAvatar] = React.useState<any>(intAva);
  const { data: profile } = useGetProfileQuery({});
  const {
    img,
    name,
    email,
    gender,
    residence_city,
    residence_province,
    residence_region,
    residence_country,
    marketing_consent,
  } = profile?.data?.user || {};
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      gender: "",
      residence_city: "",
      residence_province: "",
      residence_region: "",
      residence_country: "",
      marketing_consent: null,
    },
  });

  useEffect(() => {
    if (profile?.data?.user) {
      form.reset({
        name: name ?? "",
        email: email ?? "",
        gender: gender ?? "",
        residence_city: residence_city ?? "",
        residence_province: residence_province ?? "",
        residence_region: residence_region ?? "",
        residence_country: residence_country ?? "",
        marketing_consent: marketing_consent,
      });
    }
  }, [profile?.data?.user]);

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      ...(avatar?.file && { img: avatar?.file }),
      gender: values?.gender,
      residence_city: values?.residence_city,
      residence_province: values?.residence_province,
      residence_region: values?.residence_region,
      residence_country: values?.residence_country,
      marketing_consent: values?.marketing_consent,
    };

    try {
      const data = helpers.fromData(value);
      const res = await updateProfile(data).unwrap();
      if (res.status) {
        form.reset();
        sonner.success(
          "Update Successfull",
          "Your profile has been updated successfully",
        );
      }
    } catch (err: any) {
      console.log("Update profile error:", err);
    }
  };

  return (
    <div className="pb-5">
      <div className="my-5">
        <h2 className="font-bold text-center">Edit Profile</h2>
        <p className="text-center text-primary text-sm">
          Please fill in the correct information to update your account
        </p>
      </div>

      <Form className="space-y-4" from={form} onSubmit={handleSubmit}>
        <div className="relative mx-auto size-28 rounded-md">
          <Image
            src={avatar.preview || img || "/blur.png"}
            alt={"title"}
            fill
            className={"object-cover rounded-md"}
          />
          <ImgUpload
            className="grid place-items-center shadow-md  rounded-md absolute -bottom-1 -right-1 cursor-pointer"
            onFileSelect={(file: File) => {
              setAvatar({
                ...avatar,
                file,
                preview: URL.createObjectURL(file),
              });
            }}
          >
            <div className="size-7 grid place-items-center bg-primary text-white  rounded-sm">
              <Upload className="size-4" />
            </div>
          </ImgUpload>
        </div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <FromInput
              className="h-10"
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
            />
            <FromInput
              className="h-10"
              name="email"
              label="Full Name"
              placeholder="Enter your full email"
            />
            <div>
              <Label className="text-blacks text-base font-medium  mb-1">
                Country
              </Label>
              <FormSelDropdown
                label="select city"
                name="residence_country"
                options={countryOptions}
                className="bg-[#F4F4F4] border-none rounded-md"
              />
            </div>
            <div>
              <Label className="text-blacks text-base font-medium  mb-1">
                Region
              </Label>
              <FormSelDropdown
                label="select region"
                name="residence_region"
                options={regionOptions}
                className="bg-[#F4F4F4] border-none rounded-md"
              />
            </div>
            <div>
              <Label className="text-blacks text-base font-medium  mb-1">
                Province
              </Label>
              <FormSelDropdown
                label="select province"
                name="residence_province"
                options={provinceOptions}
                className="bg-[#F4F4F4] border-none rounded-md"
              />
            </div>
            <div>
              <Label className="text-blacks text-base font-medium  mb-1">
                City
              </Label>
              <FormSelDropdown
                label="select city"
                name="residence_city"
                options={cityOptions}
                className="bg-[#F4F4F4] border-none rounded-md"
              />
            </div>
            <div>
              <Label className="text-blacks text-base font-medium  mb-1">
                Gender
              </Label>
              <FormSelDropdown
                label="select gender"
                name="gender"
                options={genderOptions}
                className="bg-[#F4F4F4] border-none rounded-md"
              />
            </div>

            <div className="flex items-center gap-1 ml-1 mt-6">
              <Checkbox
                checked={form.watch("marketing_consent") as any}
                onCheckedChange={(v: any) => {
                  form.setValue("marketing_consent", v);
                }}
              />
              <h5>Marketing Consent</h5>
            </div>
          </div>
          {children}
        </div>

        <Button disabled={isUpdating} className="w-full">
          Save Changes
        </Button>
      </Form>
    </div>
  );
}
