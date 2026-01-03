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
import { cn } from "@/lib/utils";

export default function BlogStatisticsChart({ className, data }: any) {
  const chartData = data?.map((item: { day: number; views: number }) => ({
    day: item?.day?.toString(),
    views: item?.views || 0,
  }));

  const chartConfig = {
    user: {
      label: "Views",
      color: "#9e92fe",
    },
  };

  return (
    <div className="bg-white p-3 border rounded-xl w-full">
      <ChartContainer
        config={chartConfig}
        className={cn("w-full h-[350px]", className)}
      >
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
          <div
            className={cn("min-w-[700px] sm:min-w-full h-[350px]", className)}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#E5E5E5"
                />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  fontSize={12}
                  tick={{ fill: "#999" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  domain={[0, 1000]}
                  fontSize={12}
                  tick={{ fill: "#999" }}
                />

                <Bar dataKey="user" fill="#9e92fe" radius={[4, 4, 0, 0]} />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ChartContainer>
    </div>
  );
}
