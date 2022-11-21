import { Bar } from "components/Bar";
import styles from "./styles.module.css";

const gold = "#FFD700";
const black = "#000000";
const silver = "#C0C0C0";

export const PlayerSummary = ({
  main,
  name,
  level,
  health,
  maxHealth,
  attack,
  defense,
  accuracy,
  speed,
  agility
}) => (
    <div
      style={{ backgroundColor: main ? black : silver }}
      className={styles.main}
    >
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.level}>Lvl: {level}</div>
      </div>

      <div className={styles.health}>
        <Bar label="HP" value={health} maxValue={maxHealth} />
        <div>Attack: {attack}</div>
        <div>Defense: {defense}</div>
        <div>Speed: {accuracy}</div>
        <div>Accuracy: {speed}</div>
        <div>Agility: {agility}</div>
      </div>
    </div>
  );
