"use client";
import { BackBtn2 } from "@/components/reuseable/back-btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import { AppAlert } from "@/components/view/user/reuse";
import { useSlgBlogQuery } from "@/redux/api/admin/blogApi";
import { QuillText } from "@/components/reuseable/text-editor";
import { useParams } from "next/navigation";
import { helpers, parsedId } from "@/lib";
import { useTranslations } from "next-intl";

export default function SingleBlog() {
  const t = useTranslations("user.details");
  const { id: slug } = useParams();
  const id = parsedId(slug)
  const { data: blog } = useSlgBlogQuery(id);
  const { img, description, title, created_at } = blog?.data || {};

  return (
    <div className="container pt-5">
      <BackBtn2 label={t("back")} className="mb-2" />
      <ImgBox
        src={img || "/not.png"}
        className="w-full h-80 max-w-5xl 2xl:h-[450px] md:mt-10 md:mb-5 mx-auto  rounded-lg bg-muted overflow-hidden"
        alt={title?.toString() || "img"}
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
