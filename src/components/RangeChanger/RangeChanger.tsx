import { useMemo } from "react";
import cx from "classnames";
import styles from "./index.module.scss";
import { RANGES } from "../../constants";

interface RangeChangerProps {
  dateRange: string;
  onDateRangeChange: (r: string) => void;
}

export const RangeChanger: React.FC<RangeChangerProps> = ({
  dateRange,
  onDateRangeChange,
}) => {
  const ranges = useMemo(() => {
    return RANGES.map((r) => {
      const isActive = dateRange == r;
      return (
        <button
          key={r}
          className={cx(styles.range, isActive && styles.active)}
          onClick={() => onDateRangeChange(r)}
        >
          {r}
        </button>
      );
    });
  }, [dateRange]);
  return <div className={styles.ranges}>{ranges}</div>;
};
