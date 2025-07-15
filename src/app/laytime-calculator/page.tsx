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
import {Upload} from 'lucide-react';

const formSchema = z.object({
  allowedLaytime: z.coerce.number().positive('Must be a positive number'),
  demurrageRate: z.coerce.number().positive('Must be a positive number'),
  despatchRate: z.coerce.number().positive('Must be a positive number'),
  timeSheet: z.any().optional(),
});

type CalculationResult = {
  laytimeUsed: string;
  laytimeSavedOrExceeded: string;
  result: 'Demurrage' | 'Despatch';
  amount: string;
};

export default function LaytimeCalculatorPage() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allowedLaytime: 72,
      demurrageRate: 20000,
      despatchRate: 10000,
    },
  });

  // Mock calculation based on a fictional timesheet
  function onSubmit(values: z.infer<typeof formSchema>) {
    const laytimeUsedHours = 85.5; // This would be calculated from the uploaded timesheet
    const laytimeUsedDays = laytimeUsedHours / 24;
    const allowedLaytimeDays = values.allowedLaytime / 24;

    if (laytimeUsedDays > allowedLaytimeDays) {
      const timeOverDays = laytimeUsedDays - allowedLaytimeDays;
      setResult({
        laytimeUsed: `${laytimeUsedHours.toFixed(2)} hours`,
        laytimeSavedOrExceeded: `${(timeOverDays * 24).toFixed(2)} hours exceeded`,
        result: 'Demurrage',
        amount: `$${(timeOverDays * values.demurrageRate).toLocaleString('en-US', {minimumFractionDigits: 2})}`,
      });
    } else {
      const timeSavedDays = allowedLaytimeDays - laytimeUsedDays;
      setResult({
        laytimeUsed: `${laytimeUsedHours.toFixed(2)} hours`,
        laytimeSavedOrExceeded: `${(timeSavedDays * 24).toFixed(2)} hours saved`,
        result: 'Despatch',
        amount: `$${(timeSavedDays * values.despatchRate).toLocaleString('en-US', {minimumFractionDigits: 2})}`,
      });
    }
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Laytime Calculator" />
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Calculation Inputs</CardTitle>
              <CardDescription>Enter contract terms and upload the time sheet.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="timeSheet"
                    render={() => (
                      <FormItem>
                        <FormLabel>Time Sheet Document</FormLabel>
                        <FormControl>
                          <Button asChild variant="outline" className="w-full">
                            <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center gap-2">
                              <Upload className="h-4 w-4" />
                              <span>Upload File (optional for demo)</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                          </Button>
                        </FormControl>
                        <FormDescription>Upload the Statement of Facts or Time Sheet.</FormDescription>
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
                  <Button type="submit" className="w-full">
                    Calculate
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculation Result</CardTitle>
            </CardHeader>
            <CardContent>
              {!result ? (
                <div className="text-center text-muted-foreground h-full min-h-[300px] flex items-center justify-center">
                  <p>Results will be displayed here.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className={`p-6 rounded-lg ${result.result === 'Demurrage' ? 'bg-destructive/10' : 'bg-accent/10'}`}>
                    <p className={`text-sm font-medium ${result.result === 'Demurrage' ? 'text-destructive' : 'text-accent-foreground'}`}>{result.result} Due</p>
                    <p className={`text-4xl font-bold ${result.result === 'Demurrage' ? 'text-destructive' : 'text-accent-foreground'}`}>{result.amount}</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Laytime Used</p>
                      <p className="font-semibold text-foreground">{result.laytimeUsed}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Allowed Laytime</p>
                      <p className="font-semibold text-foreground">{form.getValues('allowedLaytime')} hours</p>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <p className="text-muted-foreground">Time Saved / Exceeded</p>
                      <p className="font-semibold text-foreground">{result.laytimeSavedOrExceeded}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
