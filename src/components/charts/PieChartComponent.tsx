import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./index.module.scss";

export interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface LegendEntry {
  name: string;
  color: string;
  value: number;
}

interface Props {
  data: PieChartData[];
  size?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
}

export const PieChartComponent: React.FC<Props> = ({
  data,
  size = 120,
  innerRadius = 34,
  outerRadius = 52,
  showLegend = true,
}) => {
  return (
    <>
      <ResponsiveContainer width={size} height={size}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {showLegend && (
        <div className={styles.pieLegend}>
          {data.map((entry) => (
            <div key={entry.name} className={styles.row}>
              <span
                className={styles.dot}
                style={{ background: entry.color }}
              />
              <span className={styles.name}>{entry.name}</span>
              <span className={styles.val}>{entry.value}%</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
