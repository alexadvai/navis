// src/ai/flows/extract-voyage-details-from-email.ts
'use server';

/**
 * @fileOverview AI flow to extract key voyage details from emails (NOR, SOF, instructions).
 *
 * - extractVoyageDetailsFromEmail - Extracts voyage details from an email.
 * - ExtractVoyageDetailsFromEmailInput - Input type for the function.
 * - ExtractVoyageDetailsFromEmailOutput - Output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractVoyageDetailsFromEmailInputSchema = z.object({
  emailBody: z.string().describe('The body of the email to extract voyage details from.'),
});

export type ExtractVoyageDetailsFromEmailInput = z.infer<typeof ExtractVoyageDetailsFromEmailInputSchema>;

const ExtractVoyageDetailsFromEmailOutputSchema = z.object({
  noticeOfReadiness: z.string().optional().describe('The Notice of Readiness (NOR) details extracted from the email. Should be a concise summary of the NOR.'),
  statementOfFacts: z.string().optional().describe('The Statement of Facts (SOF) details extracted from the email. Should be a concise summary of the SOF.'),
  instructions: z.string().optional().describe('Any special instructions contained in the email. Should be a concise summary of the instructions.'),
  otherDetails: z.string().optional().describe('Any other voyage-related details. Should be a concise summary of any other relevant information.'),
});

export type ExtractVoyageDetailsFromEmailOutput = z.infer<typeof ExtractVoyageDetailsFromEmailOutputSchema>;

export async function extractVoyageDetailsFromEmail(input: ExtractVoyageDetailsFromEmailInput): Promise<ExtractVoyageDetailsFromEmailOutput> {
  return extractVoyageDetailsFromEmailFlow(input);
}

const extractVoyageDetailsFromEmailPrompt = ai.definePrompt({
  name: 'extractVoyageDetailsFromEmailPrompt',
  input: {schema: ExtractVoyageDetailsFromEmailInputSchema},
  output: {schema: ExtractVoyageDetailsFromEmailOutputSchema},
  prompt: `You are an AI assistant for a shipping operations manager. Your task is to extract key information from an email related to a vessel's voyage.

Analyze the provided email body and extract the following details. If a section is not present, leave it blank.

- **Notice of Readiness (NOR):** Find when and where the NOR was tendered. Extract the exact date and time.
- **Statement of Facts (SOF):** Summarize the timeline of events, including arrival, anchoring, and berthing times.
- **Instructions:** Identify any direct operational commands or requests for the recipient.
- **Other Details:** Note any other commercially or operationally relevant information, like vessel name or voyage number if available.

Email Content to Analyze:
---
{{{emailBody}}}
---

Please provide the extracted information in the required structured format. Be concise and accurate.`,
});

const extractVoyageDetailsFromEmailFlow = ai.defineFlow(
  {
    name: 'extractVoyageDetailsFromEmailFlow',
    inputSchema: ExtractVoyageDetailsFromEmailInputSchema,
    outputSchema: ExtractVoyageDetailsFromEmailOutputSchema,
  },
  async input => {
    const {output} = await extractVoyageDetailsFromEmailPrompt(input);
    return output!;
  }
);
