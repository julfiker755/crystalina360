"use client";
import { FromInput2 } from "@/components/reuseable/form-input2";
import Form from "@/components/reuseable/from";
import ImgUpload from "@/components/reuseable/img-upload";
import { FieldValues, useForm } from "react-hook-form";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/authApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import profileImg from "@/assets/admin/profile.png";
import { helpers } from "@/lib";
import sonner from "@/components/reuseable/sonner";

const intAva = {
  file: null,
  preview: null,
};

export default function Settings() {
  const [avatar, setAvatar] = useState<any>(intAva);
  const { data: profile } = useGetProfileQuery({});
  const { img, name, email } = profile?.data?.user || {};
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const profilefrom = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (profile) {
      profilefrom.reset({
        name: name,
        email: email,
      });
    }
  }, [profile]);

  const handleProfileSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      ...(avatar?.file && { img: avatar?.file }),
    };
    try {
      const data = helpers.fromData(value);
      const res = await updateProfile(data).unwrap();
      if (res.status) {
        profilefrom.reset();
        sonner.success(
          "Update Successfull",
          "Your profile has been updated successfully",
          "bottom-right"
        );
      }
    } catch (err: any) {
      console.log("Update profile error:", err);
    }
  };

  return (
    <Form
      from={profilefrom}
      className="space-y-6 pt-5 pb-8"
      onSubmit={handleProfileSubmit}
    >
      <div className="relative mx-auto size-28 rounded-full">
        <Image
          src={avatar?.preview || img || "/blur.png"}
          alt={"title"}
          fill
          className={"object-cover rounded-full"}
        />
        <ImgUpload
          className="grid place-items-center shadow-md  rounded-full absolute bottom-0 -right-2 cursor-pointer"
          onFileSelect={(file: File) => {
            setAvatar({
              ...avatar,
              file,
              preview: URL.createObjectURL(file),
            });
          }}
        >
          <img className="size-10" src={profileImg?.src} />
        </ImgUpload>
      </div>

      <FromInput2 name="name" label="Name" className="h-11 rounded-xl" />
      <FromInput2
        name="email"
        label="Email"
        className="h-11 rounded-xl"
        readOnly
      />
      <div className="flex justify-end">
        <Button disabled={isUpdating} size="lg" className="rounded-2xl">
          Save Changes
        </Button>
      </div>
    </Form>
  );
}
