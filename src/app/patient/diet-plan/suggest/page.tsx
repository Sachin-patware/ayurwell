'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';

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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { suggestAlternativeMeals } from '@/ai/flows/suggest-alternative-meals';
import { useUser } from '@/firebase';
import { patients } from '@/lib/placeholder-data'; // Placeholder
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  currentMeal: z.string().min(3, 'Please describe the meal you want to replace.'),
  availableIngredients: z.string().min(5, 'Please list some ingredients you have.'),
  dietaryRestrictions: z.string().optional(),
});

export default function SuggestAlternativesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<{ alternativeMeals: string[], reasoning: string } | null>(null);
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentMeal: 'Mung dal with basmati rice',
      availableIngredients: 'Quinoa, lentils, carrots, spinach, ginger, coconut milk',
      dietaryRestrictions: 'No gluten',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setSuggestion(null);

    // Using placeholder patient data for profile context
    const patient = patients.find(p => p.id === '1'); 
    if (!user || !patient) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not find patient profile.',
        });
        setIsLoading(false);
        return;
    }

    const patientProfile = `
        Prakriti: ${patient.prakriti}
        Current Dosha Imbalance: ${patient.dosha}
        Allergies/Intolerances: ${values.dietaryRestrictions || 'None'}
    `;

    try {
      const result = await suggestAlternativeMeals({
        patientProfile,
        ...values
      });
      setSuggestion(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Suggestion Failed',
        description: (error as Error).message || 'An unexpected error occurred.',
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
            AI Meal Suggestion
          </CardTitle>
          <CardDescription>
            Want to switch things up? Tell our AI what meal you want to replace and what you have on hand.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="currentMeal"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Meal to Replace</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Oatmeal with cardamom" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="availableIngredients"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Available Ingredients</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="e.g., Lentils, rice, carrots, spinach..."
                            rows={3}
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="dietaryRestrictions"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Any other dietary restrictions?</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., No dairy, prefer low-spice" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Thinking...
                    </>
                    ) : (
                    'Suggest New Meals'
                    )}
                </Button>
                </form>
            </Form>
        </CardContent>
      </Card>

      {suggestion && (
        <Card className="mt-8 shadow-md">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Wand2 className="text-primary"/>
                    Here are some ideas!
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg mb-2">Suggested Meals:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        {suggestion.alternativeMeals.map((meal, index) => (
                            <li key={index}>{meal}</li>
                        ))}
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-lg mb-2">Why these work for you:</h3>
                    <p className="text-muted-foreground">{suggestion.reasoning}</p>
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
