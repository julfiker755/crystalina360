import { ImgBox } from "@/components/reuseable/Img-box";
import { ArrowUpRight } from "lucide-react";
import { helpers } from "@/lib";

export default function BlogCard({ item }: any) {
  const { title, description, created_at, img } = item || {};
  return (
    <div className="overflow-hidden  transition-shadow bg-figma-gray rounded-b-lg">
      <ImgBox
        src={img || "/not.png"}
        className="h-55 w-full rounded-none rounded-t-lg bg-muted overflow-hidden"
        alt={title}
      />

      <div className="py-2 px-3">
        <span className="text-sm text-article pb-5">
          {helpers.formatDate(created_at)}
        </span>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold  text-foreground line-clamp-2">
            {title}
          </h3>
          <p
            className="h-[50px] overflow-hidden text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
        <h5 className="text-primary text-base mt-2 flex items-center font-medium">
          Read Blog <ArrowUpRight size={18} />
        </h5>
      </div>
    </div>
  );
}
