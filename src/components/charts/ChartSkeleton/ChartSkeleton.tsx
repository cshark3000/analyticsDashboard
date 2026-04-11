import React from "react";
import styles from "./index.module.scss";

export const ChartSkeleton: React.FC<{ height?: number }> = ({
  height = 200,
}) => (
  <div className={styles.skeletonChart} style={{ height }}>
    <div className={styles.bars}>
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className={styles.bar}
          style={{ height: `${30 + Math.sin(i * 0.8) * 25 + 25}%` }}
        />
      ))}
    </div>
  </div>
);
