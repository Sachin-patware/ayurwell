'use server';

/**
 * @fileOverview An AI agent that generates an initial diet plan for a patient based on their profile and preferences.
 *
 * - generateInitialDietPlan - A function that handles the diet plan generation process.
 * - GenerateInitialDietPlanInput - The input type for the generateInitialDietPlan function.
 * - GenerateInitialDietPlanOutput - The return type for the generateInitialDietPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialDietPlanInputSchema = z.object({
  patientProfile: z
    .string()
    .describe('The complete profile of the patient, including prakriti, dosha, dietary habits, bowel, water intake, medical history, age, conditions, and allergies.'),
  constraints: z
    .string()
    .describe('Constraints for the diet plan, including meal frequency and any specific requirements or preferences.'),
});
export type GenerateInitialDietPlanInput = z.infer<typeof GenerateInitialDietPlanInputSchema>;

const GenerateInitialDietPlanOutputSchema = z.object({
  dietPlan: z.string().describe('The generated diet plan in a readable format, including Ayurvedic and nutritional information.'),
});
export type GenerateInitialDietPlanOutput = z.infer<typeof GenerateInitialDietPlanOutputSchema>;

export async function generateInitialDietPlan(
  input: GenerateInitialDietPlanInput
): Promise<GenerateInitialDietPlanOutput> {
  return generateInitialDietPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialDietPlanPrompt',
  input: {schema: GenerateInitialDietPlanInputSchema},
  output: {schema: GenerateInitialDietPlanOutputSchema},
  prompt: `You are an expert Ayurvedic dietitian. Generate an initial diet plan for the patient based on their profile and any constraints. Incorporate both Ayurvedic principles and modern nutritional analysis. Make it easy to read.

Patient Profile: {{{patientProfile}}}
Constraints: {{{constraints}}}

Diet Plan:`,
});

const generateInitialDietPlanFlow = ai.defineFlow(
  {
    name: 'generateInitialDietPlanFlow',
    inputSchema: GenerateInitialDietPlanInputSchema,
    outputSchema: GenerateInitialDietPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
