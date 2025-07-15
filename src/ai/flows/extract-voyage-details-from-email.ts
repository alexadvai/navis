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
  noticeOfReadiness: z.string().optional().describe('The Notice of Readiness (NOR) details extracted from the email.'),
  statementOfFacts: z.string().optional().describe('The Statement of Facts (SOF) details extracted from the email.'),
  instructions: z.string().optional().describe('Any special instructions contained in the email.'),
  otherDetails: z.string().optional().describe('Any other voyage-related details.'),
});

export type ExtractVoyageDetailsFromEmailOutput = z.infer<typeof ExtractVoyageDetailsFromEmailOutputSchema>;

export async function extractVoyageDetailsFromEmail(input: ExtractVoyageDetailsFromEmailInput): Promise<ExtractVoyageDetailsFromEmailOutput> {
  return extractVoyageDetailsFromEmailFlow(input);
}

const extractVoyageDetailsFromEmailPrompt = ai.definePrompt({
  name: 'extractVoyageDetailsFromEmailPrompt',
  input: {schema: ExtractVoyageDetailsFromEmailInputSchema},
  output: {schema: ExtractVoyageDetailsFromEmailOutputSchema},
  prompt: `You are an AI assistant specializing in extracting key details from shipping-related emails.

  Your task is to analyze the provided email content and extract the following information:

  - Notice of Readiness (NOR) details: Extract all relevant information pertaining to the NOR, including dates, times, and locations.
  - Statement of Facts (SOF) details: Extract all relevant information pertaining to the SOF, including dates, times, and locations.
  - Instructions: Identify and extract any specific instructions provided in the email, such as operational instructions or requests.
  - Other details: Extract any other important voyage-related details that don't fit into the above categories.

  Email Content:
  {{emailBody}}

  Please provide the extracted information in a structured format.
  `,
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
