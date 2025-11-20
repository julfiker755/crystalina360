"use client";

import EventButton from "@/components/reuseable/event-button/page";
import SidebarNav2 from "@/components/view/admin/simple/sideber-nav2";
import NavTitle from "@/components/reuseable/nav-title";
import { childrenProps } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import Link from "next/link";

function PricingCloneLayout({ children }: childrenProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultQuery = "my-events";
  const queryType = searchParams.get("type") || defaultQuery;

  const [selectEvent, setSelectEvent] = useState("");
  const [activeTab, setActiveTab] = useState(queryType);

  // Ensure URL always has the query and sync tab with URL
  useEffect(() => {
    const currentType = searchParams.get("type");
    if (!currentType) {
      router.replace(`${pathname}?type=${defaultQuery}`);
    } else if (currentType !== activeTab) {
      setActiveTab(currentType);
    }
  }, [pathname, router, searchParams, activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`${pathname}?type=${value}`);
  };

  const handleSubmitEvent = () => {
    if (selectEvent) router.push(`/admin/events/store/${selectEvent}`);
  };

  const sidebarNavItems = [
    {
      label: "One to one",
      icon: "users",
      act_io: "users_i",
      to: `/admin/events/manage?type=${activeTab}`,
    },
    {
      label: "Group",
      icon: "event_group",
      act_io: "event_group_ac",
      to: `/admin/events/manage/group?type=${activeTab}`,
    },
    {
      label: "Retreat",
      icon: "event_retreat",
      act_io: "event_retreat_ac",
      to: `/admin/events/manage/retreat?type=${activeTab}`,
    },
  ];

  return (
    <div>
      <NavTitle
        title="Manage events"
        subTitle="Manage all of the events from this section."
      />
      <div className="flex flex-1 flex-col lg:flex-row gap-4 space-x-10">
        {/* Sidebar + Tabs */}
        <div className="w-full lg:w-[300px] block h-fit lg:shrink-0 lg:sticky top-24 space-y-3">
          <Tabs value={activeTab}>
            <TabsList className="w-[95%] mx-auto mb-2 h-10 p-0 rounded-full">
              <TabsTrigger
                onClick={() => handleTabChange("my-events")}
                value="my-events"
                className="cursor-pointer border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground rounded-full bg-muted py-3"
              >
                My events
              </TabsTrigger>
              <TabsTrigger
                onClick={() => handleTabChange("operator")}
                value="operator"
                className="cursor-pointer border-transparent data-[state=active]:border-primary rounded-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground bg-muted py-3"
              >
                Event by Operators
              </TabsTrigger>
            </TabsList>

            {/* My events tab */}
            <TabsContent className="p-0" value="my-events">
              <div className="space-y-4">
                <SidebarNav2
                  items={sidebarNavItems}
                  defaultPath={`${pathname}?type=${activeTab}`}
                />
                <div className="h-11 flex rounded-full items-center justify-between border px-3">
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

            {/* Operator tab */}
            <TabsContent className="p-0" value="operator">
              <div className="space-y-4">
                <SidebarNav2
                  items={sidebarNavItems}
                  defaultPath={`${pathname}?type=${activeTab}`}
                />
                <div className="h-11 flex rounded-full items-center justify-between border px-3">
                  <span>Total event:</span>
                  <span>4</span>
                </div>
                <Link href="/admin/events/requests">
                  <Button
                    size="lg"
                    className="flex text-base items-center justify-between w-full rounded-full"
                  >
                    <span className="flex items-center">
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

        {/* Main content */}
        <div className="flex-1 border rounded-xl p-4">{children}</div>
      </div>
    </div>
  );
}

export default function PricingLayout({ children }: childrenProps) {
  return (
    <Suspense>
      <PricingCloneLayout children={children} />
    </Suspense>
  );
}
