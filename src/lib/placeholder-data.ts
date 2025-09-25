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
  time: string;
  patient: Pick<Patient, 'id' | 'name' | 'avatar'>;
  status: 'Confirmed' | 'Pending' | 'Completed';
};

export type DietPlanSummary = {
  id: string;
  patientId: string;
  patientName: string;
  creationDate: string;
}

export const patients: Patient[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    avatar: 'avatar-1',
    status: 'Active',
    lastActivity: 'Logged lunch meal',
    prakriti: 'Vata-Pitta',
    dosha: 'Vata imbalance',
  },
  {
    id: '2',
    name: 'Rohan Gupta',
    email: 'rohan.gupta@example.com',
    avatar: 'avatar-2',
    status: 'Follow-up',
    lastActivity: 'Updated weight',
    prakriti: 'Kapha',
    dosha: 'Kapha imbalance',
  },
  {
    id: '3',
    name: 'Anika Reddy',
    email: 'anika.reddy@example.com',
    avatar: 'avatar-3',
    status: 'Active',
    lastActivity: 'Logged water intake',
    prakriti: 'Pitta-Kapha',
    dosha: 'Pitta imbalance',
  },
];

export const appointments: Appointment[] = [
  {
    id: 'apt1',
    time: '09:00 AM',
    patient: { id: '1', name: 'Priya Sharma', avatar: 'avatar-1' },
    status: 'Confirmed',
  },
  {
    id: 'apt2',
    time: '11:30 AM',
    patient: { id: '2', name: 'Rohan Gupta', avatar: 'avatar-2' },
    status: 'Confirmed',
  },
  {
    id: 'apt3',
    time: '02:00 PM',
    patient: { id: '3', name: 'Anika Reddy', avatar: 'avatar-3' },
    status: 'Pending',
  },
];

export const dietPlan = {
  monday: [
    { meal: 'Breakfast', food: 'Oatmeal with cardamom and ghee', completed: true },
    { meal: 'Lunch', food: 'Mung dal with basmati rice and steamed vegetables', completed: true },
    { meal: 'Dinner', food: 'Vegetable soup with ginger and turmeric', completed: false },
  ],
  tuesday: [
    { meal: 'Breakfast', food: 'Stewed apples with cinnamon', completed: false },
    { meal: 'Lunch', food: 'Quinoa with roasted root vegetables', completed: false },
    { meal: 'Dinner', food: 'Lentil and vegetable stew', completed: false },
  ],
};

export const progressData = [
    { date: 'Mon', adherence: 80, water: 75 },
    { date: 'Tue', adherence: 90, water: 80 },
    { date: 'Wed', adherence: 70, water: 85 },
    { date: 'Thu', adherence: 85, water: 90 },
    { date: 'Fri', adherence: 95, water: 88 },
    { date: 'Sat', adherence: 75, water: 95 },
    { date: 'Sun', adherence: 100, water: 100 },
];

export const practitioner = {
    name: "Dr. Anjali Verma",
    email: "dr.anjali@ayurwell.com",
    avatar: "practitioner-avatar",
}

export const dietPlans: DietPlanSummary[] = [
    {
        id: 'plan-1',
        patientId: '1',
        patientName: 'Priya Sharma',
        creationDate: '2024-07-28',
    },
    {
        id: 'plan-2',
        patientId: '2',
        patientName: 'Rohan Gupta',
        creationDate: '2024-07-27',
    }
];
