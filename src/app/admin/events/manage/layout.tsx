"use client";
import EventButton from "@/components/reuseable/event-button/page";
import SidebarNav from "@/components/view/admin/simple/sideber-nav";
import NavTitle from "@/components/reuseable/nav-title";
import { childrenProps } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import Link from "next/link";

export default function PricingLayout({ children }: childrenProps) {
  const router = useRouter();
  const [isTab, setIsTab] = useState("");
  const [selectEvent, setSelectEvent] = useState("");

  const handleSubmitEvent = () => {
    router.push(`/admin/events/store/${selectEvent}`);
  };

  return (
    <div>
      <NavTitle
        title="Manage events"
        subTitle="Manage all of the events from this section."
      />
      <div className="flex flex-1 flex-col lg:flex-row gap-4 space-x-10">
        <div className="w-full lg:w-[300px] block   h-fit lg:shrink-0 lg:sticky top-24 space-y-3">
          <Tabs defaultValue="my_events">
            <TabsList className="w-[95%] mx-auto mb-2  h-10 p-0 rounded-full">
              <TabsTrigger
                value="my_events"
                className="cursor-pointer   border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground rounded-full bg-muted py-3"
              >
                My events
              </TabsTrigger>
              <TabsTrigger
                value="event_by_operators"
                className="cursor-pointer  border-transparent data-[state=active]:border-primary rounded-full  data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground bg-muted py-3"
              >
                Event by Operators
              </TabsTrigger>
            </TabsList>
            <TabsContent className="p-0" value="my_events">
              <div className="space-y-4">
                <SidebarNav
                  items={sidebarNavItems}
                  defaultPath="/admin/events/manage"
                />
                <div className="h-11  flex rounded-full items-center justify-between border px-3">
                  <span>Total event:</span>
                  <span>4</span>
                </div>
                <EventButton
                  selectEvent={selectEvent}
                  setSelectEvent={setSelectEvent}
                  handleSubmitEvent={handleSubmitEvent}
                  className="w-full rounded-full"
                  icon={true}
                />
              </div>
            </TabsContent>
            <TabsContent className="p-0" value="event_by_operators">
              <div className="space-y-4">
                <SidebarNav
                  items={sidebarNavItems}
                  defaultPath="/admin/events/manage"
                />
                <div className="h-11  flex rounded-full items-center justify-between border px-3">
                  <span>Total event:</span>
                  <span>4</span>
                </div>
                <Link href="/admin/events/requests">
                  <Button
                    size="lg"
                    className="flex text-base items-center justify-between w-full rounded-full"
                  >
                    <span className="flex items-center">
                      {" "}
                      <FavIcon className="size-3" name="question" />
                      <span className="ml-1">Requests</span>
                    </span>
                    <span>20</span>
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex-1 border rounded-xl p-4">{children}</div>
      </div>
    </div>
  );
}

const sidebarNavItems = [
  {
    label: "One to one",
    icon: "users",
    act_io: "users_i",
    to: "/admin/events/manage",
  },
  {
    label: "Group",
    icon: "event_group",
    act_io: "event_group_ac",
    to: "/admin/events/manage/group",
  },
  {
    label: "Retreat",
    icon: "event_retreat",
    act_io: "event_retreat_ac",
    to: "/admin/events/manage/retreat",
  },
];
