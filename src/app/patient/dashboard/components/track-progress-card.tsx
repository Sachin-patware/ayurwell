'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LineChart } from 'lucide-react';
import DailyLog from './daily-log';
import WeeklyProgressChart from './weekly-progress-chart';

export function TrackProgressCard() {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-2xl">
          <LineChart className="text-primary" />
          Track My Progress
        </CardTitle>
        <CardDescription>
          Log your daily feelings and see your weekly improvements.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <DailyLog />
        <WeeklyProgressChart />
      </CardContent>
    </Card>
  );
}
