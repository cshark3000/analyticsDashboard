import React from "react";
import cx from "classnames";
import type { Section } from "../../types";
import { SIDEBAR } from "../../constants";
import styles from "./index.module.scss";

interface SidebarProps {
  active: Section;
  onChange: (s: Section) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ active, onChange }) => (
  <aside className={styles.sidebar}>
    <div className={styles.logo}>
      <div className={styles.mark}>T</div>
      <div className={styles.text}>
        <span className={styles.name}>Typical</span>
        <span className={styles.sub}>Analytics</span>
      </div>
    </div>

    <div className={styles.label}>Dashboards</div>

    <nav className={styles.nav}>
      {SIDEBAR.map(({ id, label, emoji, desc }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            className={cx(styles.item, isActive && styles.active)}
            onClick={() => onChange(id)}
          >
            <span className={styles.icon}>{emoji}</span>
            <div className={styles.text}>
              <span className={styles.name}>{label}</span>
              <span className={styles.desc}>{desc}</span>
            </div>
            {isActive && <span className={styles.pip} />}
          </button>
        );
      })}
    </nav>
  </aside>
);
