import {AppHeader} from '@/components/layout/header';
import {Button} from '@/components/ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {ArrowRight} from 'lucide-react';
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
    id: 'V003',
    name: 'Grain Haul Aus-Chi',
    vessel: 'Bulk Carrier X',
    status: 'Pending',
    originPort: 'Port Hedland',
    destinationPort: 'Qingdao',
    eta: '2024-09-01',
  },
  {
    id: 'V004',
    name: 'Crude Oil Transport',
    vessel: 'Supertanker Y',
    status: 'Pending',
    originPort: 'Jubail',
    destinationPort: 'Houston',
    eta: '2024-09-10',
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

function VoyageCard({voyage}: {voyage: Voyage}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle>{voyage.name}</CardTitle>
            <CardDescription>{voyage.vessel}</CardDescription>
          </div>
          <Badge variant={voyage.status === 'Active' ? 'default' : voyage.status === 'Pending' ? 'outline' : 'secondary'}>
            {voyage.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex justify-between items-center text-sm">
          <div className="text-center space-y-1">
            <p className="font-medium text-foreground truncate">{voyage.originPort}</p>
            <p className="text-xs text-muted-foreground">Origin</p>
          </div>
          <ArrowRight className="mx-2 text-muted-foreground shrink-0" />
          <div className="text-center space-y-1">
            <p className="font-medium text-foreground truncate">{voyage.destinationPort}</p>
            <p className="text-xs text-muted-foreground">Destination</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          ETA: <span className="font-semibold text-foreground">{new Date(voyage.eta).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</span>
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function DashboardPage() {
  const activeVoyages = voyages.filter(v => v.status === 'Active');
  const pendingVoyages = voyages.filter(v => v.status === 'Pending');
  const completedVoyages = voyages.filter(v => v.status === 'Completed');

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Dashboard" />
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active ({activeVoyages.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingVoyages.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedVoyages.length})</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="active">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {activeVoyages.map(voyage => (
                  <VoyageCard key={voyage.id} voyage={voyage} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="pending">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {pendingVoyages.map(voyage => (
                  <VoyageCard key={voyage.id} voyage={voyage} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {completedVoyages.map(voyage => (
                  <VoyageCard key={voyage.id} voyage={voyage} />
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
