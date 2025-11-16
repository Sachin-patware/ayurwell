'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Loader2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUser, useFirestore, updateDocumentNonBlocking } from "@/firebase";
import { doc } from "firebase/firestore";
import type { Appointment } from "@/lib/data-types";
import { format } from 'date-fns';
import { BookAppointmentDialog } from "./components/book-appointment-dialog";
import { usePatientAppointments } from "@/hooks/useAppointments";
import { useToast } from "@/hooks/use-toast";

export default function AppointmentsPage() {
    const { user } = useUser();
    const { appointments, isLoading, error } = usePatientAppointments(user?.uid);
    const firestore = useFirestore();
    const { toast } = useToast();

    const handleCancel = (appointmentId: string) => {
        if (!user || !firestore) return;
        
        const appointmentRef = doc(firestore, 'appointments', appointmentId);
        updateDocumentNonBlocking(appointmentRef, { status: 'cancelled' });
        toast({
            title: "Appointment Cancelled",
            description: "Your appointment has been cancelled.",
        })
    };

    const upcomingAppointments = appointments?.filter(a => a.status === 'scheduled') || [];
    const pastAppointments = appointments?.filter(a => a.status !== 'scheduled') || [];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-headline">My Appointments</h1>
                <BookAppointmentDialog />
            </div>
            <Card className="shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar />
                        Upcoming & Past Appointments
                    </CardTitle>
                    <CardDescription>
                       Here is a list of your scheduled and completed consultations.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : error ? (
                        <div className="text-destructive text-center p-8 bg-destructive/10 rounded-lg">
                            <p className="font-semibold">Error Loading Appointments</p>
                            <p className="text-sm">Could not load your appointments. Please try again later.</p>
                             <p className="text-xs mt-2 text-red-700">{error.message}</p>
                        </div>
                    ) : (
                        <>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Upcoming</h3>
                                {upcomingAppointments.length > 0 ? (
                                    <div className="space-y-4">
                                        {upcomingAppointments.map(appointment => (
                                            <AppointmentCard key={appointment.id} appointment={appointment} onCancel={handleCancel} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No upcoming appointments.</p>
                                )}
                            </div>
                             <div className="border-t my-6" />
                            <div>
                                <h3 className="text-lg font-semibold mb-2">History</h3>
                                 {pastAppointments.length > 0 ? (
                                    <div className="space-y-4">
                                        {pastAppointments.map(appointment => (
                                            <AppointmentCard key={appointment.id} appointment={appointment} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No past appointments.</p>
                                )}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function AppointmentCard({ appointment, onCancel }: { appointment: Appointment, onCancel?: (id: string) => void }) {
    const isUpcoming = appointment.status === 'scheduled';
    
    const statusVariant: "default" | "secondary" | "destructive" = 
        appointment.status === 'scheduled' ? 'default'
        : appointment.status === 'completed' ? 'secondary'
        : 'destructive';

    return (
        <Card className={`p-4 flex justify-between items-center ${!isUpcoming ? 'bg-muted/50' : ''}`}>
            <div>
                <p className="font-semibold">{appointment.doctorName || "Consultation"}</p>
                <p className={`text-sm font-bold mt-1 ${isUpcoming ? 'text-primary' : 'text-muted-foreground'}`}>
                    {appointment.startTimestamp ? format(appointment.startTimestamp.toDate(), "MMMM dd, yyyy 'at' hh:mm a") : 'Date not set'}
                </p>
            </div>
            <div className="flex items-center gap-4">
                <Badge variant={statusVariant}>{appointment.status}</Badge>
                {isUpcoming && onCancel && 
                    <Button variant="outline" size="sm" onClick={() => onCancel(appointment.id)}>
                        <XCircle className="mr-2 h-4 w-4"/>
                        Cancel
                    </Button>
                }
            </div>
        </Card>
    );
}
