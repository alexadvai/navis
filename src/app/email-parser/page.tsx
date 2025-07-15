'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {AppHeader} from '@/components/layout/header';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {Loader2} from 'lucide-react';
import {parseEmailAction} from './actions';
import type {ExtractVoyageDetailsFromEmailOutput} from '@/ai/flows/extract-voyage-details-from-email';
import {useToast} from '@/hooks/use-toast';

const formSchema = z.object({
  emailBody: z.string().min(50, {
    message: 'Email body must be at least 50 characters.',
  }),
});

export default function EmailParserPage() {
  const [result, setResult] = useState<ExtractVoyageDetailsFromEmailOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailBody: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const parsedData = await parseEmailAction(values);
      setResult(parsedData);
      toast({
        title: 'Email Parsed Successfully',
        description: 'The AI has extracted the voyage details.',
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Parsing Failed',
        description: 'Failed to parse email. Please try again.',
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="AI Email Parser" />
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Paste Email Content</CardTitle>
                <CardDescription>The AI will extract key voyage details like NOR, SOF, and instructions.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="emailBody"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Email Body</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Paste the full body of the voyage email here..." className="min-h-[300px] font-mono text-xs" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? <Loader2 className="animate-spin" /> : 'Parse Email'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Extracted Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading && (
                  <div className="flex justify-center items-center h-full min-h-[300px]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                )}
                {!isLoading && !result && (
                  <div className="text-muted-foreground text-center h-full min-h-[300px] flex items-center justify-center">
                    <p>Results will be displayed here after parsing.</p>
                  </div>
                )}
                {result && (
                  <div className="space-y-4">
                    <InfoCard title="Notice of Readiness (NOR)" content={result.noticeOfReadiness} />
                    <InfoCard title="Statement of Facts (SOF)" content={result.statementOfFacts} />
                    <InfoCard title="Instructions" content={result.instructions} />
                    <InfoCard title="Other Details" content={result.otherDetails} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({title, content}: {title: string; content?: string}) {
  if (!content) return null;
  return (
    <Card className="bg-secondary/50">
      <CardHeader className="p-4">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-foreground/80 whitespace-pre-wrap">{content}</p>
      </CardContent>
    </Card>
  );
}
