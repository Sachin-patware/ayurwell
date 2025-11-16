'use client';

import {
  Activity,
  CalendarCheck,
  Loader2,
  PlusCircle,
  Users,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { patients } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@/firebase';
import { usePractitionerAppointments } from '@/hooks/useAppointments';
import { format } from 'date-fns';

export default function PractitionerDashboard() {
  const { user } = useUser();
  const { appointments, isLoading } = usePractitionerAppointments(user?.uid);
  const patientAvatars = new Map(PlaceHolderImages.filter(img => img.id.startsWith('avatar')).map(img => [img.id, img]));
  
  const todaysAppointments = appointments?.filter(a => {
    const today = new Date();
    const apptDate = a.startTimestamp.toDate();
    return apptDate.getDate() === today.getDate() &&
           apptDate.getMonth() === today.getMonth() &&
           apptDate.getFullYear() === today.getFullYear();
  }) || [];


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Practitioner Dashboard</h1>
        <Button asChild>
            <Link href="/practitioner/add-patient">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Patient
            </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patients.filter(p => p.status === 'Active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {patients.length} total patients
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Appointments Today
            </CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {isLoading ? <Loader2 className="h-6 w-6 animate-spin"/> : (
                <>
                    <div className="text-2xl font-bold">{todaysAppointments.length}</div>
                    <p className="text-xs text-muted-foreground">
                        {appointments?.filter(a => a.status === 'scheduled').length} total upcoming
                    </p>
                </>
             )}
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups Required</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patients.filter(p => p.status === 'Follow-up').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require attention this week
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>
              An overview of your scheduled appointments for today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todaysAppointments.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-muted-foreground h-24">
                                No appointments scheduled for today.
                            </TableCell>
                        </TableRow>
                    ) : (
                        todaysAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                            <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>{appointment.patientName?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{appointment.patientName}</span>
                            </div>
                            </TableCell>
                            <TableCell>{format(appointment.startTimestamp.toDate(), 'p')}</TableCell>
                            <TableCell>
                            <Badge variant={appointment.status === 'scheduled' ? 'default' : 'secondary'} className={appointment.status === 'scheduled' ? 'bg-primary/80 text-primary-foreground' : ''}>
                                {appointment.status}
                            </Badge>
                            </TableCell>
                        </TableRow>
                        ))
                    )}
                </TableBody>
                </Table>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Patient Activity</CardTitle>
            <CardDescription>
              Updates from your patients' progress logs.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {patients.slice(0, 4).map((patient) => (
              <div className="flex items-center justify-between" key={patient.id}>
                <div className="flex items-center gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={patientAvatars.get(patient.avatar)?.imageUrl} />
                    <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {patient.lastActivity}
                    </p>
                  </div>
                </div>
                 <Badge variant={patient.status === 'Active' ? 'outline' : 'secondary'}>{patient.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
