"use client";
import EventCard, {
  SkeletonEventCard,
} from "@/components/reuseable/event-card";
import { Pagination } from "@/components/reuseable/pagination";
import { Repeat } from "@/components/reuseable/repeat";
import TabBox from "@/components/reuseable/tab-box";
import { NoItemData } from "@/components/reuseable/table-no-item";
import { AppAlert } from "@/components/view/user/reuse";
import { useGetBookingsQuery } from "@/redux/api/user/bookingApi";
import { TabsContent } from "@/components/ui";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import React from 'react'
import { useTranslations } from "next-intl";

function BookingChild() {
  const t = useTranslations("user.resources");
  const router = useRouter();
  const params = useSearchParams();
  const [isTab, setIsTab] = useState(params.get("tab") || "ongoing");
  const [page, setPage] = useState(1);
  const { data: booking, isLoading } = useGetBookingsQuery({
    status: isTab,
    per_page: 14,
    page: page,
  });

  useEffect(() => {
    setIsTab(params.get("tab") || "ongoing");
  }, [params]);

  return (
    <div className="container">
      <TabBox
        defaultValue={isTab}
        tabItem={[
          { label: t("booking.ongoing"), value: "ongoing" },
          { label: t("booking.upcoming"), value: "upcoming" },
          { label: t("booking.completed"), value: "completed" },
        ]}
        className="flex justify-start w-fit mt-8"
        tabStyle="border-b border-transparent text-lg data-[state=active]:border-primary! data-[state=active]:border-b! data-[state=active]:text-primary"
        onChange={(v: any) => {
          if (v == "completed") {
            router.push(`?tab=complete`, { scroll: false });
          } else {
            router.push(`?tab=${v}`, { scroll: false });
          }
        }}
      >
        <TabsContent value="ongoing">
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {isLoading ? (
                <Repeat count={10}>
                  <SkeletonEventCard />
                </Repeat>
              ) : booking?.data?.length > 0 ? (
                booking?.data?.map((item: any) => (
                  <Link key={item.id} href={`/booking/${item?.id}`}>
                    <EventCard zoomLink={true} wish={false} item={item} />
                  </Link>
                ))
              ) : (
                <NoItemData
                  className="col-span-1 md:col-span-2 lg:col-span-3"
                  title={`${t("booking.no_ongoing")}`}
                />
              )}
            </div>
          </>
        </TabsContent>
        <TabsContent value="upcoming">
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {isLoading ? (
                <Repeat count={10}>
                  <SkeletonEventCard />
                </Repeat>
              ) : booking?.data?.length > 0 ? (
                booking?.data?.map((item: any) => (
                  <Link key={item.id} href={`/booking/${item?.id}`}>
                    <EventCard zoomLink={true} wish={false} item={item} />
                  </Link>
                ))
              ) : (
                <NoItemData
                  className="col-span-1 md:col-span-2 lg:col-span-3"
                  title={`${t("booking.no_upcoming")}`}
                />
              )}
            </div>
          </>
        </TabsContent>
        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {isLoading ? (
              <Repeat count={10}>
                <SkeletonEventCard />
              </Repeat>
            ) : booking?.data?.length > 0 ? (
              booking?.data?.map((item: any) => (
                <Link key={item.id} href={`/booking/${item?.id}`}>
                  <EventCard zoomLink={true} wish={false} item={item} />
                </Link>
              ))
            ) : (
              <NoItemData
                className="col-span-1 md:col-span-2 lg:col-span-3"
                title={`${t("booking.no_completed")}`}
              />
            )}
          </div>
        </TabsContent>
      </TabBox>
      <div className="flex justify-end w-full my-10">
        <Pagination onPageChange={(v: any) => setPage(v)} {...booking?.meta} />
      </div>
      <AppAlert />
    </div>
  );
}




export default function Booking() {
  return (
    <Suspense>
      <BookingChild />
    </Suspense>
  )
}
