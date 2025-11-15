import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AppointmentsPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-headline">My Appointments</h1>
                 <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <PlusCircle className="mr-2" />
                    Book New Appointment
                </Button>
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
                <CardContent className="space-y-4">
                     <Card className="p-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">Follow-up Consultation</p>
                            <p className="text-sm text-muted-foreground">With Dr. Anjali Verma</p>
                            <p className="text-sm font-bold text-primary mt-1">August 20, 2024 at 11:00 AM</p>
                        </div>
                        <Badge>Upcoming</Badge>
                    </Card>
                     <Card className="p-4 flex justify-between items-center bg-muted/50">
                        <div>
                            <p className="font-semibold">Initial Assessment</p>
                            <p className="text-sm text-muted-foreground">With Dr. Anjali Verma</p>
                            <p className="text-sm text-muted-foreground mt-1">July 15, 2024 at 09:30 AM</p>
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}
