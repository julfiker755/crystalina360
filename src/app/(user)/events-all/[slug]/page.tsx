"use client";
import Avatars from "@/components/reuseable/avater";
import { BackBtn2 } from "@/components/reuseable/back-btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import { AppAlert } from "@/components/view/user/reuse";
import EventApply from "@/components/view/user/simple/event-apply";
import { PlaceholderImg, roleKey } from "@/lib";
import { useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { Clock, MapPin, RectangleEllipsis, Tag } from "lucide-react";

export default function EventDetails() {
  const { user } = useAppSelector((state: AppState) => state.auth);
  return (
    <div className="container">
      <BackBtn2 className="my-6" />
      <div className="bg-[#FBFBFB] p-3 rounded-xs">
        {/* Event Image */}
        <ImgBox
          className="w-full h-[400px]"
          src={PlaceholderImg(1000, 600)}
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
        </div>

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

        {user.role == roleKey.user && <EventApply />}
      </div>
      <AppAlert className="mb-10" />
    </div>
  );
}
