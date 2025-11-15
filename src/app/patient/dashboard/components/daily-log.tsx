'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { BookCheck, Smile, Bed, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore, useUser, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

const logSchema = z.object({
  energyLevel: z.number().min(1).max(10),
  digestion: z.enum(['good', 'fair', 'poor']),
  sleepQuality: z.enum(['good', 'fair', 'poor']),
});

type LogFormValues = z.infer<typeof logSchema>;

export default function DailyLog() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();

  const form = useForm<LogFormValues>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      energyLevel: 5,
      digestion: 'good',
      sleepQuality: 'good',
    },
  });

  const handleLog: SubmitHandler<LogFormValues> = async (data) => {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to submit a log.',
      });
      return;
    }

    setIsSubmitting(true);
    const logData = {
      ...data,
      userId: user.uid,
      date: new Date().toISOString(),
    };

    try {
      const dailyLogsCollection = collection(firestore, 'dailyLogs');
      addDocumentNonBlocking(dailyLogsCollection, logData);

      toast({
        title: 'Log Submitted!',
        description: 'Your progress for today has been saved.',
        className: 'bg-primary text-primary-foreground',
      });
      form.reset();
    } catch (error: any) {
       toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-none border-0">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <BookCheck className="text-primary" />
          Daily Check-in
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLog)}>
          <CardContent className="grid gap-6 p-0">
            <FormField
              control={form.control}
              name="energyLevel"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Energy Level ({value})</FormLabel>
                  <FormControl>
                    <Slider
                      value={[value]}
                      onValueChange={(vals) => onChange(vals[0])}
                      max={10}
                      step={1}
                      min={1}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="digestion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Smile className="h-4 w-4" />
                    Digestion
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="good" id="d1" /></FormControl>
                        <FormLabel htmlFor="d1" className="font-normal">Good</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="fair" id="d2" /></FormControl>
                        <FormLabel htmlFor="d2" className="font-normal">Fair</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="poor" id="d3" /></FormControl>
                        <FormLabel htmlFor="d3" className="font-normal">Poor</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sleepQuality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Bed className="h-4 w-4" />
                    Sleep Quality
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                       onValueChange={field.onChange}
                       value={field.value}
                       className="flex gap-4"
                    >
                       <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="good" id="s1" /></FormControl>
                        <FormLabel htmlFor="s1" className="font-normal">Good</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="fair" id="s2" /></FormControl>
                        <FormLabel htmlFor="s2" className="font-normal">Fair</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="poor" id="s3" /></FormControl>
                        <FormLabel htmlFor="s3" className="font-normal">Poor</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="p-0 mt-6">
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Log My Day'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
