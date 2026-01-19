"use client";
import Avatars from "@/components/reuseable/avater";
import { BackBtn2 } from "@/components/reuseable/back-btn";
import VideoPlayer from "@/components/reuseable/player";
import { AppAlert } from "@/components/view/user/reuse";
import EventApply from "@/components/view/user/simple/event-apply";
import FavIcon from "@/icon/favIcon";
import { delivary_t, event_t, helpers, roleKey } from "@/lib";
import { useSingleEventsQuery } from "@/redux/api/operator/opratorApi";
import { useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
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
    city,
    province,
    region,
    country,
    price,
    event_date,
    event_time,
    organizer,
    available_tickets,
    ticket_status,
  } = events_all?.data?.event || {};

  const NotOnDemand = (item: any) => {
    return delivery_type === delivary_t.ondemand ? null : item;
  };

  let elementShow: any;
  if (event_type === event_t.onetoone || event_type == event_t.retreat) {
    elementShow = (
      <div className="flex  gap-2  items-center text-muted-foreground">
        <Calendar className="text-figma-black" size={22} />
        <span className="text-base">{event_date?.[0]}</span>
      </div>
    );
  } else if (event_type === event_t.group) {
    elementShow = (
      <div className="flex gap-2 items-center text-muted-foreground">
        <Clock className="text-figma-black" size={20} />
        <span className="text-base">{event_time?.[0]}</span>
      </div>
    );
  }

  return (
    <div className="container">
      <BackBtn2 className="my-6" />
      <div className="bg-[#FBFBFB] p-3 rounded-xs overflow-clip">
        <div>
          {delivery_type == delivary_t.ondemand ? (
            <VideoPlayer
              className="sm:w-full mx-auto xl:w-[60%]"
              key={id}
              src={img}
            />
          ) : (
            <div className="relative h-100 max-w-4xl mx-auto overflow-hidden rounded-md ">
              <img
                src={img || "/not.png"}
                alt={event_title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <ul className="flex-between mb-5 mt-10">
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">{event_title}</h2>

          {ticket_status === "sold_out" && (
            <div className="w-fit flex items-center  bg-[#FAD1D2] py-px rounded-sm px-2">
              <div className="pt-0.5">
                <span className="relative flex items-center size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#DD1938] opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-[#DD1938] "></span>
                </span>
              </div>
              <span className="text-[#DD1938] font-medium ml-2">
                Almost sold out
              </span>
            </div>
          )}
        </div>
        <p className="text-muted-foreground">{event_description}</p>
        <div className="space-y-2 text-sm mt-5 *:text-figma-black *:font-medium">
          {NotOnDemand(
            <div className="flex gap-2 items-center text-muted-foreground">
              <Tag className="text-figma-black" size={23} />
              <span className="text-base text-[#A6A996] font-medium">
                {price}
              </span>
            </div>,
          )}
          <div className="flex gap-2 items-center  text-muted-foreground">
            <MapPin className="text-figma-black" size={23} />
            <span className="text-base font-medium">{`${city}, ${province}, ${region}, ${country}`}</span>
          </div>
          {NotOnDemand(elementShow)}
          {NotOnDemand(
            parseInt(available_tickets) > 0 && (
              <div className="flex gap-2 items-center text-muted-foreground">
                <FavIcon className="size-5" name="user_ticket_sold" />
                <span className="text-base">
                  Available:{" "}
                  {
                    <span className="font-medium text-primary">
                      {available_tickets}
                    </span>
                  }
                </span>
              </div>
            ),
          )}
        </div>
        {user.role == roleKey.user &&
          NotOnDemand(
            ticket_status == "available" && (
              <EventApply
                id={id}
                event_type={event_type}
                event_time={event_time}
                event_date={event_date}
                available_tickets={available_tickets}
                price={price}
              />
            ),
          )}
      </div>
      <AppAlert className="mb-10" />
    </div>
  );
}
