import {AppHeader} from '@/components/layout/header';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Download} from 'lucide-react';
import type {Voyage} from '@/lib/types';

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
  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Automated Voyage Reporting" />
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Generate Voyage Report</CardTitle>
              <CardDescription>Select a voyage to generate a daily or weekly summary report.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label>Select Voyage</label>
                <Select>
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
                <label>Report Type</label>
                <Select defaultValue="daily">
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
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Generate & Download Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
