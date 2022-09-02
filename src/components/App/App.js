import { Battle } from "components/Battle";
import { EndMenu } from "components/EndMenu";
import { StartMenu } from "components/StartMenu";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export const App = () => {
  const [mode, setMode] = useState("start");
  const [winner, setWinner] = useState();

  useEffect(() => {
    if (mode === "battle") {
      setWinner(undefined);
    }
  }, [mode]);

  return (
    <div className={styles.main}>
      {mode === "start" && (
        <StartMenu onStartClick={() => setMode("battle")} />
      )}

      {mode === "battle" && (
        <Battle
          onGameEnd={winner => {
            setWinner(winner);
            setMode("gameOver");
          }}
        />
      )}

      {mode === "gameOver" && !!winner && (
        <EndMenu
          winner={winner}
          onStartClick={() =>
            setMode("battle")} />
      )}
    </div>
  );
};
