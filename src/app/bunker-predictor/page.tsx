'use client';
import {AppHeader} from '@/components/layout/header';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {ArrowUpRight, ArrowDownRight, Minus} from 'lucide-react';
import type {BunkerPrice} from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const bunkerPrices: BunkerPrice[] = [
  {port: 'Singapore', price: 650, date: '2024-08-05', trend: 'up'},
  {port: 'Rotterdam', price: 620, date: '2024-08-05', trend: 'down'},
  {port: 'Fujairah', price: 640, date: '2024-08-05', trend: 'stable'},
  {port: 'Houston', price: 610, date: '2024-08-05', trend: 'up'},
];

const forecastData = [
    { name: 'Sep \'24', price: 655 },
    { name: 'Oct \'24', price: 660 },
    { name: 'Nov \'24', price: 650 },
    { name: 'Dec \'24', price: 670 },
    { name: 'Jan \'25', price: 680 },
    { name: 'Feb \'25', price: 675 },
];


export default function BunkerPredictorPage() {
  const TrendIcon = ({trend}: {trend: BunkerPrice['trend']}) => {
    if (trend === 'up') return <ArrowUpRight className="h-4 w-4 text-destructive" />;
    if (trend === 'down') return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Bunker Price Predictor" />
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Current Bunker Prices</CardTitle>
              <CardDescription>Latest prices for VLSFO at major ports.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Port</TableHead>
                    <TableHead>Price (USD/mt)</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bunkerPrices.map(bunker => (
                    <TableRow key={bunker.port}>
                      <TableCell className="font-medium">{bunker.port}</TableCell>
                      <TableCell>${bunker.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <TrendIcon trend={bunker.trend} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>6-Month VLSFO Price Forecast</CardTitle>
              <CardDescription>AI-powered prediction for Singapore port.</CardDescription>
            </CardHeader>
            <CardContent>
               <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={forecastData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[600, 700]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="price" fill="hsl(var(--primary))" name="Predicted Price (USD/mt)" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
