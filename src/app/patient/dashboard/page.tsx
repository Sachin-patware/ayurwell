'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import DietPlan from "./components/diet-plan";
import DailyLog from "./components/daily-log";
import WeeklyProgressChart from "./components/weekly-progress-chart";
import { useUser } from "@/firebase";
import { ArrowRight, BookUser, Calendar, MessageSquare, NotebookPen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { patients } from "@/lib/placeholder-data";


export default function PatientDashboard() {
  const { user } = useUser();
  const patientName = user?.displayName?.split(' ')[0] || "there";
  
  // Using placeholder data for UI demonstration
  const patient = patients[0];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">
          Welcome back, {patientName}!
        </h1>
        <p className="text-muted-foreground">Here’s your wellness snapshot for today. Stay mindful and nourished.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Main Column */}
        <div className="lg:col-span-2 grid gap-6">
          
          <Card className="shadow-lg rounded-2xl border-primary/20 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-2xl text-primary">
                <BookUser />
                My Prakriti & Vikriti
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-muted-foreground">Your core constitution (Prakriti)</p>
                    <Badge variant="default" className="text-lg">{patient.prakriti}</Badge>
                </div>
                <div className="space-y-1">
                    <p className="text-muted-foreground">Current imbalance (Vikriti)</p>
                    <Badge variant="secondary" className="text-lg">{patient.dosha}</Badge>
                </div>
            </CardContent>
            <CardFooter>
                 <Button asChild variant="outline">
                    <Link href="/patient/assessment">
                        View Full Assessment <ArrowRight className="ml-2"/>
                    </Link>
                </Button>
            </CardFooter>
          </Card>

          <DietPlan />

          <DailyLog />
        </div>

        {/* Side Column */}
        <div className="lg:col-span-1 grid auto-rows-max gap-6">
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Calendar />
                Appointments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-center text-muted-foreground">
                    <p>No upcoming appointments.</p>
                </div>
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/patient/appointments">Book Appointment</Link>
                </Button>
                <Button asChild variant="secondary" className="w-full">
                    <Link href="/patient/chat"><MessageSquare className="mr-2" />Chat with Practitioner</Link>
                </Button>
            </CardContent>
          </Card>

          <WeeklyProgressChart />

           <Card className="shadow-lg rounded-2xl bg-primary/10">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2 text-primary">
                <Sparkles />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p>Your practitioner has updated your diet plan.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
