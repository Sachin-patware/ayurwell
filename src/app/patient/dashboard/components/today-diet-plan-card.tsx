'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { dietPlan } from '@/lib/placeholder-data';
import { UtensilsCrossed, ArrowRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const todayPlan = dietPlan.monday;

export function TodayDietPlanCard() {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-2xl">
          <UtensilsCrossed className="text-primary" />
          Today's Diet Plan
        </CardTitle>
        <CardDescription>A look at your meals for today. Check them off as you go.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {todayPlan.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background border">
            <div>
              <p className="font-semibold">{item.meal}</p>
              <p className="text-muted-foreground text-sm">{item.food}</p>
            </div>
            <div className="flex items-center space-x-2">
                {/* Checkbox can be added back here if needed */}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button asChild variant="outline">
          <Link href="/patient/diet-plan">
            View Complete Plan <ArrowRight className="ml-2" />
          </Link>
        </Button>
        <Button asChild>
          <Link href="/practitioner/diet-plans/generate">
            <RefreshCw className="ml-2" /> Regenerate Diet Plan
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
