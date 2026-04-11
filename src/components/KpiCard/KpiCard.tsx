import React, { useEffect, useState } from "react";
import cx from "classnames";
import type { KpiCard as KpiCardType } from "../../types";
import styles from "./index.module.scss";

interface KpiCardProps extends KpiCardType {
  delay?: number;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  accent,
  delay = 0,
}) => {
  const [visible, setVisible] = useState(false);
  const isUp = change >= 0;

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={cx(
        styles.kpiCard,
        styles[accent],
        visible ? styles.visible : "",
      )}
    >
      <div className={styles.accentBar} />
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={cx(styles.badge, isUp ? styles.up : styles.down)}>
          {isUp ? "↑" : "↓"} {Math.abs(change)}%
        </span>
      </div>
      <div className={styles.value}>{value}</div>
      <div className={styles.meta}>
        <span
          className={cx(styles.change, isUp ? styles.textUp : styles.textDown)}
        >
          {isUp ? "+" : ""}
          {change}%
        </span>
        <span> {changeLabel}</span>
      </div>
      <div className={styles.bar}>
        <div
          className={styles.barFill}
          style={{ width: `${Math.min(Math.abs(change) * 4, 85)}%` }}
        />
      </div>
    </div>
  );
};
