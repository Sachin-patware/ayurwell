'use server';

/**
 * @fileOverview An AI agent that generates an initial diet plan for a patient based on their profile and preferences.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// -------------------- Input Schema --------------------
const GenerateInitialDietPlanInputSchema = z.object({
  patientProfile: z
    .string()
    .describe('Complete patient profile including prakriti, dosha, dietary habits, bowel, water intake, medical history, age, conditions, and allergies.'),
  constraints: z
    .string()
    .describe('Constraints for the diet plan including meal frequency, preferences, or restrictions.'),
});
export type GenerateInitialDietPlanInput = z.infer<typeof GenerateInitialDietPlanInputSchema>;

// -------------------- Output Schema --------------------
const MealSchema = z.object({
  name: z.string().describe("Meal name, e.g., Breakfast, Lunch, Dinner, Snack"),
  items: z.array(
    z.object({
      name: z.string().describe("Item name, e.g., Oatmeal, Mung Dal"),
      description: z.string().describe("Item description, e.g., with cardamom and ghee"),
    })
  ),
});

const DailyPlanSchema = z.object({
  day: z.number().describe("Day number, e.g., 1"),
  meals: z.array(MealSchema),
});

const GenerateInitialDietPlanOutputSchema = z.object({
  dietPlan: z.object({
    title: z.string().describe("Title of the diet plan, e.g., 7-Day Vata-Pitta Balancing Diet"),
    plan: z.array(DailyPlanSchema),
    notes: z.string().describe("General notes or advice for the patient."),
  }),
});

export type GenerateInitialDietPlanOutput = z.infer<typeof GenerateInitialDietPlanOutputSchema>;

// -------------------- Prompt Definition --------------------
const generateInitialDietPlanPrompt = ai.definePrompt({
  name: 'generateInitialDietPlanPrompt',
  input: { schema: GenerateInitialDietPlanInputSchema },
  output: { schema: GenerateInitialDietPlanOutputSchema },
  prompt: `
You are an expert Ayurvedic dietitian. Generate an initial diet plan for the patient based on their profile and any constraints.
Incorporate both Ayurvedic principles and modern nutritional analysis. The output must be a structured JSON object.

Patient Profile: {{{patientProfile}}}
Constraints: {{{constraints}}}

Generate the diet plan.
`,
});

// -------------------- Flow Definition --------------------
const generateInitialDietPlanFlow = ai.defineFlow(
  {
    name: 'generateInitialDietPlanFlow',
    inputSchema: GenerateInitialDietPlanInputSchema,
    outputSchema: GenerateInitialDietPlanOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await generateInitialDietPlanPrompt(input);

      if (!output) {
        throw new Error('AI did not return any output.');
      }

      return output;
    } catch (error) {
      console.error('Error generating diet plan:', error);
      throw new Error('Failed to generate diet plan. Please try again later.');
    }
  }
);

// -------------------- Exported Function --------------------
export async function generateInitialDietPlan(
  input: GenerateInitialDietPlanInput
): Promise<GenerateInitialDietPlanOutput> {
  return generateInitialDietPlanFlow(input);
}
