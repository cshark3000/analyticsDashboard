import React from "react";
import { KpiCard } from "../components/KpiCard/KpiCard";
import { CardSkeleton } from "../components/KpiCard/CardSkeleton/CardSkeleton";

import { useApi } from "../hooks/useApi";
import { api } from "../api/client";
import { Color, type DateRange } from "../types";

import styles from "./index.module.scss";
import { AreaChartComponent } from "../components/charts/AreaChartComponent";
import { ChartCard, LegendDot } from "../components/charts/ChartPrimitives";

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
      <ChartCard
        title="User Growth"
        sub="DAU vs New Registrations"
        legend={
          <>
            <LegendDot color={Color.teal} label="DAU" />
            <LegendDot
              color={Color.violet}
              label="New Users"
              style={{ marginLeft: 12 }}
            />
          </>
        }
        bodyStyle={{ height: 200 }}
      >
        <AreaChartComponent
          data={dash.data.growth}
          primaryKey="value"
          primaryName="DAU"
          primaryColor={Color.cyan}
          primaryGradientId="ug-dau"
          secondaryKey="secondary"
          secondaryName="New Users"
          secondaryColor={Color.violet}
          secondaryGradientId="ug-new"
          height={200}
        />
      </ChartCard>
    </div>
  );
};
