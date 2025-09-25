"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { PatientIntakeFormValues } from "./patient-intake-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MedicalHistoryStep() {
  const { control } = useFormContext<PatientIntakeFormValues>();

  return (
    <Card className="shadow-md">
        <CardHeader>
            <CardTitle className="font-headline">Medical History & Allergies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <FormField
                control={control}
                name="medicalHistory"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Relevant Medical History</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="List any past or current medical conditions, surgeries, or relevant health issues."
                        rows={5}
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="allergies"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Allergies & Intolerances</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="List any known food or environmental allergies."
                        rows={5}
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </CardContent>
    </Card>
  );
}
