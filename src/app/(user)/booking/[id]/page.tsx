"use client";
import Avatars from "@/components/reuseable/avater";
import { BackBtn2 } from "@/components/reuseable/back-btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import Modal2 from "@/components/reuseable/modal2";
import { RatingScore } from "@/components/reuseable/rating";
import { Button, Textarea } from "@/components/ui";
import { CloseBtn, CloseIcon } from "@/components/view/common/btn-modal";
import { AppAlert } from "@/components/view/user/reuse";
import { RandomImg } from "@/lib";
import { Clock, MapPin, RectangleEllipsis, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BookingDetails() {
  const [isReview, setIsReview] = useState(false);
  return (
    <div className="container">
      <BackBtn2 className="my-6" />
      <div className="bg-[#FBFBFB] p-3 rounded-xs">
        {/* Event Image */}
        <ImgBox
          className="w-full h-[400px]"
          src={RandomImg(1000, 650)}
          alt="event image"
        />

        {/* Header */}
        <ul className="flex-between my-5">
          <li className="flex items-center space-x-2">
            <Avatars src="" fallback="A" alt="event organizer" />
            <h1 className="text-lg font-medium">Event Title</h1>
          </li>

          <li>
            <div className="border rounded-md w-fit h-fit bg-[#F2F2F2] font-medium py-1 px-3">
              Group
            </div>
          </li>
        </ul>

        {/* Description */}
        <div>
          <h2 className="font-semibold text-lg">Event title</h2>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error vitae
            laboriosam ipsum enim quidem alias neque ad est magni? Non
            voluptates facere modi, corrupti, minima, autem aut libero sit odit
            consequatur laborum esse asperiores suscipit ut voluptatem
            laboriosam ipsam dignissimos perspiciatis fugit.
          </p>

          {/* Details */}
          <div className="space-y-1 text-sm mt-5">
            <div className="flex gap-2 items-center text-muted-foreground">
              <Tag size={20} />
              <span className="text-base">$100</span>
            </div>
            <div className="flex gap-2 items-center text-muted-foreground">
              <MapPin size={20} />
              <span className="text-base">Bangladesh</span>
            </div>
            <div className="flex gap-2 items-center text-muted-foreground">
              <Clock size={20} />
              <span className="text-base">9:60 AM</span>
            </div>
            <div className="flex gap-2 items-center text-muted-foreground">
              <RectangleEllipsis size={20} />
              <span className="text-base">Available: 10</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5">
            <Link href="/conversation">
              <Button className="bg-white border w-full">Send Message</Button>
            </Link>

            {/* <Button onClick={() => setIsReview(!isReview)}>
              Review & Rating
            </Button> */}
            <Button>Download Invoice</Button>
          </div>
        </div>
      </div>
      {/* modal box */}
      <Modal2 open={isReview} setIsOpen={setIsReview}>
        <CloseIcon
          className="top-4 right-4"
          onClose={() => setIsReview(false)}
        />
        <div className="mb-5">
          <h2 className="text-center text-xl lg:text-2xl text-figma-black font-bold">
            Rating & Review
          </h2>
          <p className="text-center">Please share your experience</p>
        </div>
        <div className="space-y-5">
          <div>
            <h4 className="text-lg font-medium mb-1">Rating</h4>
            <RatingScore
              width={160}
              onChange={(v: any) => console.log(v)}
              readOnly={false}
            />
          </div>
          <div>
            <h4 className="text-lg font-medium mb-1">Additional Review</h4>
            <Textarea
              placeholder="Any additional sentence for the event...."
              className="border-none bg-figma-input resize-none rounded-md min-h-30"
            />
          </div>
          <div className="space-y-2">
            <Button className="w-full">Submit</Button>
            <Button
              onClick={() => setIsReview(false)}
              className="w-full bg-transparent border"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal2>
      <AppAlert />
    </div>
  );
}
