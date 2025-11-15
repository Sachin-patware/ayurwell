'use client';

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, PlusCircle, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useUser, addDocumentNonBlocking } from "@/firebase";
import { collection } from "firebase/firestore";

export function BookAppointmentDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [isBooking, setIsBooking] = useState(false);
    const { toast } = useToast();
    const { user } = useUser();
    const firestore = useFirestore();

    const handleBooking = async () => {
        if (!selectedDate || !user || !firestore) {
            toast({
                variant: "destructive",
                title: "Booking Failed",
                description: "Please select a date and ensure you are logged in.",
            });
            return;
        }

        setIsBooking(true);

        // Placeholder for doctor ID
        const doctorId = "placeholder-doctor-id";

        const appointmentData = {
            patientId: user.uid,
            patientName: user.displayName,
            doctorId: doctorId,
            doctorName: "Dr. Anjali Verma", // Placeholder
            datetime: selectedDate.toISOString(),
            status: 'scheduled',
            title: 'Follow-up Consultation',
            createdAt: new Date().toISOString()
        };

        const appointmentsCollection = collection(firestore, 'appointments');
        addDocumentNonBlocking(appointmentsCollection, appointmentData)
            .then(() => {
                toast({
                    title: "Appointment Booked!",
                    description: "Your appointment has been scheduled successfully.",
                    className: "bg-primary text-primary-foreground",
                });
                setIsOpen(false);
            })
            .catch((error: any) => {
                 toast({
                    variant: "destructive",
                    title: "Booking Failed",
                    description: error.message || "Could not book appointment. Please try again.",
                });
            })
            .finally(() => {
                setIsBooking(false);
            });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <PlusCircle className="mr-2" />
                Book New Appointment
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Book a New Appointment</DialogTitle>
            <DialogDescription>
                Select a date for your consultation. Time will be confirmed by the practitioner.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                </div>
            </div>
            <DialogFooter>
            <Button type="button" onClick={handleBooking} disabled={isBooking || !selectedDate}>
                {isBooking ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Booking...
                    </>
                ) : (
                    'Book Appointment'
                )}
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}
