"use client";
import { SingleCalendar } from "@/components/reuseable/single-date";
import { PieCharts } from "@/components/view/oparator/simple/pie-chart";
import TicketChart from "@/components/view/oparator/simple/ticket-chart";
import { useGetDashboardQuery } from "@/redux/api/admin/dashboardApi";
import FavIcon from "@/icon/favIcon";

export default function DashboardHome() {
  const { data: overview } = useGetDashboardQuery({});
  const {
    totalSold,
    totalRevenue,
    totalBookings,
    totalEvents,
    dailyStatistics,
    monthlyStatistics,
  } = overview?.data || {};

  const statsItem = [
    {
      id: 1,
      title: "Total revenue",
      value: totalRevenue,
      icon: "revenue",
    },
    {
      id: 2,
      title: "Total events",
      value: totalEvents,
      icon: "events",
    },
    {
      id: 3,
      title: "Total bookings",
      value: totalBookings,
      icon: "bookings",
    },
    {
      id: 4,
      title: "Ticket sold",
      value: totalSold,
      icon: "ticket",
    },
  ];

  return (
    <div className="container lg:h-[calc(100vh-80px)]">
      <div className="mt-10">
        <div className="flex flex-wrap space-y-2 lg:space-y-0 items-center justify-between mb-5">
          <h1 className="text-2xl text-left text-figma-black">Overview</h1>
          <div className="flex flex-wrap items-center space-x-5 space-y-2 lg:space-y-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg">From:</h2>
              <SingleCalendar onChange={(e: any) => console.log(e)} />
            </div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg">To:</h2>
              <SingleCalendar onChange={(e: any) => console.log(e)} />
            </div>
            <h1 className="size-9 grid place-items-center rounded-md bg-primary">
              <FavIcon className="size-5" name="date_s" />
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          {statsItem.map((item) => (
            <div key={item.id} className="border py-6 space-y-1  rounded-md">
              <div className="bg-[#EDEDED] mx-auto size-12 rounded-full grid place-items-center">
                {" "}
                <FavIcon className="size-6" name={item.icon as any} />
              </div>

              <p className="text-center text-figma-black">{item.title}</p>
              <h1 className="text-center">{item.value || 0}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3 my-8">
        <div className="col-span-2">
          <h1 className="text-2xl text-left text-figma-black mb-4">
            Ticket Sold Statistics
          </h1>
          <TicketChart data={monthlyStatistics} />
        </div>
        <div>
          <h1 className="text-2xl text-left text-figma-black mb-4">
            Total Booking Statistics
          </h1>
          <PieCharts data={dailyStatistics} />
        </div>
      </div>
    </div>
  );
}
