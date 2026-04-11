import React from "react";
import cx from "classnames";
import styles from "./index.module.scss";

export const CardSkeleton: React.FC = () => (
  <div className={styles.skeletonCard}>
    <div className="styles.top">
      <div className={cx(styles.skeleton, styles.sm)} />
      <div className={cx(styles.skeleton, styles.xs)} />
    </div>
    <div className={cx(styles.skeleton, styles.lg)} style={{ marginTop: 12 }} />
    <div
      className={cx(styles.skeleton, styles.sm)}
      style={{ marginTop: 10, width: "60%" }}
    />
    <div
      className={cx(styles.skeleton, styles.ine)}
      style={{ marginTop: 14 }}
    />
  </div>
);
