"use client";
import React, { useState } from "react";
import { Button, Skeleton } from "@/components/ui";
import { useGetCouponQuery } from "@/redux/api/admin/couponApi";
import { Repeat } from "@/components/reuseable/repeat";
import { copunType } from "@/lib";
import sonner from "@/components/reuseable/sonner";
import { Carousel, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

export default function CouponBox() {
  const [page, setIsPage] = useState(1);
  const { data: coupon, isLoading } = useGetCouponQuery({
    per_page: 4,
    page: page,
  });

  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    // ✅ Embla API is properly typed now
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleCopy = async (value: any) => {
    await navigator.clipboard.writeText(value);
    sonner.success("Copied!", "Coupon code copied", "bottom-right");
  };

  // Handle pagination when a user clicks a page number
  const handlePageChange = (newPage: number) => {
    setIsPage(newPage);
  };

  return (
    <div>
      <Carousel
        setApi={setApi}
        className="rounded-xl overflow-hidden"
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
          }),
          Fade(),
        ]}
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {isLoading ? (
            <Repeat count={4}>
              <Skeleton className="w-full h-46 bg-[#e9e5e5c1]" />
            </Repeat>
          ) : (
            coupon?.data?.map((item: any, idx: any) => (
              <div
                key={idx}
                className="flex rounded-2xl  overflow-hidden coupons-shadow  bg-white"
              >
                <div className="w-24 bg-[#5D37C5] flex items-center justify-center relative">
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-figma-gray! rounded-full shadow-lg" />
                  <span className="text-white text-xl font-bold lg:text-2xl  transform -rotate-90 whitespace-nowrap">
                    Discount
                  </span>
                </div>

                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-gray-500 text-base lg:text-lg font-semibold">
                      {item.coupon_type == copunType.flat
                        ? `Flat ${item.price} off`
                        : `${item.price}% off`}
                    </h4>
                    <h2 className="text-xl lg:text-[28px] font-bold text-figma-black">
                      {item.coupon_code}
                    </h2>
                    <h4 className="text-article mt-1">
                      Expiry: {item.expiry_date}
                    </h4>
                  </div>

                  <Button
                    onClick={() => handleCopy(item.coupon_code)}
                    className={`w-fit text-lg text-black font-normal mt-5 md:h-12 px-5 lg:px-10 rounded-full bg-transparent border `}
                  >
                    Copy Code
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Carousel>

      {coupon?.meta?.total > coupon?.meta?.per_page && (
        <div className="flex justify-center gap-2 mt-4">
          <div className="flex gap-2">
            {Array.from(
              {
                length: Math.ceil(coupon?.meta?.total / coupon?.meta?.per_page),
              },
              (_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                    page === index + 1 ? "w-6 bg-primary" : "w-2 bg-gray-300"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
