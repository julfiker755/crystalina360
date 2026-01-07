"use client";
import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi, // ✅ Import CarouselApi type
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Button } from "@/components/ui";
import {
  useGetPromotionQuery,
  usePromotionCountMutation,
} from "@/redux/api/admin/promotionApi";

export default function CarouselHero() {
  // ✅ Strongly type the API
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const { data: advertise } = useGetPromotionQuery({});
  const [promotionCount] = usePromotionCountMutation();

  React.useEffect(() => {
    if (!api) return;

    // ✅ Embla API is properly typed now
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const images = advertise?.promo?.data || [];

  return (
    <div className="pt-16 container">
      <h1 className="mb-10">OLISTAMI Advertise</h1>

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
          <CarouselContent>
            {images?.map((item: any, index: any) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[350px] xl:h-[400px] rounded-xl overflow-hidden">
                  <Image
                    src={item.img || "/not.png"}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/20 z-0" />

                  {/* Text + Button Layer */}
                  <a
                    target="_blank"
                    href={item.promotion_link}
                    className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-end text-white"
                  >
                    <Button
                      onClick={async () => {
                        await promotionCount(item.id).unwrap();
                      }}
                      size="lg"
                    >
                      Open Link
                    </Button>
                  </a>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                current === index + 1 ? "w-6 bg-primary" : "w-2 bg-gray-300"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
