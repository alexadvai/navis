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
  };
  timestamp: string;
  text: string;
}
