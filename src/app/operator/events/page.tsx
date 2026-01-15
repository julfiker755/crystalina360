"use client";
import { eventItem } from "@/components/dummy-data";
import EventButton from "@/components/reuseable/event-button/page";
import { Pagination } from "@/components/reuseable/pagination";
import { Repeat } from "@/components/reuseable/repeat";
import { NoItemData } from "@/components/reuseable/table-no-item";
import { Button, ButtonGroup, Skeleton } from "@/components/ui";
import EventCard from "@/components/view/oparator/reuse/event-card";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import FavIcon from "@/icon/favIcon";
import { useGetEventsQuery } from "@/redux/api/operator/opratorApi";
import Link from "next/link";
import { useState } from "react";

export default function EventAll() {
  const [activeButton, setActiveButton] = useState<string>("");
  const [selectEvent, setSelectEvent] = useState("");
  const [page, setPage] = useState(1);
  const { data: events, isLoading } = useGetEventsQuery({
    page,
    search: activeButton,
  });

  const overviewItem = [
    {
      icon: "events",
      title: "Total events",
      count: events?.info.total_events,
    },
    {
      icon: "ongoing_events",
      title: "Ongoing events",
      count: events?.info?.ongoing_events,
    },
    {
      icon: "up_events",
      title: "Upcoming events",
      count: events?.info?.upcoming_events,
    },
  ];

  const eventOptions = [
    {
      id: "onetoone",
      title: "One to One",
      description:
        "A private event designed for personal interaction and focused discussion between two individuals.",
      path: "/operator/events/store/one-to-one",
    },
    {
      id: "group",
      title: "Group",
      description:
        "An exclusive gathering with a set number of participants, ensuring closer connections and meaningful engagement.",
      path: "/operator/events/store/group",
    },
    {
      id: "retreat",
      title: "Retreat",
      description:
        "An immersive event. It can only be o line (therefore, it cannot be online or on demand). ",
      path: "/operator/events/store/retreat",
    },
  ];

  const ongoingItem = events?.data?.data?.filter(
    (item: any) => item.status == "ongoing"
  );
  const upcommingItem = events?.data?.data?.filter(
    (item: any) => item.status === "upcoming"
  );

  return (
    <div className="container pb-10">
      <SvgBox className="mt-6">
        <div className="flex items-center flex-wrap justify-between">
          <div className="flex items-center  gap-4 flex-wrap  space-x-5">
            {overviewItem?.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <h1 className="size-13 grid place-items-center rounded-md bg-white">
                  <FavIcon className="size-6" name={item.icon as any} />
                </h1>
                <div>
                  <h4 className="text-black font-normal">{item.title}</h4>
                  <h2>{item.count || 0}</h2>
                </div>
              </div>
            ))}
          </div>
          <EventButton
            eventOptions={eventOptions}
            selectEvent={selectEvent}
            setSelectEvent={setSelectEvent}
          />
        </div>
      </SvgBox>
      {/* filter group item */}
      <div className="my-7 flex justify-end">
        <ButtonGroup>
          {eventItem?.map((btn) => (
            <Button
              key={btn.value}
              size="sm"
              variant="outline"
              className={
                activeButton === btn.value
                  ? "bg-primary text-white hover:bg-primary hover:text-white"
                  : ""
              }
              onClick={() => setActiveButton(btn.value)}
            >
              {btn.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="space-y-3">
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Repeat count={10}>
              <Skeleton className="w-full h-[420px]" />
            </Repeat>
          </div>
        ) : (
          <>
            {events?.data?.data?.length === 0 && (
              <NoItemData title="No Events Items Available at the Moment" />
            )}
            {ongoingItem?.length > 0 && (
              <div>
                <h2 className="text-2xl text-black">Ongoing Events</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {ongoingItem?.map((item: any, idx: any) => (
                    <Link key={idx} href={`/operator/events/3`}>
                      <EventCard item={item} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {upcommingItem?.length > 0 && (
              <div>
                <h2 className="text-2xl text-black">Upcoming Events</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {upcommingItem.map((item: any, idx: any) => (
                    <Link key={idx} href={`/operator/events/3`}>
                      <EventCard item={item} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {events?.data?.data?.length >= 10 && (
        <div className="flex justify-center mt-10">
          <Pagination
            onPageChange={(v: any) => setPage(v)}
            {...events?.data?.meta}
          />
        </div>
      )}
    </div>
  );
}
