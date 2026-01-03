"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { cn } from "@/lib";

export default function TicketChart({ className, data }: any) {
  const chartData = data?.map((item: { day: any; count: number }) => ({
    day: item?.day?.toString(),
    tickets: item?.count || 0,
  }));

  const chartConfig = {
    tickets: {
      label: "Tickets",
      color: "#8979FF",
    },
  };

  return (
    <div className="bg-white p-3 border rounded-xl w-full">
      <ChartContainer
        config={chartConfig}
        className={cn("w-full h-[350px]", className)}
      >
        {/* Scrollable Wrapper */}
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
          {/* Minimum width ensures scroll on small screens */}
          <div
            className={cn("min-w-[700px] sm:min-w-full h-[350px]", className)}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                  fontSize={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  domain={[0, 1000]}
                  fontSize={12}
                />
                <Bar
                  dataKey="tickets"
                  fill={chartConfig.tickets.color}
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ChartContainer>
    </div>
  );
}
