import NavTitle from "@/components/reuseable/nav-title";
import { ScrollArea } from "@/components/ui";
import PreferencesChart from "@/components/view/admin/simple/preferences-chart";
import StatisticsChart from "@/components/view/admin/simple/statistics-chart";
import {
  RecentCard,
  StatsCard,
} from "@/components/view/admin/simple/stats-card";
import FavIcon from "@/icon/favIcon";
import { ArrowUpRight } from "lucide-react";

const totalStash = [
  {
    title: "Total user",
    value: 1200,
    icon: "users",
  },
  {
    title: "Total operators",
    value: 300,
    icon: "operators",
  },
  {
    title: "Ticket sold",
    value: 17000,
    icon: "t_ticket",
  },
  {
    title: "Total revenue",
    value: 35000,
    icon: "doller",
  },
];

const activityData = [
  {
    id: 1,
    title: "Ticket booked",
    timestamp: "5 Sep, 2025 at 10:30 AM",
    icon: "tickets_i",
  },
  {
    id: 2,
    title: "New event posted",
    timestamp: "5 Sep, 2025 at 10:30 AM",
    icon: "events_i",
  },
  {
    id: 3,
    title: "New user registered",
    timestamp: "5 Sep, 2025 at 10:30 AM",
    icon: "users_i",
  },
  {
    id: 4,
    title: "New operator registered",
    timestamp: "5 Sep, 2025 at 10:30 AM",
    icon: "operators_i",
  },
];

export default function RootPage() {
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
              <li className="font-semibold text-[28px]">Hello Abid!</li>
              <li className="text-figma-a_gray">
                Track and manage your application from here.
              </li>
            </ul>
          </div>
          {totalStash.map((item, index) => (
            <StatsCard key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="my-8 space-y-8">
        <div>
          <h2 className="text-2xl font-medium mb-3">
            User and operator registration statistics
          </h2>
          <StatisticsChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-medium mb-3">Recent activities</h2>
            <div className="bg-figma-sidebar p-4 rounded-xl">
              <ScrollArea className="h-[350px]">
                <div className="space-y-3 ">
                  {activityData.map((item, idx) => (
                    <RecentCard key={idx} {...item} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-medium mb-3">
              Event posting preferences
            </h2>
            <PreferencesChart />
          </div>
        </div>
      </div>
    </div>
  );
}
