'use server';

import {extractVoyageDetailsFromEmail} from '@/ai/flows/extract-voyage-details-from-email';

export async function parseEmailAction(input: {emailBody: string}) {
  try {
    const result = await extractVoyageDetailsFromEmail(input);
    return result;
  } catch (error) {
    console.error('Error in AI flow:', error);
    throw new Error('Failed to process email with AI.');
  }
}
