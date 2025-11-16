import type { Timestamp } from "firebase/firestore";

export type Patient = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'Active' | 'Inactive' | 'Follow-up';
  lastActivity: string;
  prakriti: string;
  dosha: string;
};

export type Appointment = {
  id: string;
  title?: string;
  patientId: string;
  patientName?: string;
  doctorId: string;
  doctorName?: string;
  datetime: string; // Kept for old refs, but new logic will use timestamps
  startTimestamp: Timestamp;
  endTimestamp: Timestamp;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Timestamp;
};

export type DietPlanSummary = {
  id: string;
  patientId: string;
  patientName: string;
  creationDate: string;
};

export type DailyLog = {
  id?: string;
  userId: string;
  date: string; // ISO 8601 format
  sleepTime: number; // in hours
  digestion: 'good' | 'fair' | 'poor';
  waterIntake: number; // in liters
};

export type DoctorProfile = {
    id: string;
    name: string;
    specialization: string;
}
