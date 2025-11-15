'use client';

import { useUser } from "@/firebase";
import { BookUser, Calendar, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { patients } from "@/lib/placeholder-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

      <div className="grid gap-8 md:grid-cols-3">

        {/* Main Column */}
        <div className="md:col-span-2 space-y-8">
          <TodayDietPlanCard />
          <TrackProgressCard />
        </div>

        {/* Side Column */}
        <div className="space-y-8">
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline text-xl">
                  <BookUser className="text-primary"/>
                  My Constitution
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Vikriti (Imbalance)</p>
                      <Badge variant="secondary" className="text-md">{patient.dosha}</Badge>
                  </div>
                  <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Prakriti (Core)</p>
                      <Badge variant="default" className="text-md">{patient.prakriti}</Badge>
                  </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Calendar />
                  Consultation
                </CardTitle>
                 <CardDescription>Connect with your practitioner.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                  <Button asChild variant="secondary" size="lg">
                      <Link href="/patient/call"><Phone className="mr-2" />Call Doctor</Link>
                  </Button>
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link href="/patient/appointments">Book Appointment</Link>
                  </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl bg-primary/5">
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
