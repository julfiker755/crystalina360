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

interface ChartData {
  day: string;
  count: number;
}

interface PieChartsProps {
  data: ChartData[];
}

const chartConfig: ChartConfig = {
  value: {
    label: "Value",
  },
  Fri: {
    label: "Fri",
    color: "hsl(260 80% 60%)", // Purple
  },
  Thu: {
    label: "Thu",
    color: "hsl(140 70% 70%)", // Green
  },
  Wed: {
    label: "Wed",
    color: "hsl(240 60% 40%)", // Blue
  },
  Tue: {
    label: "Tue",
    color: "hsl(36 90% 60%)", // Orange
  },
  Mon: {
    label: "Mon",
    color: "hsl(190 70% 60%)", // Light blue
  },
  Sun: {
    label: "Sun",
    color: "hsl(0 80% 70%)", // Coral
  },
  Sat: {
    label: "Sat",
    color: "hsl(280 70% 40%)", // Dark purple
  },
};

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
        {`€${value.toFixed(1)}`}
      </text>
    </g>
  );
};

export function PieCharts({ data }: PieChartsProps) {
  const totalValue = data?.reduce((sum, entry) => sum + entry.count, 0);

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
            data={data}
            dataKey="count"
            nameKey="day"
            innerRadius={80}
            outerRadius={120}
            strokeWidth={2}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data?.map((entry, index) => {
              const dayConfig =
                chartConfig[entry.day as keyof typeof chartConfig];
              return (
                <Cell key={`cell-${index}`} fill={dayConfig?.color || "#ccc"} />
              );
            })}
            <Label
              value={`€${totalValue?.toFixed(1)}`}
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
