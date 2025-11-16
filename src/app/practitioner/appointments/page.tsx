'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Calendar, MoreHorizontal, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useUser, useFirestore, updateDocumentNonBlocking } from "@/firebase";
import { doc } from "firebase/firestore";
import type { Appointment } from "@/lib/data-types";
import { format } from 'date-fns';
import { usePractitionerAppointments } from "@/hooks/useAppointments";
import { useToast } from "@/hooks/use-toast";

export default function PractitionerAppointmentsPage() {
    const { user } = useUser();
    const { toast } = useToast();
    const firestore = useFirestore();

    const { appointments, isLoading, error } = usePractitionerAppointments(user?.uid);
    
    const upcomingAppointments = appointments?.filter(a => a.status === 'scheduled') || [];
    const pastAppointments = appointments?.filter(a => a.status !== 'scheduled') || [];

    const handleUpdateStatus = (appointmentId: string, status: 'completed' | 'cancelled') => {
        if (!firestore) return;
        const appointmentRef = doc(firestore, 'appointments', appointmentId);
        updateDocumentNonBlocking(appointmentRef, { status });
        toast({
            title: `Appointment ${status.charAt(0).toUpperCase() + status.slice(1)}`,
            description: `The appointment has been marked as ${status}.`
        })
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
                    {error && <p className="text-destructive text-center p-4 bg-destructive/10 rounded-lg">{error.message}</p>}
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
                                        <TableCell colSpan={4} className="text-center text-muted-foreground h-24">No upcoming appointments.</TableCell>
                                    </TableRow>
                                )}
                                {upcomingAppointments.map(appointment => (
                                    <TableRow key={appointment.id}>
                                        <TableCell className="font-medium">{appointment.patientName}</TableCell>
                                        <TableCell>{appointment.startTimestamp ? format(appointment.startTimestamp.toDate(), "PPP p") : 'N/A'}</TableCell>
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
                    {!isLoading && !error && (
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pastAppointments.length === 0 && (
                                     <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground h-24">No appointment history.</TableCell>
                                    </TableRow>
                                )}
                                {pastAppointments.map(appointment => (
                                    <TableRow key={appointment.id} className="bg-muted/50">
                                        <TableCell>{appointment.patientName}</TableCell>
                                        <TableCell>{appointment.startTimestamp ? format(appointment.startTimestamp.toDate(), "PPP p") : 'N/A'}</TableCell>
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
                </CardContent>
            </Card>
        </div>
    );
}
