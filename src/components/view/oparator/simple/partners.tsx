"use client";
import img2 from "@/assets/marqu.png";
import { ImgBox } from "@/components/reuseable/Img-box";
import { Marquee } from "@/components/ui/marquee";

const partnersItem = [
  {
    id: 1,
    name: "partner 1",
    img: img2,
  },
  {
    id: 2,
    name: "partner 2",
    img: img2,
  },
  {
    id: 3,
    name: "partner 3",
    img: img2,
  },
  {
    id: 4,
    name: "partner 4",
    img: img2,
  },
  {
    id: 5,
    name: "partner 5",
    img: img2,
  },
  {
    id: 6,
    name: "partner 6",
    img: img2,
  },
  {
    id: 7,
    name: "partner 7",
    img: img2,
  },
  {
    id: 8,
    name: "partner 8",
    img: img2,
  },
  {
    id: 9,
    name: "partner 9",
    img: img2,
  },
  {
    id: 10,
    name: "partner 10",
    img: img2,
  },
];

export default function Partners() {
  return (
    <div className="relative flex w-full  space-x-6 flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s] bg-figma-black z-20!">
        {partnersItem.map((review) => (
          <ImgBox
            key={review.id}
            className="w-50 h-13 overflow-hidden"
            src={review.img}
            alt={review.name}
          />
        ))}
      </Marquee>
    </div>
  );
}
