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
import { useState } from "react";

export default function Booking() {
  const [isStatus, setIsStatus] = useState("ongoing");
  const [page, setPage] = useState(1)
  const { data: booking, isLoading } = useGetBookingsQuery({
    status: isStatus,
    page: page
  });

  return (
    <div className="container">
      <TabBox
        defaultValue="ongoing"
        tabItem={["Ongoing", "Upcoming", "Completed"]}
        className="flex justify-start w-fit mt-8"
        tabStyle="border-b border-transparent text-lg data-[state=active]:border-primary! data-[state=active]:border-b! data-[state=active]:text-primary"
        onChange={(v: any) => {
          if (v == "completed") {
            console.log("fdf")
            setIsStatus("complete");
          } else {
            setIsStatus(v)
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
                    <EventCard wish={false} item={item} />
                  </Link>
                ))
              ) : (
                <NoItemData
                  className="col-span-1 md:col-span-2 lg:col-span-3"
                  title="No ongoing events at this moment"
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
                    <EventCard wish={false} item={item} />
                  </Link>
                ))
              ) : (
                <NoItemData
                  className="col-span-1 md:col-span-2 lg:col-span-3"
                  title="No upcoming events at this moment"
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
                  <EventCard wish={false} item={item} />
                </Link>
              ))
            ) : (
              <NoItemData
                className="col-span-1 md:col-span-2 lg:col-span-3"
                title="No Completed events at this moment"
              />
            )}
          </div>
        </TabsContent>
      </TabBox>
      <div className="flex justify-end w-full my-10">
        <Pagination
          onPageChange={(v: any) => setPage(v)}
          {...booking?.meta}
        />
      </div>
      <AppAlert />
    </div>
  );
}
