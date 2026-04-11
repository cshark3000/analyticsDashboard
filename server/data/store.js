'use strict';

const VALID_RANGES = ['24H', '7D', '30D', '90D', 'YTD'];
const DEFAULT_RANGE = '30D';

const SCALE = {
  '24H': { dau: 0.30, users: 0.12, revenue: 0.04, matches: 0.05 },
  '7D':  { dau: 0.65, users: 0.35, revenue: 0.22, matches: 0.28 },
  '30D': { dau: 1.00, users: 1.00, revenue: 1.00, matches: 1.00 },
  '90D': { dau: 2.80, users: 2.90, revenue: 3.10, matches: 2.70 },
  'YTD': { dau: 8.40, users: 9.20, revenue: 10.1, matches: 8.80 },
};

const KPI_CHANGES = {
  users: {
    '24H': [  3.1,   2.4,  -1.8,   0.6 ],
    '7D':  [  7.8,   5.2,  -2.5,   1.4 ],
    '30D': [ 12.4,   8.7,  -3.2,   2.1 ],
    '90D': [ 24.6,  18.3,  -6.7,   5.8 ],
    'YTD': [ 41.2,  33.8, -11.4,  12.3 ],
  }
};

const BASE_USERS = 284912;
const BASE_REGISTRATIONS = 18340;
const BASE_RETENTION = 68.4;
const BASE_ACTIVITY = { dau: 429200, sessions: 542800 };

const GROWTH = { base: 220000, sinAmp: 20000, sinFreq: 0.4, trend: 2200, noise: 8000 };
const GROWTH_SECONDARY = { base: 14000, sinAmp: 3000, sinFreq: 0.3, trend: 140, noise: 2000 };

const GEO_COUNTRIES = [
  { country: 'United States', base: 82400, flag: '🇺🇸', pct: 28.9 },
  { country: 'Germany',       base: 41200, flag: '🇩🇪', pct: 14.5 },
  { country: 'Japan',         base: 38700, flag: '🇯🇵', pct: 13.6 },
  { country: 'Brazil',        base: 29100, flag: '🇧🇷', pct: 10.2 },
  { country: 'India',         base: 24800, flag: '🇮🇳', pct:  8.7 },
  { country: 'Other',         base: 68712, flag: '🌍',  pct: 24.1 },
];

const DEVICE_SPLIT = [
  { name: 'Mobile',  value: 58, color: '#3b82f6' },
  { name: 'Desktop', value: 31, color: '#8b5cf6' },
  { name: 'Tablet',  value: 11, color: '#06b6d4' },
];

const rnd = (min, max) => Math.round(Math.random() * (max - min) + min);
const sin = (i, amp, freq, phase = 0) => Math.round(Math.sin(i * freq + phase) * amp);
const fmt = n => n.toLocaleString('en-US');

const parseRange = req => {
  const r = (req.query.range || DEFAULT_RANGE).toString().toUpperCase();
  return VALID_RANGES.includes(r) ? r : DEFAULT_RANGE;
};

const validateRange = range => {
  if (!VALID_RANGES.includes(range)) {
    throw new Error(`Invalid range: ${range}. Valid: ${VALID_RANGES.join(', ')}`);
  }
};

const getLabels = range => {
  switch (range) {
    case '24H': return Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2,'0')}:00`);
    case '7D':  return ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    case '30D': return Array.from({ length: 30 }, (_, i) => `Nov ${i + 1}`);
    case '90D': return Array.from({ length: 13 }, (_, i) => `W${i + 1}`);
    case 'YTD': return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    default:    return Array.from({ length: 30 }, (_, i) => `Nov ${i + 1}`);
  }
};

const generateGrowthPoint = (i, scale, config) => {
  const { base, sinAmp, sinFreq, trend, noise } = config;
  return Math.round((base + sin(i, sinAmp, sinFreq) + i * trend + rnd(0, noise)) * scale);
};

const getUserKpis = range => {
  validateRange(range);
  const [activeUsers, newRegs, avgSession, retention] = KPI_CHANGES.users[range];
  const { dau, users } = SCALE[range];

  const totalDau = Math.round(BASE_ACTIVITY.dau * dau);
  const totalSessions = Math.round(BASE_ACTIVITY.sessions * dau);
  const avgSessionSec = Math.round((totalSessions / totalDau) * 24 * 60);
  const avgSessionFmt = `${Math.floor(avgSessionSec / 60)}m ${avgSessionSec % 60}s`;

  return [
    { title: 'Active Users',      value: fmt(Math.round(BASE_USERS * dau)),      change: activeUsers,  changeLabel: `vs prev ${range}`, accent: 'teal'   },
    { title: 'New Registrations', value: fmt(Math.round(BASE_REGISTRATIONS * users)), change: newRegs, changeLabel: `vs prev ${range}`, accent: 'gold'   },
    { title: 'Avg. Session',      value: avgSessionFmt,                           change: avgSession,  changeLabel: `vs prev ${range}`, accent: 'violet' },
    { title: 'Retention Rate',    value: `${(BASE_RETENTION + retention * 0.3).toFixed(1)}%`, change: retention, changeLabel: `vs prev ${range}`, accent: 'rose' },
  ];
};

const getUserActivity = range => {
  const { dau } = SCALE[range];
  return Array.from({ length: 9 }, (_, i) => ({
    hour: `${String(i * 3).padStart(2, '0')}:00`,
    dau:      Math.round(rnd(8000, 89000) * dau),
    sessions: Math.round(rnd(10000, 118000) * dau),
    retention: rnd(58, 75),
  }));
};

const getUserGrowth = range => {
  const { dau, users } = SCALE[range];
  return getLabels(range).map((date, i) => ({
    date,
    value:     generateGrowthPoint(i, dau, GROWTH),
    secondary: generateGrowthPoint(i, users, GROWTH_SECONDARY),
  }));
};

const getDeviceSplit = range => {
  const { users } = SCALE[range];
  const raw = DEVICE_SPLIT.map(r => ({ ...r, value: Math.round(r.value * users) }));
  const total = raw.reduce((sum, r) => sum + r.value, 0);
  return raw.map(r => ({ ...r, value: Math.round((r.value / total) * 100) }));
};

const getGeoData = range => {
  const { dau } = SCALE[range];
  return GEO_COUNTRIES.map(c => ({
    ...c,
    users: Math.round(c.base * dau),
  }));
};

module.exports = {
  parseRange,
  getUserKpis,
  getUserActivity,
  getUserGrowth,
  getDeviceSplit,
  getGeoData,
};
