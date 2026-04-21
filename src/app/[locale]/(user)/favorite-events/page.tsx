"use client";
import EventCard, {
  SkeletonEventCard,
} from "@/components/reuseable/event-card";
import { Pagination } from "@/components/reuseable/pagination";
import { Repeat } from "@/components/reuseable/repeat";
import { SubTitle } from "@/components/reuseable/sub-title";
import { NoItemData } from "@/components/reuseable/table-no-item";
import { AppAlert } from "@/components/view/user/reuse";
import { useGetMyWishQuery } from "@/redux/api/user/userEventsApi";
import Link from "next/link";
import { useState } from "react";

export default function FavoriteEvents() {
  const [page, setPage] = useState(1);
  const { data: wishItems, isLoading } = useGetMyWishQuery({
    page: page,
  });

  return (
    <div className="container">
      <ul className="flex justify-between flex-wrap items-center pt-10 pb-5">
        <li>
          <SubTitle text="Favorite Events" />
        </li>
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading ? (
          <Repeat count={10}>
            <SkeletonEventCard />
          </Repeat>
        ) : wishItems?.data?.length > 0 ? (
          wishItems?.data?.map((item: any) => (
            <Link key={item.id} href={`/events/${item?.id}`}>
              <EventCard wish={true} item={item} />
            </Link>
          ))
        ) : (
          <NoItemData
            className="col-span-1 md:col-span-2 lg:col-span-3"
            title="No events found. Your wishlist is empty"
          />
        )}
      </div>
      <div className="flex justify-end my-10">
        <Pagination
          onPageChange={(v: any) => setPage(v)}
          {...wishItems?.meta}
        />
      </div>
      <AppAlert />
    </div>
  );
}
