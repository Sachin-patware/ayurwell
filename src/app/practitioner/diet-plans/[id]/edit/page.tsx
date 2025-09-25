'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { patients } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Send } from 'lucide-react';

export default function DietPlanEditPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { id: planId } = params;
  const patientId = searchParams.get('patientId');
  
  const [planContent, setPlanContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const patient = patients.find((p) => p.id === patientId);

  useEffect(() => {
    // TODO: Replace with backend call to fetch the diet plan from Firestore using planId.
    const storedPlan = localStorage.getItem(planId as string);
    if (storedPlan) {
      setPlanContent(storedPlan);
    } else {
        // Placeholder if no plan is found in local storage
        setPlanContent(`## 7-Day Diet Plan for ${patient?.name || 'Patient'}\n\n### Day 1\n\n- **Breakfast:** Oatmeal with seasonal fruits\n- **Lunch:** Mung bean soup with brown rice\n- **Dinner:** Steamed vegetables with quinoa`);
    }
    setIsLoading(false);
  }, [planId, patient]);


  const handleSave = () => {
    setIsSaving(true);
    // TODO: Implement backend logic to save the updated plan to Firestore.
    console.log("Saving plan:", { patientId, planId, planContent });
    setTimeout(() => {
        localStorage.setItem(planId as string, planContent);
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

  if (isLoading) {
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
            <CardContent>
                <Textarea 
                    value={planContent}
                    onChange={(e) => setPlanContent(e.target.value)}
                    className="min-h-[60vh] font-mono text-sm"
                    placeholder="Enter diet plan details here..."
                />
                 <div className="mt-4 text-xs text-muted-foreground">
                    <p>You can use Markdown for formatting (e.g., `#` for headings, `*` for bold, `-` for lists).</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
