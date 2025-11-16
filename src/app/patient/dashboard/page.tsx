
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
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          Welcome back, {patientName}!
        </h1>
        <p className="text-muted-foreground mt-1">Here’s your wellness snapshot for today. Stay mindful and nourished.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-start">

        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          <TodayDietPlanCard />
          <TrackProgressCard />
        </div>

        {/* Side Column */}
        <div className="space-y-8">
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline text-xl">
                  <BookUser className="text-primary"/>
                  My Ayurvedic Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1 p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prakriti</p>
                      <Badge variant="default" className="text-base font-bold px-3 py-1">{patient.prakriti}</Badge>
                      <p className="text-xs text-muted-foreground">(Core Constitution)</p>
                  </div>
                  <div className="space-y-1 p-3 bg-accent/10 rounded-lg">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vikriti</p>
                      <Badge variant="secondary" className="text-base font-bold px-3 py-1 border-accent/50">{patient.dosha}</Badge>
                      <p className="text-xs text-muted-foreground">(Current Imbalance)</p>
                  </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Calendar />
                  Consult Your Practitioner
                </CardTitle>
                 <CardDescription>Connect for follow-ups or advice.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link href="/patient/appointments">Book Appointment</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                      <Link href="/patient/call"><Phone className="mr-2" />Quick Call</Link>
                  </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl bg-primary/5 border-primary/20">
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
