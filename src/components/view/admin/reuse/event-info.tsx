"use client";
import FavIcon from "@/icon/favIcon";
import { cn, delivary_t, event_t, helpers } from "@/lib";
import { Calendar } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

const VideoPlayer = dynamic(() => import("@/components/reuseable/player"), {
  ssr: false,
});

interface eventinfoProps {
  details: any;
  oprator?: boolean;
  video_key?: string;
}

export default function EventInfo({
  details,
  oprator = false,
  video_key,
}: eventinfoProps) {
  // --- not show ondemand ---
  const NotOnDemand = (item: any) => {
    return details?.delivery_type === delivary_t.ondemand ? null : item;
  };
  let elementShow: any;
  const onetoOne = details.event_type === event_t.onetoone;
  if (onetoOne || details?.event_type == event_t.retreat) {
    elementShow = (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="size-6 text-primary" />
          <div className="flex flex-col">
            <span className="text-base text-figma-black">Date</span>
            <span className="text-base text-figma-black font-medium">
              {details?.event_date?.[0]}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <FavIcon className="size-6" name="ongoing_events" />
          <div className="flex flex-col">
            <span className="text-base text-figma-black">
              Time{onetoOne && "s"}
            </span>
            <div className="space-x-3">
              {details?.event_time?.map((item: any, idx: any) => (
                <span
                  key={idx}
                  className={`text-base ${onetoOne && "bg-figma-delete px-3 font-normal!  py-0.5"} font-medium rounded-full text-figma-black`}
                >
                  {helpers.planTime(item)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (details?.event_type === event_t.group) {
    elementShow = (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <FavIcon className="size-6" name="ongoing_events" />
          <div className="flex flex-col">
            <span className="text-base text-figma-black">Time</span>
            <span className="text-base bg-figma-delete px-3 rounded-full text-figma-black">
              {helpers.planTime(details?.event_time?.[0])}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="size-6 text-primary" />
          <div className="flex flex-col">
            <span className="text-base text-figma-black">Dates</span>
            <div className="space-x-3">
              {details?.event_date?.map((item: any, idx: any) => (
                <span
                  key={idx}
                  className="text-base bg-figma-delete px-3  py-0.5 rounded-full text-figma-black"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden col-span-1 lg:col-span-2 transition-shadow  rounded-lg p-3">
      <div>
        {details?.delivery_type == delivary_t.ondemand ? (
          <div>
            <VideoPlayer
              className="aspect-video"
              key={details?.id + video_key}
              src={details?.img}
            />
          </div>
        ) : (
          <div className="relative h-60 overflow-hidden rounded-md ">
            <img
              src={details?.img || "/not.png"}
              alt={"title"}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="py-3 space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold  text-foreground">
            {details?.event_title}
          </h3>
        </div>
        <p className="text-muted-foreground">{details?.event_description}</p>
        {oprator ? (
          // =================================== oprator details ================================
          <div className="space-y-3 pt-2">
            {NotOnDemand(
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <ShowBox
                  icon="tiket"
                  name="Ticket sold"
                  text={`${details?.sold_tickets || 0} /${
                    details?.ticket_quantity
                  }`}
                />
                <ShowBox
                  icon="price22"
                  name="Ticket price"
                  text={details?.price || 0}
                />
              </div>,
            )}
            {elementShow}
            {NotOnDemand(
              <ShowBox
                icon="price22"
                name="Total earned from this event"
                text={details?.revenue || 0}
                className="bg-figma-delete px-2 py-2 rounded-md"
              />,
            )}
          </div>
        ) : (
          //  ================================= request oprator events ================================
          <div className="space-y-3 py-2">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <ShowBox
                icon="events"
                name="Event type"
                text={details?.event_type}
              />
              <ShowBox
                icon="delivery"
                name="Delivery mode"
                text={details?.delivery_type}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <ShowBox
                icon="location"
                name="Location"
                text={`${details?.city}, ${details?.province}, ${details?.region}, ${details?.country}`}
              />
              {NotOnDemand(
                <ShowBox
                  icon="tiket"
                  name="Ticket sold"
                  text={details?.ticket_quantity}
                />,
              )}
            </div>
            {elementShow}
          </div>
        )}
      </div>
    </div>
  );
}

function ShowBox({ icon, text, name, className }: any) {
  return (
    <div
      className={cn("flex items-center gap-2 text-muted-foreground", className)}
    >
      <FavIcon className="size-6" name={icon as any} />
      <div className="flex flex-col">
        <span className="text-base text-figma-black">{name}</span>
        <span className="text-base text-figma-black font-medium">{text}</span>
      </div>
    </div>
  );
}
