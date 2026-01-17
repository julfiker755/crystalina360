"use client";
import Avatars from "@/components/reuseable/avater";
import { BackBtn2 } from "@/components/reuseable/back-btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import VideoPlayer from "@/components/reuseable/player";
import { AppAlert } from "@/components/view/user/reuse";
import EventApply from "@/components/view/user/simple/event-apply";
import FavIcon from "@/icon/favIcon";
import { delivary_t, event_t, helpers, PlaceholderImg, roleKey } from "@/lib";
import { useSingleEventsQuery } from "@/redux/api/operator/opratorApi";
import { useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { Clock, MapPin, RectangleEllipsis, Tag } from "lucide-react";
import { useParams } from "next/navigation";

export default function EventDetails() {
  const { user } = useAppSelector((state: AppState) => state.auth);
  const { slug } = useParams();
  const { data: events_all, isLoading } = useSingleEventsQuery(slug);
  const {
    id,
    img,
    event_title,
    event_description,
    event_type,
    delivery_type,
    status,
    city,
    province,
    region,
    country,
    ticket_quantity,
    price,
    revenue,
    ticket_sold_stats,
    event_date,
    event_time,
    sold_tickets,
    organizer,
  } = events_all?.data?.event || {};
  return (
    <div className="container">
      <BackBtn2 className="my-6" />
      <div className="bg-[#FBFBFB] p-3 rounded-xs">
        <div>
          {delivery_type == delivary_t.ondemand ? (
            <div className="h-100">
              <VideoPlayer
                className="sm:w-full xl:w-[60%]"
                key={id}
                src={img}
              />
            </div>
          ) : (
            <div className="relative h-100 overflow-hidden rounded-md ">
              <img
                src={img || "/not.png"}
                alt={event_title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <ul className="flex-between my-5">
          <li className="flex items-center space-x-2">
            <Avatars
              src={organizer?.img || "/avater.png"}
              fallback={organizer?.name}
              alt="event organizer"
            />
            <span className="text-lg items-center flex space-x-1 font-bold text-foreground">
              <h5>{organizer?.name}</h5>
              {organizer?.is_top_seller === true ? (
                <FavIcon className="size-5" name="top_seller" />
              ) : (
                <FavIcon className="size-5" name="verified" />
              )}
            </span>
          </li>

          <li>
            <div className="border rounded-md w-fit h-fit bg-[#F2F2F2] font-medium py-1 px-3">
              {event_type === event_t.onetoone
                ? "1.1"
                : helpers.capitalize(event_type)}
            </div>
          </li>
        </ul>
        <div>
          <h2 className="font-semibold text-lg">{event_title}</h2>
          <p className="text-muted-foreground">{event_description}</p>
        </div>

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
