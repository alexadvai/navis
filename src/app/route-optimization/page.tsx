'use client';

import {AppHeader} from '@/components/layout/header';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Badge} from '@/components/ui/badge';
import {Map, Wind, Shield, Anchor, CheckCircle2} from 'lucide-react';
import type {RouteSuggestion} from '@/lib/types';
import {useState} from 'react';
import {Loader2} from 'lucide-react';

const initialSuggestions: RouteSuggestion[] = [
  {id: 'R001', name: 'Suez Canal Route', distance: '10,500 NM', duration: '25 days', weatherOutlook: 'Good', piracyRisk: 'Medium', isRecommended: true},
  {id: 'R002', name: 'Cape of Good Hope Route', distance: '12,300 NM', duration: '31 days', weatherOutlook: 'Fair', piracyRisk: 'Low', isRecommended: false},
];

function RouteCard({route}: {route: RouteSuggestion}) {
  return (
    <Card className={route.isRecommended ? 'border-primary' : ''}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{route.name}</CardTitle>
          {route.isRecommended && <Badge><CheckCircle2 className="mr-1 h-4 w-4" /> Recommended</Badge>}
        </div>
        <CardDescription>{route.distance} | {route.duration}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Wind className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-semibold">Weather</p>
            <p className="text-muted-foreground">{route.weatherOutlook}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-semibold">Piracy Risk</p>
            <p className="text-muted-foreground">{route.piracyRisk}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={route.isRecommended ? 'default' : 'outline'}>Select Route</Button>
      </CardFooter>
    </Card>
  );
}

export default function RouteOptimizationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<RouteSuggestion[] | null>(null);

  const handleGenerate = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuggestions(initialSuggestions);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="AI Route Optimization" />
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Plan Your Voyage</CardTitle>
              <CardDescription>Enter origin and destination to get AI-powered route suggestions.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Origin Port (e.g., Shanghai)" />
                <Input placeholder="Destination Port (e.g., Rotterdam)" />
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Generate Suggestions'}
              </Button>
            </CardFooter>
          </Card>

          {isLoading && (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {suggestions && (
            <div className="space-y-4">
               <h2 className="text-2xl font-bold tracking-tight">Route Suggestions</h2>
              {suggestions.map(route => (
                <RouteCard key={route.id} route={route} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
