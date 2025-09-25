"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { BookCheck, Droplets, Loader2 } from "lucide-react";
import { useState } from "react";

export default function DailyLog() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLog = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        toast({
            title: "Log Submitted!",
            description: "Your progress for today has been saved.",
            className: "bg-primary text-primary-foreground"
        });
        setIsLoading(false);
    }, 1000);
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <BookCheck className="text-primary" />
            Daily Log
        </CardTitle>
        <CardDescription>
          Track your daily habits to see your progress.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleLog}>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="water" className="flex items-center gap-2">
                <Droplets className="h-4 w-4"/>
                Water Intake (ml)
            </Label>
            <Input id="water" type="number" placeholder="e.g., 2000" />
          </div>
          <div className="grid gap-2">
            <Label>Bowel Movement</Label>
            <RadioGroup defaultValue="normal" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="r1" />
                <Label htmlFor="r1">Normal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="constipated" id="r2" />
                <Label htmlFor="r2">Constipated</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="loose" id="r3" />
                <Label htmlFor="r3">Loose</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                </>
            ) : (
                "Log My Day"
            )}
            </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
