'use client';

import { useEffect, useState } from "react";
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
import { useFirestore, useUser, addDocumentNonBlocking, getDocument } from "@/firebase";
import { collection, query, where, getDocs, doc, Timestamp, getDoc } from "firebase/firestore";
import type { DoctorProfile } from "@/lib/data-types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function BookAppointmentDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
    const [notes, setNotes] = useState('');
    const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
    const [isBooking, setIsBooking] = useState(false);
    
    const { toast } = useToast();
    const { user } = useUser();
    const firestore = useFirestore();

    useEffect(() => {
        if (!firestore) return;
        const fetchDoctors = async () => {
            const doctorsCollection = collection(firestore, 'doctors');
            // Optionally, you can add a where clause to only fetch verified doctors
            const q = query(doctorsCollection, where('status', '==', 'verified'));
            const querySnapshot = await getDocs(q);
            const doctorsList: DoctorProfile[] = [];
            querySnapshot.forEach((doc) => {
                doctorsList.push({ id: doc.id, ...doc.data() } as DoctorProfile);
            });
            setDoctors(doctorsList);
        };
        fetchDoctors();
    }, [firestore]);

    const handleBooking = async () => {
        if (!selectedDate || !user || !firestore || !selectedDoctorId) {
            toast({
                variant: "destructive",
                title: "Booking Failed",
                description: "Please select a doctor and a date.",
            });
            return;
        }

        setIsBooking(true);

        try {
            const doctorRef = doc(firestore, 'doctors', selectedDoctorId);
            const doctorSnap = await getDoc(doctorRef);

            if (!doctorSnap.exists()) {
                throw new Error("Selected doctor not found.");
            }
            
            const patientRef = doc(firestore, 'users', user.uid);
            const patientSnap = await getDoc(patientRef);
            
            const doctorName = doctorSnap.data().name || 'N/A';
            const patientName = patientSnap.exists() ? patientSnap.data().name : user.displayName || 'N/A';
            
            const startTimestamp = Timestamp.fromDate(selectedDate);
            // Assuming 1 hour appointment for now
            const endTimestamp = Timestamp.fromMillis(selectedDate.getTime() + 60 * 60 * 1000);

            const appointmentData = {
                patientId: user.uid,
                patientName,
                doctorId: selectedDoctorId,
                doctorName,
                startTimestamp,
                endTimestamp,
                status: 'scheduled',
                notes: notes,
                createdAt: Timestamp.now()
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
                    // Reset form
                    setSelectedDoctorId('');
                    setSelectedDate(new Date());
                    setNotes('');
                });
        } catch (error: any) {
             toast({
                variant: "destructive",
                title: "Booking Failed",
                description: error.message || "Could not book appointment. Please try again.",
            });
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <PlusCircle className="mr-2" />
                Book New Appointment
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
            <DialogTitle>Book a New Appointment</DialogTitle>
            <DialogDescription>
                Select a practitioner and a date for your consultation.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Select onValueChange={setSelectedDoctorId} value={selectedDoctorId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a practitioner" />
                    </SelectTrigger>
                    <SelectContent>
                        {doctors.map(doctor => (
                            <SelectItem key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialization}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                </div>
                 <Textarea 
                    placeholder="Add notes for the practitioner (optional)..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            <DialogFooter>
            <Button type="button" onClick={handleBooking} disabled={isBooking || !selectedDate || !selectedDoctorId}>
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
