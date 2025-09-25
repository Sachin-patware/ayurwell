'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { patients } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Send, Plus, Trash2 } from 'lucide-react';
import { GenerateInitialDietPlanOutput } from '@/ai/flows/generate-initial-diet-plan';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type DietPlan = GenerateInitialDietPlanOutput["dietPlan"];
type DailyPlan = DietPlan["plan"][0];
type Meal = DailyPlan["meals"][0];
type FoodItem = Meal["items"][0];

export default function DietPlanEditPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { id: planId } = params;
  const patientId = searchParams.get('patientId');
  
  const [plan, setPlan] = useState<DietPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const patient = patients.find((p) => p.id === patientId);

  useEffect(() => {
    // TODO: Replace with backend call to fetch the diet plan from Firestore using planId.
    const storedPlan = localStorage.getItem(planId as string);
    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    } else {
        // Placeholder if no plan is found in local storage
        setPlan({
            title: `7-Day Diet Plan for ${patient?.name || 'Patient'}`,
            notes: "General advice for the patient.",
            plan: [{
                day: 1,
                meals: [
                    { name: 'Breakfast', items: [{name: 'Oatmeal', description: 'with seasonal fruits'}] },
                    { name: 'Lunch', items: [{name: 'Mung bean soup', description: 'with brown rice'}] },
                    { name: 'Dinner', items: [{name: 'Steamed vegetables', description: 'with quinoa'}] },
                ]
            }]
        });
    }
    setIsLoading(false);
  }, [planId, patient]);

  const handleUpdate = <T,>(path: (string|number)[], value: T) => {
    setPlan(prevPlan => {
      if (!prevPlan) return null;
      const newPlan = JSON.parse(JSON.stringify(prevPlan)); // Deep copy
      let current: any = newPlan;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newPlan;
    });
  };

  const handleAddMeal = (dayIndex: number) => {
    const newMeal: Meal = { name: "New Meal", items: [{ name: "New Food", description: "" }] };
    const day = plan!.plan[dayIndex];
    const newMeals = [...day.meals, newMeal];
    handleUpdate(['plan', dayIndex, 'meals'], newMeals);
  };
  
  const handleAddFood = (dayIndex: number, mealIndex: number) => {
    const newFood: FoodItem = { name: "New Food", description: "" };
    const meal = plan!.plan[dayIndex].meals[mealIndex];
    const newItems = [...meal.items, newFood];
    handleUpdate(['plan', dayIndex, 'meals', mealIndex, 'items'], newItems);
  };

  const handleRemoveMeal = (dayIndex: number, mealIndex: number) => {
    const day = plan!.plan[dayIndex];
    const newMeals = day.meals.filter((_, index) => index !== mealIndex);
    handleUpdate(['plan', dayIndex, 'meals'], newMeals);
  };

  const handleRemoveFood = (dayIndex: number, mealIndex: number, foodIndex: number) => {
    const meal = plan!.plan[dayIndex].meals[mealIndex];
    const newItems = meal.items.filter((_, index) => index !== foodIndex);
    handleUpdate(['plan', dayIndex, 'meals', mealIndex, 'items'], newItems);
  };

  const handleSave = () => {
    setIsSaving(true);
    // TODO: Implement backend logic to save the updated plan to Firestore.
    console.log("Saving plan:", { patientId, planId, plan });
    setTimeout(() => {
        localStorage.setItem(planId as string, JSON.stringify(plan));
        toast({
            title: "Plan Saved!",
            description: "The diet plan has been updated.",
            className: "bg-primary text-primary-foreground",
        });
        setIsSaving(false);
    }, 1000);
  };
  
  const handleNotify = () => {
    // TODO: Implement backend logic to trigger a Firebase Cloud Messaging notification.
    console.log("Notifying patient:", patientId);
     toast({
        title: "Patient Notified",
        description: `A notification has been sent to ${patient?.name}.`,
    });
  };

  if (isLoading || !plan) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
        <Card className="shadow-md">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-2xl">Diet Plan Editor</CardTitle>
                        <CardDescription>
                            Editing plan for <span className="font-semibold text-primary">{patient?.name || 'Unknown Patient'}</span>.
                        </CardDescription>
                    </div>
                     <div className="flex gap-2">
                        <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save
                        </Button>
                         <Button onClick={handleNotify} variant="secondary">
                            <Send className="mr-2 h-4 w-4"/>
                            Save & Notify Patient
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <label className="text-sm font-medium">Plan Title</label>
                    <Input 
                        value={plan.title}
                        onChange={(e) => handleUpdate(['title'], e.target.value)}
                        className="text-lg font-headline"
                    />
                </div>

                {plan.plan.map((day, dayIndex) => (
                    <Card key={dayIndex} className="bg-background/50">
                        <CardHeader>
                            <CardTitle className="text-xl font-headline">Day {day.day}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {day.meals.map((meal, mealIndex) => (
                                <Card key={mealIndex}>
                                    <CardHeader className="flex flex-row items-center justify-between py-3">
                                         <Input 
                                            value={meal.name}
                                            onChange={(e) => handleUpdate(['plan', dayIndex, 'meals', mealIndex, 'name'], e.target.value)}
                                            className="text-lg font-semibold border-none focus-visible:ring-1 p-1 -ml-1"
                                        />
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveMeal(dayIndex, mealIndex)}>
                                            <Trash2 className="h-4 w-4 text-destructive"/>
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="space-y-2 pb-4">
                                        {meal.items.map((item, foodIndex) => (
                                            <div key={foodIndex} className="flex items-center gap-2">
                                                <Input 
                                                    value={item.name} 
                                                    onChange={(e) => handleUpdate(['plan', dayIndex, 'meals', mealIndex, 'items', foodIndex, 'name'], e.target.value)}
                                                    placeholder="Food name"
                                                />
                                                <Input 
                                                    value={item.description}
                                                    onChange={(e) => handleUpdate(['plan', dayIndex, 'meals', mealIndex, 'items', foodIndex, 'description'], e.target.value)}
                                                    placeholder="Description"
                                                />
                                                <Button variant="ghost" size="icon" className="shrink-0" onClick={() => handleRemoveFood(dayIndex, mealIndex, foodIndex)}>
                                                    <Trash2 className="h-4 w-4 text-destructive"/>
                                                </Button>
                                            </div>
                                        ))}
                                        <Button variant="outline" size="sm" onClick={() => handleAddFood(dayIndex, mealIndex)}>
                                            <Plus className="mr-2 h-4 w-4"/> Add Food
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                             <Button variant="secondary" onClick={() => handleAddMeal(dayIndex)}>
                                <Plus className="mr-2 h-4 w-4"/> Add Meal
                            </Button>
                        </CardContent>
                    </Card>
                ))}

                 <div>
                    <label className="text-sm font-medium">General Notes</label>
                    <Textarea 
                        value={plan.notes}
                        onChange={(e) => handleUpdate(['notes'], e.target.value)}
                        placeholder="Add general advice for the patient..."
                        rows={4}
                    />
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
