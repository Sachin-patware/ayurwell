"use client"

import { progressData } from "@/lib/placeholder-data";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const chartConfig = {
    adherence: {
      label: "Adherence",
      color: "hsl(var(--primary))",
    },
    energyLevel: {
      label: "Energy",
      color: "hsl(var(--accent))",
    },
  } satisfies ChartConfig;

const weeklyData = [
    { date: "Mon", energyLevel: 6, adherence: 80 },
    { date: "Tue", energyLevel: 7, adherence: 90 },
    { date: "Wed", energyLevel: 5, adherence: 70 },
    { date: "Thu", energyLevel: 8, adherence: 85 },
    { date: "Fri", energyLevel: 7, adherence: 95 },
    { date: "Sat", energyLevel: 6, adherence: 75 },
    { date: "Sun", energyLevel: 9, adherence: 100 },
];


export default function WeeklyProgressChart() {
    return (
        <div className="h-full flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Weekly Progress</h3>
            <p className="text-sm text-muted-foreground">A summary of your energy and adherence.</p>
          </div>
          <div className="flex-grow">
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={weeklyData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                    yAxisId="left"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => `${value}`}
                    domain={[0, 10]}
                />
                 <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 100]}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="energyLevel" fill="var(--color-energyLevel)" radius={4} />
                <Bar yAxisId="right" dataKey="adherence" fill="var(--color-adherence)" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
      </div>
    )
}
