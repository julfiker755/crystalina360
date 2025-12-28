"use client";
import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Form from "@/components/reuseable/from";
import { PlaceholderImg } from "@/lib";
import ImgUpload from "@/components/reuseable/img-upload";
import { Upload } from "lucide-react";
import Image from "next/image";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { FromTextarea2 } from "@/components/reuseable/from-textarea2";
import { FromTagInput } from "@/components/reuseable/from-tag";
import { useGetProfileQuery } from "@/redux/api/authApi";

const intAva = {
  file: null,
  preview: "",
};

export default function ProfileEdit2() {
  const [avatar, setAvatar] = React.useState<any>(intAva);
  const { data: profile } = useGetProfileQuery({});
  const { img, name, email, bio, skills } = profile?.data?.user || {};

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      description: "",
      tag: [],
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      ...values,
      ...(avatar?.file && { image: avatar?.file }),
    };
    console.log(value);
    // toast.success("Update Successful", {
    //   description: "Your profile has been updated successfully",
    // });
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
            src={avatar.preview || PlaceholderImg() || "/blur.png"}
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
          />
          <FromTextarea2
            name="description"
            label="Description"
            placeholder="Enter your description"
            className="overflow-hidden resize-none"
          />
          <FromTagInput label="Your Skills" name="tag" />
        </div>

        <Button className="w-full">Save Changes</Button>
      </Form>
    </div>
  );
}
