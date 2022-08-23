import { useEffect, useState } from "react";
import {
  attack,
  opponentStats,
  playerStats,
  wait,
  magic,
  heal,
} from "shared";

export const useBattleSequence = sequence => {
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(
    opponentStats.maxHealth,
  );
  const [announcerMessage, setAnnouncerMessage] = useState("");
  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [opponentAnimation, setOpponentAnimation] = useState("static");

  useEffect(() => {
    const { mode, turn } = sequence;

    if (mode) {
      const attacker = turn === 0 ? playerStats : opponentStats;
      const defender = turn === 0 ? opponentStats : playerStats;

      switch (mode) {
        case "attack": {
          const damage = attack({ attacker, defender });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has chosen to attack!`);
            await wait(1000);

            turn === 0
              ? setPlayerAnimation("attack")
              : setOpponentAnimation("attack");
            await wait(100);

            turn === 0
              ? setPlayerAnimation("static")
              : setOpponentAnimation("static");
            await wait(500);

            turn === 0
              ? setOpponentAnimation("damage")
              : setPlayerAnimation("damage");
            await wait(750);

            turn === 0
              ? setOpponentAnimation("static")
              : setPlayerAnimation("static");
            setAnnouncerMessage(`${defender.name} was hit!`);
            turn === 0
              ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0));
            await wait(2000);

            setAnnouncerMessage(`Now it's ${defender.name}'s turn`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();
          break;
        }

        case "magic": {
          const damage = magic({ attacker, defender });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has cast a spell!`);
            await wait(1000);

            turn === 0
              ? setPlayerAnimation("magic")
              : setOpponentAnimation("magic");
            await wait(100);

            turn === 0
              ? setPlayerAnimation("static")
              : setOpponentAnimation("static");
            await wait(500);

            turn === 0
              ? setOpponentAnimation("damage")
              : setPlayerAnimation("damage");
            await wait(750);

            turn === 0
              ? setOpponentAnimation("static")
              : setPlayerAnimation("static");
            setAnnouncerMessage(`${defender.name} feels crispy!`);
            turn === 0
              ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0));
            await wait(2000);

            setAnnouncerMessage(`Now it's ${defender.name}'s turn`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();
          break;
        }

        case "heal": {
          const recovered = heal({ defender: attacker });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} healed itself!`);
            await wait(1000);

            turn === 0
              ? setPlayerAnimation("magic")
              : setOpponentAnimation("magic");
            await wait(1000);

            turn === 0
              ? setPlayerAnimation("static")
              : setOpponentAnimation("static");
            await wait(500);

            setAnnouncerMessage(`${attacker.name} has recovered some HP!`);
            turn === 0
              ? setPlayerHealth(h =>
                  h + recovered <= attacker.maxHealth
                    ? h + recovered
                    : attacker.maxHealth,
                )
              : setOpponentHealth(h =>
                  h + recovered <= attacker.maxHealth
                    ? h + recovered
                    : attacker.maxHealth,
                ); //Not wanting health to recover over the max
            await wait(2500);

            setAnnouncerMessage(`Now it's ${defender.name}'s turn!`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 1);
            setInSequence(false);
          })();

          break;
        }

        default:
          break;
      }
    }
  }, [sequence]);

  return {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    announcerMessage,
    playerAnimation,
    opponentAnimation,
  };
};
