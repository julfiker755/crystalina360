import { Button } from "@/components/ui";
import business from "@/assets/user/businessImg.jpg";
import Image from "next/image";

export default function Business() {
  return (
    <div className="py-10 container">
      <h1 className="mb-10">Grow Your Business</h1>
      <div className="container mx-auto relative rounded-xl">
        <Image
          src={business}
          alt="title"
          fill
          loading="eager"
          className="object-cover z-0 rounded-xl"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/35 rounded-xl backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative py-4 md:py-16 md:px-10">
          {/* Heading */}
          <h1 className="text-3xl text-left md:text-5xl  font-bold text-white mb-5 leading-tight">
            Expand Your Reach, Maximize Your Impact.
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Our platform helps operators easily publish events, accept bookings,
            and grow revenue. Join today and take your event business to the
            next level.
          </p>

          {/* CTA Button */}
          <Button size="lg" className="bg-[#FFF] text-primary">
            Join as a operator
          </Button>
        </div>
      </div>
    </div>
  );
}
