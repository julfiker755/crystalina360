"use client";
import EventCard from "@/components/reuseable/event-card";
import { Pagination } from "@/components/reuseable/pagination";
import { SubTitle } from "@/components/reuseable/sub-title";
import { dummyJson, eventsData } from "@/components/view/user/dummy-json";

export default function FavoriteEvents() {
  return (
    <div className="container">
      <ul className="flex justify-between flex-wrap items-center pt-10 pb-5">
        <li>
          <SubTitle text="Favorite Events" />
        </li>
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {eventsData?.map((event) => (
          <EventCard key={event.id} item={event} />
        ))}
      </div>
      <div className="flex justify-end my-10">
        <Pagination
          onPageChange={(v: any) => console.log(v)}
          {...dummyJson.meta}
        />
      </div>
    </div>
  );
}
