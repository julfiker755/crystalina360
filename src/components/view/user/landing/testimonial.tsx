"use client";
import { RatingScore } from "@/components/reuseable/rating";
import { useGetTestimonialsQuery } from "@/redux/api/user/testimonialsApi";
import { Skeleton } from "@/components/ui";
import { ImgBox } from "@/components/reuseable/Img-box";
import { Repeat } from "@/components/reuseable/repeat";
import { useTranslations } from "next-intl";

export default function Testimonial() {
  const t = useTranslations("user.home.testimonial");
  const { data: items, isLoading } = useGetTestimonialsQuery({});

  if (items?.data?.length === 0) {
    return null;
  }

  return (
    <div className="pt-16 container">
      <h1 className="mb-10">{t("title")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <Repeat count={8}>
            <div className="flex flex-col items-center text-center p-6  rounded-lg">
              <Skeleton className="size-20 rounded-full" />
              <Skeleton className="w-full h-4 mt-3" />
              <Skeleton className="w-full h-4 mt-3" />
              <Skeleton className="w-full h-4 mt-3" />
            </div>
          </Repeat>
        ) : (
          items?.data?.map((testimonial: any) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))
        )}
      </div>
    </div>
  );
}

function TestimonialCard({ id, name, img, average_rating, comment }: any) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-[#FBFBFB] rounded-lg">
      <ImgBox src={img} className="size-20 rounded-full" alt="img" />
      <h3 className="font-semibold text-figma-black text-lg mb-2 mt-3">
        {name}
      </h3>
      <div className="mb-3">
        <RatingScore key={id} value={average_rating || 0} />
      </div>
      <p className="text-sm text-gray-600 line-clamp-3 px-8">
        {comment || "N/A"}
      </p>
    </div>
  );
}
