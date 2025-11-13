"use client";
import { FromInput2 } from "@/components/reuseable/form-input2";
import Form from "@/components/reuseable/from";
import ImgUpload from "@/components/reuseable/img-upload";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { PlaceholderImg } from "@/lib";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import profile from "@/assets/admin/profile.png";

const intAva = {
  file: null,
  preview: null,
};

export default function Settings() {
  const [avatar, setAvatar] = useState<any>(intAva);

  const profilefrom = useForm({
    // resolver: zodResolver(podcastSchema),
    defaultValues: {
      name: "julfiker",
      email: "julfiker@gmail.com",
    },
  });
  const handleProfileSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      ...(avatar?.file && { image: avatar?.file }),
    };
    // toast.success("Profile Updated", {
    //   description: "Your profile has been successfully updated",
    //   position: "bottom-right",
    // });
    console.log(value);
  };
  return (
    <Form
      from={profilefrom}
      className="space-y-6 pt-5 pb-8"
      onSubmit={handleProfileSubmit}
    >
      <div className="relative mx-auto size-28 rounded-full">
        <Image
          src={avatar?.preview || PlaceholderImg() || "/blur.png"}
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
          <img className="size-10" src={profile.src} />
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
        <Button size="lg" className="rounded-2xl">
          Save Changes
        </Button>
      </div>
    </Form>
  );
}
