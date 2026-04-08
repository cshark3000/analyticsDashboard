import React, { useState } from "react";
import styles from "./index.module.scss";
import { Section, DateRange } from "./types";
import { Header } from "./components/Header/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";

const App: React.FC = () => {
  const [section, setSection] = useState<Section>("users");
  const [dateRange, setDateRange] = useState<DateRange>("30D");

  return (
    <div className={styles.app}>
      <Sidebar active={section} onChange={setSection} />
      <div className={styles.main}>
        <Header
          section={section}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
        <div className={styles.content}></div>
      </div>
    </div>
  );
};

export default App;
