"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Leaf, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { patients } from "@/lib/placeholder-data";
import { useToast } from "@/hooks/use-toast";
import { generateDietPlanAction } from "../actions";

const formSchema = z.object({
  patientId: z.string().min(1, "Please select a patient."),
  constraints: z.string().min(10, "Please provide some constraints or goals."),
});

export default function GenerateDietPlanDialog() {
  const [open, setOpen] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
      constraints: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setGeneratedPlan(null);
    try {
      const result = await generateDietPlanAction(values);
      if (result.success && result.dietPlan) {
        setGeneratedPlan(result.dietPlan);
        toast({
          title: "Diet Plan Generated",
          description: `Successfully created a new diet plan for ${patients.find(p => p.id === values.patientId)?.name}.`,
          className: "bg-primary text-primary-foreground",
        });
      } else {
        throw new Error(result.error || "Failed to generate diet plan.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetAndClose = () => {
    form.reset();
    setGeneratedPlan(null);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold" >
          <Leaf className="mr-2 h-4 w-4" /> Generate Diet Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            AI-Powered Diet Plan Generator
          </DialogTitle>
          <DialogDescription>
            Select a patient and provide constraints to generate a personalized
            Ayurvedic diet plan.
          </DialogDescription>
        </DialogHeader>
        {generatedPlan ? (
          <div className="space-y-4 py-4">
              <h3 className="font-semibold text-lg">Generated Plan</h3>
              <div className="prose prose-sm max-w-none text-foreground bg-muted p-4 rounded-md max-h-64 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-body text-sm">{generatedPlan}</pre>
              </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a patient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="constraints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Constraints & Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Prefers warm meals, gluten-free, goal is to reduce Pitta..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetAndClose}>Cancel</Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Plan"
                    )}
                  </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
        {generatedPlan && (
           <DialogFooter>
             <Button type="button" variant="outline" onClick={resetAndClose}>Close</Button>
             <Button type="button" onClick={() => { setGeneratedPlan(null); form.reset(); }}>Generate New</Button>
           </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
