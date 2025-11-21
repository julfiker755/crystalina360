"use client";
import EventCard from "@/components/reuseable/event-card";
import { Pagination } from "@/components/reuseable/pagination";
import TabBox from "@/components/reuseable/tab-box";
import { TabsContent } from "@/components/ui";
import { dummyJson, eventsData } from "@/components/view/user/dummy-json";
import { AppAlert } from "@/components/view/user/reuse";

export default function Booking() {
  return (
    <div className="container">
      <TabBox
        defaultValue="ongoing"
        tabItem={["Ongoing", "Upcoming", "Completed"]}
        className="flex justify-start w-fit mt-8"
        tabStyle="border-b border-transparent text-lg data-[state=active]:border-primary! data-[state=active]:border-b! data-[state=active]:text-primary"
      >
        <TabsContent value="ongoing">
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {eventsData?.map((event) => (
                <EventCard
                  type="booking"
                  love={false}
                  key={event.id}
                  item={event}
                />
              ))}
            </div>
            <div className="flex justify-end w-full my-10">
              <Pagination
                onPageChange={(v: any) => console.log(v)}
                {...dummyJson.meta}
              />
            </div>
          </>
        </TabsContent>
        <TabsContent value="upcoming">
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {eventsData?.map((event) => (
                <EventCard
                  type="booking"
                  love={false}
                  key={event.id}
                  item={event}
                />
              ))}
            </div>
            <div className="flex justify-end w-full my-10">
              <Pagination
                onPageChange={(v: any) => console.log(v)}
                {...dummyJson.meta}
              />
            </div>
          </>
        </TabsContent>
        <TabsContent value="completed">
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {eventsData?.map((event) => (
                <EventCard
                  type="booking"
                  love={false}
                  key={event.id}
                  item={event}
                />
              ))}
            </div>
            <div className="flex justify-end w-full my-10">
              <Pagination
                onPageChange={(v: any) => console.log(v)}
                {...dummyJson.meta}
              />
            </div>
          </>
        </TabsContent>
      </TabBox>
      <AppAlert />
    </div>
  );
}
