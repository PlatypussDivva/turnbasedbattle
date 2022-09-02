import { Bar } from "components/Bar";
import styles from "./styles.module.css";

const gold = "#FFD700";
const silver = "#C0C0C0";

export const PlayerSummary = ({
  main,
  name,
  level,
  health,
  maxHealth,
}) => (
    <div
      style={{ backgroundColor: main ? gold : silver }}
      className={styles.main}
    >
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.level}>Lvl: {level}</div>
      </div>

      <div className={styles.health}>
        <Bar label="HP" value={health} maxValue={maxHealth} />
      </div>
    </div>
  );
