import { config } from 'dotenv';
config();

import '@/ai/flows/extract-voyage-details-from-email.ts';
import '@/ai/flows/calculate-laytime-flow.ts';
import '@/ai/flows/generate-voyage-report-flow.ts';
