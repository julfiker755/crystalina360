"use client";

import {
  Area,
  AreaChart,
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
import { cn } from "@/lib/utils";

export default function PreferencesChart({ className, data }: any) {
  const chartData = data?.map((item: { day: number; events: number }) => ({
    day: item?.day?.toString(),
    events: item?.events || 0,
  }));

  const chartConfig = {
    events: {
      label: "Events",
      color: "#9B7BA8",
    },
  };

  return (
    <div className="bg-white p-3 border rounded-xl w-full">
      <ChartContainer
        config={chartConfig}
        className={cn("w-full h-[350px]", className)}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4C5E2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#D4C5E2" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={true}
              strokeDasharray="3 3"
              stroke="#E8E8E8"
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              fontSize={12}
              tick={{ fill: "#999" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              domain={[0, 100]}
              fontSize={12}
              tick={{ fill: "#999" }}
            />
            <Area
              type="monotone"
              dataKey="events"
              stroke="#9B7BA8"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorEvents)"
              dot={{ fill: "#9B7BA8", r: 5, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
