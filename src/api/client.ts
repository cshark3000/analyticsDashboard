import type { DateRange, UsersDashboard } from '../types';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`);
  if (!res.ok) throw new Error(`API ${path} → ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const api = {
  users:   (range: DateRange) => get<UsersDashboard>  (`/users/dashboard?range=${range}`),
};
