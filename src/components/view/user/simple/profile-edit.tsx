"use client";
import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { FromInput } from "@/components/reuseable/form-input";
import { Button } from "@/components/ui/button";
import Form from "@/components/reuseable/from";
import { PlaceholderImg } from "@/lib";
import ImgUpload from "@/components/reuseable/img-upload";
import { Upload } from "lucide-react";
import FavIcon from "@/icon/favIcon";
import Image from "next/image";
import { childrenProps } from "@/types";

const intAva = {
  file: null,
  preview: "",
};

export default function ProfileEdit({ children }: childrenProps) {
  const [avatar, setAvatar] = React.useState<any>(intAva);

  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      ...(avatar?.file && { image: avatar?.file }),
    };
    console.log(value);
    // toast.success("Update Successful", {
    //   description: "Your profile has been updated successfully",
    // });
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
            src={avatar.preview || PlaceholderImg() || "/blur.png"}
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
          <FromInput
            className="h-10"
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            icon={<FavIcon name="user" className="size-4" color="#777777" />}
          />
          {children}
        </div>

        <Button className="w-full">Save Changes</Button>
      </Form>
    </div>
  );
}
