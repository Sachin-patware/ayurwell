'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Calendar, MoreHorizontal, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useCollection, useFirestore, useUser, useMemoFirebase, updateDocumentNonBlocking } from "@/firebase";
import { collection, query, where, orderBy, doc } from "firebase/firestore";
import type { Appointment } from "@/lib/data-types";
import { format } from 'date-fns';

export default function PractitionerAppointmentsPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const appointmentsQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        // In a real app, doctorId should be fetched from the doctor's profile
        const doctorId = "placeholder-doctor-id";
        return query(
            collection(firestore, 'appointments'),
            where('doctorId', '==', doctorId),
            orderBy('datetime', 'desc')
        );
    }, [user, firestore]);

    const { data: appointments, isLoading, error } = useCollection<Appointment>(appointmentsQuery);

    const upcomingAppointments = appointments?.filter(a => a.status === 'scheduled') || [];
    const pastAppointments = appointments?.filter(a => a.status !== 'scheduled') || [];

    const handleUpdateStatus = (appointmentId: string, status: 'completed' | 'cancelled') => {
        if (!firestore) return;
        const appointmentRef = doc(firestore, 'appointments', appointmentId);
        updateDocumentNonBlocking(appointmentRef, { status });
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Manage Appointments</h1>

            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="text-primary"/>
                        Upcoming Appointments
                    </CardTitle>
                    <CardDescription>Appointments that are scheduled and require attention.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading && <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary"/></div>}
                    {error && <p className="text-destructive text-center">Could not load appointments.</p>}
                    {!isLoading && !error && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {upcomingAppointments.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-muted-foreground">No upcoming appointments.</TableCell>
                                    </TableRow>
                                )}
                                {upcomingAppointments.map(appointment => (
                                    <TableRow key={appointment.id}>
                                        <TableCell className="font-medium">{appointment.patientName}</TableCell>
                                        <TableCell>{format(new Date(appointment.datetime), "PPP p")}</TableCell>
                                        <TableCell><Badge>{appointment.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleUpdateStatus(appointment.id, 'completed')}>
                                                        <CheckCircle className="mr-2" /> Mark as Completed
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleUpdateStatus(appointment.id, 'cancelled')} className="text-destructive">
                                                        <XCircle className="mr-2" /> Cancel
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

             <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Appointment History</CardTitle>
                    <CardDescription>A log of all past appointments.</CardDescription>
                </CardHeader>
                <CardContent>
                     {isLoading && <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary"/></div>}
                    {!isLoading && pastAppointments.length > 0 && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pastAppointments.map(appointment => (
                                    <TableRow key={appointment.id} className="bg-muted/50">
                                        <TableCell>{appointment.patientName}</TableCell>
                                        <TableCell>{format(new Date(appointment.datetime), "PPP p")}</TableCell>
                                        <TableCell>
                                            <Badge variant={appointment.status === 'completed' ? 'secondary' : 'destructive'}>
                                                {appointment.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                    {!isLoading && pastAppointments.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">No appointment history.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
