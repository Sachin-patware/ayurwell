import { PatientIntakeForm } from "./components/patient-intake-form";

export default function AddPatientPage() {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold font-headline mb-8">New Patient Intake</h1>
            <PatientIntakeForm />
        </div>
    );
}
