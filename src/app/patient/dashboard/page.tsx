'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { patients } from "@/lib/placeholder-data";
import DietPlan from "./components/diet-plan";
import DailyLog from "./components/daily-log";
import WeeklyProgressChart from "./components/weekly-progress-chart";


export default function PatientDashboard() {
  const patient = patients[0];

  return (
    <>
      <h1 className="text-2xl font-semibold font-headline mb-4">Patient Dashboard</h1>
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
          <WeeklyProgressChart />
        </div>
      </div>
    </>
  );
}
