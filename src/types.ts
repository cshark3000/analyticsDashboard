export type Section   = 'users' | 'gaming' | 'finance';
export type DateRange = '24H' | '7D' | '30D' | '90D' | 'YTD';
export enum Color {
  gold = 'gold',
teal = 'teal',
rose = 'rose',
violet = 'violet',
cyan = 'cyan'
}

export interface KpiCard {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  prefix?: string;
  suffix?: string;
  accent: Color;
}

export interface UserActivity {
  hour: string;
  dau: number;
  sessions: number;
  retention: number;
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
  secondary?: number;
}

export interface DeviceEntry  { name: string; value: number; color: string; }
export interface GeoEntry     { country: string; users: number; flag: string; pct: number; }

export interface UsersDashboard {
  kpi:      KpiCard[];
  activity: UserActivity[];
  growth:   TimeSeriesPoint[];
  devices:  DeviceEntry[];
  geo:      GeoEntry[];
}