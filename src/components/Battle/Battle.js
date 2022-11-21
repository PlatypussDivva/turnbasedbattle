import { wait } from "@testing-library/user-event/dist/utils";
import { PlayerSummary, BattleAnnouncer } from "components";
import { BattleMenu } from "components/BattleMenu/BattleMenu";
import { useAIOpponent } from "hooks";
import { useBattleSequence } from "hooks/useBattleSequence";
import { useEffect, useState } from "react";
import { opponentStats, playerStats } from "shared/characters";
import styles from "./styles.module.css";

export const Battle = ({ onGameEnd }) => {
  const [sequence, setSequence] = useState({});

  const {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    announcerMessage,
    playerAnimation,
    opponentAnimation,
  } = useBattleSequence(sequence);

  const aiChoice = useAIOpponent(turn);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);

  useEffect(() => {
    if (playerHealth === 0 || opponentHealth === 0) {
      (async () => {
        await wait(1000);
        onGameEnd(playerHealth === 0 ? opponentStats : playerStats);
      })();
    }
  }, [playerHealth, opponentHealth, onGameEnd]);

  return (
    <>
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary
            health={opponentHealth}
            name={opponentStats.name}
            level={opponentStats.level}
            maxHealth={opponentStats.maxHealth}
            accuracy={opponentStats.accuracy}
            attack={opponentStats.attack}
            agility={opponentStats.agility}
            defense={opponentStats.defense}
            speed={opponentStats.speed}
          />
        </div>
      </div>

      <div className={styles.characters}>
        <div className={styles.gameHeader}>
          {playerStats.name} vs {opponentStats.name}
        </div>

        <div className={styles.gameImages}>
          <div className={styles.playerSprite}>
            <img
              alt={playerStats.name}
              src={playerStats.img}
              className={styles[playerAnimation]}
            />
          </div>

          <div className={styles.opponentSprite}>
            <img
              alt={opponentStats.name}
              src={opponentStats.img}
              className={styles[opponentAnimation]}
            />
          </div>
        </div>
      </div>

      <div className={styles.user}>
        <div className={styles.summary}>
          <PlayerSummary
            main
            health={playerHealth}
            name={playerStats.name}
            level={playerStats.level}
            maxHealth={playerStats.maxHealth}
            accuracy={playerStats.accuracy}
            attack={playerStats.attack}
            agility={playerStats.agility}
            defense={playerStats.defense}
            speed={playerStats.speed}
          />
        </div>

        <div className={styles.hud}>
          <div className={styles.hudChild}>
            <BattleAnnouncer
              message={
                announcerMessage || `What will ${playerStats.name} do?`
              }
            />
          </div>
          {!inSequence && turn === 0 && (
          <div className={styles.hudChild}>
            <BattleMenu
              onAttack={() => setSequence({ mode: "attack", turn })}
              onMagic={() => setSequence({ mode: "magic" , turn })}
              onHeal={() => setSequence({ mode: "heal" , turn })}
            />
          </div>
          )}
        </div>
      </div>
    </>
  );
};
