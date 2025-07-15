export type VoyageStatus = 'Active' | 'Pending' | 'Completed';

export interface Voyage {
  id: string;
  name: string;
  vessel: string;
  status: VoyageStatus;
  originPort: string;
  destinationPort: string;
  eta: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  tags: string[];
  size: string;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    avatarHint?: string;
  };
  timestamp: string;
  text: string;
}

export interface RouteSuggestion {
  id:string;
  name: string;
  distance: string;
  duration: string;
  weatherOutlook: 'Good' | 'Fair' | 'Poor';
  piracyRisk: 'Low' | 'Medium' | 'High';
  isRecommended: boolean;
}

export interface BunkerPrice {
  port: string;
  price: number;
  date: string;
  trend: 'up' | 'down' | 'stable';
}

export interface VesselMetric {
  id: string;
  vessel: string;
  speed: number;
  fuelConsumption: number;
  rpm: number;
  timestamp: string;
}

export type LaytimeCalculationResult = {
  resultType: 'Demurrage' | 'Despatch';
  amount: number;
  laytimeUsedHours: number;
  timeSavedOrExceededHours: number;
  calculationNarrative: string;
};
