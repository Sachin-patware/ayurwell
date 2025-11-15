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
import { BookCheck, Droplets, Bed, Smile, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

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
    <Card className="shadow-none border-0">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg flex items-center gap-2">
            <BookCheck className="text-primary" />
            Daily Check-in
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleLog}>
        <CardContent className="grid gap-6 p-0">
          <div className="grid gap-2">
            <Label htmlFor="energy" className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4"/>
                Energy Level (1-10)
            </Label>
             <Slider defaultValue={[5]} max={10} step={1} />
          </div>
           <div className="grid gap-2">
            <Label className="flex items-center gap-2"><Smile className="h-4 w-4"/>Digestion</Label>
            <RadioGroup defaultValue="good" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="d1" />
                <Label htmlFor="d1">Good</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fair" id="d2" />
                <Label htmlFor="d2">Fair</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="poor" id="d3" />
                <Label htmlFor="d3">Poor</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2"><Bed className="h-4 w-4"/>Sleep Quality</Label>
            <RadioGroup defaultValue="good" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="s1" />
                <Label htmlFor="s1">Good</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fair" id="s2" />
                <Label htmlFor="s2">Fair</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="poor" id="s3" />
                <Label htmlFor="s3">Poor</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="p-0 mt-6">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Log My Day"}
            </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
