"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PatientIntakeFormValues } from "./patient-intake-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets } from "lucide-react";

export function BasicInfoStep() {
  const { control } = useFormContext<PatientIntakeFormValues>();

  return (
    <Card className="shadow-md">
        <CardHeader>
            <CardTitle className="font-headline">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Priya Sharma" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 34" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

             <FormField
                control={control}
                name="waterIntake"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="flex items-center gap-2">
                        <Droplets className="h-4 w-4"/>
                        Average Water Intake (ml)
                    </FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="e.g., 2000" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="bowelMovement"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel>Bowel Movement</FormLabel>
                    <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                        >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="normal" />
                            </FormControl>
                            <FormLabel className="font-normal">Normal</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="constipated" />
                            </FormControl>
                            <FormLabel className="font-normal">Constipated</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="loose" />
                            </FormControl>
                            <FormLabel className="font-normal">Loose</FormLabel>
                        </FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </CardContent>
    </Card>

  );
}
