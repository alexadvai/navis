import {AppHeader} from '@/components/layout/header';
import {Button} from '@/components/ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {ArrowRight, Ship, Calendar, Anchor} from 'lucide-react';
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
  const getBadgeVariant = (status: Voyage['status']) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Completed':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl">{voyage.name}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground gap-2">
              <Ship className="h-4 w-4" />
              <span>{voyage.vessel}</span>
            </div>
          </div>
          <Badge variant={getBadgeVariant(voyage.status)}>{voyage.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Anchor className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground truncate">{voyage.originPort}</span>
          </div>
          <ArrowRight className="mx-2 text-muted-foreground shrink-0 h-5 w-5" />
          <div className="flex items-center gap-2">
            <Anchor className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground truncate">{voyage.destinationPort}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <Calendar className="h-4 w-4" />
          <span>
            ETA: <span className="font-semibold text-foreground">{new Date(voyage.eta).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</span>
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
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
      <AppHeader title="Voyage Dashboard" />
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="active">Active ({activeVoyages.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingVoyages.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedVoyages.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {activeVoyages.map(voyage => (
                <VoyageCard key={voyage.id} voyage={voyage} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pending">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pendingVoyages.map(voyage => (
                <VoyageCard key={voyage.id} voyage={voyage} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {completedVoyages.map(voyage => (
                <VoyageCard key={voyage.id} voyage={voyage} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
