"use client";
import { Pie, PieChart, Cell, Label } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartData = [
  { day: "Fri", value: 1264.2, fill: "hsl(260 80% 60%)" }, // Medium purple
  { day: "Thu", value: 1308.7, fill: "hsl(140 70% 70%)" }, // Light green
  { day: "Wed", value: 1110.7, fill: "hsl(240 60% 40%)" }, // Darker blue-purple
  { day: "Tue", value: 954.6, fill: "hsl(36 90% 60%)" }, // Orange
  { day: "Mon", value: 1201.8, fill: "hsl(190 70% 60%)" }, // Light blue
  { day: "Sun", value: 740.1, fill: "hsl(0 80% 70%)" }, // Light coral
  { day: "Sat", value: 1343.3, fill: "hsl(280 70% 40%)" }, // Darker purple
];

const chartConfig = {
  value: {
    label: "Value",
  },
  Fri: {
    label: "Fri",
    color: "hsl(260 80% 60%)",
  },
  Thu: {
    label: "Thu",
    color: "hsl(140 70% 70%)",
  },
  Wed: {
    label: "Wed",
    color: "hsl(240 60% 40%)",
  },
  Tue: {
    label: "Tue",
    color: "hsl(36 90% 60%)",
  },
  Mon: {
    label: "Mon",
    color: "hsl(190 70% 60%)",
  },
  Sun: {
    label: "Sun",
    color: "hsl(0 80% 70%)",
  },
  Sat: {
    label: "Sat",
    color: "hsl(280 70% 40%)",
  },
} satisfies ChartConfig;

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  payload,
  value,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  payload: { day: string; fill: string };
  value: number;
}) => {
  const radius = outerRadius * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const color = payload.fill;
  const textAnchor = x > cx ? "start" : "end";
  const lineX2 = x > cx ? x + 20 : x - 20;

  return (
    <g>
      <polyline
        points={`${cx + outerRadius * Math.cos(-midAngle * RADIAN)},${
          cy + outerRadius * Math.sin(-midAngle * RADIAN)
        } ${x},${y} ${lineX2},${y}`}
        stroke={color}
        fill="none"
        strokeWidth={1}
      />
      <text
        x={lineX2 + (x > cx ? 5 : -5)}
        y={y - 5}
        textAnchor={textAnchor}
        fill="#666"
        className="text-xs"
      >
        {payload.day}
      </text>
      <text
        x={lineX2 + (x > cx ? 5 : -5)}
        y={y + 10}
        textAnchor={textAnchor}
        fill={color}
        className="font-medium text-sm"
      >
        {`$${value.toFixed(1)}`}
      </text>
    </g>
  );
};

export function PieCharts() {
  const totalValue = chartData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="bg-white p-3 border rounded-xl h-fit w-full overflow-x-auto">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[350px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="day"
            innerRadius={80}
            outerRadius={120}
            strokeWidth={2}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <Label
              value={`$${totalValue.toFixed(1)}`}
              position="center"
              className="fill-foreground text-3xl font-bold"
            />
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey="day" />} />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
