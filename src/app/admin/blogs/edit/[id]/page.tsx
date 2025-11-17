"use client";
import { BackBtn } from "@/components/reuseable/back-btn";
import { FromInput2 } from "@/components/reuseable/form-input2";
import Form from "@/components/reuseable/from";
import { ImgBox } from "@/components/reuseable/Img-box";
import ImgUpload from "@/components/reuseable/img-upload";
import NavTitle from "@/components/reuseable/nav-title";
import TextEditor from "@/components/reuseable/text-editor";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { blog_st } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const intImg = {
  file: null,
  preview:
    "https://fastly.picsum.photos/id/1070/900/600.jpg?hmac=GDne9IdC0W1PNcmlRX9M2idWCT_sFmCNRl_QVdDJOZQ",
};

export default function BlogStore() {
  const [img, setIsImg] = useState<any>(intImg);
  const from = useForm({
    resolver: zodResolver(blog_st),
    defaultValues: {
      title: "Blog title goes here",
      description: "Blog description goes here",
      image: null,
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
    //  const value = {
    //   name: values.name,
    //   ...(img?.file && { image: img?.file }),
    // };
  };
  return (
    <div>
      <NavTitle
        title="Blogs"
        subTitle="Manage all of your blogs from this section"
      />
      <Form from={from} onSubmit={handleSubmit} className="space-y-7 py-5">
        <ul className="flex-between">
          <li>
            <BackBtn className="bg-figma-sidebar" iconStyle="text-primary" />
          </li>
          <li className="flex items-center space-x-3">
            <Button size="lg">Save Changes</Button>
          </li>
        </ul>
        <div>
          <div className="space-y-10">
            <div className="w-1/2">
              <ImgUpload
                className="lg:w-full"
                onFileSelect={(file: File) => {
                  setIsImg({
                    ...img,
                    preview: URL.createObjectURL(file),
                  });
                  from.setValue("image", file as any);
                }}
              >
                <div
                  className="border border-dashed p-2  rounded-md 
                  h-[260px] flex flex-col items-center justify-center 
                  transition"
                >
                  {img.preview ? (
                    <ImgBox
                      src={img.preview}
                      alt="img"
                      className="w-full h-full object-cover rounded-md"
                    >
                      <div className="size-10 grid place-items-center absolute rounded-md bg-white/20 backdrop-blur-[20px] right-4 top-4">
                        <FavIcon name="upload22" />
                      </div>
                    </ImgBox>
                  ) : (
                    <div className="text-center">
                      <p className="text-blacks mb-2 text-sm">
                        Upload Blog Banner
                      </p>
                      <p className="text-gray-400 font-medium mb-4 text-xs">
                        Or
                      </p>

                      <Button variant="primary" type="button">
                        Browse files
                      </Button>
                    </div>
                  )}
                </div>
              </ImgUpload>
              {from.watch("image") === null &&
                from?.formState?.errors?.image && (
                  <p className="text-reds flex mt-2 text-red-400 justify-end  items-center gap-1 text-sm">
                    {from?.formState?.errors?.image?.message as string}
                    <CircleAlert size={14} />
                  </p>
                )}
            </div>

            <FromInput2
              label="Title"
              name="title"
              placeholder="Enter your title"
              className="h-10 rounded-xl"
            />
            <div className="border rounded-xl p-3">
              <TextEditor
                value={from.watch("description")}
                onChange={(v) => from.setValue("description", v)}
                className="bg-body min-h-[400px]!"
              />
              {from?.formState?.errors?.description && (
                <p className="text-reds flex mt-2 text-red-400 justify-end items-center gap-1 text-sm">
                  {from?.formState?.errors?.description?.message as string}
                  <CircleAlert size={14} />
                </p>
              )}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
