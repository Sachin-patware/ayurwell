'use client';

import { useParams } from 'next/navigation';
import { patients, dietPlan, progressData } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Leaf, FileText, Edit } from 'lucide-react';
import WeeklyProgressChart from '@/app/patient/dashboard/components/weekly-progress-chart';
import Link from 'next/link';

export default function PatientDetailPage() {
  const params = useParams();
  const { id } = params;
  const patient = patients.find((p) => p.id === id);
  const patientAvatar = PlaceHolderImages.find((img) => img.id === patient?.avatar);
  const currentDietPlan = dietPlan.monday; // Placeholder

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Patient not found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-5">
      <div className="lg:col-span-2 xl:col-span-3 grid auto-rows-max items-start gap-4 md:gap-8">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-start gap-4">
            <Avatar className="h-20 w-20 border">
              {patientAvatar && <AvatarImage src={patientAvatar.imageUrl} alt={patient.name} />}
              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <CardTitle className="font-headline text-2xl">{patient.name}</CardTitle>
              <CardDescription>{patient.email}</CardDescription>
              <div className="flex items-center gap-2 pt-2">
                <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'} className={patient.status === 'Active' ? 'bg-primary/80 text-primary-foreground' : ''}>
                  {patient.status}
                </Badge>
                <Badge variant="outline">Prakriti: {patient.prakriti}</Badge>
                <Badge variant="outline">Dosha: {patient.dosha}</Badge>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4"/>
                    Edit
                </Button>
            </div>
          </CardHeader>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Current Diet Plan</CardTitle>
                <CardDescription>This is the active diet plan for {patient.name}.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="divide-y divide-border">
                    {currentDietPlan.map(meal => (
                        <li key={meal.meal} className="py-3">
                            <p className="font-semibold">{meal.meal}</p>
                            <p className="text-muted-foreground">{meal.food}</p>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 xl:col-span-2 grid auto-rows-max items-start gap-4 md:gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
                <Button asChild>
                  <Link href={`/practitioner/diet-plans/generate?patientId=${patient.id}`}>
                      <Leaf className="mr-2 h-4 w-4"/>
                      Generate Diet Plan
                  </Link>
                </Button>
                 <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4"/>
                    View Full History
                </Button>
            </CardContent>
        </Card>
        <WeeklyProgressChart />
      </div>
    </div>
  );
}
