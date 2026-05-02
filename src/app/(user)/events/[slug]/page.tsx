"use client";
import Avatars from "@/components/reuseable/avater";
import { BackBtn2 } from "@/components/reuseable/back-btn";
import CopyBox from "@/components/reuseable/copy-box";
import VideoPlayer from "@/components/reuseable/player";
import { OlistamiLabel, StarBadge } from "@/components/reuseable/star-badge";
import { Button, Skeleton } from "@/components/ui";
import { AppAlert } from "@/components/view/user/reuse";
import EventApply from "@/components/view/user/simple/event-apply";
import OnDemand from "@/components/view/user/simple/on-demand";
import FavIcon from "@/icon/favIcon";
import { delivary_t, event_t, fakeZoom, helpers, roleKey } from "@/lib";
import { useSingleEventsQuery } from "@/redux/api/operator/opratorApi";
import { useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function EventDetails() {
  const t = useTranslations("user.details");
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
    link,
    organizer_label,
    has_video_access,
  } = events_all?.data?.event || {};

  const NotOnDemand = (item: any) => {
    return delivery_type === delivary_t.ondemand ? null : item;
  };
  const ShowOnDemand = (item: any) => {
    return delivery_type === delivary_t.ondemand ? item : null;
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
        <span className="text-base">{helpers.planTime(event_time?.[0])}</span>
      </div>
    );
  }

  return (
    <div className="container">
      {isLoading ? (
        <div>
          <BackBtn2 label={t("back")} className="my-6 mt-10" />
          <EventDetailsSkeleton />
        </div>
      ) : (
        <>
          <BackBtn2 label={t("back")} className="my-6 mt-10" />

          <div className="bg-[#FBFBFB] p-3 rounded-xs overflow-clip">
            <div>
              {delivery_type == delivary_t.ondemand ? (
                has_video_access ? (
                  <VideoPlayer
                    className="sm:w-full mx-auto xl:w-[60%]"
                    key={id}
                    src={img}
                  />
                ) : (
                  <div className="relative h-100 max-w-4xl mx-auto overflow-hidden rounded-md ">
                    <img
                      src={"/videoImg.png"}
                      alt={event_title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )
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

            <ul className="flex-between flex-wrap mb-5 mt-10">
              <li className="flex items-center space-x-2">
                {organizer_label ? (
                  <OlistamiLabel />
                ) : (
                  <>
                    <Avatars
                      src={organizer?.img || "/avater.png"}
                      fallback={organizer?.name}
                      alt="event organizer"
                    />
                    <span className="text-lg items-center flex space-x-1 font-bold text-foreground">
                      <h5>{organizer?.name}</h5>
                      {
                        <StarBadge
                          is_subscribed={organizer?.is_subscribed}
                          is_top_seller={organizer?.is_top_sellerF}
                        />
                      }
                    </span>
                  </>
                )}
              </li>

              <li className="mt-2 md:mt-0">
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
              <div className="flex gap-2 items-center text-muted-foreground">
                <Tag className="text-figma-black" size={23} />
                <span className="text-base text-[#A6A996] font-medium">
                  {price}
                </span>
              </div>
              {delivery_type === delivary_t.online ? (
                <CopyBox icon={false} value={fakeZoom} />
              ) : (
                <div className="flex gap-2 items-center  text-muted-foreground">
                  <MapPin className="text-figma-black" size={23} />
                  <span className="text-base font-medium">{`${city}, ${province}, ${region}, ${country}`}</span>
                </div>
              )}

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
            {user.role == roleKey.user ? (
              <>
                {has_video_access === false &&
                  ShowOnDemand(<OnDemand id={id} />)}

                {NotOnDemand(
                  ticket_status == "available" && (
                    <EventApply
                      id={id}
                      organizer={organizer}
                      event_type={event_type}
                      event_time={event_time}
                      event_date={event_date}
                      available_tickets={available_tickets}
                      price={price}
                    />
                  ),
                )}
              </>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
                <Button
                  type="button"
                  disabled={true}
                  className="bg-transparent  w-full border border-[#ECE8E8] text-[#C4ACA4]"
                >
                  {t("send_message")}
                </Button>

                <Button disabled={true} className="w-full">
                  {t("purchase_now")}
                </Button>
              </div>
            )}
          </div>
          <AppAlert className="mb-10" />
        </>
      )}
    </div>
  );
}

function EventDetailsSkeleton() {
  return (
    <div className="bg-[#FBFBFB] p-10">
      <Skeleton className="sm:w-full mx-auto xl:w-[70%] h-[200px] lg:h-[500px]" />
      <div className="flex items-center justify-between my-10">
        <div className="flex gap-2 items-center">
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="w-[100px] h-4 rounded-md!" />
        </div>
        <Skeleton className="w-30 h-10" />
      </div>
      <div className="space-y-3">
        <Skeleton className="w-full h-4 rounded-md!" />
        <Skeleton className="w-full h-4 rounded-md!" />
        <Skeleton className="w-full h-4 rounded-md!" />
        <Skeleton className="w-full h-4 rounded-md!" />
      </div>
      <div className="space-y-3 mt-8">
        <Skeleton className="w-1/2 h-4 rounded-md!" />
        <Skeleton className="w-[40%] h-4 rounded-md!" />
        <Skeleton className="w-[30%] h-4 rounded-md!" />
        <Skeleton className="w-[20%] h-4 rounded-md!" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 mb-10">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  );
}
