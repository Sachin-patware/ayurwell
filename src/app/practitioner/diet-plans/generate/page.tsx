'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Sparkles } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { patients } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { generateDietPlanAction } from '../../dashboard/actions';

const formSchema = z.object({
  patientId: z.string().min(1, 'Please select a patient.'),
  constraints: z.string().min(10, 'Please provide some constraints or goals.'),
});

export default function GenerateDietPlanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientIdFromQuery = searchParams.get('patientId') || '';
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: patientIdFromQuery,
      constraints: 'Goal is to balance the dominant dosha. Include warm, cooked meals. Avoid processed foods and sugar. The diet should be for 7 days.',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const result = await generateDietPlanAction(values);
      if (result.success && result.dietPlan) {
        toast({
          title: 'Diet Plan Generated',
          description: `Successfully created a new diet plan for ${patients.find(p => p.id === values.patientId)?.name}.`,
          className: 'bg-primary text-primary-foreground',
        });
        
        // TODO: In a real app, this would be a real ID from the database.
        const newPlanId = `plan-${Date.now()}`;
        
        // Store the plan in localStorage to pass it to the edit page.
        // In a real app, this would be fetched from the database on the edit page.
        localStorage.setItem(newPlanId, result.dietPlan);

        router.push(`/practitioner/diet-plans/${newPlanId}/edit?patientId=${values.patientId}`);

      } else {
        throw new Error(result.error || 'Failed to generate diet plan.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Sparkles className="text-accent"/>
            AI Diet Plan Generator
          </CardTitle>
          <CardDescription>
            Select a patient and provide constraints to generate a personalized
            Ayurvedic diet plan. The more detailed your constraints, the better the result.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="patientId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Patient</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select a patient" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {patients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id}>
                                {patient.name}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="constraints"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Constraints, Goals & Duration</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="e.g., Prefers warm meals, gluten-free, goal is to reduce Pitta. Generate a 7-day plan."
                            rows={4}
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                    </>
                    ) : (
                    'Generate & Edit Plan'
                    )}
                </Button>
                </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  );
}
