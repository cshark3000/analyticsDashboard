import React from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartTooltip } from "./ChartPrimitives";
import { Color } from "../../types";

const T = { fill: "#adb5bd", fontSize: 11, fontFamily: "Inter, sans-serif" };

export interface AreaChartData {
  date: string;
  value: number;
  secondary?: number;
}

interface Props {
  data: AreaChartData[];
  primaryKey?: string;
  primaryName?: string;
  primaryColor?: Color;
  primaryGradientId?: string;
  secondaryKey?: string;
  secondaryName?: string;
  secondaryColor?: Color;
  secondaryGradientId?: string;
  height?: number;
  showSecondary?: boolean;
}

export const AreaChartComponent: React.FC<Props> = ({
  data,
  primaryKey = "value",
  primaryName = "Primary",
  primaryColor = Color.cyan,
  primaryGradientId = "area-primary",
  secondaryKey = "secondary",
  secondaryName = "Secondary",
  secondaryColor = Color.violet,
  secondaryGradientId = "area-secondary",
  height = 200,
  showSecondary = true,
}) => {
  const primaryGradient = `${primaryGradientId}-gradient`;
  const secondaryGradient = `${secondaryGradientId}-gradient`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart
        data={data}
        margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id={primaryGradient} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={primaryColor} stopOpacity={0.15} />
            <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
          </linearGradient>
          <linearGradient id={secondaryGradient} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.15} />
            <stop offset="95%" stopColor={secondaryColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#f1f3f5" vertical={false} />
        <XAxis
          dataKey="date"
          tick={T}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={T}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<ChartTooltip />} />
        <Area
          type="monotone"
          dataKey={primaryKey}
          name={primaryName}
          stroke={primaryColor}
          strokeWidth={1.5}
          fill={`url(#${primaryGradient})`}
          dot={false}
        />
        {showSecondary && (
          <Area
            type="monotone"
            dataKey={secondaryKey}
            name={secondaryName}
            stroke={secondaryColor}
            strokeWidth={1.5}
            fill={`url(#${secondaryGradient})`}
            dot={false}
          />
        )}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};
