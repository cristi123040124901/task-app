export interface DashboardItem {
  id: number;
  title: string;
  value: string;
  status: 'active' | 'inactive' | 'pending';
  lastUpdated: Date;
  metadata: {
    views: number;
    clicks: number;
  };
}

export interface TransformedItem {
  id: number;
  title: string;
  formatted: string;
  displayStatus: string;
  metadata: {
    views: number;
    clicks: number;
  };
}