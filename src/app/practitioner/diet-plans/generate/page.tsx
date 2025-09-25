'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Sparkles } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const patientIdFromQuery = searchParams.get('patientId') || '';
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: patientIdFromQuery,
      constraints: 'Goal is to balance the dominant dosha. Include warm, cooked meals. Avoid processed foods and sugar.',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setGeneratedPlan(null);
    try {
      const result = await generateDietPlanAction(values);
      if (result.success && result.dietPlan) {
        setGeneratedPlan(result.dietPlan);
        toast({
          title: 'Diet Plan Generated',
          description: `Successfully created a new diet plan for ${patients.find(p => p.id === values.patientId)?.name}.`,
          className: 'bg-primary text-primary-foreground',
        });
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
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Sparkles className="text-accent"/>
            AI Diet Plan Generator
          </CardTitle>
          <CardDescription>
            Select a patient and provide constraints to generate a personalized
            Ayurvedic diet plan.
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
                        <FormLabel>Constraints & Goals</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="e.g., Prefers warm meals, gluten-free, goal is to reduce Pitta..."
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
                    'Generate Plan'
                    )}
                </Button>
                </form>
            </Form>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader>
            <CardTitle>Generated Plan</CardTitle>
            <CardDescription>Review the plan below. You can edit it before saving.</CardDescription>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                </div>
            ) : generatedPlan ? (
                <div className="prose prose-sm max-w-none text-foreground bg-muted p-4 rounded-md min-h-64">
                    <pre className="whitespace-pre-wrap font-body text-sm bg-transparent border-none p-0">{generatedPlan}</pre>
                </div>
            ) : (
                 <div className="flex items-center justify-center text-muted-foreground h-64">
                    <p>The generated diet plan will appear here.</p>
                </div>
            )}
            <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" disabled={!generatedPlan}>Edit</Button>
                <Button disabled={!generatedPlan}>Save & Notify Patient</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
