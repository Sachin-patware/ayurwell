'use server';

import { GenerateInitialDietPlanOutput, generateInitialDietPlan } from "@/ai/flows/generate-initial-diet-plan";
import { patients } from "@/lib/placeholder-data";
import { z } from "zod";

const formSchema = z.object({
  patientId: z.string(),
  constraints: z.string(),
});

type GenerateDietPlanResult = {
  success: boolean;
  dietPlan?: GenerateInitialDietPlanOutput['dietPlan'] | null;
  error?: string;
};

export async function generateDietPlanAction(
  values: z.infer<typeof formSchema>
): Promise<GenerateDietPlanResult> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid input." };
  }

  const { patientId, constraints } = validatedFields.data;
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    return { success: false, error: "Patient not found." };
  }

  const patientProfile = `
    Name: ${patient.name}
    Prakriti: ${patient.prakriti}
    Dosha Imbalance: ${patient.dosha}
    Status: ${patient.status}
  `;

  try {
    const result = await generateInitialDietPlan({
      patientProfile,
      constraints,
    });
    return { success: true, dietPlan: result.dietPlan };
  } catch (error) {
    console.error("Error generating diet plan:", error);
    return {
      success: false,
      error: "An unexpected error occurred while generating the plan.",
    };
  }
}
