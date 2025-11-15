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
import { Separator } from '@/components/ui/separator';

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
      <CardContent className="grid md:grid-cols-2 gap-8 items-start">
        <DailyLog />
        <div className='md:border-l md:pl-8'>
          <WeeklyProgressChart />
        </div>
      </CardContent>
    </Card>
  );
}
