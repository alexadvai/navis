'use client';
import {useState} from 'react';
import {AppHeader} from '@/components/layout/header';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Download, Loader2} from 'lucide-react';
import type {Voyage} from '@/lib/types';
import {generateReportAction} from './actions';
import {useToast} from '@/hooks/use-toast';

const voyages: Voyage[] = [
  {
    id: 'V001',
    name: 'Asia to Europe Run',
    vessel: 'MV Stellar',
    status: 'Active',
    originPort: 'Shanghai',
    destinationPort: 'Rotterdam',
    eta: '2024-08-15',
  },
  {
    id: 'V002',
    name: 'Trans-Pacific Crossing',
    vessel: 'MV Neptune',
    status: 'Active',
    originPort: 'Los Angeles',
    destinationPort: 'Tokyo',
    eta: '2024-08-20',
  },
  {
    id: 'V005',
    name: 'Container Delivery',
    vessel: 'Container Ship Z',
    status: 'Completed',
    originPort: 'Singapore',
    destinationPort: 'Hamburg',
    eta: '2024-07-25',
  },
];

export default function VoyageReportingPage() {
  const [selectedVoyageId, setSelectedVoyageId] = useState<string | null>(null);
  const [reportType, setReportType] = useState('daily');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const {toast} = useToast();

  const handleGenerateReport = async () => {
    if (!selectedVoyageId) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a voyage first.',
      });
      return;
    }
    const voyage = voyages.find(v => v.id === selectedVoyageId);
    if (!voyage) return;

    setIsLoading(true);
    setReport(null);
    try {
      const result = await generateReportAction({voyage, reportType: reportType as 'daily' | 'weekly' | 'final'});
      setReport(result.report);
      toast({
        title: 'Report Generated',
        description: 'The voyage report has been successfully created.',
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Failed to generate the report. Please try again.',
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Automated Voyage Reporting" />
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Generate Voyage Report</CardTitle>
              <CardDescription>Select a voyage to generate a daily or weekly summary report.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Voyage</label>
                <Select onValueChange={setSelectedVoyageId} value={selectedVoyageId ?? undefined}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a voyage..." />
                  </SelectTrigger>
                  <SelectContent>
                    {voyages.map(voyage => (
                      <SelectItem key={voyage.id} value={voyage.id}>
                        {voyage.id} - {voyage.name} ({voyage.vessel})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select defaultValue="daily" onValueChange={setReportType} value={reportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Summary</SelectItem>
                    <SelectItem value="weekly">Weekly Progress</SelectItem>
                    <SelectItem value="final">Final Voyage Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardContent>
              <Button onClick={handleGenerateReport} disabled={isLoading || !selectedVoyageId} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Generate Report
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Generated Report</CardTitle>
              <CardDescription>The AI-generated report will appear below.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[300px]">
              {isLoading && (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}
              {!isLoading && !report && (
                <div className="text-muted-foreground text-center h-full flex items-center justify-center">
                  <p>Report will be displayed here.</p>
                </div>
              )}
              {report && (
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap bg-secondary/50 p-4 rounded-lg">
                  {report}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
