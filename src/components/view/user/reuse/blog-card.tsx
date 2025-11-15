import { ImgBox } from "@/components/reuseable/Img-box";
import { PlaceholderImg } from "@/lib";
import { ArrowUpRight } from "lucide-react";

export default function BlogCard({ item }: any) {
  const { id, title, description, date } = item || {};
  return (
    <div className="overflow-hidden  transition-shadow bg-figma-gray rounded-b-lg">
      <ImgBox
        src={PlaceholderImg()}
        className="h-55 w-full rounded-none rounded-t-lg bg-muted overflow-hidden"
        alt={title}
      />

      <div className="py-2 px-3">
        <span className="text-sm text-article pb-5">{date}</span>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold  text-foreground">{title}</h3>
          <p className="text-muted-foreground line-clamp-2">{description}</p>
        </div>
        <h5 className="text-primary text-base mt-2 flex items-center font-medium">
          Read Blog <ArrowUpRight size={18} />
        </h5>
      </div>
    </div>
  );
}
