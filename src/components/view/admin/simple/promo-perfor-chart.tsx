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

export default function PromoPerforChart({ className }: any) {
  const chartData = [
    { day: "01", user: 450, operator: 380 },
    { day: "02", user: 950, operator: 680 },
    { day: "03", user: 950, operator: 900 },
    { day: "04", user: 320, operator: 180 },
    { day: "05", user: 600, operator: 500 },
    { day: "06", user: 60, operator: 200 },
    { day: "07", user: 50, operator: 300 },
    { day: "08", user: 850, operator: 780 },
    { day: "09", user: 950, operator: 850 },
    { day: "10", user: 330, operator: 450 },
    { day: "11", user: 10, operator: 200 },
    { day: "12", user: 900, operator: 800 },
    { day: "13", user: 480, operator: 600 },
    { day: "14", user: 180, operator: 350 },
    { day: "15", user: 220, operator: 400 },
    { day: "16", user: 370, operator: 550 },
    { day: "17", user: 820, neighbor: 700 },
    { day: "18", user: 830, operator: 750 },
    { day: "19", user: 800, operator: 700 },
    { day: "20", user: 300, operator: 450 },
    { day: "21", user: 750, operator: 650 },
    { day: "22", user: 810, operator: 700 },
    { day: "23", user: 870, operator: 800 },
    { day: "24", user: 880, operator: 800 },
    { day: "25", user: 600, operator: 500 },
    { day: "26", user: 300, operator: 450 },
    { day: "27", user: 10, operator: 150 },
    { day: "28", user: 300, operator: 400 },
    { day: "29", user: 500, operator: 550 },
    { day: "30", user: 400, operator: 300 },
  ];

  const chartConfig = {
    user: {
      label: "Tickets",
      color: "#9e92fe", // updated color
    },
  };

  return (
    <div className="bg-white p-3 rounded-xl w-full">
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
                  tickFormatter={(value) => value}
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
                <Bar
                  dataKey="user"
                  fill="#9e92fe" // applied here
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
