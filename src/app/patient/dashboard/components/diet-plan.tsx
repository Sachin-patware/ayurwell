"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { dietPlan, patients } from "@/lib/placeholder-data";
import { UtensilsCrossed, Sparkles, Loader2, Lightbulb } from "lucide-react";
import { useState } from "react";
// This is the Genkit flow we are using to get meal suggestions.
import { suggestAlternativeMeals } from "@/ai/flows/suggest-alternative-meals";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DialogFooter } from "@/components/ui/dialog";


type Meal = {
  meal: string;
  food: string;
  completed: boolean;
};

type DietDay = Meal[];

// For demo, we'll just use one day's plan
const todayPlan: DietDay = dietPlan.monday;
const patient = patients[0];

export default function DietPlan() {
  const [plan, setPlan] = useState(todayPlan);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<{alternativeMeals: string[], reasoning: string} | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCheck = (index: number, checked: boolean) => {
    const newPlan = [...plan];
    newPlan[index].completed = checked;
    setPlan(newPlan);
  };

  // This function is called when the "Suggest Alternatives" button is clicked.
  const handleSuggestionClick = async (meal: Meal) => {
    setIsSuggesting(true);
    setSuggestions(null);
    setSelectedMeal(meal);
    setIsDialogOpen(true);

    try {
        const patientProfile = `
            Name: ${patient.name}
            Prakriti: ${patient.prakriti}
            Dosha Imbalance: ${patient.dosha}
        `;

        // We call the suggestAlternativeMeals flow with the patient's data.
        const result = await suggestAlternativeMeals({
            patientProfile,
            currentMeal: `${meal.meal}: ${meal.food}`,
            availableIngredients: 'Rice, lentils, seasonal vegetables, basic spices', // Placeholder
            dietaryRestrictions: 'None', // Placeholder
        });
        
        // The results are stored in the component's state to be displayed in the dialog.
        setSuggestions(result);

    } catch (error) {
        console.error("Failed to get suggestions:", error);
        toast({
            variant: "destructive",
            title: "Suggestion Failed",
            description: "Could not fetch meal alternatives at this time.",
        });
    } finally {
        setIsSuggesting(false);
    }
  }


  return (
    <>
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="text-primary" />
            Today's Diet Plan
          </div>
        </CardTitle>
        <CardDescription>Check off meals as you complete them. Need a change? Ask for AI-powered suggestions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          {plan.map((item, index) => (
            <AccordionItem key={index} value={`item-${index+1}`}>
              <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                <div className="flex items-center justify-between w-full pr-2">
                    <span>{item.meal}</span>
                    {/* This button triggers the AI suggestion flow. */}
                     <Button variant="ghost" size="sm" onClick={() => handleSuggestionClick(item)}>
                        <Sparkles className="mr-2 h-4 w-4 text-accent"/>
                        Suggest Alternatives
                    </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center justify-between p-2 rounded-lg bg-background">
                  <p className="text-muted-foreground">{item.food}</p>
                  <div className="flex items-center space-x-2">
                    <Checkbox id={`meal-${index}`} checked={item.completed} onCheckedChange={(checked) => handleCheck(index, !!checked)} />
                    <label
                      htmlFor={`meal-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Done
                    </label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>

    {/* This dialog displays the loading state and the meal suggestions. */}
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="text-accent" />
                    Meal Alternatives for {selectedMeal?.meal}
                </DialogTitle>
                <DialogDescription>
                    AI-powered suggestions based on your profile and available ingredients.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                {isSuggesting ? (
                    <div className="flex flex-col items-center justify-center gap-2 min-h-[200px]">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">Finding tasty alternatives...</p>
                    </div>
                ) : suggestions ? (
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">Suggested Meals:</h3>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                {suggestions.alternativeMeals.map((meal, i) => <li key={i}>{meal}</li>)}
                            </ul>
                        </div>
                        <Alert>
                            <Lightbulb className="h-4 w-4"/>
                            <AlertTitle>Reasoning</AlertTitle>
                            <AlertDescription>
                                {suggestions.reasoning}
                            </AlertDescription>
                        </Alert>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2 min-h-[200px] text-muted-foreground">
                        <p>No suggestions available right now.</p>
                    </div>
                )}
            </div>
            <DialogFooter>
                <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Close</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    </>
  );
}
