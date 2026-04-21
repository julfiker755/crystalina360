"use client";
import { BackBtn } from "@/components/reuseable/back-btn";
import { FromInput2 } from "@/components/reuseable/form-input2";
import Form from "@/components/reuseable/from";
import { ImgBox } from "@/components/reuseable/Img-box";
import ImgUpload from "@/components/reuseable/img-upload";
import NavTitle from "@/components/reuseable/nav-title";
import TextEditor from "@/components/reuseable/text-editor";
import {
  useSlgBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/api/admin/blogApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { blogUp_st } from "@/schema";
import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { useParams } from "next/navigation";
import { helpers } from "@/lib";
import sonner from "@/components/reuseable/sonner";

const intImg = {
  file: null,
  preview: "",
};

export default function BlogStore() {
  const { id } = useParams();
  const [img, setIsImg] = useState<any>(intImg);
  const [updateBlog, { isLoading: updateLoading }] = useUpdateBlogMutation();
  const { data: blog } = useSlgBlogQuery(id);
  const { img: image, description, title } = blog?.data || {};
  const from = useForm({
    resolver: zodResolver(blogUp_st),
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });

  useEffect(() => {
    if (blog) {
      from.reset({
        title: title,
        description: description,
      });
    }
  }, [blog]);

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      title: values.title,
      description: values.description,
      ...(values?.image && { img: values?.image }),
    };
    try {
      const data = helpers.fromData(value);
      const res = await updateBlog({ id, data }).unwrap();
      if (res.status) {
        sonner.success(
          "Blog updated",
          "Blog has been updated successfully",
          "bottom-right",
        );
      }
    } catch (err: any) {
      console.log(err);
    }
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
            <Button disabled={updateLoading} size="lg">
              Save Changes
            </Button>
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
                    file: file,
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
                  <ImgBox
                    src={img.preview || image || "/not.png"}
                    alt="img"
                    className="w-full h-full object-cover rounded-md"
                  >
                    <div className="size-10 grid place-items-center absolute rounded-md bg-white/20 backdrop-blur-[20px] right-4 top-4">
                      <FavIcon name="upload22" />
                    </div>
                  </ImgBox>
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
