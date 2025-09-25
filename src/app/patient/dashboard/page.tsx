import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { patients, progressData } from "@/lib/placeholder-data";
import DietPlan from "./components/diet-plan";
import DailyLog from "./components/daily-log";

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

export default function PatientDashboard() {
  const patient = patients[0];

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-5">
      <div className="lg:col-span-2 xl:col-span-3 grid auto-rows-max items-start gap-4 md:gap-8">
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">
                    Welcome back, {patient.name.split(' ')[0]}!
                </CardTitle>
                <CardDescription>
                    Here is your plan for today. Stay consistent on your path to wellness.
                </CardDescription>
            </CardHeader>
        </Card>
        
        <DietPlan />

        <DailyLog />
      </div>

      <div className="lg:col-span-1 xl:col-span-2 grid auto-rows-max items-start gap-4 md:gap-8">
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
      </div>
    </div>
  );
}
