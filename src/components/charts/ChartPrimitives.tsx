import React from "react";
import cx from "classnames";
import styles from "./index.module.scss";
import { Color } from "../../types";

// ─── Tooltip ────────────────────────────────────────────────────────────────
export const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.chartTooltip}>
      <div className={styles.label}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} className={styles.row}>
          <span className={styles.dot} style={{ background: p.color }} />
          <span className={styles.name}>{p.name}</span>
          <span className={styles.val}>{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Legend Dot ─────────────────────────────────────────────────────────────
interface LegendDotProps {
  color: Color;
  label: string;
  style?: React.CSSProperties;
}

export const LegendDot: React.FC<LegendDotProps> = ({
  color,
  label,
  style,
}) => {
  return (
    <>
      <span className={cx(styles.legendDot, styles[color])} style={style} />
      {label}
    </>
  );
};

// ─── ChartCard ───────────────────────────────────────────────────────────────
interface ChartCardProps {
  title: string;
  sub?: string;
  legend?: React.ReactNode;
  bodyStyle?: React.CSSProperties;
  children: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  sub,
  legend,
  bodyStyle,
  children,
}) => (
  <div className={styles.chartCard}>
    <div className={styles.header}>
      <div>
        <div className={styles.title}>{title}</div>
        {sub && <div className={styles.sub}>{sub}</div>}
      </div>
      {legend && <div className={styles.legend}>{legend}</div>}
    </div>
    <div className={styles.body} style={bodyStyle}>
      {children}
    </div>
  </div>
);

// ─── ChartsRow ───────────────────────────────────────────────────────────────
type RowLayout = "70-30" | "60-40" | "50-50" | "full";

interface ChartsRowProps {
  layout: RowLayout;
  children: React.ReactNode;
}

export const ChartsRow: React.FC<ChartsRowProps> = ({ layout, children }) => (
  <div className={cx(styles.chartsRow, styles[`_${layout}`])}>{children}</div>
);
