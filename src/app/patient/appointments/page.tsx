'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, PlusCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import type { Appointment } from "@/lib/data-types";
import { format } from 'date-fns';
import { BookAppointmentDialog } from "./components/book-appointment-dialog";

export default function AppointmentsPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const appointmentsQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(
            collection(firestore, 'appointments'),
            where('patientId', '==', user.uid),
            orderBy('datetime', 'desc')
        );
    }, [user, firestore]);

    const { data: appointments, isLoading, error } = useCollection<Appointment>(appointmentsQuery);

    const upcomingAppointments = appointments?.filter(a => new Date(a.datetime) >= new Date() && a.status === 'scheduled') || [];
    const pastAppointments = appointments?.filter(a => new Date(a.datetime) < new Date() || a.status !== 'scheduled') || [];

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
                            <p className="text-sm">Could not load your appointments due to a permission issue. Please contact support.</p>
                             <p className="text-xs mt-2 text-red-700">{error.message}</p>
                        </div>
                    ) : (
                        <>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Upcoming</h3>
                                {upcomingAppointments.length > 0 ? (
                                    <div className="space-y-4">
                                        {upcomingAppointments.map(appointment => (
                                            <AppointmentCard key={appointment.id} appointment={appointment} />
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

function AppointmentCard({ appointment }: { appointment: Appointment }) {
    const isUpcoming = appointment.status === 'scheduled';
    
    const statusVariant: "default" | "secondary" | "destructive" = 
        appointment.status === 'scheduled' ? 'default'
        : appointment.status === 'completed' ? 'secondary'
        : 'destructive';

    return (
        <Card className={`p-4 flex justify-between items-center ${!isUpcoming ? 'bg-muted/50' : ''}`}>
            <div>
                <p className="font-semibold">{appointment.title || "Consultation"}</p>
                <p className="text-sm text-muted-foreground">With {appointment.doctorName}</p>
                <p className={`text-sm font-bold mt-1 ${isUpcoming ? 'text-primary' : 'text-muted-foreground'}`}>
                    {format(new Date(appointment.datetime), "MMMM dd, yyyy 'at' hh:mm a")}
                </p>
            </div>
            <div className="flex items-center gap-4">
                <Badge variant={statusVariant}>{appointment.status}</Badge>
                {isUpcoming && <Button variant="outline" size="sm">Cancel</Button>}
            </div>
        </Card>
    );
}
