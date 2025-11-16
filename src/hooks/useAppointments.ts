'use client';

import { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot, FirestoreError } from "firebase/firestore";
import { useFirestore, useMemoFirebase } from "@/firebase";
import type { Appointment } from "@/lib/data-types";

export function usePatientAppointments(patientId?: string) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);
  const firestore = useFirestore();

  const appointmentsQuery = useMemoFirebase(() => {
    if (!patientId || !firestore) return null;
    return query(
        collection(firestore, 'appointments'), 
        where("patientId", "==", patientId), 
        orderBy("startTimestamp", "desc")
    );
  }, [patientId, firestore]);

  useEffect(() => {
    if (!appointmentsQuery) {
        setIsLoading(false);
        setAppointments([]);
        return;
    }

    const unsubscribe = onSnapshot(appointmentsQuery, (snapshot) => {
      const newAppointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
      setAppointments(newAppointments);
      setIsLoading(false);
    }, (err) => {
        console.error("Error fetching patient appointments: ", err);
        setError(err);
        setIsLoading(false);
    });

    return () => unsubscribe();
  }, [appointmentsQuery]);

  return { appointments, isLoading, error };
}

export function usePractitionerAppointments(practitionerId?: string) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);
  const firestore = useFirestore();

  const appointmentsQuery = useMemoFirebase(() => {
    if (!practitionerId || !firestore) return null;
    return query(
        collection(firestore, 'appointments'), 
        where("doctorId", "==", practitionerId), 
        orderBy("startTimestamp", "desc")
    );
  }, [practitionerId, firestore]);

  useEffect(() => {
     if (!appointmentsQuery) {
        setIsLoading(false);
        setAppointments([]);
        return;
    }
    
    const unsubscribe = onSnapshot(appointmentsQuery, (snapshot) => {
      const newAppointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
      setAppointments(newAppointments);
      setIsLoading(false);
    }, (err) => {
        console.error("Error fetching practitioner appointments: ", err);
        setError(err);
        setIsLoading(false);
    });

    return () => unsubscribe();
  }, [appointmentsQuery]);

  return { appointments, isLoading, error };
}
