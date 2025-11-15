'use client';

import { useUser } from "@/firebase";
import { ArrowRight, BookUser, Calendar, Phone, Sparkles, NotebookPen, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { patients } from "@/lib/placeholder-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TodayDietPlanCard } from "./components/today-diet-plan-card";
import { TrackProgressCard } from "./components/track-progress-card";

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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {/* Column 1 */}
        <div className="md:col-span-2 xl:col-span-2 space-y-6">
          <Card className="shadow-lg rounded-2xl border-primary/20 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-2xl text-primary">
                <BookUser />
                My Prakriti & Vikriti
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <div className="space-y-1 text-center">
                    <p className="text-muted-foreground">Dominant Dosha (Vikriti)</p>
                    <Badge variant="secondary" className="text-lg">{patient.dosha}</Badge>
                </div>
                <div className="space-y-1 text-center">
                    <p className="text-muted-foreground">Core Constitution (Prakriti)</p>
                    <Badge variant="default" className="text-lg">{patient.prakriti}</Badge>
                </div>
            </CardContent>
            <CardFooter>
                 <Button asChild variant="outline" className="w-full">
                    <Link href="/patient/assessment">
                        View Full Assessment <ArrowRight className="ml-2"/>
                    </Link>
                </Button>
            </CardFooter>
          </Card>
          
          <TodayDietPlanCard />
        </div>

        {/* Column 2 */}
        <div className="md:col-span-2 xl:col-span-2 space-y-6">
            <TrackProgressCard />
            
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Calendar />
                  Consultation
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                  <Button asChild variant="secondary" className="w-full">
                      <Link href="/patient/call"><Phone className="mr-2" />Call Doctor</Link>
                  </Button>
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link href="/patient/appointments">Book Appointment</Link>
                  </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl bg-primary/10">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2 text-primary">
                  <Sparkles />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>Your practitioner has updated your diet plan.</p>
                 <p className="text-xs mt-1">2 hours ago</p>
              </CardContent>
            </Card>
        </div>

      </div>
    </>
  );
}
