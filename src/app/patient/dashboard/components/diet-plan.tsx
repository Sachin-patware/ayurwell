"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { dietPlan } from "@/lib/placeholder-data";
import { UtensilsCrossed } from "lucide-react";

type Meal = {
  meal: string;
  food: string;
  completed: boolean;
};

type DietDay = Meal[];

// For demo, we'll just use one day's plan
const todayPlan: DietDay = dietPlan.monday;

export default function DietPlan() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UtensilsCrossed className="text-primary" />
          Today's Diet Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          {todayPlan.map((item, index) => (
            <AccordionItem key={index} value={`item-${index+1}`}>
              <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                {item.meal}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center justify-between p-2 rounded-lg bg-background">
                  <p className="text-muted-foreground">{item.food}</p>
                  <div className="flex items-center space-x-2">
                    <Checkbox id={`meal-${index}`} defaultChecked={item.completed} />
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
  );
}
