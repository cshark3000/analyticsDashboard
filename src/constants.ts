import {Section} from './types'

export const SECTION: Record<Section, { title: string; subtitle: string }> = {
  users: {
    title: "User Activity",
    subtitle: "Engagement, retention & acquisition metrics",
  },
  gaming: {
    title: "Gaming Metrics",
    subtitle: "Player performance & game analytics",
  },
  finance: {
    title: "Financial Data",
    subtitle: "Revenue streams & transaction overview",
  },
};

export const RANGES = ["24H", "7D", "30D", "90D", "YTD"];

export const SIDEBAR: { id: Section; label: string; emoji: string; desc: string }[] = [
  { id: 'users',   label: 'User Activity',  emoji: '◈', desc: 'Engagement & retention' },
  { id: 'gaming',  label: 'Gaming Metrics', emoji: '◉', desc: 'Players & performance'  },
  { id: 'finance', label: 'Financial Data', emoji: '◇', desc: 'Revenue & transactions'  },
];