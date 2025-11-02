"use client";
import EventCard from "@/components/reuseable/event-card";
import Modal2 from "@/components/reuseable/modal2";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import { SubTitle } from "@/components/reuseable/sub-title";
import { Button } from "@/components/ui";
import { dummyJson, eventsData } from "@/components/view/user/dummy-json";
import { SortBox } from "@/components/view/user/reuse";
import FavIcon from "@/icon/favIcon";
import Link from "next/link";
import { useState } from "react";

export default function ExploreAll() {
  const [isSort, setIsSort] = useState(false);

  return (
    <div className="container">
      <ul className="flex justify-between flex-wrap items-center pt-10 pb-5">
        <li>
          <SubTitle text="Explore OLISTAMI Events" />
        </li>
        <li className="flex items-center mt-3 md:mt-0 space-x-3">
          <SearchBox />
          <h1
            onClick={() => setIsSort(!isSort)}
            className="bg-figma-input icon"
          >
            <FavIcon className="size-10" name="arrowUpDown" />
          </h1>
          <Link href="/events-filter">
            <h1 className="bg-figma-input icon">
              <FavIcon className="size-10" name="filter" />
            </h1>
          </Link>
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
      {/*  =============  sort hare ========= */}
      <Modal2 open={isSort} setIsOpen={setIsSort}>
        <SortBox>
          <Button
            onClick={() => setIsSort(false)}
            className="w-full text-red-500 border  bg-transparent"
          >
            Close
          </Button>
        </SortBox>
      </Modal2>
    </div>
  );
}
