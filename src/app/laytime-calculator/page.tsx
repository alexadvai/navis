'use client';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {AppHeader} from '@/components/layout/header';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Separator} from '@/components/ui/separator';
import {Upload, Loader2, FileText, Proportions, Banknote} from 'lucide-react';
import {Textarea} from '@/components/ui/textarea';
import type {LaytimeCalculationResult} from '@/lib/types';
import {calculateLaytimeAction} from './actions';
import {useToast} from '@/components/ui/use-toast';

const formSchema = z.object({
  allowedLaytime: z.coerce.number().positive('Must be a positive number of hours'),
  demurrageRate: z.coerce.number().positive('Must be a positive number'),
  despatchRate: z.coerce.number().positive('Must be a positive number'),
  timeSheet: z.string().min(50, 'Please provide a detailed Statement of Facts / Time Sheet'),
});

const sampleTimesheet = `Statement of Facts - MV Neptune V002
Port: Tokyo
---
- NOR Tendered: 20 Aug 2024, 0900 LT (Notice time counts from 1300 LT)
- Cargo Operations Commenced: 20 Aug 2024, 1500 LT
- Rain Stoppage: 21 Aug 2024, 0200 LT to 0600 LT (4 hours)
- Cargo Operations Completed: 22 Aug 2024, 1800 LT
`;

export default function LaytimeCalculatorPage() {
  const [result, setResult] = useState<LaytimeCalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allowedLaytime: 72,
      demurrageRate: 20000,
      despatchRate: 10000,
      timeSheet: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const calculation = await calculateLaytimeAction(values);
      setResult(calculation);
      toast({
        title: 'Calculation Complete',
        description: `The result is ${calculation.resultType}.`,
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Calculation Failed',
        description: 'The AI could not process the laytime calculation. Please check your input.',
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLoadSample = () => {
    form.setValue('timeSheet', sampleTimesheet);
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="AI Laytime Calculator" />
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Calculation Inputs</CardTitle>
              <CardDescription>Enter contract terms and paste the time sheet.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="timeSheet"
                    render={({field}) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel>Statement of Facts / Time Sheet</FormLabel>
                          <Button type="button" variant="link" size="sm" onClick={handleLoadSample}>
                            Load Sample
                          </Button>
                        </div>
                        <FormControl>
                          <Textarea placeholder="Paste the full Statement of Facts or time log here..." className="min-h-[200px] font-mono text-xs" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="allowedLaytime"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Allowed Laytime (hours)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 72" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="demurrageRate"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Demurrage Rate (per day)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 20000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="despatchRate"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Despatch Rate (per day)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 10000" {...field} />
                        </FormControl>
                        <FormDescription>Usually half of the demurrage rate.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Calculate with AI'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculation Result</CardTitle>
              <CardDescription>The AI's analysis of the laytime calculation.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex justify-center items-center h-full min-h-[300px]">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}
              {!isLoading && !result && (
                <div className="text-center text-muted-foreground h-full min-h-[300px] flex items-center justify-center">
                  <p>Results will be displayed here.</p>
                </div>
              )}
              {result && (
                <div className="space-y-6">
                  <div className={`p-6 rounded-lg ${result.resultType === 'Demurrage' ? 'bg-destructive/10' : 'bg-green-500/10'}`}>
                    <p className={`text-sm font-medium ${result.resultType === 'Demurrage' ? 'text-destructive' : 'text-green-700'}`}>{result.resultType} Due</p>
                    <p className={`text-4xl font-bold ${result.resultType === 'Demurrage' ? 'text-destructive' : 'text-green-700'}`}>${result.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                       <CardTitle className="text-base">Calculation Narrative</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80">
                         <p>{result.calculationNarrative}</p>
                       </div>
                    </CardContent>
                  </Card>
                 
                  <Card>
                     <CardHeader className="pb-4">
                       <CardTitle className="text-base">Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Laytime Used</p>
                        <p className="font-semibold text-foreground">{result.laytimeUsedHours.toFixed(2)} hours</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Allowed Laytime</p>
                        <p className="font-semibold text-foreground">{form.getValues('allowedLaytime')} hours</p>
                      </div>
                      <div className="space-y-1 col-span-2">
                        <p className="text-muted-foreground">Time Saved / Exceeded</p>
                        <p className="font-semibold text-foreground">{result.timeSavedOrExceededHours.toFixed(2)} hours {result.resultType === 'Despatch' ? 'saved' : 'exceeded'}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
