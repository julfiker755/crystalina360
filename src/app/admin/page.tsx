"use client";
import { DropdownBox } from "@/components/reuseable/dropdown-menu";
import NavTitle from "@/components/reuseable/nav-title";
import VideoPlayer from "@/components/reuseable/player";
import { ScrollArea } from "@/components/ui";
import PreferencesChart from "@/components/view/admin/simple/preferences-chart";
import StatisticsChart from "@/components/view/admin/simple/statistics-chart";
import {
  RecentCard,
  StatsCard,
} from "@/components/view/admin/simple/stats-card";
import { helpers } from "@/lib";
import { useGetDashboardQuery } from "@/redux/api/admin/dashboardApi";
import { useGetNotiQuery } from "@/redux/api/common/notificationApi";
import { useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { useState } from "react";

export default function HomePage() {
  const auth = useAppSelector((state: AppState) => state.auth.user);
  const [filter, setIsFilter] = useState<any>("monthly");
  const { data: overview } = useGetDashboardQuery({
    type: filter,
  });
  const { data: noti } = useGetNotiQuery({});
  const {
    statistics,
    eventPostingPreference: preference,
    totaluser,
    operator,
    totalRevenue,
    ticketSold,
  } = overview?.data || {};

  const StashItem = [
    {
      title: "Total user",
      value: totaluser,
      icon: "users",
    },
    {
      title: "Total operators",
      value: operator,
      icon: "operators",
    },
    {
      title: "Ticket sold",
      value: ticketSold,
      icon: "t_ticket",
    },
    {
      title: "Total revenue",
      value: totalRevenue,
      icon: "doller",
    },
  ];

  return (
    <div>
      <NavTitle
        title="Dashboard"
        subTitle="Your overall dashboard overview. See the statistics, analytics and manage them"
      />
      <div className="bg-figma-sidebar p-5 rounded-xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6 ">
          <div className="col-span-1 lg:col-span-2 p-4 relative">
            <ul className="lg:absolute bottom-0 left-0">
              <li className="font-semibold text-[28px]">Hello {auth?.name}!</li>
              <li className="text-figma-a_gray">
                Track and manage your application from here.
              </li>
            </ul>
          </div>
          {StashItem.map((item, index) => (
            <StatsCard key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="my-8 space-y-8">
        <div>
          <ul className="flex items-center justify-between">
            <li>
              <h2 className="text-2xl font-medium mb-3">
                User and operator Registration Statistics
              </h2>
            </li>
            <li>
              <DropdownBox
                label={helpers.capitalize(filter)}
                menuItems={["Monthly", "Yearly"]}
                onChange={(v: any) => setIsFilter(v)}
              />
            </li>
          </ul>
          <StatisticsChart type={filter} data={statistics} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-medium mb-3">Recent Activities</h2>
            <div className="bg-figma-sidebar p-4 rounded-xl">
              <ScrollArea className="h-[350px]">
                <div className="space-y-3 ">
                  {noti?.data?.map((item: any, idx: any) => (
                    <RecentCard key={idx} item={item} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-medium mb-3">
              Event Posting Preferences
            </h2>
            <PreferencesChart data={preference} />
          </div>
        </div>
      </div>
    </div>
  );
}
