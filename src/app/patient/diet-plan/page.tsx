'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { dietPlan } from '@/lib/placeholder-data';
import { Download, Printer, UtensilsCrossed, Sparkles } from 'lucide-react';

const fullPlan = dietPlan; // Placeholder for full diet plan

export default function DietPlanPage() {
  return (
    <div>
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">My Complete Diet Plan</h1>
                <p className="text-muted-foreground">Your personalized Ayurvedic meal guide.</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline"><Download className="mr-2" /> Download PDF</Button>
                <Button variant="outline"><Printer className="mr-2" /> Print</Button>
                 <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Sparkles className="mr-2" />
                    Regenerate Plan
                </Button>
            </div>
        </div>

        <Card className="shadow-lg rounded-2xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <UtensilsCrossed />
                    7-Day Vata-Pitta Balancing Diet
                </CardTitle>
                <CardDescription>
                    This plan is designed to soothe Vata and calm Pitta, promoting stability and coolness.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
                    {Object.entries(fullPlan).map(([day, meals], dayIndex) => (
                        <AccordionItem key={day} value={`item-${dayIndex}`} className="border-2 rounded-xl bg-card">
                             <AccordionTrigger className="font-semibold capitalize text-xl p-6 hover:no-underline">
                                {day}
                             </AccordionTrigger>
                             <AccordionContent className="p-6 pt-0">
                                <div className="space-y-4">
                                    {meals.map((meal, mealIndex) => (
                                        <div key={mealIndex} className="p-4 rounded-lg bg-background border">
                                            <p className="font-bold text-primary">{meal.meal}</p>
                                            <p className="text-muted-foreground">{meal.food}</p>
                                        </div>
                                    ))}
                                </div>
                             </AccordionContent>
                        </AccordionItem>
                    ))}
                 </Accordion>
            </CardContent>
        </Card>
    </div>
  );
}
