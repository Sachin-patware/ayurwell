"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PatientIntakeFormValues } from "./patient-intake-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const prakritiOptions = [
    "Vata", "Pitta", "Kapha", "Vata-Pitta", "Pitta-Vata", 
    "Vata-Kapha", "Kapha-Vata", "Pitta-Kapha", "Kapha-Pitta", "Vata-Pitta-Kapha"
];

export function AyurvedicStep() {
  const { control } = useFormContext<PatientIntakeFormValues>();

  return (
    <Card className="shadow-md">
        <CardHeader>
            <CardTitle className="font-headline">Ayurvedic Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <FormField
                control={control}
                name="prakriti"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Prakriti (Constitution)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select patient's Prakriti" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {prakritiOptions.map(option => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="dosha"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel>Current Dosha Imbalance (Vikriti)</FormLabel>
                    <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                        >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                                <RadioGroupItem value="vata" />
                            </FormControl>
                            <FormLabel className="font-normal">Vata</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                                <RadioGroupItem value="pitta" />
                            </FormControl>
                            <FormLabel className="font-normal">Pitta</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                                <RadioGroupItem value="kapha" />
                            </FormControl>
                            <FormLabel className="font-normal">Kapha</FormLabel>
                        </FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="observations"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Observations</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="e.g., Tongue coating, pulse diagnosis, specific patient complaints..."
                        rows={4}
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
