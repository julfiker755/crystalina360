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

export default function TicketChart({ className }: any) {
  const chartData = [
    { day: "01", tickets: 830 },
    { day: "02", tickets: 680 },
    { day: "03", tickets: 980 },
    { day: "04", tickets: 320 },
    { day: "05", tickets: 600 },
    { day: "06", tickets: 60 },
    { day: "07", tickets: 50 },
    { day: "08", tickets: 850 },
    { day: "09", tickets: 950 },
    { day: "10", tickets: 330 },
    { day: "11", tickets: 10 },
    { day: "12", tickets: 900 },
    { day: "13", tickets: 480 },
    { day: "14", tickets: 180 },
    { day: "15", tickets: 220 },
    { day: "16", tickets: 370 },
    { day: "17", tickets: 820 },
    { day: "18", tickets: 830 },
    { day: "19", tickets: 800 },
    { day: "20", tickets: 300 },
    { day: "21", tickets: 750 },
    { day: "22", tickets: 810 },
    { day: "23", tickets: 870 },
    { day: "24", tickets: 880 },
    { day: "25", tickets: 600 },
    { day: "26", tickets: 300 },
    { day: "27", tickets: 10 },
    { day: "28", tickets: 300 },
    { day: "29", tickets: 500 },
    { day: "30", tickets: 400 },
  ];

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
