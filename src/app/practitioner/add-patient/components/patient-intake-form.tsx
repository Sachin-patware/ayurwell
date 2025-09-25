"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, ClipboardList, Stethoscope, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { BasicInfoStep } from "./basic-info-step";
import { AyurvedicStep } from "./ayurvedic-step";
import { MedicalHistoryStep } from "./medical-history-step";

const formSchema = z.object({
  // Basic Info
  name: z.string().min(2, "Name must be at least 2 characters."),
  age: z.coerce.number().min(1, "Please enter a valid age."),
  waterIntake: z.coerce.number().min(0, "Water intake cannot be negative."),
  bowelMovement: z.enum(["normal", "constipated", "loose"], {
    required_error: "Please select a bowel movement status.",
  }),
  // Ayurvedic Assessment
  prakriti: z.string().min(1, "Please select a Prakriti."),
  dosha: z.enum(["vata", "pitta", "kapha"], {
    required_error: "Please select a Dosha imbalance.",
  }),
  observations: z.string().optional(),
  // Medical History
  medicalHistory: z.string().optional(),
  allergies: z.string().optional(),
});

export type PatientIntakeFormValues = z.infer<typeof formSchema>;

const steps = [
  { id: "01", name: "Basic Info", icon: User },
  { id: "02", name: "Ayurvedic Assessment", icon: Stethoscope },
  { id: "03", name: "Medical History", icon: ClipboardList },
];

export function PatientIntakeForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const methods = useForm<PatientIntakeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 0,
      waterIntake: 2000,
      bowelMovement: "normal",
      prakriti: "vata-pitta",
      dosha: "vata",
      observations: "",
      medicalHistory: "",
      allergies: "",
    },
  });

  const { handleSubmit, trigger } = methods;

  const processForm = async (data: PatientIntakeFormValues) => {
    console.log("Saving patient data...", data);
    // TODO: Add Firestore saving logic here
    toast({
      title: "Patient Saved!",
      description: `${data.name} has been added to your patient list.`,
      className: "bg-primary text-primary-foreground",
    });
    // TODO: Redirect to diet chart generator
  };

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 0) {
        isValid = await trigger(["name", "age", "waterIntake", "bowelMovement"]);
    } else if (currentStep === 1) {
        isValid = await trigger(["prakriti", "dosha"]);
    } else {
        isValid = true;
    }
    
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              <div
                className={cn(
                  "group flex flex-col border-l-4 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                  index < currentStep ? "border-primary" : "border-border",
                  index === currentStep ? "border-primary" : "hover:border-primary/70"
                )}
              >
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    index < currentStep ? "text-primary" : "text-muted-foreground",
                    index === currentStep ? "text-primary" : "group-hover:text-primary/80"
                  )}
                >
                  {step.id}
                </span>
                <span className="text-sm font-medium flex items-center gap-2">
                    <step.icon className={cn(
                        "h-5 w-5",
                        index <= currentStep ? "text-primary" : "text-muted-foreground"
                    )} />
                    {step.name}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(processForm)} className="mt-12">
            {currentStep === 0 && <BasicInfoStep />}
            {currentStep === 1 && <AyurvedicStep />}
            {currentStep === 2 && <MedicalHistoryStep />}

            <div className="mt-8 pt-5">
                <div className="flex justify-between">
                <Button type="button" onClick={prevStep} disabled={currentStep === 0} variant="outline">
                    Previous
                </Button>
                {currentStep === steps.length - 1 ? (
                    <Button type="submit">
                        Save Patient <Check className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button type="button" onClick={nextStep}>
                        Next
                    </Button>
                )}
                </div>
            </div>
        </form>
      </FormProvider>
    </div>
  );
}
