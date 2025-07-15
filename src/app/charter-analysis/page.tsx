'use client';

import {useState} from 'react';
import {AppHeader} from '@/components/layout/header';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {Upload, FileWarning, BadgeCheck, Loader2} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

export default function CharterAnalysisPage() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = () => {
    setIsLoading(true);
    setAnalysis(null);
    setTimeout(() => {
      setAnalysis(`**Clause 17 (Laytime):** Ambiguous wording regarding weekend calculations. Recommend clarifying if SHINC (Sundays and Holidays Included) or SHEX (Sundays and Holidays Excluded) applies.

**Clause 25 (BIMCO Piracy Clause):** Standard clause, but recommend verifying the vessel's security measures are compliant with the latest BMP5 guidelines for High-Risk Area transit.

**Clause 32 (Bunker Price Adjustment):** The reference index for bunker price adjustments is not specified. Recommend adding a clear reference (e.g., Singapore VLSFO Index).`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Charter Party Clause Analysis" />
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Analyze Charter Party</CardTitle>
              <CardDescription>Upload or paste a charter party to have the AI flag potential issues.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder="Paste charter party clauses here..." className="min-h-[300px]" />
              <Button asChild variant="outline" className="w-full">
                <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Document</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
              </Button>
              <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="animate-spin" /> : 'Analyze Clauses'}
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex justify-center items-center h-full min-h-[300px]">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}
              {!isLoading && !analysis && (
                <div className="text-muted-foreground text-center h-full min-h-[300px] flex items-center justify-center">
                  <p>Analysis will appear here.</p>
                </div>
              )}
              {analysis && (
                <div className="space-y-4">
                  <Alert>
                    <BadgeCheck className="h-4 w-4" />
                    <AlertTitle>Analysis Complete</AlertTitle>
                    <AlertDescription>3 potential issues found.</AlertDescription>
                  </Alert>
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                    {analysis.split('\n\n').map((item, index) => (
                      <div key={index} className="mb-4 p-3 bg-secondary/50 rounded-lg">
                        <p className="font-semibold text-foreground">{item.split(':')[0]}</p>
                        <p className="text-foreground/80">{item.split(':')[1]}</p>
                      </div>
                    ))}
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
