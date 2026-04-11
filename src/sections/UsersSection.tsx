import React from "react";
import { KpiCard } from "../components/KpiCard/KpiCard";
import { CardSkeleton } from "../components/KpiCard/CardSkeleton/CardSkeleton";

import { useApi } from "../hooks/useApi";
import { api } from "../api/client";
import type { DateRange } from "../types";

import styles from "./index.module.scss";

interface Props {
  dateRange: DateRange;
}

export const UsersSection: React.FC<Props> = ({ dateRange }) => {
  const dash = useApi(() => api.users(dateRange), [dateRange]);

  if (dash.status !== "success") {
    return (
      <div className={styles.section}>
        <div className={styles.kpiGrid}>
          {Array.from({ length: 4 }, (_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.kpiGrid}>
        {dash.data.kpi.map((kpi, i) => (
          <KpiCard key={kpi.title} {...kpi} delay={i * 70} />
        ))}
      </div>
    </div>
  );
};
