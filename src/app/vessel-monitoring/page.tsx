'use client';

import {AppHeader} from '@/components/layout/header';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import type {VesselMetric, Voyage} from '@/lib/types';

const voyages: Voyage[] = [
  {id: 'V001', name: 'Asia to Europe Run', vessel: 'MV Stellar', status: 'Active', originPort: 'Shanghai', destinationPort: 'Rotterdam', eta: '2024-08-15'},
  {id: 'V002', name: 'Trans-Pacific Crossing', vessel: 'MV Neptune', status: 'Active', originPort: 'Los Angeles', destinationPort: 'Tokyo', eta: '2024-08-20'},
];

const vesselData: VesselMetric[] = [
  {id: 'M001', vessel: 'MV Stellar', speed: 14.5, fuelConsumption: 45.2, rpm: 85, timestamp: '10:00'},
  {id: 'M002', vessel: 'MV Stellar', speed: 14.6, fuelConsumption: 45.5, rpm: 86, timestamp: '11:00'},
  {id: 'M003', vessel: 'MV Stellar', speed: 14.4, fuelConsumption: 45.1, rpm: 85, timestamp: '12:00'},
  {id: 'M004', vessel: 'MV Stellar', speed: 15.0, fuelConsumption: 48.0, rpm: 90, timestamp: '13:00'},
  {id: 'M005', vessel: 'MV Stellar', speed: 14.8, fuelConsumption: 46.5, rpm: 88, timestamp: '14:00'},
];

export default function VesselMonitoringPage() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Vessel Performance Monitoring" />
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto space-y-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Live Vessel Data</CardTitle>
                <CardDescription>Select a vessel to view its live performance metrics.</CardDescription>
              </div>
              <div className="w-64">
                <Select defaultValue="V001">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {voyages.map(voyage => (
                      <SelectItem key={voyage.id} value={voyage.id}>
                        {voyage.vessel} ({voyage.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
             <ResponsiveContainer width="100%" height={350}>
              <LineChart data={vesselData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis yAxisId="left" label={{ value: 'Speed (knots)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Fuel (mt/day)', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="speed" stroke="hsl(var(--primary))" name="Speed" />
                <Line yAxisId="right" type="monotone" dataKey="fuelConsumption" stroke="hsl(var(--accent))" name="Fuel Consumption" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Data Log</CardTitle>
                <CardDescription>Raw performance data received from MV Stellar.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Speed (knots)</TableHead>
                            <TableHead>Fuel Cons. (mt/day)</TableHead>
                            <TableHead>Engine RPM</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vesselData.slice().reverse().map(metric => (
                            <TableRow key={metric.id}>
                                <TableCell>{metric.timestamp}</TableCell>
                                <TableCell>{metric.speed.toFixed(1)}</TableCell>
                                <TableCell>{metric.fuelConsumption.toFixed(1)}</TableCell>
                                <TableCell>{metric.rpm}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
