'use server';

import {generateVoyageReport, type GenerateVoyageReportInput} from '@/ai/flows/generate-voyage-report-flow';

export async function generateReportAction(input: GenerateVoyageReportInput) {
  try {
    const result = await generateVoyageReport(input);
    return result;
  } catch (error) {
    console.error('Error in AI flow:', error);
    throw new Error('Failed to generate report with AI.');
  }
}
