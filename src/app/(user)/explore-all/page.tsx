"use client";
import EventCard from "@/components/reuseable/event-card";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import { dummyJson } from "@/components/view/user/dummy-json";
import { eventsData } from "@/components/view/user/landing/explore-event";
import FavIcon from "@/icon/favIcon";

export default function ExploreAll() {
  return (
    <div className="container">
      <ul className="flex justify-between flex-wrap items-center pt-10 pb-5">
        <li className="text-2xl font-bold text-figma-black">
          Explore OLISTAMI Events
        </li>
        <li className="flex items-center mt-3 md:mt-0 space-x-3">
          <SearchBox />
          <h1 className="bg-figma-input icon">
            <FavIcon className="size-10" name="arrowUpDown" />
          </h1>
          <h1 className="bg-figma-input icon">
            <FavIcon className="size-10" name="filter" />
          </h1>
        </li>
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {eventsData.map((event) => (
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
