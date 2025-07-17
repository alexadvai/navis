'use server';
/**
 * @fileOverview An AI flow to generate voyage reports.
 *
 * - generateVoyageReport - A function that handles the report generation process.
 * - GenerateVoyageReportInput - The input type for the function.
 * - GenerateVoyageReportOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const VoyageSchema = z.object({
    id: z.string(),
    name: z.string(),
    vessel: z.string(),
    status: z.enum(['Active', 'Pending', 'Completed']),
    originPort: z.string(),
    destinationPort: z.string(),
    eta: z.string(),
});

const GenerateVoyageReportInputSchema = z.object({
  voyage: VoyageSchema,
  reportType: z.enum(['daily', 'weekly', 'final']),
});

export type GenerateVoyageReportInput = z.infer<typeof GenerateVoyageReportInputSchema>;

const GenerateVoyageReportOutputSchema = z.object({
  report: z.string().describe('The full, formatted text of the generated voyage report.'),
});

export type GenerateVoyageReportOutput = z.infer<typeof GenerateVoyageReportOutputSchema>;

export async function generateVoyageReport(input: GenerateVoyageReportInput): Promise<GenerateVoyageReportOutput> {
  return generateVoyageReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVoyageReportPrompt',
  input: {schema: GenerateVoyageReportInputSchema},
  output: {schema: GenerateVoyageReportOutputSchema},
  prompt: `You are a shipping operations assistant tasked with generating a {{reportType}} voyage report for the following voyage:

Voyage ID: {{voyage.id}}
Voyage Name: {{voyage.name}}
Vessel: {{voyage.vessel}}
Status: {{voyage.status}}
Origin: {{voyage.originPort}}
Destination: {{voyage.destinationPort}}
ETA: {{voyage.eta}}

Based on the report type, generate a concise but comprehensive report.
- For a 'daily' report, provide a summary of the current status, position (if available, otherwise estimate based on route), speed, fuel consumption, and any significant events in the last 24 hours.
- For a 'weekly' report, summarize the progress over the last week, distance covered, ETA updates, and any commercial or operational highlights.
- For a 'final' report, provide a full summary of the voyage from start to finish, including total time, any incidents, final laytime calculation results (if applicable), and commercial outcome.

Assume typical events and data for a voyage of this nature if specific data isn't provided. Structure the report professionally with clear headings.
`,
});

const generateVoyageReportFlow = ai.defineFlow(
  {
    name: 'generateVoyageReportFlow',
    inputSchema: GenerateVoyageReportInputSchema,
    outputSchema: GenerateVoyageReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
