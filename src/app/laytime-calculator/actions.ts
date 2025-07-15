'use server';

import {calculateLaytime, type CalculateLaytimeInput} from '@/ai/flows/calculate-laytime-flow';

export async function calculateLaytimeAction(input: CalculateLaytimeInput) {
  try {
    const result = await calculateLaytime(input);
    return result;
  } catch (error) {
    console.error('Error in AI flow:', error);
    throw new Error('Failed to process laytime calculation with AI.');
  }
}
