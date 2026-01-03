"use client";
import { BackBtn2 } from "@/components/reuseable/back-btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import { AppAlert } from "@/components/view/user/reuse";
import { useSlgBlogQuery } from "@/redux/api/admin/blogApi";
import { QuillText } from "@/components/reuseable/text-editor";
import { useParams } from "next/navigation";
import { helpers } from "@/lib";

export default function Blog() {
  const { id } = useParams();
  const { data: blog } = useSlgBlogQuery(id);
  const { img, description, title, created_at } = blog?.data || {};

  return (
    <div className="container pt-5">
      <BackBtn2 className="mb-2" />
      <ImgBox
        src={img || "/not.png"}
        className="h-60 lg:h-100 w-full  rounded-lg bg-muted overflow-hidden"
        alt={"img box fldjk"}
      />
      <div className="py-4 px-3">
        <span className="text-sm text-article pb-5">
          {helpers.formatDate(created_at)}
        </span>
        <div className="space-y-1">
          <h3 className="text-2xl py-1 font-semibold  text-foreground">
            {title}
          </h3>
          <QuillText className="mb-10" text={description} />
        </div>
      </div>
      <AppAlert className="mb-10" />
    </div>
  );
}
