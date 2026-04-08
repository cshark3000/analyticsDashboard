import React, { useState, useEffect, useMemo } from "react";
import cx from "classnames";
import type { Section } from "../../types";
import { SECTION, RANGES } from "../../constants";
import styles from "./index.module.scss";
import { RangeChanger } from "../RangeChanger/RangeChanger";

interface HeaderProps {
  section: Section;
  dateRange: string;
  onDateRangeChange: (r: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  section,
  dateRange,
  onDateRangeChange,
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const meta = SECTION[section];

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>{meta.title}</h1>
        <p className={styles.subtitle}>{meta.subtitle}</p>
      </div>

      <div className={styles.right}>
        <RangeChanger
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
        />

        <div className={styles.clock}>
          <span className={styles.time}>
            {time.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
          <span className={styles.date}>
            {time.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </header>
  );
};
