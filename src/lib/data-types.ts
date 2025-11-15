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
  doctorId: string;
  datetime: string; // ISO 8601 format
  status: 'scheduled' | 'completed' | 'cancelled';
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
  energyLevel: number; // 1-10
  digestion: 'good' | 'fair' | 'poor';
  sleepQuality: 'good' | 'fair' | 'poor';
};
