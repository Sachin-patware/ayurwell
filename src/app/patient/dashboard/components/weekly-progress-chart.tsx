"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { progressData } from "@/lib/placeholder-data";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
    adherence: {
      label: "Adherence",
      color: "hsl(var(--primary))",
    },
    water: {
      label: "Water",
      color: "hsl(var(--secondary))",
    },
  } satisfies ChartConfig;

export default function WeeklyProgressChart() {
    return (
        <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
          <CardDescription>A summary of your adherence and water intake over the last week.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={progressData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                  tickFormatter={(value) => `${value}%`}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="adherence" fill="var(--color-adherence)" radius={4} />
              <Bar dataKey="water" fill="var(--color-water)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
}