'use server';

/**
 * @fileOverview A flow for suggesting alternative meals to a patient based on their preferences and available ingredients.
 *
 * - suggestAlternativeMeals - A function that suggests alternative meals.
 * - SuggestAlternativeMealsInput - The input type for the suggestAlternativeMeals function.
 * - SuggestAlternativeMealsOutput - The return type for the suggestAlternativeMeals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternativeMealsInputSchema = z.object({
  patientProfile: z
    .string()
    .describe("The patient's profile including prakriti, dosha, dietary habits, and allergies."),
  currentMeal: z.string().describe('The meal the patient wants to replace.'),
  availableIngredients: z
    .string()
    .describe('A list of ingredients the patient has available.'),
  dietaryRestrictions: z
    .string()
    .describe('The patient\'s dietary restrictions such as allergies or intolerances.'),
});
export type SuggestAlternativeMealsInput = z.infer<typeof SuggestAlternativeMealsInputSchema>;

const SuggestAlternativeMealsOutputSchema = z.object({
  alternativeMeals: z
    .array(z.string())
    .describe('A list of suggested alternative meals that are doctor-approved.'),
  reasoning: z
    .string()
    .describe('Explanation of why the suggested meals are suitable alternatives based on patient profile and dietary needs.'),
});
export type SuggestAlternativeMealsOutput = z.infer<typeof SuggestAlternativeMealsOutputSchema>;

export async function suggestAlternativeMeals(
  input: SuggestAlternativeMealsInput
): Promise<SuggestAlternativeMealsOutput> {
  return suggestAlternativeMealsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlternativeMealsPrompt',
  input: {schema: SuggestAlternativeMealsInputSchema},
  output: {schema: SuggestAlternativeMealsOutputSchema},
  prompt: `You are an AI assistant specialized in Ayurvedic diet planning. A patient wants to replace their current meal with an alternative.

  Patient Profile: {{{patientProfile}}}
Current Meal: {{{currentMeal}}}
Available Ingredients: {{{availableIngredients}}}
Dietary Restrictions: {{{dietaryRestrictions}}}

  Suggest alternative meals that are doctor-approved, suitable for the patient's profile, and use the available ingredients while respecting their dietary restrictions.  Explain why the suggested meals are good alternatives based on the patient's Ayurvedic needs and available ingredients in the reasoning field. Return a list of suggested alternative meals.
  `,
});

const suggestAlternativeMealsFlow = ai.defineFlow(
  {
    name: 'suggestAlternativeMealsFlow',
    inputSchema: SuggestAlternativeMealsInputSchema,
    outputSchema: SuggestAlternativeMealsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
