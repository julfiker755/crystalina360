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
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/authApi";
import sonner from "@/components/reuseable/sonner";
import { FormSelDropdown } from "@/components/reuseable/from-select@1";
import {
  cityOptions,
  countryOptions,
  genderOptions,
  provinceOptions,
  regionOptions,
} from "@/components/dummy-data";
import { Checkbox } from "@/components/ui";

const intAva = {
  file: null,
  preview: "",
};

export default function ProfileEdit2() {
  const [avatar, setAvatar] = React.useState<any>(intAva);
  const { data: profile } = useGetProfileQuery({});
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
    gender
  } = profile?.data?.user || {};
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      description: "",
      tag: [],
      gender: "",
      residence_city: "",
      residence_province: "",
      residence_region: "",
      residence_country: "",
      marketing_consent: null,
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        name: name,
        email: email,
        description: bio,
        tag: skills,
        residence_city: residence_city,
        residence_province: residence_province,
        residence_region: residence_region,
        residence_country: residence_country,
        marketing_consent: marketing_consent,
        gender: gender
      });
    }
  }, [profile]);

  const handleSubmit = async (values: FieldValues) => {
    const data = helpers.fromData({
      name: values.name,
      bio: values.description,
      skills: values.tag,
      ...(avatar?.file && { img: avatar?.file }),
      gender: values?.gender,
      residence_city: values?.residence_city,
      residence_province: values?.residence_province,
      residence_region: values?.residence_region,
      residence_country: values?.residence_country,
      marketing_consent: values?.marketing_consent,
    });
    const res = await updateProfile(data).unwrap();
    if (res.status) {
      form.reset();
      sonner.success(
        "Update Successful",
        "Your profile has been updated successfully",
      );
    }
    try {
    } catch (err: any) {
      console.log("Update profile error:", err);
    }
  };

  return (
    <div>
      <div className="my-5">
        <h2 className="font-bold text-2xl text-center">Edit Profile</h2>
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
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <FromInput2
              className="h-10"
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
            />
            <FromInput2
              className="h-10"
              name="email"
              label="Email"
              placeholder="Enter your email"
              readOnly={true}
            />
          </div>
          <FromTextarea2
            name="description"
            label="Description"
            placeholder="Enter your description"
            className="field-sizing-content min-h-[100px]"
          />
          <FromTagInput label="Your Skills" name="tag" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <FormSelDropdown
              label="-Country-"
              name="residence_country"
              options={countryOptions}
            />
            <FormSelDropdown
              label="-Region-"
              name="residence_region"
              options={regionOptions}
            />
            <FormSelDropdown
              label="-Province-"
              name="residence_province"
              options={provinceOptions}
            />

            <FormSelDropdown
              label="-City-"
              name="residence_city"
              options={cityOptions}
            />
            <FormSelDropdown
              label="-gender-"
              name="gender"
              options={genderOptions}
            />
            <div className="flex items-center gap-1 ml-1">
              <Checkbox
                checked={form.watch("marketing_consent") as any}
                onCheckedChange={(v: any) => {
                  form.setValue("marketing_consent", v);
                }}
              />
              <h5>Marketing Consent</h5>
            </div>
          </div>
        </div>

        <Button disabled={isUpdating} className="w-full">
          Save Changes
        </Button>
      </Form>
    </div>
  );
}
