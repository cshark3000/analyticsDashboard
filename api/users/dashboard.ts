import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parseRange, getUserKpis, getUserActivity, getUserGrowth, getDeviceSplit, getGeoData } from './store';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const range = parseRange(req.query);
  res.json({
    kpi:      getUserKpis(range),
    activity: getUserActivity(range),
    growth:   getUserGrowth(range),
    devices:  getDeviceSplit(range),
    geo:      getGeoData(range),
  });
}
