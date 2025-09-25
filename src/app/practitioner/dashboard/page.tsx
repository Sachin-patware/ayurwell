import {
  Activity,
  CalendarCheck,
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
import { appointments, patients } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PractitionerDashboard() {
  const patientAvatars = new Map(PlaceHolderImages.filter(img => img.id.startsWith('avatar')).map(img => [img.id, img]));

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold font-headline">Dashboard</h1>
        <div className="flex gap-2">
            <Button asChild>
                <Link href="/practitioner/add-patient">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Patient
                </Link>
            </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
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
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Appointments Today
            </CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {appointments.filter(a => a.status === 'Pending').length} pending confirmation
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups</CardTitle>
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
        <Card className="xl:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>
              An overview of your scheduled appointments for today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={patientAvatars.get(appointment.patient.avatar)?.imageUrl} />
                            <AvatarFallback>{appointment.patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{appointment.patient.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <Badge variant={appointment.status === 'Confirmed' ? 'default' : 'secondary'} className={appointment.status === 'Confirmed' ? 'bg-primary/80 text-primary-foreground' : ''}>
                        {appointment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="shadow-md">
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
    </>
  );
}
