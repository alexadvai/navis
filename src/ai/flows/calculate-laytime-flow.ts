'use server';
/**
 * @fileOverview An AI flow to calculate laytime, demurrage, and despatch.
 *
 * - calculateLaytimeFlow - A function that handles the laytime calculation process.
 * - CalculateLaytimeInput - The input type for the function.
 * - CalculateLaytimeOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type {LaytimeCalculationResult} from '@/lib/types';

const CalculateLaytimeInputSchema = z.object({
  timeSheet: z.string().describe('The full text of the Statement of Facts or time sheet, including all events, dates, and times.'),
  allowedLaytime: z.number().describe('The total allowed laytime in hours as per the charter party.'),
  demurrageRate: z.number().describe('The demurrage rate in USD per day.'),
  despatchRate: z.number().describe('The despatch rate in USD per day, which is typically half the demurrage rate.'),
});

export type CalculateLaytimeInput = z.infer<typeof CalculateLaytimeInputSchema>;

const CalculateLaytimeOutputSchema = z.object({
  resultType: z.enum(['Demurrage', 'Despatch']).describe('The final result of the calculation, either "Demurrage" or "Despatch".'),
  amount: z.number().describe('The final amount in USD due for demurrage or despatch.'),
  laytimeUsedHours: z.number().describe('The total laytime used in hours, calculated from the time sheet.'),
  timeSavedOrExceededHours: z.number().describe('The number of hours the vessel was over (demurrage) or under (despatch) the allowed laytime.'),
  calculationNarrative: z.string().describe('A step-by-step explanation of how the laytime was calculated, including which periods were counted, excluded (e.g., rain), and the final calculation logic.'),
});

export type CalculateLaytimeOutput = z.infer<typeof CalculateLaytimeOutputSchema>;

export async function calculateLaytime(input: CalculateLaytimeInput): Promise<LaytimeCalculationResult> {
  return calculateLaytimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'calculateLaytimePrompt',
  input: {schema: CalculateLaytimeInputSchema},
  output: {schema: CalculateLaytimeOutputSchema},
  prompt: `You are an expert shipping operations manager specializing in post-fixture calculations. Your task is to accurately calculate laytime based on a provided Statement of Facts (SOF) or timesheet and the terms of the charter party.

Analyze the provided timesheet to determine the exact laytime used.
- The 'timeSheet' provides a log of all events.
- Time counting rules must be inferred from the context (e.g., "NOR tendered... notice time counts from...").
- Exclude any periods that do not count as laytime (e.g., rain stoppages, breakdowns).
- Calculate the total time used for cargo operations in hours.

Compare the laytime used against the 'allowedLaytime' (in hours).
- If laytime used is greater than allowed laytime, the result is 'Demurrage'.
- If laytime used is less than allowed laytime, the result is 'Despatch'.

Calculate the final amount owed.
- For Demurrage: (Time Exceeded in Days) * Demurrage Rate.
- For Despatch: (Time Saved in Days) * Despatch Rate.
- Remember to convert hours to days for the rate calculation (e.g., 12 hours = 0.5 days).

Provide a detailed 'calculationNarrative' explaining your step-by-step process. This is crucial for transparency.

Contractual Terms:
- Allowed Laytime: {{{allowedLaytime}}} hours
- Demurrage Rate: {{{demurrageRate}}} USD/day
- Despatch Rate: {{{despatchRate}}} USD/day

Statement of Facts / Time Sheet:
{{{timeSheet}}}
`,
});

const calculateLaytimeFlow = ai.defineFlow(
  {
    name: 'calculateLaytimeFlow',
    inputSchema: CalculateLaytimeInputSchema,
    outputSchema: CalculateLaytimeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
